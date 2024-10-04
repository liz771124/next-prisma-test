import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    console.log('Attempting to fetch experiences...');
    const experiences = await prisma.experience.findMany();
    console.log('Experiences fetched:', experiences);
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error in GET /api/experience:', error);
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { company, position, duration, description, imageUrl } = await request.json();
    const newExperience = await prisma.experience.create({
      data: {
        company,
        position,
        duration,
        description,
        imageUrl,
      },
    });
    return NextResponse.json(newExperience, { status: 201 });
  } catch (error) {
    console.error('Error adding experience:', error);
    return NextResponse.json({ error: '添加經歷時發生錯誤' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, company, position, duration, description, imageUrl } = await request.json();
    const updatedExperience = await prisma.experience.update({
      where: { id: Number(id) },
      data: {
        company,
        position,
        duration,
        description,
        imageUrl,
      },
    });
    return NextResponse.json(updatedExperience, { status: 200 });
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json({ error: '更新經歷時發生錯誤' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    await prisma.experience.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: '經歷已成功刪除' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json({ error: '刪除經歷時發生錯誤' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}