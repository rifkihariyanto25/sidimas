'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="navbar fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-16 py-4 z-50 bg-black/40 backdrop-blur-md text-white">
      <Link href="/" className="logo font-bold text-lg cursor-pointer">SIDimas.</Link>
      <nav>
        <ul className="flex gap-6">
          <li><Link href="/" className="hover:text-lime-400 transition-colors">Beranda</Link></li>
          <li><Link href="/wisata" className="hover:text-lime-400 transition-colors">Wisata</Link></li>
          <li><Link href="/kuliner" className="hover:text-lime-400 transition-colors">Kuliner</Link></li>
          <li><Link href="/budaya" className="hover:text-lime-400 transition-colors">Budaya</Link></li>
          <li><Link href="/admin/login" className="hover:text-lime-400 transition-colors">Kontribusi</Link></li>
        </ul>
      </nav>
      <div className="nav-actions flex gap-3">
        <Link href="/admin/login" className="login hover:text-lime-400 transition-colors">Log in</Link>
        <Link href="/admin/login" className="signup bg-lime-600 px-4 py-2 rounded-lg font-semibold hover:bg-lime-700 transition-colors">Sign Up</Link>
      </div>
    </header>
  )
}
