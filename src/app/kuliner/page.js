"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "@/lib/supabase";
import "./kuliner.css";

function KulinerSection({ kuliner, index, currentSection, sectionsRef }) {
  const sectionRef = useRef(null);
  const diamondRef = useRef(null);
  const sliderRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (!kuliner.sliderImages || kuliner.sliderImages.length === 0) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % kuliner.sliderImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [kuliner.sliderImages]);

  useEffect(() => {
    if (!sliderRef.current) return;
    const slideWidth = sliderRef.current.offsetWidth;
    sliderRef.current.scrollTo({
      left: activeSlide * slideWidth,
      behavior: "smooth",
    });
  }, [activeSlide]);

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
      className="kuliner-section-new"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="kuliner-container">
        {/* Header: Number + Title */}
        <motion.div
          className="kuliner-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="kuliner-number">#{kuliner.number}</h3>
          <h2 className="kuliner-title">
            Eksplor{" "}
            <span className="kuliner-title-highlight">{kuliner.title}</span>:
          </h2>
          <p className="kuliner-subtitle">{kuliner.subtitle}</p>
        </motion.div>

        {/* Ayana-Style Image Slider */}
        {kuliner.sliderImages && kuliner.sliderImages.length > 0 && (
          <motion.div
            className="kuliner-slider-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div
              className="kuliner-slider-container"
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              <div className="kuliner-slider-track">
                {kuliner.sliderImages.map((img, imgIdx) => (
                  <div
                    key={imgIdx}
                    className={`kuliner-slider-slide ${
                      activeSlide === imgIdx ? "active" : ""
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${kuliner.title} slider ${imgIdx + 1}`}
                      draggable="false"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Dots */}
            <div className="kuliner-slider-dots">
              {kuliner.sliderImages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  className={`kuliner-slider-dot ${
                    activeSlide === dotIdx ? "active" : ""
                  }`}
                  onClick={() => setActiveSlide(dotIdx)}
                  aria-label={`Slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* Custom Cursor for Slider */}
            <div className="kuliner-slider-cursor">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 0L64 31.0588V32.9412L0 3.76471L1 0Z"></path>
                <path d="M1 64L64 32.9412V31.0588L0 60.2353L1 64Z"></path>
              </svg>
            </div>
          </motion.div>
        )}

        {/* Content Section: Diamond + Description */}
        <motion.div
          className="kuliner-content-section"
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
            <p>{kuliner.description}</p>
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
                src={kuliner.images.diamond}
                alt={`${kuliner.title} diamond`}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="kuliner-cta"
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
            <img src={kuliner.images.cta} alt={`${kuliner.title} CTA`} />
          </motion.div>

          {/* CTA Content */}
          <div className="cta-content">
            <h4 className="cta-title">{kuliner.ctaTitle}</h4>
            <p className="cta-description">{kuliner.ctaDescription}</p>
          </div>

          {/* CTA Button */}
          {/* <motion.a
            href={kuliner.link}
            className="cta-button"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="cta-icon">◉</span>
            <span>{kuliner.ctaButton}</span>
          </motion.a> */}
        </motion.div>

        {/* Bottom Border Line */}
        <div className="kuliner-divider"></div>
      </div>
    </motion.section>
  );
}

export default function KulinerPage() {
  const sectionsRef = useRef([]);
  const kulinerWrapperRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDots, setShowDots] = useState(false);
  const [kulinerData, setKulinerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKulinerData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("konten_kuliner")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching kuliner data:", error);
        } else if (data) {
          
          const transformedData = data.map((item, index) => {
            
            let sliderImages = [];
            if (item.gambar_url) {
              if (item.gambar_url.includes('|||')) {
                sliderImages = item.gambar_url.split('|||').map(url => url.trim()).filter(url => url);
              } 
              else if (item.gambar_url.includes(',')) {
                sliderImages = item.gambar_url.split(',').map(url => url.trim()).filter(url => url);
              }
              else if (item.gambar_url.startsWith('[')) {
                try {
                  sliderImages = JSON.parse(item.gambar_url);
                } catch (e) {
                  sliderImages = [item.gambar_url];
                }
              }
              else {
                sliderImages = [item.gambar_url];
              }
            } else {
            }
            

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
              ctaTitle: "Taukah Kamu?",
              ctaDescription: item.funfact || item.deskripsi?.substring(0, 100) || "",
            };
          });
          
          transformedData.forEach((item, idx) => {
          });
          
          setKulinerData(transformedData);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKulinerData();
  }, []);

  const handleMarkerClick = (cardNumber) => {
    setActiveCard(cardNumber);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || sectionsRef.current.length === 0 || kulinerData.length === 0) return;

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
  }, [isClient, kulinerData.length]);

  useEffect(() => {
    if (!isClient || !kulinerWrapperRef.current || kulinerData.length === 0) return;

    const wrapperElement = kulinerWrapperRef.current;

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
  }, [isClient, kulinerData.length]);

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

  if (!isClient || loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fdfcf8 0%, #f9f7f3 100%)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              border: "6px solid #f3f3f3",
              borderTop: "6px solid #ef4444",
              borderRadius: "50%",
              animation: "spin 1.2s ease-in-out infinite",
              margin: "0 auto",
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)",
            }}
          ></div>
          <p
            style={{
              marginTop: "2rem",
              color: "#ef4444",
              fontSize: "1.2rem",
              fontWeight: "600",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            Memuat Kuliner Banyumas...
          </p>
          <p
            style={{
              marginTop: "0.5rem",
              color: "#f87171",
              fontSize: "0.9rem",
              fontWeight: "400",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Mohon tunggu sebentar 🍜
          </p>
        </div>
      </div>
    );
  }

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
        


        {/* KULINER SECTIONS - AYANA STYLE WITH NEW LAYOUT */}
        <section className="ayana-kuliner-wrapper bg-white" ref={kulinerWrapperRef}>
          {/* Dots Navigation - Fixed Right */}
          <AnimatePresence>
            {isClient && kulinerData && kulinerData.length > 0 && showDots && (
              <motion.div 
                className="ayana-dots-nav"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {kulinerData.map((_, dotIdx) => (
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
          {isClient && kulinerData && kulinerData.length === 0 && (
            <div style={{
              minHeight: '60vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6rem 2rem',
              background: 'linear-gradient(135deg, #fdfcf8 0%, #f9f7f3 100%)'
            }}>
              <div style={{ 
                maxWidth: '500px',
                textAlign: 'center',
                background: 'white',
                padding: '4rem 3rem',
                borderRadius: '24px',
                boxShadow: '0 10px 40px rgba(239, 68, 68, 0.1)',
                border: '2px solid #fee2e2'
              }}>
                <div style={{ 
                  fontSize: '80px', 
                  marginBottom: '1.5rem'
                }}>
                  🍜
                </div>
                <h3 style={{ 
                  fontSize: '1.8rem', 
                  color: '#ef4444', 
                  marginBottom: '1rem',
                  fontWeight: '700',
                  fontFamily: "'Poppins', sans-serif"
                }}>
                  Belum Ada Data Kuliner
                </h3>
                <p style={{ 
                  color: '#dc2626', 
                  fontSize: '1.05rem',
                  lineHeight: '1.6',
                  marginBottom: '2rem'
                }}>
                  Data kuliner Banyumas sedang dalam proses kurasi. Silakan tambahkan melalui dashboard admin.
                </p>
              </div>
            </div>
          )}

          {isClient &&
            kulinerData &&
            kulinerData.map((kuliner, index) => (
              <KulinerSection
                key={kuliner.id}
                kuliner={kuliner}
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
