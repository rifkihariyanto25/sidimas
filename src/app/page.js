"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LogoLoop from "./components/LogoLoop";
import { supabase } from "@/lib/supabase";
// import { LogoLoop } from "react-bits";
import "swiper/css";
import "swiper/css/effect-fade";

export default function Home() {
  const [wisataSlides, setWisataSlides] = useState([]);
  const [kulinerSlides, setKulinerSlides] = useState([]);
  const [budayaSlides, setBudayaSlides] = useState([]);

  // Fetch data dari Supabase berdasarkan kategori
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔍 Fetching hero slides data...');
        
        // Fetch wisata - 4 terbaru berdasarkan kategori 'wisata'
        const { data: wisataData, error: wisataError } = await supabase
          .from("konten")
          .select("id, gambar_url")
          .eq("kategori", "wisata")
          .order("created_at", { ascending: false })
          .limit(4);

        console.log('📸 Wisata data:', wisataData);
        if (wisataError) console.error('❌ Wisata error:', wisataError);

        if (wisataData && !wisataError) {
          setWisataSlides(
            wisataData.map((item) => ({
              id: item.id,
              img: item.gambar_url,
              alt: 'Wisata Banyumas',
            }))
          );
        }

        // Fetch kuliner - 4 terbaru berdasarkan kategori 'kuliner'
        const { data: kulinerData, error: kulinerError } = await supabase
          .from("konten")
          .select("id, gambar_url")
          .eq("kategori", "kuliner")
          .order("created_at", { ascending: false })
          .limit(4);

        console.log('🍜 Kuliner data:', kulinerData);
        if (kulinerError) console.error('❌ Kuliner error:', kulinerError);

        if (kulinerData && !kulinerError) {
          setKulinerSlides(
            kulinerData.map((item) => ({
              id: item.id,
              img: item.gambar_url,
              alt: 'Kuliner Banyumas',
            }))
          );
        }

        // Fetch budaya - 4 terbaru berdasarkan kategori 'budaya'
        const { data: budayaData, error: budayaError } = await supabase
          .from("konten")
          .select("id, gambar_url")
          .eq("kategori", "budaya")
          .order("created_at", { ascending: false })
          .limit(4);

        if (budayaData && !budayaError && budayaData.length > 0) {
          setBudayaSlides(
            budayaData.map((item) => ({
              id: item.id,
              img: item.gambar_url,
              alt: 'Budaya Banyumas',
            }))
          );
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
              <p className="tracking-widest mb-2 uppercase text-sm">
                Ayo Jelajahi
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Wisata Banyumas.
              </h1>
              <p className="max-w-lg mb-6">
                Eksplorasi Keindahan Bumi Ngapak dari Lereng Gunung hingga Kota
              </p>
              {/* <a href="#" className="cta bg-lime-400 px-6 py-3 rounded-lg font-semibold hover:bg-lime-500 shadow-xl relative z-50 inline-block" style={{ filter: 'brightness(1.2) contrast(1.1)' }}>
                Mulai Jelajahi
              </a> */}
            </div>

            {/* LOGO LOOP WISATA */}
            {wisataSlides.length > 0 && (
              <div className="mini-slider">
                <LogoLoop
                  logos={wisataSlides
                    .filter((slide) => slide.img) // Filter hanya yang punya gambar
                    .map((slide) => ({
                      src: slide.img,
                      alt: slide.alt || 'Wisata Banyumas',
                      width: 120,
                      height: 90,
                    }))}
                  speed={60} // Kecepatan scroll
                  direction="left" // 'left' atau 'right'
                  logoHeight={90} // Tinggi logo
                  gap={24} // Jarak antar logo (diperbesar)
                  pauseOnHover={true} // Pause ketika hover
                  scaleOnHover={true} // Zoom ketika hover
                  ariaLabel="Wisata Banyumas"
                />
              </div>
            )}
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
              <p className="tracking-widest mb-2 uppercase text-sm">
                Coba Nikmati
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Kuliner Banyumas.
              </h1>
              <p className="max-w-lg mb-6">
                Mendoan hangat, sroto Sokaraja, hingga gethuk goreng yang bikin
                kangen!
              </p>
              {/* <a href="#" className="cta bg-lime-400 px-6 py-3 rounded-lg font-semibold hover:bg-lime-500 shadow-xl relative z-50 inline-block" style={{ filter: 'brightness(1.2) contrast(1.1)' }}>
                Jelajahi Kuliner
              </a> */}
            </div>

            {/* LOGO LOOP KULINER */}
            {kulinerSlides.length > 0 && (
              <div className="mini-slider">
                <LogoLoop
                  logos={kulinerSlides
                    .filter((slide) => slide.img) // Filter hanya yang punya gambar
                    .map((slide) => ({
                      src: slide.img,
                      alt: slide.alt || 'Kuliner Banyumas',
                      width: 120,
                      height: 90,
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
            )}
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
              <p className="tracking-widest mb-2 uppercase text-sm">
                Mari Lestarikan
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Budaya Banyumas.
              </h1>
              <p className="max-w-lg mb-6">
                Dari wayang kulit, jaranan, hingga kesenian tradisional yang
                memikat hati
              </p>
              {/* <a href="#" className="cta bg-lime-400 px-6 py-3 rounded-lg font-semibold hover:bg-lime-500 shadow-xl relative z-50 inline-block" style={{ filter: 'brightness(1.2) contrast(1.1)' }}>
                Kenali Budaya
              </a> */}
            </div>

            {/* LOGO LOOP BUDAYA */}
            {budayaSlides.length > 0 && (
              <div className="mini-slider">
                <LogoLoop
                  logos={budayaSlides
                    .filter((slide) => slide.img) // Filter hanya yang punya gambar
                    .map((slide) => ({
                      src: slide.img,
                      alt: slide.alt || 'Budaya Banyumas',
                      width: 120,
                      height: 90,
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
            )}
          </section>
        </SwiperSlide>
      </Swiper>

      {/* ✅ SECTION ABOUT (Timeline) */}
      <motion.section
        className="about relative py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, margin: "-100px" }}
      >
        {/* Background wayang/gamelan kiri kanan */}
        <motion.div
          className="wayang-left"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <img src="/ayang.png" alt="Gamelan Kiri" />
        </motion.div>

        <motion.div
          className="wayang-right"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <img src="/ayang.png" alt="Gamelan Kanan" />
        </motion.div>

        <motion.h2
          className="text-center text-3xl font-bold mb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
        >
          Alasan
        </motion.h2>
        <p className="text-center mb-12">
          Kenapa Kamu Harus Mengetahui Kekayaan{" "}
          <span className="text-lime-700 font-semibold">Banyumas</span>
        </p>

        <div className="timeline relative z-10">
          {/* Item kiri */}
          <motion.div
            className="timeline-item left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <span className="timeline-dot"></span>
            <div className="timeline-content">
              <h3>Pemandangan Pegunungan</h3>
              <p>
                Pemandangan pegunungan di Banyumas sangat memukau dan
                menenangkan. Udara segar dan pemandangan hijau membuat kita
                betah berlama-lama di sini.
              </p>
            </div>
            <div className="timeline-img-side">
              <img src="/IMG3.png" alt="Pemandangan Pegunungan" />
            </div>
          </motion.div>

          {/* Item kanan */}
          <motion.div
            className="timeline-item left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: false }}
          >
            <span className="timeline-dot"></span>
            <div className="timeline-img-side">
              <img src="/tariannnnn.jpg" alt="Budaya dan Tradisi" />
            </div>
            <div className="timeline-content">
              <h3>Budaya & Tradisi</h3>
              <p>
                Dari wayang kulit sampai upacara adat, Banyumas punya banyak
                kegiatan seru.
              </p>
            </div>
          </motion.div>

          {/* Item kiri */}
          <motion.div
            className="timeline-item left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <span className="timeline-dot"></span>
            <div className="timeline-content">
              <h3>Makanan Khas</h3>
              <p>
                Makanan khas Banyumas sangat beragam dan menggugah selera.
                Dari nasi goreng khas hingga sate, semua memiliki cita rasa
                yang unik dan lezat.
              </p>
            </div>
            <div className="timeline-img-side">
              <img src="/getuk.png" alt="Makanan Khas" />
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
        viewport={{ once: false, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <h2 className="text-3xl font-bold mb-2">
              Beragam Khas <span className="text-lime-600">Banyumas</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Lihat beragam ciri khas budaya Banyumas, mulai dari wisata,
              kuliner dan budaya
            </p>
          </motion.div>

         

          {/* Grid Layout */}
          <div className="grid">
            {/* Gambar 1 - Large (2x2) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false, margin: "-50px" }}
            >
              <span className="text-gray-600"></span>
            </motion.div>

            {/* Gambar 2 - Normal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false, margin: "-50px" }}
            >
              <span className="text-gray-600"></span>
            </motion.div>

            {/* Gambar 3 - Normal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: false, margin: "-50px" }}
            >
              <span className="text-gray-600"></span>
            </motion.div>

            {/* Gambar 4 - Normal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: false, margin: "-50px" }}
            >
              <span className="text-gray-600"></span>
            </motion.div>

            {/* Gambar 5 - Normal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: false, margin: "-50px" }}
            >
              <span className="text-gray-600"></span>
            </motion.div>

            {/* Gambar 6 - Wide (2x1) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: false, margin: "-50px" }}
            >
              <span className="text-gray-600"></span>
            </motion.div>

            {/* Gambar 7 - Normal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: false, margin: "-50px" }}
            >
              <span className="text-gray-600"></span>
            </motion.div>

            {/* Gambar 8 - Extra Large (2x2) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: false, margin: "-50px" }}
            >
              <span className="text-gray-600"></span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ✅ CTA SECTION */}
      <section className="cta py-20 bg-[url('/Group 3.png')] bg-cover bg-center text-center text-white relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Cari tahu kuliner, wisata, dan budaya menarik yang wajib kamu
            tahu...
          </h2>
          <a
            href="#"
            className="px-6 py-3 bg-lime-500 rounded-lg font-semibold hover:bg-lime-600 transition"
          >
            Mulai Jelajahi
          </a>
        </div>
      </section>

      {/* ✅ FOOTER HERO SECTION */}
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

      {/* ✅ FOOTER */}
      <Footer />
    </main>
  );
}
