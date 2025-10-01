"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";

export default function Home() {
  const wisataSlides = [
    { img: "/IMG_6806 1.png", alt: "Pantai" },
    { img: "/IMG_5702 2.png", alt: "Gunung" },
    { img: "/IMG_7236 3.png", alt: "Air Terjun" },
  ];

  const kulinerSlides = [
    { img: "/mendoan.png", alt: "Mendoan" },
    { img: "/sroto.png", alt: "Sroto Sokaraja" },
    { img: "/gethuk.png", alt: "Gethuk Goreng" },
  ];

  return (
    <main>
      {/* HERO SLIDER DENGAN EFFECT CREATIVE */}
      <Swiper
        modules={[EffectCreative, Autoplay]}
        effect="creative"
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-120%", 0, -500], // jauh geser keluar layar
            rotate: [0, 0, -90], // diputer biar keliatan dramatis
          },
          next: {
            shadow: true,
            translate: ["120%", 0, -500],
            rotate: [0, 0, 90],
          },
        }}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="hero-slider"
      >
        {/* SLIDE 1: WISATA */}
        <SwiperSlide>
          <section
            className="hero-slide"
            style={{ backgroundImage: "url('/pemandangan.png')" }}
          >
            <div className="hero-content">
              <h5>AYO JELAJAHI</h5>
              <h1>Wisata Banyumas.</h1>
              <p>Eksplorasi Keindahan Bumi Ngapak dari Lereng Gunung hingga Kota</p>
              <a href="#" className="cta">Mulai Jelajahi</a>
            </div>

            {/* MINI SLIDER WISATA */}
            <div className="mini-slider">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={3}
                loop={true}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
              >
                {wisataSlides.map((s, i) => (
                  <SwiperSlide key={i}>
                    <Image src={s.img} alt={s.alt} width={300} height={200} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        </SwiperSlide>

        {/* SLIDE 2: KULINER */}
        <SwiperSlide>
          <section
            className="hero-slide"
            style={{ backgroundImage: "url('/Mendoan.png')" }}
          >
            <div className="hero-content">
              <h5>COBA NIKMATI</h5>
              <h1>Kuliner Banyumas.</h1>
              <p>Mendoan hangat, sroto Sokaraja, hingga gethuk goreng yang bikin kangen!</p>
              <a href="#" className="cta">Jelajahi Kuliner</a>
            </div>

            {/* MINI SLIDER KULINER */}
            <div className="mini-slider">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={3}
                loop={true}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
              >
                {kulinerSlides.map((s, i) => (
                  <SwiperSlide key={i}>
                    <Image src={s.img} alt={s.alt} width={300} height={200} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
    </main>
  );
}
