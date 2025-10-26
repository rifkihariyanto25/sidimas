'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

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
  const [isLoading, setIsLoading] = useState(false)
  const [filterCategory, setFilterCategory] = useState('all')
  const [adminEmail, setAdminEmail] = useState('')
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)

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

  async function loadContents() {
    try {
      const { data, error } = await supabase
        .from('konten')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      if (data) {
        setItems(data)
      }
    } catch (error) {
      console.error('Error loading contents:', error.message)
    }
  }

  function handleMultipleImageChange(e) {
    const files = Array.from(e.target.files)
    const remainingSlots = 5 - imageFiles.length
    
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
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, {
          url: reader.result,
          file: file,
          name: file.name
        }])
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

  function handleEdit(item) {
    setIsEditMode(true)
    setEditingId(item.id)
    setTitle(item.nama)
    setSubtitle(item.subtittle || '')
    setCategory(item.kategori)
    setDescription(item.deskripsi || '')
    
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
    setCategory('wisata')
    setDescription('')
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
          kategori: category,
          deskripsi: description.trim(),
          gambar_url: gambarUrlsString, // Using existing gambar_url column
        }

        const { data, error } = await supabase
          .from('konten')
          .update(updateData)
          .eq('id', editingId)
          .select()

        if (error) throw error

        if (data && data[0]) {
          setItems(prev => prev.map(item => 
            item.id === editingId ? data[0] : item
          ))
        }

        alert('✅ Konten berhasil diupdate!')
        cancelEdit()
      } else {
        // INSERT mode
        const newItem = {
          nama: title.trim(),
          subtittle: subtitle.trim(),
          kategori: category,
          deskripsi: description.trim(),
          gambar_url: gambarUrlsString, // Using existing gambar_url column
        }

        const { data, error } = await supabase
          .from('konten')
          .insert([newItem])
          .select()

        if (error) throw error

        if (data && data[0]) {
          setItems(prev => [data[0], ...prev])
        }

        alert('✅ Konten berhasil ditambahkan!')
        
        // Reset form
        setTitle('')
        setSubtitle('')
        setCategory('wisata')
        setDescription('')
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
      const { error } = await supabase
        .from('konten')
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #65a30d 0%, #15803d 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          color: 'white',
          position: 'relative'
        }}>
          {/* Logout Button */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '8px'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600',
              backdropFilter: 'blur(10px)'
            }}>
              👤 {adminEmail}
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.3)'
                e.target.style.borderColor = 'rgba(255,255,255,0.5)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)'
                e.target.style.borderColor = 'rgba(255,255,255,0.3)'
              }}
            >
              🚪 Logout
            </button>
          </div>

          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '800',
            margin: '0 0 10px 0',
            textShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            🎯 Dashboard Admin SIDimas
          </h1>
          <p style={{ 
            fontSize: '18px', 
            opacity: 0.9,
            margin: 0
          }}>
            Kelola konten wisata, kuliner, dan budaya Banyumas
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>📊</div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>
              {items.length}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600' }}>
              Total Konten
            </div>
          </div>
          {stats.map(stat => (
            <div key={stat.value} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'
            }}
            onClick={() => setFilterCategory(stat.value)}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: stat.color }}>
                {stat.count}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600' }}>
                {stat.label.split(' ')[1]}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '30px',
          alignItems: 'start'
        }}>
          {/* Form Card */}
          <div style={{
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
                fontSize: '24px',
                fontWeight: '700',
                color: '#1f2937',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
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
                <div style={{ display: 'grid', gap: '10px' }}>
                  {CATEGORIES.map(cat => (
                    <label
                      key={cat.value}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '14px 16px',
                        border: `2px solid ${category === cat.value ? cat.color : '#e5e7eb'}`,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: category === cat.value ? `${cat.color}10` : 'transparent',
                      }}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={category === cat.value}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ marginRight: '12px', width: '18px', height: '18px' }}
                      />
                      <span style={{ fontSize: '20px', marginRight: '8px' }}>{cat.icon}</span>
                      <span style={{ 
                        fontWeight: '600', 
                        color: category === cat.value ? cat.color : '#374151',
                        fontSize: '15px'
                      }}>
                        {cat.label.split(' ')[1]}
                      </span>
                    </label>
                  ))}
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
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    {imagePreviews.map((preview, index) => (
                      <div key={index} style={{ 
                        position: 'relative',
                        aspectRatio: '1',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}>
                        <img 
                          src={preview.url} 
                          alt={`Preview ${index + 1}`}
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
                  <label style={{
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
          <div style={{
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
                fontSize: '24px',
                fontWeight: '700',
                color: '#1f2937'
              }}>
                📋 Daftar Konten
              </h2>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setFilterCategory('all')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: 'none',
                    background: filterCategory === 'all' ? '#65a30d' : '#e5e7eb',
                    color: filterCategory === 'all' ? 'white' : '#6b7280',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Semua
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setFilterCategory(cat.value)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      border: 'none',
                      background: filterCategory === cat.value ? cat.color : '#e5e7eb',
                      color: filterCategory === cat.value ? 'white' : '#6b7280',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {cat.icon} {cat.label.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#9ca3af'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>📭</div>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                  {filterCategory === 'all' ? 'Belum ada konten' : `Belum ada konten ${filterCategory}`}
                </p>
                <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
                  Mulai tambahkan konten baru!
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '16px', maxHeight: '700px', overflowY: 'auto', paddingRight: '8px' }}>
                {filteredItems.map(item => {
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
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: imageUrls.length === 1 ? '1fr' : 'repeat(auto-fill, minmax(100px, 1fr))',
                          gap: '8px',
                          marginBottom: '16px'
                        }}>
                          {imageUrls.slice(0, 5).map((url, idx) => (
                            <div key={idx} style={{ position: 'relative', aspectRatio: '1' }}>
                              <img 
                                src={url} 
                                alt={`${item.nama} ${idx + 1}`}
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
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '16px' }}>
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
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#1f2937'
                          }}>
                            {item.nama}
                          </h3>
                          {item.subtittle && (
                            <p style={{ 
                              margin: '0 0 8px 0', 
                              color: '#16a34a', 
                              fontSize: '14px', 
                              fontWeight: '600',
                              lineHeight: '1.4'
                            }}>
                              {item.subtittle}
                            </p>
                          )}
                          {item.deskripsi && (
                            <p style={{ 
                              margin: 0, 
                              color: '#6b7280', 
                              fontSize: '14px', 
                              lineHeight: '1.6'
                            }}>
                              {item.deskripsi}
                            </p>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
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
  )
}
