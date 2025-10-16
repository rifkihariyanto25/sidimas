'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const STORAGE_KEY = 'sidimas_admin_contents'
const CATEGORIES = [
  { value: 'wisata', label: '🏞️ Wisata', icon: '🏞️', color: '#6366f1', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { value: 'kuliner', label: '🍜 Kuliner', icon: '🍜', color: '#f43f5e', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { value: 'budaya', label: '🎭 Budaya', icon: '🎭', color: '#f59e0b', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('wisata')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [filterCategory, setFilterCategory] = useState('all')
  const [adminEmail, setAdminEmail] = useState('')

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

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setItems(JSON.parse(raw))
      }
    } catch (e) {
      console.error('Gagal membaca localStorage:', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.error('Gagal menyimpan ke localStorage:', e)
    }
  }, [items])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    setIsLoading(true)
    
    // Simulasi loading untuk efek modern
    await new Promise(resolve => setTimeout(resolve, 300))

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      category,
      description: description.trim(),
      createdAt: new Date().toISOString(),
    }

    setItems(prev => [newItem, ...prev])
    
    setTitle('')
    setCategory('wisata')
    setDescription('')
    setIsLoading(false)
  }

  function handleDelete(id) {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const getCategoryData = (cat) => {
    return CATEGORIES.find(c => c.value === cat) || CATEGORIES[0]
  }

  const filteredItems = filterCategory === 'all' 
    ? items 
    : items.filter(item => item.category === filterCategory)

  const stats = CATEGORIES.map(cat => ({
    ...cat,
    count: items.filter(item => item.category === cat.value).length
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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            <h2 style={{ 
              margin: '0 0 24px 0',
              fontSize: '24px',
              fontWeight: '700',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              ✨ Tambah Konten Baru
            </h2>
            
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
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  opacity: isLoading ? 0.7 : 1
                }}
                onMouseEnter={(e) => !isLoading && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)')}
                onMouseLeave={(e) => !isLoading && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)')}
              >
                {isLoading ? '⏳ Menambahkan...' : '✨ Tambah Konten'}
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
                    background: filterCategory === 'all' ? '#667eea' : '#e5e7eb',
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
                  const catData = getCategoryData(item.category)
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
                            margin: '0 0 8px 0', 
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#1f2937'
                          }}>
                            {item.title}
                          </h3>
                          {item.description && (
                            <p style={{ 
                              margin: 0, 
                              color: '#6b7280', 
                              fontSize: '14px', 
                              lineHeight: '1.6'
                            }}>
                              {item.description}
                            </p>
                          )}
                        </div>
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
