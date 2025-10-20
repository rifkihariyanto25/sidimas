'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function BudayaPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '80px' }}>
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', color: '#1f2937' }}>
            🎭 Budaya Banyumas
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280' }}>
            Halaman budaya sedang dalam pengembangan
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
