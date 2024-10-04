"use client"

import React, { useEffect, useState } from 'react';

export interface AboutData {
  name: string;
  title: string;
  summary: string;
  skills: string[];
  education: {
    degree: string;
    school: string;
    year: string;
  };
  languages: string[];
  interests: string[];
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/about')
      .then(response => {
        if (!response.ok) {
          throw new Error('獲取數據時出錯');
        }
        return response.json();
      })
      .then(data => setAboutData(data))
      .catch(error => {
        console.error('獲取自我介紹數據時出錯:', error);
        setError('無法加載數據，請稍後再試。');
      });
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!aboutData) {
    return <div>加載中...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{aboutData.name}</h1>
      <h2 className="text-xl font-semibold mb-2">{aboutData.title}</h2>
      <p className="mb-4">{aboutData.summary}</p>
      
      <h3 className="text-lg font-semibold mb-2">技能：</h3>
      <ul className="list-disc list-inside mb-4">
        {aboutData.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      
      <h3 className="text-lg font-semibold mb-2">教育背景：</h3>
      <p>{aboutData.education.degree} - {aboutData.education.school}, {aboutData.education.year}</p>
      
      <h3 className="text-lg font-semibold mb-2 mt-4">語言：</h3>
      <ul className="list-disc list-inside mb-4">
        {aboutData.languages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      
      <h3 className="text-lg font-semibold mb-2">興趣：</h3>
      <ul className="list-disc list-inside">
        {aboutData.interests.map((interest, index) => (
          <li key={index}>{interest}</li>
        ))}
      </ul>
    </div>
  );
}