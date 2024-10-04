import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-primary text-white p-4">
        <h1 className="text-2xl font-bold mb-4">我的網站</h1>
        <nav className="space-y-2">
          <Link href="/" className="block hover:underline">首頁</Link>
          <Link href="/about" className="block hover:underline">關於我</Link>
          <Link href="/experience" className="block hover:underline">工作經歷</Link>
          <Link href="/contact" className="block hover:underline">聯絡我</Link>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-3xl font-bold mb-4">聯絡我</h2>
          <p className="text-gray-700">這裡是聯絡我的方式。</p>
        </div>
      </main>
    </div>
  )
}