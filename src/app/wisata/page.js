"use client";

import Image from "next/image";
import Link from "next/link";
import "./wisata.css";

export default function WisataPage() {
  return (
    <main className="wisata-page">
      {/* NAVBAR */}
      <header className="navbar fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-16 py-4 z-50 bg-black/40 backdrop-blur-md text-white">
        <Link href="/" className="logo font-bold text-lg">SIDimas.</Link>
        <nav>
          <ul className="flex gap-6">
            <li><Link href="/">Beranda</Link></li>
            <li><Link href="/wisata" className="text-lime-400">Wisata</Link></li>
            <li><Link href="/kuliner">Kuliner</Link></li>
            <li><Link href="/budaya">Budaya</Link></li>
            <li><Link href="#">Kontribusi</Link></li>
          </ul>
        </nav>
        <div className="nav-actions flex gap-3">
          <Link href="#" className="login">Log in</Link>
          <Link href="#" className="signup bg-[#8FA31E] px-4 py-2 rounded-lg font-semibold hover:bg-[#7a8c1a]">Sign Up</Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section 
        className="hero-slide h-screen flex items-center justify-start relative text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/pemandangan.png')" }}
      >
        <div className="absolute inset-0 bg-black/25"></div>
        
        <div className="hero-content relative z-10 px-6 md:px-16 lg:px-24 max-w-3xl text-left">
          <p className="text-sm md:text-base italic mb-0.5 font-light tracking-wide">
            Nikmati pengalaman tak terlupakan,
          </p>
          <p className="text-sm md:text-base italic mb-6 font-light tracking-wide">
            jelajahi setiap keindahan yang memanjakan mata
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Wisata Banyumas.
          </h1>
        </div>
      </section>

      {/* CONTAINER SECTION - Menggunakan CSS Classes */}
      <section className="map-wrapper">
        <div className="map-container-wrapper">
          
          {/* Header */}
          <div className="map-header">
            <h1>
              Eksplor Berbagai Wisata <span className="highlight">Banyumas</span>,
            </h1>
            <h2>Curug dan Keindahan Lainnya</h2>
          </div>

          {/* Divider */}
          <div className="map-divider"></div>

          {/* Intro Text */}
          <div className="map-intro-text">
            <p>Banyumas menyimpan pesona alam dan budaya yang memikat hati. Dari deretan air terjun yang menyegarkan hingga panorama hijau yang menenangkan, setiap sudut menawarkan pengalaman wisata yang unik. Nikmati keindahan alamnya, jelajahi kawasan alam yang masih asri, dan temukan berbagai destinasi menarik lainnya mulai dari wisata keluarga, petualangan alam, hingga tempat-tempat bersejarah yang sarat cerita.</p>
          </div>

          {/* Section Title */}
          <h2 className="map-section-title">Rekomendasi Wisata</h2>

          {/* Map Section */}
          <div className="map-section">
            
            {/* Map Container */}
            <div className="map-container" style={{ backgroundImage: "url('/peta.png')" }}>
              
              {/* Capital Marker */}
              <div className="capital-marker" title="Banyumas Regency"></div>

              {/* Map Markers */}
              <div className="map-marker marker-1">1</div>
              <div className="map-marker marker-2">2</div>
              <div className="map-marker marker-3">3</div>
              <div className="map-marker marker-4">4</div>
              <div className="map-marker marker-5">5</div>

              {/* Wave decorations */}
              <svg className="wave-decoration wave-left" width="60" height="30" viewBox="0 0 60 30">
                <path d="M0,15 Q15,5 30,15 T60,15" stroke="#fff" fill="none" strokeWidth="2"/>
              </svg>
              
              <svg className="wave-decoration wave-right" width="60" height="30" viewBox="0 0 60 30">
                <path d="M0,15 Q15,5 30,15 T60,15" stroke="#fff" fill="none" strokeWidth="2"/>
              </svg>
              
              <svg className="wave-decoration wave-bottom" width="60" height="30" viewBox="0 0 60 30">
                <path d="M0,15 Q15,5 30,15 T60,15" stroke="#fff" fill="none" strokeWidth="2"/>
              </svg>
            </div>

            {/* Info Cards - Desktop Layout */}
            <div className="hidden xl:block">
              {/* Card 1 */}
              <div className="info-card card-1">
                <div className="info-card-number" data-number="1">1</div>
                <h3>Baturraden</h3>
                <p>Destinasi wisata alam di kaki Gunung Slamet yang menawarkan kesejukan dan keindahan alam.</p>
              </div>

              {/* Card 2 */}
              <div className="info-card card-2">
                <div className="info-card-number" data-number="2">2</div>
                <h3>Curug Cipendok</h3>
                <p>Air terjun eksotis yang tersembunyi di tengah hutan dengan keindahan alam yang memukau</p>
              </div>

              {/* Card 3 */}
              <div className="info-card card-3">
                <div className="info-card-number" data-number="3">3</div>
                <h3>Telaga Sunyi</h3>
                <p>Danau tenang dengan suasana damai dan pemandangan asri yang menyejukkan hati</p>
              </div>

              {/* Card 4 */}
              <div className="info-card card-4">
                <div className="info-card-number" data-number="4">4</div>
                <h3>Purwokerto</h3>
                <p>Pusat kota dengan berbagai destinasi wisata menarik dan kuliner khas yang wajib dicoba</p>
              </div>

              {/* Card 5 */}
              <div className="info-card card-5">
                <div className="info-card-number" data-number="5">5</div>
                <h3>Patikraja</h3>
                <p>Kota kecil dengan wisata alam yang mempesona dan udara sejuk pegunungan</p>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="xl:hidden mt-8 space-y-6">
              {/* {[
                { id: 1, name: "Baturraden", desc: "Destinasi wisata alam di kaki Gunung Slamet yang menawarkan kesejukan dan keindahan alam. Nikmati udara segar, pemandangan hijau, dan cuaca pegunungan yang menyegarkan." },
                { id: 2, name: "Curug Cipendok", desc: "Air terjun eksotis yang tersembunyi di tengah hutan dengan keindahan alam yang memukau" },
                { id: 3, name: "Telaga Sunyi", desc: "Danau tenang dengan suasana damai dan pemandangan asri yang menyejukkan hati" },
                { id: 4, name: "Purwokerto", desc: "Pusat kota dengan berbagai destinasi wisata menarik dan kuliner khas yang wajib dicoba" },
                { id: 5, name: "Patikraja", desc: "Kota kecil dengan wisata alam yang mempesona dan udara sejuk pegunungan" }
              ].map((item) => (
                <div key={item.id} className="mobile-card">
                  <div className="mobile-card-number">{item.id}</div>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#5a6b3a] text-white py-12 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">© 2025 SIDimas. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}