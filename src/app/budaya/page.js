"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import "../wisata/wisata.css"; // IMPORT WISATA CSS UNTUK MAP SECTION
import "./budaya.css";
import "./new-layout.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import budayaData from "./budayaData";

// Component for individual Budaya Section with new layout
function BudayaSection({ budaya, index, currentSection, sectionsRef }) {
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
    if (!budaya.sliderImages || budaya.sliderImages.length === 0) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % budaya.sliderImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [budaya.sliderImages]);

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
      }}
      className="budaya-section-new"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="budaya-container" ref={sectionRef}>
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
                    <img
                      src={img}
                      alt={`${budaya.title} slider ${imgIdx + 1}`}
                      draggable="false"
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
              <img
                src={budaya.images.diamond}
                alt={`${budaya.title} diamond`}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="budaya-cta"
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
            <img src={budaya.images.cta} alt={`${budaya.title} CTA`} />
          </motion.div>

          {/* CTA Content */}
          <div className="cta-content">
            <h4 className="cta-title">{budaya.ctaTitle}</h4>
            <p className="cta-description">{budaya.ctaDescription}</p>
          </div>

          {/* CTA Button */}
          <motion.a
            href={budaya.link}
            className="cta-button"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="cta-icon">◉</span>
            <span>{budaya.ctaButton}</span>
          </motion.a>
        </motion.div>

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

  // Track if we're in budaya wrapper area (show/hide dots)
  useEffect(() => {
    if (!isClient || !budayaWrapperRef.current) return;

    const wrapperElement = budayaWrapperRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show dots when ANY part of wrapper is visible
        console.log("Wrapper intersecting:", entry.isIntersecting);
        setShowDots(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1, // Trigger when 10% of wrapper is visible
      }
    );

    observer.observe(wrapperElement);

    // Initial check - check if wrapper already visible on mount
    const rect = wrapperElement.getBoundingClientRect();
    const isInitiallyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    console.log("Initial wrapper visible:", isInitiallyVisible);
    setShowDots(isInitiallyVisible);

    return () => {
      observer.disconnect();
    };
  }, [isClient]);

  // Loading state
  if (!isClient) {
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
        style={{ backgroundImage: "url('/pemandangan.png')" }}
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
      <section className="map-wrapper">
        <div className="map-container-wrapper">
          {/* Header */}
          <div className="map-header">
            <h1>
              Eksplor Berbagai Budaya{" "}
              <span className="highlight">Banyumas</span>,
            </h1>
            <h2>Kesenian dan Tradisi Lestari</h2>
          </div>

          {/* Divider */}
          <div className="map-divider"></div>

          {/* Intro Text */}
          <div className="map-intro-text">
            <p>
              Banyumas kaya akan warisan budaya yang mengakar kuat dalam
              kehidupan masyarakatnya. Dari kesenian tradisional yang memukau
              hingga upacara adat yang penuh makna, setiap tradisi menawarkan
              pengalaman budaya yang unik. Nikmati pertunjukan seni yang
              memesona, jelajahi ritual adat yang masih lestari, dan temukan
              berbagai kekayaan budaya lainnya mulai dari kerajinan tangan,
              musik tradisional, hingga upacara adat yang sarat nilai-nilai
              luhur.
            </p>
          </div>

          {/* Section Title */}
          <h2 className="map-section-title">Rekomendasi Budaya</h2>

          {/* Map Section */}
          <div className="map-section">
            {/* Map Container */}
            <div
              className="map-container"
              style={{ backgroundImage: "url('/peta.png')" }}
            >
              {/* Capital Marker */}
              <div className="capital-marker" title="Banyumas Regency"></div>

              {/* Map Markers */}
              <div
                className="map-marker marker-1"
                onMouseEnter={() => handleMarkerClick(1)}
                onMouseLeave={() => setActiveCard(null)}
              >
                1
              </div>
              <div
                className="map-marker marker-2"
                onMouseEnter={() => handleMarkerClick(2)}
                onMouseLeave={() => setActiveCard(null)}
              >
                2
              </div>
              <div
                className="map-marker marker-3"
                onMouseEnter={() => handleMarkerClick(3)}
                onMouseLeave={() => setActiveCard(null)}
              >
                3
              </div>
              <div
                className="map-marker marker-4"
                onMouseEnter={() => handleMarkerClick(4)}
                onMouseLeave={() => setActiveCard(null)}
              >
                4
              </div>
              <div
                className="map-marker marker-5"
                onMouseEnter={() => handleMarkerClick(5)}
                onMouseLeave={() => setActiveCard(null)}
              >
                5
              </div>

              {/* Wave decorations */}
              <svg
                className="wave-decoration wave-left"
                width="60"
                height="30"
                viewBox="0 0 60 30"
              >
                <path
                  d="M0,15 Q15,5 30,15 T60,15"
                  stroke="#fff"
                  fill="none"
                  strokeWidth="2"
                />
              </svg>

              <svg
                className="wave-decoration wave-right"
                width="60"
                height="30"
                viewBox="0 0 60 30"
              >
                <path
                  d="M0,15 Q15,5 30,15 T60,15"
                  stroke="#fff"
                  fill="none"
                  strokeWidth="2"
                />
              </svg>

              <svg
                className="wave-decoration wave-bottom"
                width="60"
                height="30"
                viewBox="0 0 60 30"
              >
                <path
                  d="M0,15 Q15,5 30,15 T60,15"
                  stroke="#fff"
                  fill="none"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Info Cards - Desktop Layout */}
            <div className="hidden xl:block">
              {/* Card 1 */}
              <div
                className={`info-card card-1 ${
                  activeCard === 1 ? "active" : ""
                }`}
              >
                <div className="info-card-number" data-number="1">
                  1
                </div>
                <h3>Ebeg</h3>
                <p>
                  Tarian tradisional khas Banyumas yang menampilkan atraksi
                  mistis dengan menunggangi kuda kepang.
                </p>
              </div>

              {/* Card 2 */}
              <div
                className={`info-card card-2 ${
                  activeCard === 2 ? "active" : ""
                }`}
              >
                <div className="info-card-number" data-number="2">
                  2
                </div>
                <h3>Lengger</h3>
                <p>
                  Tarian tradisional yang dibawakan oleh penari laki-laki
                  berpakaian wanita dengan gerakan gemulai
                </p>
              </div>

              {/* Card 3 */}
              <div
                className={`info-card card-3 ${
                  activeCard === 3 ? "active" : ""
                }`}
              >
                <div className="info-card-number" data-number="3">
                  3
                </div>
                <h3>Calung</h3>
                <p>
                  Musik tradisional dari bambu yang menghasilkan nada merdu dan
                  harmonis khas Banyumas
                </p>
              </div>

              {/* Card 4 */}
              <div
                className={`info-card card-4 ${
                  activeCard === 4 ? "active" : ""
                }`}
              >
                <div className="info-card-number" data-number="4">
                  4
                </div>
                <h3>Begalan</h3>
                <p>
                  Tradisi penyambutan pengantin dengan pertunjukan seni yang
                  penuh makna dan filosofi
                </p>
              </div>

              {/* Card 5 */}
              <div
                className={`info-card card-5 ${
                  activeCard === 5 ? "active" : ""
                }`}
              >
                <div className="info-card-number" data-number="5">
                  5
                </div>
                <h3>Dialek Ngapak</h3>
                <p>
                  Bahasa khas Banyumas dengan logat yang unik dan menjadi
                  identitas kebudayaan masyarakat
                </p>
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

      {/* BUDAYA SECTIONS - AYANA STYLE WITH NEW LAYOUT */}
      <div className="ayana-budaya-wrapper" ref={budayaWrapperRef}>
        {/* Dots Navigation - Fixed Right */}
        {isClient && budayaData && budayaData.length > 0 && showDots && (
          <div className="ayana-dots-nav">
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
