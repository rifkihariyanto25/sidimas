'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Hardcoded credentials
const ADMIN_EMAIL = 'admin@gmail.com'
const ADMIN_PASSWORD = 'admin123'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulasi loading untuk efek modern
    await new Promise(resolve => setTimeout(resolve, 800))

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Simpan status login ke localStorage
      localStorage.setItem('sidimas_admin_logged_in', 'true')
      localStorage.setItem('sidimas_admin_email', email)
      
      // Redirect ke dashboard
      router.push('/admin')
    } else {
      setError('Email atau password salah!')
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '48px',
        maxWidth: '480px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Logo & Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            fontSize: '64px', 
            marginBottom: '16px',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
          }}>
            🔐
          </div>
          <h1 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '32px', 
            fontWeight: '800',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Admin Login
          </h1>
          <p style={{ 
            margin: 0, 
            color: '#6b7280', 
            fontSize: '15px' 
          }}>
            SIDimas Dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          {/* Email Input */}
          <div>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#374151',
              fontSize: '14px'
            }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '20px'
              }}>
                📧
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
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
          </div>

          {/* Password Input */}
          <div>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#374151',
              fontSize: '14px'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '20px'
              }}>
                🔒
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '14px 48px 14px 48px',
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '20px',
                  padding: 0
                }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              padding: '12px 16px',
              background: '#fee2e2',
              border: '2px solid #fecaca',
              borderRadius: '12px',
              color: '#dc2626',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
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
              opacity: isLoading ? 0.7 : 1,
              marginTop: '8px'
            }}
            onMouseEnter={(e) => !isLoading && (
              e.target.style.transform = 'translateY(-2px)',
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)'
            )}
            onMouseLeave={(e) => !isLoading && (
              e.target.style.transform = 'translateY(0)',
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)'
            )}
          >
            {isLoading ? '🔄 Memproses...' : '🚀 Login'}
          </button>
        </form>

        {/* Info Credentials */}
        <div style={{
          marginTop: '32px',
          padding: '16px',
          background: '#f3f4f6',
          borderRadius: '12px',
          fontSize: '13px'
        }}>
          <div style={{ fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            ℹ️ Demo Credentials:
          </div>
          <div style={{ color: '#6b7280', lineHeight: '1.6' }}>
            <div><strong>Email:</strong> admin@gmail.com</div>
            <div><strong>Password:</strong> admin123</div>
          </div>
        </div>
      </div>
    </div>
  )
}
