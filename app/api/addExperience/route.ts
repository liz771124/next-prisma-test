import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { company, position, duration, description, imageUrl } = await request.json()
    const newExperience = await prisma.experience.create({
      data: {
        company,
        position,
        duration,
        description,
        imageUrl,
      },
    })
    return NextResponse.json(newExperience, { status: 201 })
  } catch (error) {
    console.error('Error adding experience:', error)
    return NextResponse.json({ error: '添加經歷時發生錯誤' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}