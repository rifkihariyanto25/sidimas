"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LogoLoop from "./components/LogoLoop";
// import { LogoLoop } from "react-bits";
import "swiper/css";
import "swiper/css/effect-fade";

export default function Home() {
  const wisataSlides = [
    // { id: 1, img: "/IMG_6806 1.png", alt: "Pantai" },
    { id: 2, img: "/IMG_5702 2.png", alt: "Gunung" },
    { id: 3, img: "/IMG_7236 3.png", alt: "Air Terjun" },
    { id: 4, img: "/IMG3.png", alt: "Pemandangan" },
  ];

  const kulinerSlides = [
    { id: 1, img: "/Mendoan.png", alt: "Mendoan" },
    { id: 2, img: "/IMG3.png", alt: "Sroto Sokaraja" },
    { id: 3, img: "/IMG_6806 1.png", alt: "Gethuk Goreng" },
    // { id: 4, img: "/IMG3.png", alt: "Pemandangan" },
  ];

  const budayaSlides = [
    { id: 1, img: "/jaranan.jpeg", alt: "Jaranan" },
    // { id: 2, img: "/ayang.png", alt: "Wayang Kulit" },
    { id: 3, img: "/IMG3.png", alt: "Kesenian Tradisional" },
    { id: 4, img: "/pemandangan.png", alt: "Upacara Adat" },
  ];

  return (
    <main>
      {/* ✅ NAVBAR */}
      <Navbar />

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
            <div className="absolute inset-0 bg-black/25"></div>
            <div className="hero-content relative z-10 px-6 md:px-16">
              <p className="tracking-widest mb-2 uppercase text-sm">Ayo Jelajahi</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Wisata Banyumas.</h1>
              <p className="max-w-lg mb-6">
                Eksplorasi Keindahan Bumi Ngapak dari Lereng Gunung hingga Kota
              </p>
              <a href="#" className="cta bg-lime-400 px-6 py-3 rounded-lg font-semibold hover:bg-lime-500 opacity-100 brightness-110">
                Mulai Jelajahi
              </a>
            </div>

            {/* LOGO LOOP WISATA */}
           <div className="mini-slider">
            <LogoLoop
              logos={wisataSlides.map(slide => ({
                src: slide.img,
                alt: slide.alt,
                width: 120,
                height: 90
              }))}
              speed={60}           // Kecepatan scroll
              direction="left"     // 'left' atau 'right'
              logoHeight={90}      // Tinggi logo
              gap={24}             // Jarak antar logo (diperbesar)
              pauseOnHover={true}  // Pause ketika hover
              scaleOnHover={true}  // Zoom ketika hover
              ariaLabel="Wisata Banyumas"
            />
          </div>
          </section>
        </SwiperSlide>

        {/* SLIDE 2: KULINER */}
        <SwiperSlide>
          <section
            className="hero-slide h-screen flex items-center relative text-white bg-cover bg-center"
            style={{ backgroundImage: "url('/Mendoan.png')" }}
          >
            <div className="absolute inset-0 bg-black/25"></div>
            <div className="hero-content relative z-10 px-6 md:px-16">
              <p className="tracking-widest mb-2 uppercase text-sm">Coba Nikmati</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Kuliner Banyumas.</h1>
              <p className="max-w-lg mb-6">
                Mendoan hangat, sroto Sokaraja, hingga gethuk goreng yang bikin kangen!
              </p>
              <a href="#" className="cta bg-lime-400 px-6 py-3 rounded-lg font-semibold hover:bg-lime-500 opacity-100 brightness-110">
                Jelajahi Kuliner
              </a>
            </div>

            {/* LOGO LOOP KULINER */}
            <div className="mini-slider">
              <LogoLoop
                logos={kulinerSlides.map(slide => ({
                  src: slide.img,
                  alt: slide.alt,
                  width: 120,
                  height: 90
                }))}
                speed={60}
                direction="left"
                logoHeight={90}
                gap={24}
                pauseOnHover={true}
                scaleOnHover={true}
                ariaLabel="Kuliner Banyumas"
              />
            </div>
          </section>
        </SwiperSlide>

        {/* SLIDE 3: BUDAYA */}
        <SwiperSlide>
          <section
            className="hero-slide h-screen flex items-center relative text-white bg-cover bg-center"
            style={{ backgroundImage: "url('/jaranan.jpeg')" }}
          >
            <div className="absolute inset-0 bg-black/25"></div>
            <div className="hero-content relative z-10 px-6 md:px-16">
              <p className="tracking-widest mb-2 uppercase text-sm">Mari Lestarikan</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Budaya Banyumas.</h1>
              <p className="max-w-lg mb-6">
                Dari wayang kulit, jaranan, hingga kesenian tradisional yang memikat hati
              </p>
              <a href="#" className="cta bg-lime-400 px-6 py-3 rounded-lg font-semibold hover:bg-lime-500 opacity-100 brightness-110">
                Kenali Budaya
              </a>
            </div>

            {/* LOGO LOOP BUDAYA */}
            <div className="mini-slider">
              <LogoLoop
                logos={budayaSlides.map(slide => ({
                  src: slide.img,
                  alt: slide.alt,
                  width: 120,
                  height: 90
                }))}
                speed={60}
                direction="left"
                logoHeight={90}
                gap={24}
                pauseOnHover={true}
                scaleOnHover={true}
                ariaLabel="Budaya Banyumas"
              />
            </div>
          </section>
        </SwiperSlide>
      </Swiper>

      {/* ✅ SECTION ABOUT (Timeline) */}
 <motion.section 
   className="about relative py-16"
   initial={{ opacity: 0, y: 50 }}
   whileInView={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.8 }}
   viewport={{ once: true, margin: "-100px" }}
 >

  {/* Background wayang/gamelan kiri kanan */}
  <motion.div 
    className="wayang-left"
    initial={{ x: -100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 0.4 }}
    transition={{ duration: 1, delay: 0.3 }}
    viewport={{ once: true }}
  >
    <img src="/ayang.png" alt="Gamelan Kiri" />
  </motion.div>

  <motion.div 
    className="wayang-right"
    initial={{ x: 100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 0.4 }}
    transition={{ duration: 1, delay: 0.3 }}
    viewport={{ once: true }}
  >
    <img src="/ayang.png" alt="Gamelan Kanan" />
  </motion.div>

  <motion.h2 
    className="text-center text-3xl font-bold mb-2"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    viewport={{ once: true }}
  >
    Alasan
  </motion.h2>
  <p className="text-center mb-12">
    Kenapa Kamu Harus Mengetahui Kekayaan <span className="text-lime-700 font-semibold">Banyumas</span>
  </p>

  <div className="timeline relative z-10">
    {/* Item kiri */}
    <motion.div 
      className="timeline-item left"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
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
    </motion.div>

    {/* Item kanan */}
    <motion.div 
      className="timeline-item left"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
    >
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
    </motion.div>
  </div>
</motion.section>



      {/* ✅ SECTION BERAGAM KHAS */}
<motion.section 
  className="khas py-20 px-6 md:px-16 bg-gray-50 text-black"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true, margin: "-100px" }}
>
  <div className="max-w-6xl mx-auto">
    <motion.div 
      className="text-center mb-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-2">
        Beragam Khas <span className="text-lime-600">Banyumas</span>
      </h2>
      <p className="text-gray-600 mb-6">
        Lihat beragam ciri khas budaya Banyumas, mulai dari wisata, kuliner dan budaya
      </p>
    </motion.div>
    
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
        <span className="text-gray-600"></span>
      </div>
      
      {/* Gambar 2 - Normal */}
      <div>
        <span className="text-gray-600"></span>
      </div>
      
      {/* Gambar 3 - Normal */}
      <div>
        <span className="text-gray-600"></span>
      </div>
      
      {/* Gambar 4 - Normal */}
      <div>
        <span className="text-gray-600"></span>
      </div>
      
      {/* Gambar 5 - Normal */}
      <div>
        <span className="text-gray-600"></span>
      </div>
      
      {/* Gambar 6 - Wide (2x1) */}
      <div>
        <span className="text-gray-600"></span>
      </div>
      
      {/* Gambar 7 - Normal */}
      <div>
        <span className="text-gray-600"></span>
      </div>
      
      {/* Gambar 8 - Extra Large (2x2) */}
      <div>
        <span className="text-gray-600"></span>
      </div>
    </div>
  </div>
</motion.section>

      {/* ✅ CTA SECTION */}
      <section className="cta py-20 bg-[url('/Group 3.png')] bg-cover bg-center text-center text-white relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Cari tahu kuliner, wisata, dan budaya menarik yang wajib kamu tahu...
          </h2>
          <a href="#" className="px-6 py-3 bg-lime-500 rounded-lg font-semibold hover:bg-lime-600 transition">
            Mulai Jelajahi
          </a>
        </div>
      </section>

      {/* ✅ FOOTER */}
      <Footer />
    </main>
  );
}
