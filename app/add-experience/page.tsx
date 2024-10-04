'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddExperience() {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    duration: '',
    description: '',
    imageUrl: '',
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/addExperience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        alert('工作經歷添加成功！')
        router.push('/') // 假設首頁顯示經歷列表
      } else {
        throw new Error('添加失敗')
      }
    } catch (error) {
      alert('添加工作經歷時發生錯誤')
    }
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-5">添加工作經歷</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="company" className="block mb-1">公司名稱</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="position" className="block mb-1">職位</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="duration" className="block mb-1">工作時間</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">工作描述</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block mb-1">圖片 URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          提交
        </button>
      </form>
    </div>
  )
}