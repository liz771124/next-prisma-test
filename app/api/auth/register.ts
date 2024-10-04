import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { username, email, password } = req.body;

      // 檢查用戶是否已存在
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { username },
            { email }
          ]
        }
      });

      if (existingUser) {
        return res.status(400).json({ message: '用戶名或郵箱已被使用' });
      }

      // 加密密碼
      const hashedPassword = await bcrypt.hash(password, 10);

      // 創建新用戶
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword
        }
      });

      res.status(201).json({ message: '用戶註冊成功' });
    } catch (error) {
      res.status(500).json({ message: '服務器錯誤' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}