import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // 確保正確導入 Prisma 客戶端

export async function GET() {
  // 假資料
  const mockData = {
    name: '張三',
    title: '前端工程師',
    summary: '熱愛編程，喜歡學習新技術。',
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
    education: {
      degree: '計算機科學學士',
      school: '某某大學',
      year: '2020',
    },
    languages: ['中文', '英文'],
    interests: ['閱讀', '旅行', '編程'],
  };

  // 將假資料寫入 Prisma 表中
  await prisma.about.create({
    data: {
      name: mockData.name,
      title: mockData.title,
      summary: mockData.summary,
      skills: mockData.skills,
      education: {
        create: {
          degree: mockData.education.degree,
          school: mockData.education.school,
          year: mockData.education.year,
        },
      },
      languages: mockData.languages,
      interests: mockData.interests,
    },
  });

  return NextResponse.json(mockData);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const about = await prisma.about.create({ data });
    return NextResponse.json(about, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const about = await prisma.about.update({
      where: { id: 1 }, // 假設只有一條記錄
      data
    });
    return NextResponse.json(about);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE() {
  try {
    await prisma.about.deleteMany();
    return NextResponse.json({ message: '資料已被刪除' }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}