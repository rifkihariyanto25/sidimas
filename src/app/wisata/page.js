"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./wisata.css";

export default function WisataPage() {
  const [activeCard, setActiveCard] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMarkerClick = (cardNumber) => {
    setActiveCard(cardNumber);
  };

  // Data untuk slider wisata - semua gambar dalam satu array
  const wisataImages = [
    { id: 1, src: "/pemandangan.png", title: "Baturraden", subtitle: "Surga di Kaki Gunung Slamet" },
    { id: 2, src: "/manggala_ranch.jpg", title: "Manggala Ranch", subtitle: "Keindahan Alam yang Memukau" },
    { id: 3, src: "/IMG3.png", title: "Menara Teratai", subtitle: "Panorama Indah Banyumas" },
    { id: 4, src: "/IMG_5702 2.png", title: "Cafe Serayu", subtitle: "Tempat Bersantai di Tepi Sungai" },
    { id: 5, src: "/IMG_6806 1.png", title: "Kota Tua", subtitle: "Wisata Sejarah Banyumas" }
  ];

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <Navbar />
      <main className="wisata-page">
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
              <div className="map-marker marker-1" onMouseEnter={() => handleMarkerClick(1)} onMouseLeave={() => setActiveCard(null)}>1</div>
              <div className="map-marker marker-2" onMouseEnter={() => handleMarkerClick(2)} onMouseLeave={() => setActiveCard(null)}>2</div>
              <div className="map-marker marker-3" onMouseEnter={() => handleMarkerClick(3)} onMouseLeave={() => setActiveCard(null)}>3</div>
              <div className="map-marker marker-4" onMouseEnter={() => handleMarkerClick(4)} onMouseLeave={() => setActiveCard(null)}>4</div>
              <div className="map-marker marker-5" onMouseEnter={() => handleMarkerClick(5)} onMouseLeave={() => setActiveCard(null)}>5</div>

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
              <div className={`info-card card-1 ${activeCard === 1 ? 'active' : ''}`}>
                <div className="info-card-number" data-number="1">1</div>
                <h3>Baturraden</h3>
                <p>Destinasi wisata alam di kaki Gunung Slamet yang menawarkan kesejukan dan keindahan alam.</p>
              </div>

              {/* Card 2 */}
              <div className={`info-card card-2 ${activeCard === 2 ? 'active' : ''}`}>
                <div className="info-card-number" data-number="2">2</div>
                <h3>Manggala Ranch</h3>
                <p>Air terjun eksotis yang tersembunyi di tengah hutan dengan keindahan alam yang memukau</p>
              </div>

              {/* Card 3 */}
              <div className={`info-card card-3 ${activeCard === 3 ? 'active' : ''}`}>
                <div className="info-card-number" data-number="3">3</div>
                <h3>Menara Teratai</h3>
                <p>Danau tenang dengan suasana damai dan pemandangan asri yang menyejukkan hati</p>
              </div>

              {/* Card 4 */}
              <div className={`info-card card-4 ${activeCard === 4 ? 'active' : ''}`}>
                <div className="info-card-number" data-number="4">4</div>
                <h3>Cafe Serayu</h3>
                <p>Pusat kota dengan berbagai destinasi wisata menarik dan kuliner khas yang wajib dicoba</p>
              </div>

              {/* Card 5 */}
              <div className={`info-card card-5 ${activeCard === 5 ? 'active' : ''}`}>
                <div className="info-card-number" data-number="5">5</div>
                <h3>Kota Tua</h3>
                <p>Kota kecil dengan wisata alam yang mempesona dan udara sejuk pegunungan</p>
              </div>
            </div>
          </div>

        </div>

        {/* DESCRIPTION SECTION - Keluar dari map-container-wrapper agar bisa mepet kanan */}
        <div className="description-container">
          <div className="description-divider"></div>
          <h2 className="description-title">Kunjungi Setiap Destinasi di Banyumas</h2>
          <p className="description-text">
            Mulai dari kesejukan pegunungan Baturraden, kejerniham air terjun alami, hingga keunikan tradisi dan kuliner lokal yang menggugah selera. Tak hanya keindahan alamnya, keramahan masyarakat dan kekayaan budaya yang masih terjaga menjadikan Banyumas tempat yang istimewa untuk dijelajahi. Baik untuk liburan keluarga, petualangan alam, maupun wisata sejarah, Banyumas selalu punya cerita menarik di setiap perjalanannya.
          </p>
        </div>
      </section>

      {/* SLIDER SECTION */}
      <section className="slider-section">
        <div className="slider-container">
          {/* Nomor dan Judul */}
          <div className="slide-number">
            #{String(currentImageIndex + 1).padStart(2, '0')}
          </div>

          <div className="slide-header">
            <h2>Eksplor <span className="highlight-text">{wisataImages[currentImageIndex].title}:</span></h2>
            <h3>{wisataImages[currentImageIndex].subtitle}</h3>
          </div>

          {/* Frame dengan Gambar Utama (80%) dan Thumbnails (20%) */}
          <div className="slider-frame">
            {/* Gambar Utama (80%) */}
            <div className="main-image-container">
              <img 
                src={wisataImages[currentImageIndex].src} 
                alt={wisataImages[currentImageIndex].title}
                className="main-slide-image"
              />
            </div>

            {/* Thumbnails Preview (20%) */}
            <div className="thumbnails-container">
              {wisataImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`thumbnail-item ${currentImageIndex === index ? 'active' : ''}`}
                  onClick={() => handleImageClick(index)}
                >
                  <img src={image.src} alt={image.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}