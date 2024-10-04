import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error('請定義 JWT_SECRET 環境變量');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;

      // 查找用戶
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
        return res.status(400).json({ message: '用戶名或密碼錯誤' });
      }

      // 驗證密碼
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: '用戶名或密碼錯誤' });
      }

      // 生成 JWT
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: '服務器錯誤' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}