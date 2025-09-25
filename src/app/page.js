"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Home() {
  const slides = [
    { img: "/IMG_6806 1.png", alt: "Pantai" },
    { img: "/IMG_5702 2.png", alt: "Gunung" },
    { img: "/IMG_7236 3.png", alt: "Air Terjun" },
  ];

  return (
    <main>
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">SIDimas.</div>
        <nav>
          <ul>
            <li><a href="#">Beranda</a></li>
            <li><a href="#">Wisata</a></li>
            <li><a href="#">Kuliner</a></li>
            <li><a href="#">Budaya</a></li>
            <li><a href="#">Kontribusi</a></li>
          </ul>
        </nav>
        <div className="nav-actions">
          <a href="#" className="login">Log in</a>
          <a href="#" className="signup">Sign Up</a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h5>AYO JELAJAHI</h5>
          <h1>Wisata Banyumas.</h1>
          <p>Eksplorasi Keindahan Bumi Ngapak dari Lereng Gunung hingga Kota</p>
          <a href="#" className="cta">Mulai Jelajahi</a>
        </div>

        {/* Mini Slider */}
        <div className="mini-slider">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={3}
            loop
          >
            {slides.map((s, i) => (
              <SwiperSlide key={i}>
                <div className="slide-wrapper">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    width={300}
                    height={200}
                    className="slide-img"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </main>
  );
}
