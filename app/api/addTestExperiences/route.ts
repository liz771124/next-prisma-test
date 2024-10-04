import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

const testExperiences = [
  {
    company: '科技創新有限公司',
    position: '高級軟件工程師',
    duration: '2018年1月 - 2021年12月',
    description: '負責開發和維護公司的核心產品，使用React和Node.js技術棧。領導了多個重要項目，提高了團隊的工作效率。',
    imageUrl: 'https://placehold.co/600x400'
  },
  {
    company: '數據智能股份公司',
    position: '數據分析師',
    duration: '2015年6月 - 2017年12月',
    description: '運用機器學習算法分析大數據，為公司決策提供數據支持。開發了自動化報告系統，大大提高了工作效率。',
    imageUrl: 'https://placehold.co/600x400'
  },
  {
    company: '網絡安全科技有限公司',
    position: '安全工程師',
    duration: '2013年3月 - 2015年5月',
    description: '負責公司網絡安全系統的設計和實施。成功防禦了多次網絡攻擊，確保了公司數據的安全。',
    imageUrl: 'https://placehold.co/600x400'
  }
]

export async function GET() {
  try {
    const createdExperiences = await Promise.all(
      testExperiences.map(experience => 
        prisma.experience.create({ data: experience })
      )
    )
    return NextResponse.json({ message: '測試數據添加成功', data: createdExperiences }, { status: 200 })
  } catch (error) {
    console.error('Error adding test experiences:', error)
    return NextResponse.json({ error: '添加測試數據時發生錯誤' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}