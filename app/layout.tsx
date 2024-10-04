import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '我的個人網站',
  description: '歡迎來到我的個人網站',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <header className="bg-gray-100 p-4">
          <nav className="container mx-auto">
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="text-blue-500 hover:text-blue-700">
                  首頁
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-500 hover:text-blue-700">
                  關於我
                </Link>
              </li>
              <li>
                <Link href="/experience" className="text-blue-500 hover:text-blue-700">
                  工作經歷
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
