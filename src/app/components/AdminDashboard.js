'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

const STORAGE_KEY = 'sidimas_admin_contents'
const CATEGORIES = [
  { value: 'wisata', label: '🏞️ Wisata', icon: '🏞️', color: '#65a30d', gradient: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)' },
  { value: 'kuliner', label: '🍜 Kuliner', icon: '🍜', color: '#16a34a', gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' },
  { value: 'budaya', label: '🎭 Budaya', icon: '🎭', color: '#15803d', gradient: 'linear-gradient(135deg, #4ade80 0%, #15803d 100%)' },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [category, setCategory] = useState('wisata')
  const [description, setDescription] = useState('')
  const [funfact, setFunfact] = useState('') // Tambahan: untuk fun fact
  const [isLoading, setIsLoading] = useState(false)
  const [filterCategory, setFilterCategory] = useState('all')
  const [adminEmail, setAdminEmail] = useState('')
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [activePage, setActivePage] = useState('wisata') // New: untuk sidebar navigation
  const [isSidebarOpen, setIsSidebarOpen] = useState(true) // New: untuk toggle sidebar di mobile
  const prevActivePageRef = useRef('wisata') // Track previous activePage

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('sidimas_admin_logged_in')
    const email = localStorage.getItem('sidimas_admin_email')
    
    if (!isLoggedIn) {
      router.push('/admin/login')
      return
    }
    
    setAdminEmail(email || '')
  }, [router])

  // Load data from Supabase
  useEffect(() => {
    loadContents()
  }, [])

  // Auto-clear form ketika pindah kategori (hanya jika activePage benar-benar berubah)
  useEffect(() => {
    // Cek apakah activePage benar-benar berubah
    if (prevActivePageRef.current !== activePage) {
      console.log(`🔄 Kategori berubah dari ${prevActivePageRef.current} ke ${activePage}`)
      
      // Hanya clear jika tidak sedang edit
      if (!isEditMode) {
        setTitle('')
        setSubtitle('')
        setDescription('')
        setFunfact('') // Clear funfact juga
        clearAllImages()
        setCategory(activePage)
      }
      
      // Update ref untuk next comparison
      prevActivePageRef.current = activePage
    }
  }, [activePage, isEditMode]) // Include isEditMode in dependencies

  async function loadContents() {
    try {
      // Load dari 3 tabel terpisah
      const [wisataResult, kulinerResult, budayaResult] = await Promise.all([
        supabase.from('konten_wisata').select('*').order('created_at', { ascending: false }),
        supabase.from('konten_kuliner').select('*').order('created_at', { ascending: false }),
        supabase.from('konten_budaya').select('*').order('created_at', { ascending: false })
      ])

      // Check errors
      if (wisataResult.error) throw wisataResult.error
      if (kulinerResult.error) throw kulinerResult.error
      if (budayaResult.error) throw budayaResult.error
      
      // Combine data dengan menambahkan field 'kategori' untuk filtering
      const allItems = [
        ...(wisataResult.data || []).map(item => ({ ...item, kategori: 'wisata' })),
        ...(kulinerResult.data || []).map(item => ({ ...item, kategori: 'kuliner' })),
        ...(budayaResult.data || []).map(item => ({ ...item, kategori: 'budaya' }))
      ]
      
      // Sort by created_at
      allItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      
      setItems(allItems)
    } catch (error) {
      console.error('Error loading contents:', error.message)
    }
  }

  function handleMultipleImageChange(e) {
    console.log('🔍 handleMultipleImageChange dipanggil!')
    console.log('📂 Active Page:', activePage)
    console.log('📁 Files selected:', e.target.files)
    
    const files = Array.from(e.target.files)
    const remainingSlots = 5 - imagePreviews.length
    
    console.log('📊 Image Previews saat ini:', imagePreviews.length)
    console.log('🎯 Remaining Slots:', remainingSlots)
    
    if (files.length > remainingSlots) {
      alert(`⚠️ Maksimal ${remainingSlots} gambar lagi (Total maksimal 5 gambar)`)
      return
    }
    
    // Validate file size (max 5MB per file)
    const maxSize = 5 * 1024 * 1024 // 5MB
    const oversizedFiles = files.filter(file => file.size > maxSize)
    if (oversizedFiles.length > 0) {
      alert('⚠️ Beberapa file melebihi 5MB. Silakan pilih file yang lebih kecil.')
      return
    }
    
    // Add files
    const newFiles = [...imageFiles, ...files]
    setImageFiles(newFiles)
    
    console.log('📦 Total files after add:', newFiles.length)
    
    // Create previews
    files.forEach(file => {
      console.log('🖼️ Creating preview untuk:', file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        console.log('✅ Preview berhasil dibuat:', file.name)
        setImagePreviews(prev => {
          const updated = [...prev, {
            url: reader.result,
            file: file,
            name: file.name
          }]
          console.log('📸 Total previews sekarang:', updated.length)
          return updated
        })
      }
      reader.readAsDataURL(file)
    })
  }

  function removeImage(index) {
    setImageFiles(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  function clearAllImages() {
    setImageFiles([])
    setImagePreviews([])
  }

  // Helper function untuk mendapatkan nama tabel berdasarkan kategori
  function getTableName(kategori) {
    return `konten_${kategori}` // 'wisata' -> 'konten_wisata'
  }

  function handleEdit(item) {
    setIsEditMode(true)
    setEditingId(item.id)
    setTitle(item.nama)
    setSubtitle(item.subtittle || '')
    setCategory(item.kategori)
    setDescription(item.deskripsi || '')
    setFunfact(item.funfact || '') // Set funfact dari database
    
    // Handle multiple images from gambar_url (stored with ||| separator)
    if (item.gambar_url) {
      // Parse URLs from string
      const urls = item.gambar_url.split('|||').filter(url => url.trim())
      
      // Set previews from existing URLs
      const previews = urls.map((url, index) => ({
        url: url.trim(),
        file: null,
        name: `Gambar ${index + 1}`,
        isExisting: true
      }))
      setImagePreviews(previews)
    }
    
    // Scroll ke form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelEdit() {
    setIsEditMode(false)
    setEditingId(null)
    setTitle('')
    setSubtitle('')
    setCategory(activePage) // FIX: Sync dengan activePage
    setDescription('')
    setFunfact('') // Clear funfact
    clearAllImages()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    setIsLoading(true)
    
    try {
      let gambarUrls = []

      // Get existing URLs from previews (for edit mode)
      const existingUrls = imagePreviews
        .filter(preview => preview.isExisting)
        .map(preview => preview.url)

      // Upload new images to Supabase Storage
      const newFiles = imageFiles.filter((_, index) => 
        !imagePreviews[index]?.isExisting
      )

      for (const file of newFiles) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `konten/${fileName}`

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('images')
          .getPublicUrl(filePath)

        gambarUrls.push(urlData.publicUrl)
      }

      // Combine existing and new URLs
      const allUrls = [...existingUrls, ...gambarUrls]
      const gambarUrlsString = allUrls.join('|||') // Store as string with separator

      if (isEditMode) {
        // UPDATE mode
        const updateData = {
          nama: title.trim(),
          subtittle: subtitle.trim(),
          deskripsi: description.trim(),
          funfact: funfact.trim(), // Tambahkan funfact
          gambar_url: gambarUrlsString,
        }

        // Gunakan tabel sesuai kategori item yang sedang diedit
        const tableName = getTableName(category) // category dari item yang diedit
        
        const { data, error } = await supabase
          .from(tableName)
          .update(updateData)
          .eq('id', editingId)
          .select()

        if (error) throw error

        if (data && data[0]) {
          // Tambahkan field kategori untuk konsistensi di state
          const updatedItem = { ...data[0], kategori: category }
          setItems(prev => prev.map(item => 
            item.id === editingId ? updatedItem : item
          ))
        }

        alert('✅ Konten berhasil diupdate!')
        cancelEdit()
      } else {
        // INSERT mode
        const newItem = {
          nama: title.trim(),
          subtittle: subtitle.trim(),
          deskripsi: description.trim(),
          funfact: funfact.trim(), // Tambahkan funfact
          gambar_url: gambarUrlsString,
        }

        // Gunakan tabel sesuai dengan activePage (kategori yang sedang dipilih)
        const tableName = getTableName(activePage)
        
        const { data, error } = await supabase
          .from(tableName)
          .insert([newItem])
          .select()

        if (error) throw error

        if (data && data[0]) {
          // Tambahkan field kategori untuk konsistensi di state
          const insertedItem = { ...data[0], kategori: activePage }
          setItems(prev => [insertedItem, ...prev])
        }

        alert('✅ Konten berhasil ditambahkan!')
        
        // Reset form
        setTitle('')
        setSubtitle('')
        setCategory(activePage) // Sync category dengan activePage
        setDescription('')
        setFunfact('') // Clear funfact
        clearAllImages()
      }
    } catch (error) {
      console.error('Error saving content:', error.message)
      alert('❌ Gagal menyimpan konten: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('⚠️ Yakin ingin menghapus konten ini?')) return

    try {
      // Cari item untuk tahu kategorinya
      const item = items.find(i => i.id === id)
      if (!item) {
        alert('❌ Konten tidak ditemukan!')
        return
      }
      
      // Gunakan tabel sesuai kategori
      const tableName = getTableName(item.kategori)
      
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id)

      if (error) throw error

      setItems(prev => prev.filter(item => item.id !== id))
      alert('✅ Konten berhasil dihapus!')
    } catch (error) {
      console.error('Error deleting content:', error.message)
      alert('❌ Gagal menghapus konten: ' + error.message)
    }
  }

  const getCategoryData = (cat) => {
    return CATEGORIES.find(c => c.value === cat) || CATEGORIES[0]
  }

  const filteredItems = filterCategory === 'all' 
    ? items 
    : items.filter(item => item.kategori === filterCategory)

  const stats = CATEGORIES.map(cat => ({
    ...cat,
    count: items.filter(item => item.kategori === cat.value).length
  }))

  function handleLogout() {
    if (confirm('Yakin ingin logout?')) {
      localStorage.removeItem('sidimas_admin_logged_in')
      localStorage.removeItem('sidimas_admin_email')
      router.push('/admin/login')
    }
  }

  function handlePageChange(page) {
    setActivePage(page)
    setCategory(page)
    setFilterCategory(page)
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false)
    }
    // Reset form when changing page
    if (!isEditMode) {
      setTitle('')
      setSubtitle('')
      setDescription('')
      clearAllImages()
    }
  }

  return (
    <>
      <style jsx global>{`
        /* Media Queries for Responsive Design */
        @media (max-width: 768px) {
          .admin-sidebar {
            width: ${isSidebarOpen ? '280px' : '0'} !important;
            transform: translateX(${isSidebarOpen ? '0' : '-100%'});
          }
          .admin-main-content {
            margin-left: 0 !important;
            padding: 16px !important;
          }
          .admin-content-grid {
            grid-template-columns: 1fr !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
          .admin-stats-card {
            flex-direction: column !important;
            text-align: center;
          }
          .admin-stats-icon {
            width: 60px !important;
            height: 60px !important;
            font-size: 30px !important;
          }
          .admin-stats-text {
            font-size: 28px !important;
          }
          .admin-form-card, .admin-list-card {
            padding: 20px !important;
          }
          .admin-image-grid {
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)) !important;
          }
          .item-card-content {
            flex-direction: column !important;
          }
          .item-card-buttons {
            flex-direction: row !important;
            width: 100%;
            justify-content: flex-end !important;
          }
          .item-images-grid {
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)) !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .admin-sidebar {
            width: ${isSidebarOpen ? '240px' : '70px'} !important;
          }
          .admin-main-content {
            margin-left: ${isSidebarOpen ? '240px' : '70px'} !important;
            padding: 24px !important;
          }
          .admin-content-grid {
            grid-template-columns: 1fr !important;
          }
          .admin-stats-card {
            padding: 20px !important;
          }
          .admin-stats-text {
            font-size: 32px !important;
          }
          .item-images-grid {
            grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)) !important;
          }
        }

        @media (min-width: 1025px) and (max-width: 1366px) {
          .admin-content-grid {
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)) !important;
          }
        }

        @media (max-width: 480px) {
          .admin-content-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .admin-form-card, .admin-list-card {
            padding: 16px !important;
          }
          .admin-stats-card {
            padding: 16px !important;
          }
          .admin-main-content {
            padding: 12px !important;
          }
        }

        /* Mobile Menu Toggle Button (hidden on desktop) */
        .mobile-menu-toggle {
          display: none;
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 1001;
          background: linear-gradient(135deg, #15803d 0%, #065f46 100%);
          color: white;
          border: none;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        /* Overlay for mobile sidebar */
        .sidebar-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 999;
        }

        @media (max-width: 768px) {
          .sidebar-overlay {
            display: ${isSidebarOpen ? 'block' : 'none'};
          }
        }
      `}</style>

      {/* Mobile Menu Toggle Button */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Menu"
      >
        {isSidebarOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar Overlay for Mobile */}
      <div 
        className="sidebar-overlay"
        onClick={() => setIsSidebarOpen(false)}
      />

      <div style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#f3f4f6'
      }}>
        {/* Sidebar */}
        <div className="admin-sidebar" style={{
          width: isSidebarOpen ? '280px' : '80px',
          background: 'linear-gradient(180deg, #15803d 0%, #065f46 100%)',
          color: 'white',
          transition: 'all 0.3s ease',
          position: 'fixed',
          height: '100vh',
          overflowY: 'auto',
          boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
        {/* Logo & Toggle */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {isSidebarOpen && (
            <div>
              <h2 style={{
                margin: 0,
                fontSize: '22px',
                fontWeight: '800',
                letterSpacing: '-0.5px'
              }}>
                🎯 SIDimas
              </h2>
              <p style={{
                margin: '4px 0 0 0',
                fontSize: '12px',
                opacity: 0.8
              }}>
                Admin Panel
              </p>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'white',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Navigation Menu */}
        <div style={{ padding: '20px 12px' }}>
          {isSidebarOpen && (
            <div style={{
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              opacity: 0.6,
              marginBottom: '12px',
              paddingLeft: '12px'
            }}>
              Kategori Konten
            </div>
          )}
          
          {CATEGORIES.map(cat => {
            const isActive = activePage === cat.value
            const itemCount = items.filter(item => item.kategori === cat.value).length
            
            return (
              <button
                key={cat.value}
                onClick={() => handlePageChange(cat.value)}
                style={{
                  width: '100%',
                  background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                  border: isActive ? '2px solid rgba(255,255,255,0.3)' : '2px solid transparent',
                  color: 'white',
                  padding: isSidebarOpen ? '14px 16px' : '14px 8px',
                  borderRadius: '12px',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: isActive ? '700' : '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                  justifyContent: isSidebarOpen ? 'flex-start' : 'center'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.background = 'rgba(255,255,255,0.08)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.background = 'transparent'
                  }
                }}
              >
                <span style={{ fontSize: '24px' }}>{cat.icon}</span>
                {isSidebarOpen && (
                  <>
                    <span style={{ flex: 1 }}>{cat.label.split(' ')[1]}</span>
                    <span style={{
                      background: isActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: '700'
                    }}>
                      {itemCount}
                    </span>
                  </>
                )}
              </button>
            )
          })}
        </div>

        {/* User Info & Logout */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(0,0,0,0.1)'
        }}>
          {isSidebarOpen ? (
            <>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '12px',
                borderRadius: '10px',
                marginBottom: '12px',
                fontSize: '13px'
              }}>
                <div style={{ opacity: 0.7, fontSize: '11px', marginBottom: '4px' }}>
                  Logged in as
                </div>
                <div style={{ fontWeight: '700', wordBreak: 'break-word' }}>
                  {adminEmail}
                </div>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  background: 'rgba(220, 38, 38, 0.2)',
                  border: '2px solid rgba(220, 38, 38, 0.3)',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(220, 38, 38, 0.3)'
                  e.target.style.borderColor = 'rgba(220, 38, 38, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(220, 38, 38, 0.2)'
                  e.target.style.borderColor = 'rgba(220, 38, 38, 0.3)'
                }}
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                background: 'rgba(220, 38, 38, 0.2)',
                border: 'none',
                color: 'white',
                padding: '12px',
                borderRadius: '10px',
                fontSize: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(220, 38, 38, 0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(220, 38, 38, 0.2)'}
              title="Logout"
            >
              🚪
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main-content" style={{
        marginLeft: isSidebarOpen ? '280px' : '80px',
        flex: 1,
        transition: 'margin-left 0.3s ease',
        padding: '30px',
        minHeight: '100vh'
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '30px'
        }}>
          <h1 style={{
            margin: '0 0 8px 0',
            fontSize: 'clamp(24px, 5vw, 32px)',
            fontWeight: '800',
            color: '#1f2937',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            {getCategoryData(activePage).icon}
            <span>Kelola {getCategoryData(activePage).label.split(' ')[1]}</span>
          </h1>
          <p style={{
            margin: 0,
            fontSize: 'clamp(13px, 2vw, 15px)',
            color: '#6b7280'
          }}>
            Tambah, edit, dan kelola konten {getCategoryData(activePage).label.split(' ')[1].toLowerCase()} Banyumas
          </p>
        </div>

        {/* Stats Card */}
        <div className="admin-stats-card" style={{
          background: `linear-gradient(135deg, ${getCategoryData(activePage).color}15 0%, ${getCategoryData(activePage).color}08 100%)`,
          border: `2px solid ${getCategoryData(activePage).color}30`,
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div className="admin-stats-icon" style={{
            background: getCategoryData(activePage).gradient,
            width: '80px',
            height: '80px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            boxShadow: `0 8px 20px ${getCategoryData(activePage).color}40`,
            flexShrink: 0
          }}>
            {getCategoryData(activePage).icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '14px',
              color: '#6b7280',
              fontWeight: '600',
              marginBottom: '4px'
            }}>
              Total Konten {getCategoryData(activePage).label.split(' ')[1]}
            </div>
            <div style={{
              fontSize: '36px',
              fontWeight: '800',
              color: getCategoryData(activePage).color
            }}
            className="admin-stats-text"
            >
              {items.filter(item => item.kategori === activePage).length}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="admin-content-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
          gap: '30px',
          alignItems: 'start'
        }}>
          {/* Form Card */}
          <div className="admin-form-card" style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{ 
                margin: 0,
                fontSize: 'clamp(20px, 4vw, 24px)',
                fontWeight: '700',
                color: '#1f2937',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                {isEditMode ? '✏️ Edit Konten' : '✨ Tambah Konten Baru'}
              </h2>
              {isEditMode && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  style={{
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#4b5563'}
                  onMouseLeave={(e) => e.target.style.background = '#6b7280'}
                >
                  ✕ Batal Edit
                </button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  Nama Konten
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Baturraden, Soto Sokaraja, Wayang Kulit"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '15px',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  required
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  Sub Judul
                  <span style={{ 
                    color: '#9ca3af', 
                    fontSize: '12px', 
                    fontWeight: '400',
                    marginLeft: '6px'
                  }}>
                    (opsional)
                  </span>
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Contoh: Wisata Alam Sejuk di Kaki Gunung Slamet"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '15px',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#65a30d'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* Kategori Info (Read-only, determined by sidebar) */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  Kategori
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 16px',
                  border: `2px solid ${getCategoryData(activePage).color}`,
                  borderRadius: '12px',
                  background: `${getCategoryData(activePage).color}10`,
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '24px' }}>{getCategoryData(activePage).icon}</span>
                  <span style={{ 
                    fontWeight: '700', 
                    color: getCategoryData(activePage).color,
                    fontSize: '16px',
                    flex: 1
                  }}>
                    {getCategoryData(activePage).label.split(' ')[1]}
                  </span>
                  <span style={{
                    background: getCategoryData(activePage).gradient,
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    Aktif
                  </span>
                </div>
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  Deskripsi
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ceritakan tentang konten ini..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '15px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#65a30d'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* Fun Fact Field */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  💡 Fun Fact
                  <span style={{ 
                    color: '#9ca3af', 
                    fontSize: '12px', 
                    fontWeight: '400',
                    marginLeft: '6px'
                  }}>
                    (fakta unik/menarik)
                  </span>
                </label>
                <textarea
                  value={funfact}
                  onChange={(e) => setFunfact(e.target.value)}
                  placeholder="Tambahkan fakta menarik atau unik tentang konten ini..."
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '15px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* Upload Gambar */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  📷 Gambar (Maksimal 5 foto)
                  <span style={{ 
                    color: '#65a30d', 
                    fontSize: '13px', 
                    fontWeight: '700',
                    marginLeft: '8px',
                    background: '#f0fdf4',
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}>
                    {imagePreviews.length}/5
                  </span>
                </label>
                
                {/* Preview Grid */}
                {imagePreviews.length > 0 && (
                  <div 
                    key={`preview-grid-${activePage}`}
                    className="admin-image-grid"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                      gap: '12px',
                      marginBottom: '12px'
                    }}
                  >
                    {imagePreviews.map((preview, index) => (
                      <div key={`${activePage}-preview-${index}`} style={{ 
                        position: 'relative',
                        aspectRatio: '1',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}>
                        <Image 
                          src={preview.url} 
                          alt={`Preview ${index + 1}`}
                          width={200}
                          height={200}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          style={{
                            position: 'absolute',
                            top: '6px',
                            right: '6px',
                            background: '#dc2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '26px',
                            height: '26px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#b91c1c'
                            e.target.style.transform = 'scale(1.1)'
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = '#dc2626'
                            e.target.style.transform = 'scale(1)'
                          }}
                          title="Hapus gambar"
                        >
                          ✕
                        </button>
                        <div style={{
                          position: 'absolute',
                          bottom: '6px',
                          left: '6px',
                          background: 'rgba(0,0,0,0.7)',
                          color: 'white',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '700',
                          backdropFilter: 'blur(4px)'
                        }}>
                          #{index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Upload Button (muncul jika belum 5 gambar) */}
                {imagePreviews.length < 5 && (
                  <label 
                    key={`upload-label-${activePage}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '130px',
                      border: '2px dashed #d1d5db',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: '#f9fafb'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#65a30d'
                      e.currentTarget.style.background = '#f0fdf4'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db'
                      e.currentTarget.style.background = '#f9fafb'
                    }}>
                    <input
                      key={`upload-input-${activePage}`}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleMultipleImageChange}
                      style={{ display: 'none' }}
                    />
                    <div style={{ fontSize: '40px', marginBottom: '8px' }}>📷</div>
                    <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600' }}>
                      Klik untuk upload gambar
                    </div>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                      {5 - imagePreviews.length} slot tersisa • PNG, JPG (Max 5MB/file)
                    </div>
                  </label>
                )}

                {/* Clear All Button */}
                {imagePreviews.length > 1 && (
                  <button
                    type="button"
                    onClick={clearAllImages}
                    style={{
                      marginTop: '8px',
                      width: '100%',
                      background: '#f3f4f6',
                      color: '#6b7280',
                      border: '1px solid #e5e7eb',
                      padding: '8px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#fee2e2'
                      e.target.style.color = '#dc2626'
                      e.target.style.borderColor = '#fecaca'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#f3f4f6'
                      e.target.style.color = '#6b7280'
                      e.target.style.borderColor = '#e5e7eb'
                    }}
                  >
                    🗑️ Hapus Semua Gambar
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 15px rgba(101, 163, 13, 0.4)',
                  opacity: isLoading ? 0.7 : 1
                }}
                onMouseEnter={(e) => !isLoading && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 6px 20px rgba(101, 163, 13, 0.5)')}
                onMouseLeave={(e) => !isLoading && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 4px 15px rgba(101, 163, 13, 0.4)')}
              >
                {isLoading ? '⏳ Menyimpan...' : (isEditMode ? '💾 Update Konten' : '✨ Tambah Konten')}
              </button>
            </form>
          </div>

          {/* List Card */}
          <div className="admin-list-card" style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            minHeight: '600px'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <h2 style={{ 
                margin: 0,
                fontSize: 'clamp(20px, 4vw, 24px)',
                fontWeight: '700',
                color: '#1f2937',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap'
              }}>
                <span>📋</span>
                <span>Daftar {getCategoryData(activePage).label.split(' ')[1]}</span>
              </h2>
              <div style={{
                background: `${getCategoryData(activePage).color}15`,
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '700',
                color: getCategoryData(activePage).color
              }}>
                {items.filter(item => item.kategori === activePage).length} Konten
              </div>
            </div>

            {items.filter(item => item.kategori === activePage).length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#9ca3af'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>📭</div>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                  Belum ada konten {getCategoryData(activePage).label.split(' ')[1].toLowerCase()}
                </p>
                <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
                  Mulai tambahkan konten baru!
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '16px', maxHeight: '700px', overflowY: 'auto', paddingRight: '8px' }}>
                {items.filter(item => item.kategori === activePage).map(item => {
                  const catData = getCategoryData(item.kategori)
                  
                  // Parse multiple image URLs from gambar_url (stored with ||| separator)
                  let imageUrls = []
                  if (item.gambar_url) {
                    imageUrls = item.gambar_url.split('|||').filter(url => url.trim()).map(url => url.trim())
                  }
                  
                  return (
                    <div
                      key={item.id}
                      style={{
                        border: '2px solid #f3f4f6',
                        borderRadius: '16px',
                        padding: '20px',
                        background: 'white',
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = catData.color
                        e.currentTarget.style.boxShadow = `0 8px 25px ${catData.color}20`
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#f3f4f6'
                        e.currentTarget.style.boxShadow = 'none'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      {/* Multiple Images Grid */}
                      {imageUrls.length > 0 && (
                        <div className="item-images-grid" style={{
                          display: 'grid',
                          gridTemplateColumns: imageUrls.length === 1 ? '1fr' : 'repeat(auto-fill, minmax(100px, 1fr))',
                          gap: '8px',
                          marginBottom: '16px'
                        }}>
                          {imageUrls.slice(0, 5).map((url, idx) => (
                            <div key={idx} style={{ position: 'relative', aspectRatio: '1' }}>
                              <Image 
                                src={url} 
                                alt={`${item.nama} ${idx + 1}`}
                                width={100}
                                height={100}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  borderRadius: '10px'
                                }}
                              />
                              {imageUrls.length > 1 && (
                                <div style={{
                                  position: 'absolute',
                                  bottom: '4px',
                                  right: '4px',
                                  background: 'rgba(0,0,0,0.7)',
                                  color: 'white',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  fontSize: '10px',
                                  fontWeight: '600'
                                }}>
                                  {idx + 1}/{imageUrls.length}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="item-card-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '16px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ marginBottom: '12px' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 14px',
                              borderRadius: '20px',
                              fontSize: '13px',
                              fontWeight: '700',
                              color: 'white',
                              background: catData.gradient,
                            }}>
                              {catData.icon} {catData.label.split(' ')[1].toUpperCase()}
                            </span>
                          </div>
                          <h3 style={{ 
                            margin: '0 0 4px 0', 
                            fontSize: 'clamp(18px, 3vw, 20px)',
                            fontWeight: '700',
                            color: '#1f2937',
                            wordBreak: 'break-word'
                          }}>
                            {item.nama}
                          </h3>
                          {item.subtittle && (
                            <p style={{ 
                              margin: '0 0 8px 0', 
                              color: '#16a34a', 
                              fontSize: 'clamp(13px, 2vw, 14px)', 
                              fontWeight: '600',
                              lineHeight: '1.4',
                              wordBreak: 'break-word'
                            }}>
                              {item.subtittle}
                            </p>
                          )}
                          {item.deskripsi && (
                            <p style={{ 
                              margin: 0, 
                              color: '#6b7280', 
                              fontSize: 'clamp(13px, 2vw, 14px)', 
                              lineHeight: '1.6',
                              wordBreak: 'break-word'
                            }}>
                              {item.deskripsi}
                            </p>
                          )}
                        </div>
                        <div className="item-card-buttons" style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                          <button
                            onClick={() => handleEdit(item)}
                            style={{
                              background: '#dbeafe',
                              border: 'none',
                              color: '#2563eb',
                              padding: '10px',
                              borderRadius: '10px',
                              fontSize: '18px',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              lineHeight: 1
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = '#2563eb'
                              e.target.style.color = 'white'
                              e.target.style.transform = 'scale(1.1)'
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = '#dbeafe'
                              e.target.style.color = '#2563eb'
                              e.target.style.transform = 'scale(1)'
                            }}
                            title="Edit konten"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            style={{
                              background: '#fee2e2',
                              border: 'none',
                              color: '#dc2626',
                              padding: '10px',
                              borderRadius: '10px',
                              fontSize: '18px',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              lineHeight: 1
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = '#dc2626'
                              e.target.style.color = 'white'
                              e.target.style.transform = 'scale(1.1)'
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = '#fee2e2'
                              e.target.style.color = '#dc2626'
                              e.target.style.transform = 'scale(1)'
                            }}
                            title="Hapus konten"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
