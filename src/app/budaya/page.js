"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import "./budaya.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Komponen Section untuk menghindari error hooks
function BudayaSection({
  budaya,
  index,
  currentSection,
  sectionsRef,
  activeSlide,
  setActiveSlide,
}) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <motion.section
      ref={(el) => {
        sectionsRef.current[index] = el;
      }}
      className="ayana-budaya-section-new"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="ayana-section-container" ref={sectionRef}>
        {/* Header: Number + Title */}
        <motion.div
          className="ayana-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="ayana-number-inline">#{budaya.number}</div>
          <div className="ayana-title-group">
            <h2 className="ayana-main-title">
              Eksplor <span className="highlight">{budaya.title}:</span>
            </h2>
            <p className="ayana-main-subtitle">{budaya.subtitle}</p>
          </div>
        </motion.div>

        {/* Image Slider */}
        <motion.div
          className="ayana-slider-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="ayana-slider">
            {budaya.images.map((img, imgIdx) => (
              <div
                key={imgIdx}
                className={`ayana-slide ${
                  activeSlide === imgIdx ? "active" : ""
                }`}
              >
                <img src={img} alt={`${budaya.title} ${imgIdx + 1}`} />
              </div>
            ))}
          </div>

          {/* Slider Dots */}
          <div className="ayana-slider-dots">
            {budaya.images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                className={`slider-dot ${
                  activeSlide === dotIdx ? "active" : ""
                }`}
                onClick={() => setActiveSlide(dotIdx)}
                aria-label={`Image ${dotIdx + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Content Grid: Description + Diamond + CTA */}
        <div className="ayana-content-grid">
          {/* Left: Description */}
          <motion.div
            className="ayana-description-box"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="ayana-description-text">{budaya.description}</p>
          </motion.div>

          {/* Right: Diamond Image */}
          <motion.div
            className="ayana-right-section"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="ayana-diamond-image">
              <img src={budaya.images[2]} alt={`${budaya.title} diamond`} />
            </div>
          </motion.div>
        </div>

        {/* Bottom: CTA Section */}
        <motion.div
          className="ayana-cta-section"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="ayana-cta-image">
            <img src={budaya.ctaImage} alt={budaya.ctaTitle} />
          </div>
          <div className="ayana-cta-content">
            <div className="ayana-tagline-box">
              <p className="ayana-tagline-text">{budaya.tagline}</p>
            </div>
            <motion.div className="ayana-cta-text" whileHover={{ scale: 1.02 }}>
              <h3>{budaya.ctaTitle}</h3>
              <p>{budaya.ctaSubtitle}</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="#" className="ayana-cta-button">
                <span className="cta-icon">◉</span>
                <span>Eksplor Sekarang</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function BudayaPage() {
  const sectionsRef = useRef([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [activeSlides, setActiveSlides] = useState(Array(10).fill(0));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionMiddle = sectionTop + rect.height / 2;

          if (sectionMiddle >= 0 && sectionMiddle <= windowHeight) {
            setCurrentSection(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto slider for images
  useEffect(() => {
    const intervals = budayaData.map((_, index) => {
      return setInterval(() => {
        setActiveSlides((prev) => {
          const newSlides = [...prev];
          newSlides[index] = (newSlides[index] + 1) % 5;
          return newSlides;
        });
      }, 3000);
    });

    return () => intervals.forEach(clearInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const budayaData = [
    {
      id: 1,
      number: "01",
      title: "Lengger",
      subtitle: "Tarian Tradisional Penuh Pesona",
      description:
        "Lengger adalah tarian tradisional khas Banyumas yang menampilkan penari laki-laki berdandan seperti perempuan dengan gerakan gemulai dan memukau. Dikenal dengan kostum warna-warni dan makeup yang mencolok, Lengger menjadi ikon seni pertunjukan Banyumas yang telah diwariskan secara turun-temurun. Setiap gerakan dalam tarian ini sarat akan makna filosofis yang mendalam, menggambarkan nilai-nilai kehidupan masyarakat Banyumas.",
      tagline:
        "Yuk, rasakan sendiri pesona Lengger! Liburanmu di Banyumas belum lengkap tanpa menikmati pertunjukan seni tradisional yang memukau ini",
      images: [
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
      ],
      ctaImage: "/pemandangan.png",
      ctaTitle: "Saksikan Lengger Live",
      ctaSubtitle: "Pertunjukan yang akan membawamu ke dunia seni tradisional",
    },
    {
      id: 2,
      number: "02",
      title: "Wayang Banyumasan",
      subtitle: "Seni Pewayangan Ngapak",
      description:
        "Wayang Kulit Banyumasan menggunakan bahasa Ngapak dan memiliki ciri khas tersendiri. Dalang menampilkan lakon dengan humor khas Banyumas yang menghibur sekaligus sarat makna filosofis. Pewayangan ini bukan sekadar hiburan, namun juga media pendidikan moral dan nilai-nilai luhur bagi masyarakat.",
      tagline:
        "Nikmati pertunjukan Wayang Banyumasan! Pewayangan yang unik dengan bahasa Ngapak yang kocak dan penuh makna kehidupan",
      images: [
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
      ],
      ctaImage: "/pemandangan.png",
      ctaTitle: "Jelajahi Wayang",
      ctaSubtitle: "Temukan filosofi di balik setiap lakon",
    },
    {
      id: 3,
      number: "03",
      title: "Calung",
      subtitle: "Musik Bambu yang Merdu",
      description:
        "Calung adalah alat musik tradisional dari bambu yang menghasilkan nada merdu khas Banyumas. Dimainkan secara berkelompok, Calung mengiringi berbagai acara adat dan pertunjukan seni. Setiap tabung bambu menghasilkan nada yang berbeda, dan ketika dimainkan bersama menciptakan harmoni yang indah.",
      tagline:
        "Dengarkan alunan merdu Calung! Musik tradisional yang menenangkan dan membawa kedamaian bagi siapa saja yang mendengarnya",
      images: [
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
      ],
      ctaImage: "/pemandangan.png",
      ctaTitle: "Dengar Musik Calung",
      ctaSubtitle: "Harmoni bambu yang menenangkan jiwa",
    },
    {
      id: 4,
      number: "04",
      title: "Begalan",
      subtitle: "Tradisi Sakral Pernikahan",
      description:
        "Begalan adalah tradisi penyambutan pengantin dalam pernikahan adat Banyumas yang penuh makna filosofis. Prosesi ini menampilkan pertunjukan seni dengan dialog jenaka namun sarat pesan moral tentang kehidupan berumah tangga. Setiap adegan dalam Begalan mengandung nasihat dan doa untuk pengantin.",
      tagline:
        "Saksikan keunikan Begalan! Tradisi pernikahan yang kaya akan nilai-nilai luhur dan filosofi kehidupan berumah tangga",
      images: [
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
      ],
      ctaImage: "/pemandangan.png",
      ctaTitle: "Lihat Tradisi Begalan",
      ctaSubtitle: "Prosesi sakral penuh makna",
    },
    {
      id: 5,
      number: "05",
      title: "Dialek Ngapak",
      subtitle: "Bahasa Khas yang Kocak",
      description:
        "Dialek Ngapak adalah cara berbicara khas masyarakat Banyumas yang terdengar lucu dan bersahabat. Penggunaan bahasa Ngapak mencerminkan karakter masyarakat Banyumas yang terbuka dan jujur. Bahasa ini menjadi identitas dan kebanggaan tersendiri bagi masyarakat Banyumas.",
      tagline:
        "Rasakan keunikan Dialek Ngapak! Bahasa yang mencerminkan karakter dan jati diri masyarakat Banyumas yang hangat dan bersahabat",
      images: [
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
      ],
      ctaImage: "/pemandangan.png",
      ctaTitle: "Pelajari Ngapak",
      ctaSubtitle: "Bahasa yang penuh kehangatan",
    },
    {
      id: 6,
      number: "06",
      title: "Batik Banyumasan",
      subtitle: "Motif Penuh Filosofi",
      description:
        "Batik Banyumasan memiliki ciri khas motif dan warna yang berbeda dari batik daerah lain. Motif batik sering menggambarkan alam dan kehidupan masyarakat dengan filosofi mendalam. Setiap goresan dan warna dalam batik Banyumasan memiliki makna dan cerita tersendiri.",
      tagline:
        "Kenakan Batik Banyumasan! Karya seni tekstil yang indah dengan filosofi budaya yang kaya akan makna dan nilai luhur",
      images: [
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
      ],
      ctaImage: "/pemandangan.png",
      ctaTitle: "Koleksi Batik",
      ctaSubtitle: "Seni tekstil dengan filosofi mendalam",
    },
    {
      id: 7,
      number: "07",
      title: "Kuliner Tradisional",
      subtitle: "Cita Rasa Khas Banyumas",
      description:
        "Kuliner Banyumas terkenal dengan cita rasa khas seperti Mendoan, Nopia, Getuk Goreng, dan Soto Sokaraja. Setiap hidangan memiliki cerita dan filosofi yang mencerminkan kearifan lokal. Kuliner ini telah menjadi bagian tak terpisahkan dari kehidupan masyarakat Banyumas.",
      tagline:
        "Cicip kuliner Banyumas! Cita rasa autentik yang memanjakan lidah dengan kelezatan tradisional yang tak terlupakan",
      images: [
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
      ],
      ctaImage: "/pemandangan.png",
      ctaTitle: "Cicipi Kuliner",
      ctaSubtitle: "Kelezatan tradisional yang autentik",
    },
    {
      id: 8,
      number: "08",
      title: "Angklung Banyumasan",
      subtitle: "Harmoni Bambu yang Indah",
      description:
        "Angklung Banyumasan adalah alat musik tradisional yang dimainkan dengan cara digoyangkan. Menghasilkan bunyi yang khas dan merdu, sering dimainkan dalam berbagai pertunjukan dan upacara adat. Setiap angklung memiliki nada tertentu yang jika dimainkan bersama menciptakan melodi harmonis.",
      tagline:
        "Dengarkan Angklung Banyumasan! Musik bambu yang harmonis dan memukau dengan alunan nada yang menenangkan jiwa",
      images: [
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
      ],
      ctaImage: "/pemandangan.png",
      ctaTitle: "Main Angklung",
      ctaSubtitle: "Ciptakan harmoni dari bambu",
    },
    {
      id: 9,
      number: "09",
      title: "Kerajinan Tradisional",
      subtitle: "Karya Tangan Penuh Makna",
      description:
        "Kerajinan tangan khas Banyumas meliputi anyaman bambu, ukiran kayu, dan keramik. Setiap kerajinan dibuat dengan teliti dan penuh kesabaran, mencerminkan keterampilan turun-temurun. Kerajinan ini bukan hanya bernilai estetis, tetapi juga fungsional dalam kehidupan sehari-hari.",
      tagline:
        "Koleksi kerajinan Banyumas! Karya seni tangan yang indah dengan nilai budaya dan estetika yang tinggi",
      images: [
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
      ],
      ctaImage: "/pemandangan.png",
      ctaTitle: "Lihat Kerajinan",
      ctaSubtitle: "Karya tangan penuh kesabaran",
    },
    {
      id: 10,
      number: "10",
      title: "Ebeg",
      subtitle: "Tarian Mistis Kuda Kepang",
      description:
        "Ebeg adalah tarian tradisional khas Banyumas yang menampilkan atraksi mistis dengan menunggangi kuda kepang. Pertunjukan ini menggabungkan seni tari, musik, dan unsur spiritual yang kental. Penari Ebeg sering kali mengalami trance saat pertunjukan, menambah daya tarik mistis dari kesenian ini.",
      tagline:
        "Saksikan kekuatan Ebeg! Tarian mistis yang memukau dengan atraksi yang mendebarkan",
      images: [
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
        "/pemandangan.png",
      ],
      ctaImage: "/pemandangan.png",
      ctaTitle: "Tonton Ebeg",
      ctaSubtitle: "Atraksi mistis yang mendebarkan",
    },
  ];

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
              <div className="map-marker marker-1">1</div>
              <div className="map-marker marker-2">2</div>
              <div className="map-marker marker-3">3</div>
              <div className="map-marker marker-4">4</div>
              <div className="map-marker marker-5">5</div>

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
              <div className="info-card card-1">
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
              <div className="info-card card-2">
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
              <div className="info-card card-3">
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
              <div className="info-card card-4">
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
              <div className="info-card card-5">
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
      <div className="ayana-budaya-wrapper">
        {/* Dots Navigation - Fixed Right */}
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

        {budayaData.map((budaya, index) => (
          <BudayaSection
            key={budaya.id}
            budaya={budaya}
            index={index}
            currentSection={currentSection}
            sectionsRef={sectionsRef}
            activeSlide={activeSlides[index]}
            setActiveSlide={(slideIdx) => {
              setActiveSlides((prev) => {
                const newSlides = [...prev];
                newSlides[index] = slideIdx;
                return newSlides;
              });
            }}
          />
        ))}
      </div>

      <Footer />
    </main>
  );
}
