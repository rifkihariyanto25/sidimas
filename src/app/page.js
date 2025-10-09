"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default function Home() {
  const wisataSlides = [
    { id: 1, img: "/IMG_6806 1.png", alt: "Pantai" },
    { id: 2, img: "/IMG_5702 2.png", alt: "Gunung" },
    { id: 3, img: "/IMG_7236 3.png", alt: "Air Terjun" },
    { id: 4, img: "/IMG3.png", alt: "Pemandangan" },
  ];

  const kulinerSlides = [
    { id: 1, img: "/Mendoan.png", alt: "Mendoan" },
    { id: 2, img: "/IMG3.png", alt: "Sroto Sokaraja" },
    { id: 3, img: "/IMG_6806 1.png", alt: "Gethuk Goreng" },
    { id: 4, img: "/IMG3.png", alt: "Pemandangan" },
  ];

  return (
    <main>
      {/* ✅ NAVBAR */}
      <header className="navbar fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-16 py-4 z-50 bg-black/40 backdrop-blur-md text-white">
        <div className="logo font-bold text-lg">SIDimas.</div>
        <nav>
          <ul className="flex gap-6">
            <li><a href="#">Beranda</a></li>
            <li><a href="#">Wisata</a></li>
            <li><a href="#">Kuliner</a></li>
            <li><a href="#">Budaya</a></li>
            <li><a href="#">Kontribusi</a></li>
          </ul>
        </nav>
        <div className="nav-actions flex gap-3">
          <a href="#" className="login">Log in</a>
          <a href="#" className="signup bg-lime-600 px-4 py-2 rounded-lg font-semibold hover:bg-lime-700">Sign Up</a>
        </div>
      </header>

      {/* ✅ HERO SLIDER */}
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={2500}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="hero-slider"
      >
        {/* SLIDE 1: WISATA */}
        <SwiperSlide>
          <section
            className="hero-slide h-screen flex items-center relative text-white bg-cover bg-center"
            style={{ backgroundImage: "url('/pemandangan.png')" }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="hero-content relative z-10 px-6 md:px-16">
              <p className="tracking-widest mb-2 uppercase text-sm">Ayo Jelajahi</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Wisata Banyumas.</h1>
              <p className="max-w-lg mb-6">
                Eksplorasi Keindahan Bumi Ngapak dari Lereng Gunung hingga Kota
              </p>
              <a href="#" className="cta bg-lime-600 px-6 py-3 rounded-lg font-semibold hover:bg-lime-700">
                Mulai Jelajahi
              </a>
            </div>

            {/* MINI SLIDER WISATA */}
            <div className="mini-slider">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={12}
                slidesPerView={3}
                loop={true}
                loopAdditionalSlides={2}
                centeredSlides={false}
                autoplay={{ 
                  delay: 2500, 
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true 
                }}
                speed={800}
              >
                {wisataSlides.map((s) => (
                  <SwiperSlide key={s.id}>
                    <Image 
                      src={s.img} 
                      alt={s.alt} 
                      width={180} 
                      height={140} 
                      style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        </SwiperSlide>

        {/* SLIDE 2: KULINER */}
        <SwiperSlide>
          <section
            className="hero-slide h-screen flex items-center relative text-white bg-cover bg-center"
            style={{ backgroundImage: "url('/Mendoan.png')" }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="hero-content relative z-10 px-6 md:px-16">
              <p className="tracking-widest mb-2 uppercase text-sm">Coba Nikmati</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Kuliner Banyumas.</h1>
              <p className="max-w-lg mb-6">
                Mendoan hangat, sroto Sokaraja, hingga gethuk goreng yang bikin kangen!
              </p>
              <a href="#" className="cta bg-lime-600 px-6 py-3 rounded-lg font-semibold hover:bg-lime-700">
                Jelajahi Kuliner
              </a>
            </div>

            {/* MINI SLIDER KULINER */}
            <div className="mini-slider">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={12}
                slidesPerView={3}
                loop={true}
                loopAdditionalSlides={2}
                centeredSlides={false}
                autoplay={{ 
                  delay: 2500, 
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true 
                }}
                speed={800}
              >
                {kulinerSlides.map((s) => (
                  <SwiperSlide key={s.id}>
                    <Image 
                      src={s.img} 
                      alt={s.alt} 
                      width={180} 
                      height={140} 
                      style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>

      {/* ✅ SECTION ABOUT (Timeline) */}
 <section className="about relative py-16">

  {/* Background wayang/gamelan kiri kanan */}
  <div className="wayang-left">
    <img src="/ayang.png" alt="Gamelan Kiri" />
  </div>

  <div className="wayang-right">
    <img src="/ayang.png" alt="Gamelan Kanan" />
  </div>

  <h2 className="text-center text-3xl font-bold mb-2">Alasan</h2>
  <p className="text-center mb-12">
    Kenapa Kamu Harus Mengetahui Kekayaan <span className="text-lime-700 font-semibold">Banyumas</span>
  </p>

  <div className="timeline relative z-10">
    {/* Item kiri */}
    <div className="timeline-item left">
      <span className="timeline-dot"></span>
      <div className="timeline-content">
        <h3>Bahasa Banyumasan</h3>
        <p>
          Bahasa Banyumasan itu unik banget dan punya ciri khas sendiri. Tau bahasanya bikin kita lebih dekat sama warga lokal.
        </p>
      </div>
      <div className="timeline-img-side">
        <img src="/IMG3.png" alt="Bahasa Banyumasan" />
      </div>
    </div>

    {/* Item kanan */}
    <div className="timeline-item left">
      <span className="timeline-dot"></span>
      <div className="timeline-img-side">
        <img src="/jaranan.jpeg" alt="Budaya dan Tradisi" />
      </div>
      <div className="timeline-content">
        <h3>Budaya & Tradisi</h3>
        <p>
          Dari wayang kulit sampai upacara adat, Banyumas punya banyak kegiatan seru.
        </p>
      </div>
    </div>
  </div>
</section>



      {/* ✅ SECTION BERAGAM KHAS */}
<section className="khas py-20 px-6 md:px-16 bg-gray-50 text-black">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-4">
      <h2 className="text-3xl font-bold mb-2">
        Beragam Khas <span className="text-lime-600">Banyumas</span>
      </h2>
      <p className="text-gray-600 mb-6">
        Lihat beragam ciri khas budaya Banyumas, mulai dari wisata, kuliner dan budaya
      </p>
    </div>
    
    {/* Tab Navigation */}
    <div className="tab-buttons">
      <button className="px-6 py-2 bg-lime-600 text-white rounded-full font-medium">
        Semua
      </button>
      <button className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium hover:bg-lime-50">
        Wisata
      </button>
      <button className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium hover:bg-lime-50">
        Kuliner
      </button>
      <button className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium hover:bg-lime-50">
        Budaya
      </button>
    </div>

    {/* Grid Layout */}
    <div className="grid">
      {/* Gambar 1 - Large (2x2) */}
      <div>
        <span className="text-gray-600">gambar 1</span>
      </div>
      
      {/* Gambar 2 - Normal */}
      <div>
        <span className="text-gray-600">gambar 2</span>
      </div>
      
      {/* Gambar 3 - Normal */}
      <div>
        <span className="text-gray-600">gambar 3</span>
      </div>
      
      {/* Gambar 4 - Normal */}
      <div>
        <span className="text-gray-600">gambar 4</span>
      </div>
      
      {/* Gambar 5 - Normal */}
      <div>
        <span className="text-gray-600">gambar 5</span>
      </div>
      
      {/* Gambar 6 - Wide (2x1) */}
      <div>
        <span className="text-gray-600">gambar 6</span>
      </div>
      
      {/* Gambar 7 - Normal */}
      <div>
        <span className="text-gray-600">gambar 7</span>
      </div>
      
      {/* Gambar 8 - Extra Large (2x2) */}
      <div>
        <span className="text-gray-600">gambar 8</span>
      </div>
    </div>
  </div>
</section>

      {/* ✅ CTA SECTION */}
      <section className="cta py-20 bg-[url('/Group 3.png')] bg-cover bg-center text-center text-white relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Cari tahu kuliner, wisata, dan budaya menarik yang wajib kamu tahu...
          </h2>
          <a href="#" className="px-6 py-3 bg-lime-600 rounded-lg font-semibold hover:bg-lime-700 transition">
            Mulai Jelajahi
          </a>
        </div>
      </section>

      {/* ✅ FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-container">
            {/* Hero Section dengan Animasi */}
            <div className="footer-hero">
              <div className="footer-character">
                <Image 
                  src="/Group 86.png" 
                  alt="Banyumas Character" 
                  width={300} 
                  height={400}
                  className="character-img"
                />
              </div>
              <div className="footer-hero-text">
                <h2>
                  <span className="text-lime-400">Ayo Kunjungi</span><br />
                  DAN JELAJAHI BANYUMAS
                </h2>
                <p>Be an explorer and experience the beauty of diversity in Banyumas.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links - Full Width Section */}
        <div className="footer-links">
          <div className="footer-links-container">
              {/* About Sidimas */}
              <div className="footer-col">
                <h3>Sidimas</h3>
                <p>
                  SIDIMAS hadir sebagai solusi inovatif untuk menjawab kebutuhan masyarakat Banyumas akan layanan informasi yang praktis, mudah diakses, dan mendukung terwujudnya informasi berbasis digital.
                </p>
                <div className="social-icons">
                  <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i>F</a>
                  <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i>I</a>
                  <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i>Y</a>
                </div>
              </div>

              {/* Navigasi */}
              <div className="footer-col">
                <h3>Navigasi</h3>
                <ul>
                  <li><a href="#">Beranda</a></li>
                  <li><a href="#">Wisata</a></li>
                  <li><a href="#">Kuliner</a></li>
                  <li><a href="#">Budaya</a></li>
                </ul>
              </div>

              {/* Hubungi Kami */}
            {/* Hubungi Kami */}
            <div className="footer-col">
              <h3>Hubungi Kami</h3>
              <ul>
                <li>
                  <span>📍</span> Jl. Bojong Lengkong, Kabupaten Tegal, Jawa Tengah
                </li>
                <li>
                  <span>📞</span> +6285222555212
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© 2025 Azkal Jaya Las. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
