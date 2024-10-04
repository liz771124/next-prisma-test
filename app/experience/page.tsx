"use client"

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import ExperienceItem from '../components/ExperienceItem';

interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
  imageUrl: string;
}

export default function ExperienceList() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = useCallback(async () => {
    if (!isLoading) setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/experience');
      if (!response.ok) {
        throw new Error('Failed to fetch experiences');
      }
      const data = await response.json();
      setExperiences(data);
    } catch (err) {
      setError('加載工作經歷時發生錯誤');
      console.error('Error fetching experiences:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  if (isLoading) {
    return <div>加載中...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">工作經歷列表</h1>
        <Link href="/add-experience" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          新增工作經歷
        </Link>
      </div>
      {experiences.length === 0 ? (
        <p>目前沒有工作經歷</p>
      ) : (
        experiences.map(experience => (
          <ExperienceItem 
            key={experience.id} 
            experience={experience} 
            onUpdate={fetchExperiences} 
          />
        ))
      )}
    </div>
  );
}