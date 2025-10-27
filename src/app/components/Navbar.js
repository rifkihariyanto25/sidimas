'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isDarkSection, setIsDarkSection] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight - 80
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > heroHeight)

      const sections = document.querySelectorAll('section, main > div')
      let currentIsDark = true
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const navbarHeight = 80
        if (rect.top <= navbarHeight && rect.bottom >= navbarHeight) {
          const bgColor = window.getComputedStyle(section).backgroundColor
          const classes = section.className
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

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const getNavbarStyle = () => {
    if (!scrolled) {
      return { bg: 'bg-black/40', text: 'text-white', shadow: '', border: '' }
    } else if (isDarkSection) {
      return { bg: 'bg-[#1a1a1a]', text: 'text-white', shadow: 'shadow-xl', border: '' }
    } else {
      return { bg: 'bg-white', text: 'text-gray-900', shadow: 'shadow-xl', border: 'border-b border-gray-200' }
    }
  }

  const style = getNavbarStyle()
  const textColor = style.text === 'text-white' ? '#ffffff' : '#374151'

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/wisata', label: 'Wisata' },
    { href: '/kuliner', label: 'Kuliner' },
    { href: '/budaya', label: 'Budaya' }
  ]

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          backgroundColor: !scrolled ? 'rgba(0, 0, 0, 0.4)' : isDarkSection ? '#1a1a1a' : '#ffffff',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          boxShadow: style.shadow ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
          borderBottom: style.border ? '1px solid #e5e7eb' : 'none'
        }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px'
        }}>
          {/* Logo */}
          <Link 
            href="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              color: textColor,
              fontWeight: 700,
              fontSize: '1.25rem',
              zIndex: 110
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image 
              src="/logo.png" 
              alt="SIDimas Logo" 
              width={40} 
              height={40}
              style={{ objectFit: 'contain' }}
            />
            <span>SIDimas.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none' }} className="desktop-nav">
            <ul style={{
              display: 'flex',
              listStyle: 'none',
              gap: '32px',
              margin: 0,
              padding: 0
            }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    style={{
                      color: textColor,
                      textDecoration: 'none',
                      fontWeight: 500,
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = style.text === 'text-white' ? '#a3e635' : '#65a30d'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = textColor
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '6px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 110
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            <span style={{
              width: '24px',
              height: '2px',
              backgroundColor: textColor,
              transition: 'all 0.3s',
              transform: mobileMenuOpen ? 'rotate(45deg) translateY(8px)' : 'none'
            }} />
            <span style={{
              width: '24px',
              height: '2px',
              backgroundColor: textColor,
              transition: 'all 0.3s',
              opacity: mobileMenuOpen ? 0 : 1
            }} />
            <span style={{
              width: '24px',
              height: '2px',
              backgroundColor: textColor,
              transition: 'all 0.3s',
              transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none'
            }} />
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '280px',
            height: '100vh',
            backgroundColor: isDarkSection ? '#1a1a1a' : '#ffffff',
            transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease',
            zIndex: 105,
            boxShadow: mobileMenuOpen ? '-4px 0 24px rgba(0,0,0,0.15)' : 'none',
            paddingTop: '100px',
            paddingLeft: '32px',
            paddingRight: '32px'
          }}
          className="mobile-menu-panel"
        >
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '16px',
                    color: isDarkSection ? '#ffffff' : '#111827',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '1.125rem',
                    borderRadius: '8px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = isDarkSection ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                    e.target.style.color = isDarkSection ? '#a3e635' : '#65a30d'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = isDarkSection ? '#ffffff' : '#111827'
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 101
            }}
          />
        )}
      </header>

      <style jsx>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: block !important;
          }
          .mobile-menu-btn,
          .mobile-menu-panel {
            display: none !important;
          }
        }
        
        @media (max-width: 1023px) {
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  )
}