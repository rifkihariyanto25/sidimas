'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isDarkSection, setIsDarkSection] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight - 80
      const scrollPosition = window.scrollY
      
      // Deteksi apakah navbar sudah melewati hero
      setScrolled(scrollPosition > heroHeight)

      // Deteksi apakah berada di section dengan background terang/gelap
      // Sesuaikan selector dengan section yang ada di halaman
      const sections = document.querySelectorAll('section, main > div')
      let currentIsDark = true

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const navbarHeight = 80
        
        // Cek apakah navbar berada di area section ini
        if (rect.top <= navbarHeight && rect.bottom >= navbarHeight) {
          const bgColor = window.getComputedStyle(section).backgroundColor
          const classes = section.className
          
          // Deteksi background terang (putih/abu muda)
          if (
            classes.includes('about') ||
            classes.includes('khas') ||
            classes.includes('bg-white') || 
            classes.includes('bg-gray-50') || 
            classes.includes('bg-gray-100') ||
            bgColor.includes('rgb(255, 255, 255)') ||
            bgColor.includes('rgb(249, 250, 251)') ||
            bgColor.includes('rgb(243, 244, 246)')
          ) {
            currentIsDark = false
          }
        }
      })

      setIsDarkSection(currentIsDark)
    }

    handleScroll() // Panggil sekali saat mount
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Tentukan warna navbar berdasarkan posisi dan background section
  const getNavbarStyle = () => {
    if (!scrolled) {
      // Di hero section - selalu transparan dengan text putih
      return {
        bg: 'bg-black/40',
        text: 'text-white',
        shadow: '',
        border: ''
      }
    } else if (isDarkSection) {
      // Di section gelap - navbar gelap dengan text putih
      return {
        bg: 'bg-[#1a1a1a]',
        text: 'text-white',
        shadow: 'shadow-xl',
        border: ''
      }
    } else {
      // Di section terang - navbar putih dengan text gelap
      return {
        bg: 'bg-white',
        text: 'text-gray-900',
        shadow: 'shadow-xl',
        border: 'border-b border-gray-200'
      }
    }
  }

  const style = getNavbarStyle()
  
  // Tentukan warna text
  const textColor = style.text === 'text-white' ? '#ffffff' : '#374151'

  return (
    <header 
      className={`navbar fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-16 py-4 z-50 backdrop-blur-md transition-all duration-300 ${style.bg} ${style.shadow} ${style.border}`}
      style={{
        backgroundColor: !scrolled 
          ? 'rgba(0, 0, 0, 0.4)'
          : isDarkSection 
            ? '#1a1a1a'
            : '#ffffff'
      }}
    >
      <Link 
        href="/" 
        className={`logo font-bold text-lg cursor-pointer ${style.text}`}
        style={{ color: textColor }}
      >
        SIDimas.
      </Link>
      
      <nav>
        <ul className="flex gap-6">
          <li>
            <Link 
              href="/" 
              className={`transition-colors ${
                style.text === 'text-white' 
                  ? 'text-white hover:text-lime-400' 
                  : 'text-gray-700 hover:text-lime-600'
              }`}
              style={{ color: textColor }}
            >
              Beranda
            </Link>
          </li>
          <li>
            <Link 
              href="/wisata" 
              className={`transition-colors ${
                style.text === 'text-white' 
                  ? 'text-white hover:text-lime-400' 
                  : 'text-gray-700 hover:text-lime-600'
              }`}
              style={{ color: textColor }}
            >
              Wisata
            </Link>
          </li>
          <li>
            <Link 
              href="/kuliner" 
              className={`transition-colors ${
                style.text === 'text-white' 
                  ? 'text-white hover:text-lime-400' 
                  : 'text-gray-700 hover:text-lime-600'
              }`}
              style={{ color: textColor }}
            >
              Kuliner
            </Link>
          </li>
          <li>
            <Link 
              href="/budaya" 
              className={`transition-colors ${
                style.text === 'text-white' 
                  ? 'text-white hover:text-lime-400' 
                  : 'text-gray-700 hover:text-lime-600'
              }`}
              style={{ color: textColor }}
            >
              Budaya
            </Link>
          </li>
          <li>
            <Link 
              href="/admin/login" 
              className={`transition-colors ${
                style.text === 'text-white' 
                  ? 'text-white hover:text-lime-400' 
                  : 'text-gray-700 hover:text-lime-600'
              }`}
              style={{ color: textColor }}
            >
              Kontribusi
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="nav-actions flex gap-3">
        <Link 
          href="/admin/login" 
          className={`login transition-colors ${
            style.text === 'text-white' 
              ? 'text-white hover:text-lime-400' 
              : 'text-gray-700 hover:text-lime-600'
          }`}
          style={{ color: textColor }}
        >
          Log in
        </Link>
        <Link href="/admin/login" className="signup bg-lime-600 px-4 py-2 rounded-lg font-semibold hover:bg-lime-700 transition-colors text-white">
          Sign Up
        </Link>
      </div>
    </header>
  )
}