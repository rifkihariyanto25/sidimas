"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import "../wisata/wisata.css"; // IMPORT WISATA CSS UNTUK MAP SECTION
import "./budaya.css";
import "./new-layout.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "@/lib/supabase";

// Component for individual Budaya Section with new layout
function BudayaSection({ budaya, index, currentSection, sectionsRef }) {
  const sectionRef = useRef(null);
  const diamondRef = useRef(null);
  const sliderRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  // Debug log untuk melihat data yang masuk ke komponen
  useEffect(() => {
    console.log(`\n🎴 BudayaSection ${index} rendered:`, budaya.title);
    console.log("   sliderImages:", budaya.sliderImages);
    console.log("   sliderImages length:", budaya.sliderImages?.length);
    if (budaya.sliderImages && budaya.sliderImages.length > 0) {
      console.log("   First image URL:", budaya.sliderImages[0]);
    }
  }, [budaya, index]);

  // Slider state
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    if (!budaya.sliderImages || budaya.sliderImages.length === 0) {
      console.log(`⚠️ BudayaSection ${index}: No slider images!`);
      return;
    }

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % budaya.sliderImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [budaya.sliderImages, index]);

  // Sync slider scroll with active slide
  useEffect(() => {
    if (!sliderRef.current) return;
    const slideWidth = sliderRef.current.offsetWidth;
    sliderRef.current.scrollTo({
      left: activeSlide * slideWidth,
      behavior: "smooth",
    });
  }, [activeSlide]);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Snap to nearest slide
    if (!sliderRef.current) return;
    const slideWidth = sliderRef.current.offsetWidth;
    const newIndex = Math.round(sliderRef.current.scrollLeft / slideWidth);
    setActiveSlide(newIndex);
  };

  // Diamond hover scale animation - using CSS instead of GSAP
  // Removed GSAP dependency

  return (
    <motion.section
      ref={(el) => {
        sectionsRef.current[index] = el;
        sectionRef.current = el;
      }}
      className="budaya-section-new"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="budaya-container">
        {/* Header: Number + Title */}
        <motion.div
          className="budaya-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="budaya-number">#{budaya.number}</h3>
          <h2 className="budaya-title">
            Eksplor{" "}
            <span className="budaya-title-highlight">{budaya.title}</span>:
          </h2>
          <p className="budaya-subtitle">{budaya.subtitle}</p>
        </motion.div>

        {/* Ayana-Style Image Slider */}
        {budaya.sliderImages && budaya.sliderImages.length > 0 && (
          <motion.div
            className="budaya-slider-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div
              className="budaya-slider-container"
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              <div className="budaya-slider-track">
                {budaya.sliderImages.map((img, imgIdx) => (
                  <div
                    key={imgIdx}
                    className={`budaya-slider-slide ${
                      activeSlide === imgIdx ? "active" : ""
                    }`}
                  >
                    <Image
                      src={img || '/placeholder.jpg'}
                      alt={`${budaya.title} slider ${imgIdx + 1}`}
                      width={800}
                      height={600}
                      draggable={false}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        console.error(`❌ Failed to load image: ${img}`);
                        e.target.style.backgroundColor = '#f3f4f6';
                      }}
                      onLoad={() => {
                        console.log(`✅ Image loaded successfully: ${img?.substring(0, 50)}...`);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Dots */}
            <div className="budaya-slider-dots">
              {budaya.sliderImages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  className={`budaya-slider-dot ${
                    activeSlide === dotIdx ? "active" : ""
                  }`}
                  onClick={() => setActiveSlide(dotIdx)}
                  aria-label={`Slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* Custom Cursor for Slider */}
            <div className="budaya-slider-cursor">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 0L64 31.0588V32.9412L0 3.76471L1 0Z"></path>
                <path d="M1 64L64 32.9412V31.0588L0 60.2353L1 64Z"></path>
              </svg>
            </div>
          </motion.div>
        )}

        {/* Content Section: Diamond + Description */}
        <motion.div
          className="budaya-content-section"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Dashed Line Decoration (Horizontal - atas) */}
          <div className="dashed-line-decoration-horizontal"></div>

          {/* Dashed Line Decoration (Vertical - kiri) */}
          <div className="dashed-line-decoration-vertical"></div>

          {/* Description Text (Kiri) */}
          <motion.div
            className="content-description"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p>{budaya.description}</p>
          </motion.div>

          {/* Diamond Shape Image (Kanan Bawah) */}
          <motion.div
            className="content-diamond-image"
            ref={diamondRef}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.4 }}
          >
            <div className="diamond-shape">
              <Image
                src={budaya.images.diamond}
                alt={`${budaya.title} diamond`}
                width={400}
                height={400}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Fun Facts Section */}
        {budaya.funFact && (
          <motion.div
            className="budaya-funfact"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="funfact-icon">💡</div>
            <div className="funfact-content">
              <h4 className="funfact-title">Tahukah Kamu?</h4>
              <p className="funfact-text">{budaya.funFact}</p>
            </div>
          </motion.div>
        )}

        {/* Bottom Border Line */}
        <div className="budaya-divider"></div>
      </div>
    </motion.section>
  );
}

export default function BudayaPage() {
  const sectionsRef = useRef([]);
  const budayaWrapperRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [showDots, setShowDots] = useState(false);
  const [budayaData, setBudayaData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data budaya dari Supabase
  useEffect(() => {
    const fetchBudayaData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("konten_budaya") // Update: gunakan tabel baru
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching budaya data:", error);
        } else if (data) {
          console.log("🔍 Data budaya dari database:", data); // Debug log
          console.log("🔍 Jumlah data:", data.length);
          
          // Transform data dari database ke format yang dibutuhkan komponen
          const transformedData = data.map((item, index) => {
            console.log(`\n📦 Item ${index + 1}:`, item.nama);
            console.log("   gambar_url raw:", item.gambar_url);
            
            // Handle gambar_url - bisa jadi string (dengan separator |||) atau array
            let sliderImages = [];
            if (item.gambar_url) {
              // Cek apakah gambar_url berisi multiple URLs (dipisah |||)
              if (item.gambar_url.includes('|||')) {
                sliderImages = item.gambar_url.split('|||').map(url => url.trim()).filter(url => url);
                console.log("   ✅ Detected ||| separator, images:", sliderImages.length);
              } 
              // Cek apakah gambar_url berisi multiple URLs (dipisah koma - format lama)
              else if (item.gambar_url.includes(',')) {
                sliderImages = item.gambar_url.split(',').map(url => url.trim()).filter(url => url);
                console.log("   ✅ Detected , separator, images:", sliderImages.length);
              }
              // Cek apakah JSON array
              else if (item.gambar_url.startsWith('[')) {
                try {
                  sliderImages = JSON.parse(item.gambar_url);
                  console.log("   ✅ Detected JSON array, images:", sliderImages.length);
                } catch (e) {
                  sliderImages = [item.gambar_url];
                  console.log("   ⚠️ JSON parse failed, using single URL");
                }
              }
              // Single URL
              else {
                sliderImages = [item.gambar_url];
                console.log("   ✅ Single URL");
              }
            } else {
              console.log("   ⚠️ No gambar_url found!");
            }
            
            console.log("   📸 Final sliderImages:", sliderImages);
            console.log("   🖼️ First image:", sliderImages[0]);

            return {
              id: item.id,
              number: String(index + 1).padStart(2, "0"),
              title: item.nama,
              subtitle: item.subtittle || "",
              description: item.deskripsi || "",
              funFact: item.funfact || "", // Update: gunakan 'funfact' bukan 'fun_fact'
              sliderImages: sliderImages,
              images: {
                main: sliderImages[0] || "",
                secondary: sliderImages[1] || sliderImages[0] || "",
                diamond: sliderImages[2] || sliderImages[0] || "",
              },
            };
          });
          
          console.log("✅ Data transformed successfully!");
          console.log("📊 Total items:", transformedData.length);
          transformedData.forEach((item, idx) => {
            console.log(`   Item ${idx + 1}: ${item.title} - ${item.sliderImages.length} images`);
          });
          
          setBudayaData(transformedData);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBudayaData();
  }, []);

  const handleMarkerClick = (cardNumber) => {
    setActiveCard(cardNumber);
  };

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Track section changes with IntersectionObserver
  useEffect(() => {
    if (!isClient || sectionsRef.current.length === 0 || budayaData.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionsRef.current.findIndex(
            (section) => section === entry.target
          );
          if (index !== -1) {
            setCurrentSection(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [isClient, budayaData.length]);

  // Track if we're in budaya wrapper area (show/hide dots)
  useEffect(() => {
    if (!isClient || !budayaWrapperRef.current || budayaData.length === 0) return;

    const wrapperElement = budayaWrapperRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowDots(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.01,
      }
    );

    observer.observe(wrapperElement);

    return () => {
      observer.disconnect();
    };
  }, [isClient, budayaData.length]);

  // Loading state
  if (!isClient || loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fdfcf8",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #8b7355",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto",
            }}
          ></div>
          <p
            style={{
              marginTop: "1.5rem",
              color: "#8b7355",
              fontSize: "1.1rem",
              fontWeight: "500",
            }}
          >
            Memuat Halaman Budaya...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="budaya-page">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section
        className="hero-slide h-screen flex items-center justify-start relative text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/jaranan.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/25"></div>

        <div className="hero-content relative z-10 px-6 md:px-16 lg:px-24 max-w-3xl text-left">
          <p className="text-sm md:text-base italic mb-0.5 font-light tracking-wide">
            Lestarikan warisan leluhur,
          </p>
          <p className="text-sm md:text-base italic mb-6 font-light tracking-wide">
            jelajahi kekayaan budaya yang menginspirasi
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Budaya Banyumas.
          </h1>
        </div>
      </section>

      {/* CONTAINER SECTION - Menggunakan CSS Classes */}
      <motion.section 
        className="map-wrapper"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, margin: "-100px" }}
      >
        <div className="map-container-wrapper">
          {/* Header */}
          <motion.div 
            className="map-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <h1>
              Eksplor Kekayaan Budaya{" "}
              <span className="highlight">Banyumas</span>,
            </h1>
            <h2>Tradisi dan Warisan yang Memukau</h2>
          </motion.div>

          {/* Divider */}
          <motion.div 
            className="map-divider"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
          ></motion.div>

          {/* Intro Text */}
          <motion.div 
            className="map-intro-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: false }}
          >
            <p>
              Banyumas kaya akan warisan budaya yang unik dan memikat. Dari seni tari tradisional yang anggun hingga kerajinan tangan yang penuh makna, setiap aspek budaya menawarkan cerita dan filosofi mendalam. Jelajahi kesenian lokal yang masih lestari, kenali tradisi yang diwariskan turun-temurun, serta rasakan keramahan masyarakat yang menjaga nilai-nilai budaya dengan penuh kebanggaan.
            </p>
          </motion.div>

          {/* Section Title */}
          <motion.h2 
            className="map-section-title"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: false }}
          >Rekomendasi Budaya</motion.h2>

          {/* Map Section */}
          <div className="map-section">
            {/* Map Container */}
            <motion.div 
              className="map-container" 
              style={{ backgroundImage: "url('/peta.png')" }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: false }}
            >
              {/* Capital Marker */}
              <motion.div 
                className="capital-marker" 
                title="Banyumas Regency"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1, type: "spring", stiffness: 200 }}
                viewport={{ once: false }}
              ></motion.div>

              {/* Map Markers */}
              <motion.div 
                className="map-marker marker-1" 
                onMouseEnter={() => handleMarkerClick(1)} 
                onMouseLeave={() => setActiveCard(null)}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.2 }}
                viewport={{ once: false }}
              >1</motion.div>
              <motion.div 
                className="map-marker marker-2" 
                onMouseEnter={() => handleMarkerClick(2)} 
                onMouseLeave={() => setActiveCard(null)}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.2, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.2 }}
                viewport={{ once: false }}
              >2</motion.div>
              <motion.div 
                className="map-marker marker-3" 
                onMouseEnter={() => handleMarkerClick(3)} 
                onMouseLeave={() => setActiveCard(null)}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.3, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.2 }}
                viewport={{ once: false }}
              >3</motion.div>
              <motion.div 
                className="map-marker marker-4" 
                onMouseEnter={() => handleMarkerClick(4)} 
                onMouseLeave={() => setActiveCard(null)}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.4, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.2 }}
                viewport={{ once: false }}
              >4</motion.div>
              <motion.div 
                className="map-marker marker-5" 
                onMouseEnter={() => handleMarkerClick(5)} 
                onMouseLeave={() => setActiveCard(null)}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.5, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.2 }}
                viewport={{ once: false }}
              >5</motion.div>

              {/* Wave decorations */}
              <motion.svg 
                className="wave-decoration wave-left" 
                width="60" 
                height="30" 
                viewBox="0 0 60 30"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                viewport={{ once: false }}
              >
                <path d="M0,15 Q15,5 30,15 T60,15" stroke="#fff" fill="none" strokeWidth="2"/>
              </motion.svg>
              
              <motion.svg 
                className="wave-decoration wave-right" 
                width="60" 
                height="30" 
                viewBox="0 0 60 30"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.7 }}
                viewport={{ once: false }}
              >
                <path d="M0,15 Q15,5 30,15 T60,15" stroke="#fff" fill="none" strokeWidth="2"/>
              </motion.svg>
              
              <motion.svg 
                className="wave-decoration wave-bottom" 
                width="60" 
                height="30" 
                viewBox="0 0 60 30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                viewport={{ once: false }}
              >
                <path d="M0,15 Q15,5 30,15 T60,15" stroke="#fff" fill="none" strokeWidth="2"/>
              </motion.svg>
            </motion.div>

            {/* Info Cards */}
            <div className="info-cards-container">
              {/* Card 1 */}
              <motion.div 
                className={`info-card card-1 ${activeCard === 1 ? 'active' : ''}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.9 }}
                viewport={{ once: false }}
              >
                <div className="info-card-number" data-number="1">1</div>
                <h3>Lengger Banyumasan</h3>
                <p>Tarian tradisional khas Banyumas yang memadukan gerakan anggun dengan iringan gamelan yang merdu.</p>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                className={`info-card card-2 ${activeCard === 2 ? 'active' : ''}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 2.0 }}
                viewport={{ once: false }}
              >
                <div className="info-card-number" data-number="2">2</div>
                <h3>Calung Banyumasan</h3>
                <p>Alat musik bambu tradisional yang menghasilkan nada-nada merdu khas Banyumas.</p>
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                className={`info-card card-3 ${activeCard === 3 ? 'active' : ''}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 2.1 }}
                viewport={{ once: false }}
              >
                <div className="info-card-number" data-number="3">3</div>
                <h3>Begalan</h3>
                <p>Tradisi penyambutan pengantin dengan pertunjukan seni dan filosofi kehidupan yang mendalam.</p>
              </motion.div>

              {/* Card 4 */}
              <motion.div 
                className={`info-card card-4 ${activeCard === 4 ? 'active' : ''}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 2.2 }}
                viewport={{ once: false }}
              >
                <div className="info-card-number" data-number="4">4</div>
                <h3>Ebeg Banyumasan</h3>
                <p>Kesenian kuda lumping yang menampilkan tarian energik dengan unsur mistis dan spiritual.</p>
              </motion.div>

              {/* Card 5 */}
              <motion.div 
                className={`info-card card-5 ${activeCard === 5 ? 'active' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.3 }}
                viewport={{ once: false }}
              >
                <div className="info-card-number" data-number="5">5</div>
                <h3>Wayang Kulit Gagrag Banyumasan</h3>
                <p>Pertunjukan wayang kulit dengan gaya khas Banyumas yang sarat nilai filosofis.</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION SECTION - Keluar dari map-container-wrapper agar bisa mepet kanan */}
        <motion.div 
          className="description-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <div className="description-divider"></div>
          <h2 className="description-title">Lestarikan Budaya Banyumas</h2>
          <p className="description-text">
            Mulai dari kesenian tradisional yang memukau, filosofi hidup yang mendalam, hingga ritual adat yang penuh makna. Setiap aspek budaya Banyumas mencerminkan kearifan lokal yang diwariskan turun-temurun. Keunikan dialek ngapak, keramahan masyarakat, dan nilai-nilai gotong royong menjadikan Banyumas tempat yang istimewa untuk mengenal Indonesia lebih dalam. Mari bersama melestarikan dan menghargai warisan budaya yang tak ternilai ini.
          </p>
        </motion.div>
      </motion.section>

      {/* BUDAYA SECTIONS - AYANA STYLE WITH NEW LAYOUT */}
      <div className="ayana-budaya-wrapper" ref={budayaWrapperRef}>
        {/* Dots Navigation - Fixed Right */}
        <AnimatePresence>
          {isClient && budayaData && budayaData.length > 0 && showDots && (
            <motion.div 
              className="ayana-dots-nav"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {budayaData.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  className={`ayana-dot ${
                    currentSection === dotIdx ? "active" : ""
                  }`}
                  onClick={() => {
                    sectionsRef.current[dotIdx]?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  aria-label={`Go to section ${dotIdx + 1}`}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show message if no data */}
        {isClient && budayaData && budayaData.length === 0 && (
          <div style={{
            minHeight: '50vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 2rem',
            textAlign: 'center'
          }}>
            <div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                color: '#8b7355', 
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Belum Ada Data Budaya
              </h3>
              <p style={{ 
                color: '#666', 
                fontSize: '1rem' 
              }}>
                Silakan tambahkan data budaya melalui admin dashboard
              </p>
            </div>
          </div>
        )}

        {isClient &&
          budayaData &&
          budayaData.map((budaya, index) => (
            <BudayaSection
              key={budaya.id}
              budaya={budaya}
              index={index}
              currentSection={currentSection}
              sectionsRef={sectionsRef}
            />
          ))}
      </div>

      <Footer />
    </main>
  );
}
