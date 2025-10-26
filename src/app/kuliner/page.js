"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./kuliner.css";

export default function KulinerPage() {
  const [activeCard, setActiveCard] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMarkerClick = (cardNumber) => {
    setActiveCard(cardNumber);
  };

  // Data untuk slider kuliner - semua gambar dalam satu array
  const kulinerImages = [
    { id: 1, src: "/Mendoan.png", title: "Mendoan", subtitle: "Tempe Goreng Khas Banyumas" },
    { id: 2, src: "/pemandangan.png", title: "Soto Sokaraja", subtitle: "Soto Daging Legendaris" },
    { id: 3, src: "/pemandangan.png", title: "Getuk Goreng", subtitle: "Camilan Manis Tradisional" },
    { id: 4, src: "/pemandangan.png", title: "Nasi Penggel", subtitle: "Nasi Komplit Khas Banyumas" },
    { id: 5, src: "/pemandangan.png", title: "Dawet Ayu", subtitle: "Minuman Segar Tradisional" }
  ];

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <Navbar />
      <main className="kuliner-page">
        {/* HERO SECTION */}
        <section 
          className="hero-slide h-screen flex items-center justify-start relative text-white bg-cover bg-center"
          style={{ backgroundImage: "url('/Mendoan.png')" }}
        >
          <div className="absolute inset-0 bg-black/25"></div>
          
          <div className="hero-content relative z-10 px-6 md:px-16 lg:px-24 max-w-3xl text-left">
            <p className="text-sm md:text-base italic mb-0.5 font-light tracking-wide">
              Rasakan cita rasa autentik,
            </p>
            <p className="text-sm md:text-base italic mb-6 font-light tracking-wide">
              jelajahi kelezatan kuliner khas yang memanjakan lidah
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Kuliner Banyumas.
            </h1>
          </div>
        </section>

        {/* CONTAINER SECTION - Menggunakan CSS Classes */}
        <section className="map-wrapper">
          <div className="map-container-wrapper">
            
            {/* Header */}
            <div className="map-header">
              <h1>
                Eksplor Berbagai Kuliner <span className="highlight">Banyumas</span>,
              </h1>
              <h2>Cita Rasa Tradisional yang Memanjakan</h2>
            </div>

            {/* Divider */}
            <div className="map-divider"></div>

            {/* Intro Text */}
            <div className="map-intro-text">
              <p>Banyumas menyimpan kekayaan kuliner tradisional yang menggugah selera. Dari mendoan yang renyah hingga soto sokaraja yang legendaris, setiap hidangan menawarkan cita rasa autentik yang unik. Nikmati kelezatan kuliner khasnya, jelajahi warung-warung tradisional, dan temukan berbagai makanan menarik lainnya mulai dari camilan ringan, makanan berat, hingga minuman segar yang menyegarkan.</p>
            </div>

            {/* Section Title */}
            <h2 className="map-section-title">Rekomendasi Kuliner</h2>

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
                  <h3>Mendoan</h3>
                  <p>Tempe goreng tipis khas Banyumas yang renyah dan gurih dengan bumbu yang khas.</p>
                </div>

                {/* Card 2 */}
                <div className={`info-card card-2 ${activeCard === 2 ? 'active' : ''}`}>
                  <div className="info-card-number" data-number="2">2</div>
                  <h3>Soto Sokaraja</h3>
                  <p>Soto daging legendaris dengan kuah bening yang segar dan daging yang empuk</p>
                </div>

                {/* Card 3 */}
                <div className={`info-card card-3 ${activeCard === 3 ? 'active' : ''}`}>
                  <div className="info-card-number" data-number="3">3</div>
                  <h3>Getuk Goreng</h3>
                  <p>Camilan manis dari singkong yang digoreng dengan gula merah yang legit</p>
                </div>

                {/* Card 4 */}
                <div className={`info-card card-4 ${activeCard === 4 ? 'active' : ''}`}>
                  <div className="info-card-number" data-number="4">4</div>
                  <h3>Nasi Penggel</h3>
                  <p>Nasi komplit dengan lauk pauk tradisional yang kaya rasa dan mengenyangkan</p>
                </div>

                {/* Card 5 */}
                <div className={`info-card card-5 ${activeCard === 5 ? 'active' : ''}`}>
                  <div className="info-card-number" data-number="5">5</div>
                  <h3>Dawet Ayu</h3>
                  <p>Minuman segar tradisional dengan santan, gula merah, dan cendol yang manis</p>
                </div>
              </div>
            </div>

          </div>

          {/* DESCRIPTION SECTION */}
          <div className="description-container">
            <div className="description-divider"></div>
            <h2 className="description-title">Nikmati Setiap Kelezatan Kuliner Banyumas</h2>
            <p className="description-text">
              Mulai dari mendoan yang renyah, soto sokaraja yang legendaris, hingga dawet ayu yang menyegarkan. Tak hanya kelezatannya, keunikan bumbu dan cara pengolahan tradisional yang masih terjaga menjadikan kuliner Banyumas cita rasa yang istimewa untuk dicoba. Baik untuk sarapan, makan siang, camilan sore, maupun pencuci mulut, Banyumas selalu punya hidangan lezat di setiap waktu.
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
              <h2>Eksplor <span className="highlight-text">{kulinerImages[currentImageIndex].title}:</span></h2>
              <h3>{kulinerImages[currentImageIndex].subtitle}</h3>
            </div>

            {/* Frame dengan Gambar Utama (80%) dan Thumbnails (20%) */}
            <div className="slider-frame">
              {/* Gambar Utama (80%) */}
              <div className="main-image-container">
                <img 
                  src={kulinerImages[currentImageIndex].src} 
                  alt={kulinerImages[currentImageIndex].title}
                  className="main-slide-image"
                />
              </div>

              {/* Thumbnails Preview (20%) */}
              <div className="thumbnails-container">
                {kulinerImages.map((image, index) => (
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
