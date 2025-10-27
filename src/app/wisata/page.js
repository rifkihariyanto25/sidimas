"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "@/lib/supabase";
import "./wisata.css";

// Component for individual Wisata Section with new layout
function WisataSection({ wisata, index, currentSection, sectionsRef }) {
  const sectionRef = useRef(null);
  const diamondRef = useRef(null);
  const sliderRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  // Slider state
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    if (!wisata.sliderImages || wisata.sliderImages.length === 0) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % wisata.sliderImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [wisata.sliderImages]);

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

  return (
    <motion.section
      ref={(el) => {
        sectionsRef.current[index] = el;
        sectionRef.current = el;
      }}
      className="wisata-section-new"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="wisata-container">
        {/* Header: Number + Title */}
        <motion.div
          className="wisata-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="wisata-number">#{wisata.number}</h3>
          <h2 className="wisata-title">
            Eksplor{" "}
            <span className="wisata-title-highlight">{wisata.title}</span>:
          </h2>
          <p className="wisata-subtitle">{wisata.subtitle}</p>
        </motion.div>

        {/* Ayana-Style Image Slider */}
        {wisata.sliderImages && wisata.sliderImages.length > 0 && (
          <motion.div
            className="wisata-slider-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div
              className="wisata-slider-container"
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              <div className="wisata-slider-track">
                {wisata.sliderImages.map((img, imgIdx) => (
                  <div
                    key={imgIdx}
                    className={`wisata-slider-slide ${
                      activeSlide === imgIdx ? "active" : ""
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${wisata.title} slider ${imgIdx + 1}`}
                      draggable="false"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Dots */}
            <div className="wisata-slider-dots">
              {wisata.sliderImages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  className={`wisata-slider-dot ${
                    activeSlide === dotIdx ? "active" : ""
                  }`}
                  onClick={() => setActiveSlide(dotIdx)}
                  aria-label={`Slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* Custom Cursor for Slider */}
            <div className="wisata-slider-cursor">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 0L64 31.0588V32.9412L0 3.76471L1 0Z"></path>
                <path d="M1 64L64 32.9412V31.0588L0 60.2353L1 64Z"></path>
              </svg>
            </div>
          </motion.div>
        )}

        {/* Content Section: Diamond + Description */}
        <motion.div
          className="wisata-content-section"
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
            <p>{wisata.description}</p>
          </motion.div>

          {/* Diamond Shape Image (Kanan Bawah) */}
          <motion.div
            className="content-diamond-image"
            ref={diamondRef}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.4 }}
          >
            <div className="diamond-shape">
              <img
                src={wisata.images.diamond}
                alt={`${wisata.title} diamond`}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="wisata-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* CTA Image */}
          <motion.div
            className="cta-image"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src={wisata.images.cta} alt={`${wisata.title} CTA`} />
          </motion.div>

          {/* CTA Content */}
          <div className="cta-content">
            <h4 className="cta-title">{wisata.ctaTitle}</h4>
            <p className="cta-description">{wisata.ctaDescription}</p>
          </div>

          {/* CTA Button */}
          <motion.a
            href={wisata.link}
            className="cta-button"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="cta-icon">◉</span>
            <span>{wisata.ctaButton}</span>
          </motion.a>
        </motion.div>

        {/* Bottom Border Line */}
        <div className="wisata-divider"></div>
      </div>
    </motion.section>
  );
}

export default function WisataPage() {
  const sectionsRef = useRef([]);
  const wisataWrapperRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDots, setShowDots] = useState(false);
  const [wisataData, setWisataData] = useState([]); // State untuk data dari database
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data wisata dari Supabase
  useEffect(() => {
    const fetchWisataData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("konten_wisata") // Tabel wisata
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching wisata data:", error);
        } else if (data) {
          console.log("🔍 Data wisata dari database:", data);
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
              funFact: item.funfact || "",
              sliderImages: sliderImages,
              images: {
                main: sliderImages[0] || "",
                secondary: sliderImages[1] || sliderImages[0] || "",
                diamond: sliderImages[2] || sliderImages[0] || "",
                cta: sliderImages[3] || sliderImages[0] || "",
              },
              // Default values untuk CTA
              ctaTitle: "Fun Fact",
              ctaDescription: item.funfact || item.deskripsi?.substring(0, 100) || "",
              ctaButton: "Lihat Detail",
              link: "#"
            };
          });
          
          console.log("✅ Data transformed successfully!");
          console.log("📊 Total items:", transformedData.length);
          transformedData.forEach((item, idx) => {
            console.log(`   Item ${idx + 1}: ${item.title} - ${item.sliderImages.length} images`);
          });
          
          setWisataData(transformedData);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWisataData();
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
    if (!isClient || sectionsRef.current.length === 0) return;

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
  }, [isClient]);

  // Track if we're in wisata wrapper area (show/hide dots)
  useEffect(() => {
    if (!isClient || !wisataWrapperRef.current) return;

    const wrapperElement = wisataWrapperRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowDots(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.01, // Trigger when even 1% of wrapper is visible
      }
    );

    observer.observe(wrapperElement);

    return () => {
      observer.disconnect();
    };
  }, [isClient]);

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
      <motion.section 
        className="map-wrapper bg-gray-50"
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
              Eksplor Berbagai Wisata <span className="highlight">Banyumas</span>,
            </h1>
            <h2>Curug dan Keindahan Lainnya</h2>
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
            <p>Banyumas menyimpan pesona alam dan budaya yang memikat hati. Dari deretan air terjun yang menyegarkan hingga panorama hijau yang menenangkan, setiap sudut menawarkan pengalaman wisata yang unik. Nikmati keindahan alamnya, jelajahi kawasan alam yang masih asri, dan temukan berbagai destinasi menarik lainnya mulai dari wisata keluarga, petualangan alam, hingga tempat-tempat bersejarah yang sarat cerita.</p>
          </motion.div>

          {/* Section Title */}
          <motion.h2 
            className="map-section-title"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: false }}
          >Rekomendasi Wisata</motion.h2>

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
                <h3>Baturraden</h3>
                <p>Destinasi wisata alam di kaki Gunung Slamet yang menawarkan kesejukan dan keindahan alam.</p>
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
                <h3>Manggala Ranch</h3>
                <p>Air terjun eksotis yang tersembunyi di tengah hutan dengan keindahan alam yang memukau</p>
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
                <h3>Menara Teratai</h3>
                <p>Danau tenang dengan suasana damai dan pemandangan asri yang menyejukkan hati</p>
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
                <h3>Cafe Serayu</h3>
                <p>Pusat kota dengan berbagai destinasi wisata menarik dan kuliner khas yang wajib dicoba</p>
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
                <h3>Kota Tua</h3>
                <p>Kota kecil dengan wisata alam yang mempesona dan udara sejuk pegunungan</p>
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
          <h2 className="description-title">Kunjungi Setiap Destinasi di Banyumas</h2>
          <p className="description-text">
            Mulai dari kesejukan pegunungan Baturraden, kejerniham air terjun alami, hingga keunikan tradisi dan kuliner lokal yang menggugah selera. Tak hanya keindahan alamnya, keramahan masyarakat dan kekayaan budaya yang masih terjaga menjadikan Banyumas tempat yang istimewa untuk dijelajahi. Baik untuk liburan keluarga, petualangan alam, maupun wisata sejarah, Banyumas selalu punya cerita menarik di setiap perjalanannya.
          </p>
        </motion.div>
      </motion.section>


      {/* WISATA SECTIONS - AYANA STYLE WITH NEW LAYOUT */}
      <section className="ayana-wisata-wrapper bg-white" ref={wisataWrapperRef}>
        {/* Dots Navigation - Fixed Right */}
        <AnimatePresence>
          {isClient && wisataData && wisataData.length > 0 && showDots && (
            <motion.div 
              className="ayana-dots-nav"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {wisataData.map((_, dotIdx) => (
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

        {isClient &&
          wisataData &&
          wisataData.map((wisata, index) => (
            <WisataSection
              key={wisata.id}
              wisata={wisata}
              index={index}
              currentSection={currentSection}
              sectionsRef={sectionsRef}
            />
          ))}
      </section>
      </main>
      <Footer />
    </>
  );
}