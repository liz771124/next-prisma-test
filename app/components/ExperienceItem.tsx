'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Experience {
  id: number
  company: string
  position: string
  duration: string
  description: string
  imageUrl: string
}

interface ExperienceItemProps {
  experience: Experience
  onUpdate: () => void
}

export default function ExperienceItem({ experience, onUpdate }: ExperienceItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedExperience, setEditedExperience] = useState(experience)
  const router = useRouter()

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedExperience(experience)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedExperience({ ...editedExperience, [e.target.name]: e.target.value })
  }

  const handleUpdate = async () => {
    try {
      const response = await fetch('/api/experience', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedExperience),
      })
      if (response.ok) {
        setIsEditing(false)
        onUpdate()
      } else {
        throw new Error('更新失敗')
      }
    } catch (error) {
      alert('更新工作經歷時發生錯誤')
    }
  }

  const handleDelete = async () => {
    if (confirm('確定要刪除這條工作經歷嗎？')) {
      try {
        const response = await fetch('/api/experience', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: experience.id }),
        })
        if (response.ok) {
          onUpdate()
        } else {
          throw new Error('刪除失敗')
        }
      } catch (error) {
        alert('刪除工作經歷時發生錯誤')
      }
    }
  }

  if (isEditing) {
    return (
      <div className="border p-4 mb-4 rounded">
        <input
          type="text"
          name="company"
          value={editedExperience.company}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="position"
          value={editedExperience.position}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="duration"
          value={editedExperience.duration}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          name="description"
          value={editedExperience.description}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          rows={4}
        />
        <input
          type="text"
          name="imageUrl"
          value={editedExperience.imageUrl}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">保存</button>
          <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded">取消</button>
        </div>
      </div>
    )
  }

  return (
    <div className="border p-4 mb-4 rounded">
      <h2 className="text-xl font-bold">{experience.company}</h2>
      <p className="text-lg">{experience.position}</p>
      <p className="text-gray-600">{experience.duration}</p>
      <p className="mt-2">{experience.description}</p>
      <img src={experience.imageUrl} alt={experience.company} className="mt-2 w-full h-40 object-cover" />
      <div className="flex justify-end space-x-2 mt-4">
        <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded">修改</button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">刪除</button>
      </div>
    </div>
  )
}