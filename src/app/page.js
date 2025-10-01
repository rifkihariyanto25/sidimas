"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default function Home() {
  const wisataSlides = [
    { img: "/IMG_6806 1.png", alt: "Pantai" },
    { img: "/IMG_5702 2.png", alt: "Gunung" },
    { img: "/IMG_7236 3.png", alt: "Air Terjun" },
    { img: "/IMG3.png", alt: "Air Terjun" },
  ];

  const kulinerSlides = [
    { img: "/mendoan.png", alt: "Mendoan" },
    { img: "/sroto.png", alt: "Sroto Sokaraja" },
    { img: "/gethuk.png", alt: "Gethuk Goreng" },
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
            <div className="mini-slider absolute bottom-10 right-10 w-[350px] z-10">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={15}
                slidesPerView={3}
                loop={true}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
              >
                {wisataSlides.map((s, i) => (
                  <SwiperSlide key={i}>
                    <Image src={s.img} alt={s.alt} width={300} height={200} className="rounded-lg" />
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
            <div className="mini-slider absolute bottom-10 right-10 w-[350px] z-10">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={15}
                slidesPerView={3}
                loop={true}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
              >
                {kulinerSlides.map((s, i) => (
                  <SwiperSlide key={i}>
                    <Image src={s.img} alt={s.alt} width={300} height={200} className="rounded-lg" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>

      {/* ✅ SECTION ABOUT (Timeline) */}
      <section className="about py-20 bg-white text-black relative">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h3 className="text-gray-600">Alasan</h3>
          <h2 className="text-3xl md:text-4xl font-bold">
            Kenapa Kamu Harus Mengetahui Kekayaan <span className="text-lime-700">Banyumas</span>
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Garis Tengah */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-lime-600"></div>

          {/* Item 1 */}
          <div className="mb-16 flex justify-between items-center w-full">
            <div className="w-5/12 text-right pr-8">
              <p className="text-gray-700">Bahasa Banyumasan itu unik banget dan punya ciri khas sendiri. Tau bahasanya bikin kita lebih dekat sama warga lokal.</p>
            </div>
            <div className="z-10">
              <div className="w-6 h-6 bg-lime-600 rounded-full"></div>
            </div>
            <div className="w-5/12 pl-8">
              <Image src="/foto1.jpg" alt="Budaya Banyumas" width={400} height={300} className="rounded-lg shadow-lg" />
            </div>
          </div>

          {/* Item 2 */}
          <div className="mb-16 flex justify-between items-center w-full flex-row-reverse">
            <div className="w-5/12 text-left pl-8">
              <p className="text-gray-700">Dari wayang kulit sampai upacara adat, Banyumas punya banyak kegiatan seru.</p>
            </div>
            <div className="z-10">
              <div className="w-6 h-6 bg-lime-600 rounded-full"></div>
            </div>
            <div className="w-5/12 pr-8">
              <Image src="/foto2.jpg" alt="Wayang Banyumas" width={400} height={300} className="rounded-lg shadow-lg rotate-6" />
            </div>
          </div>

          {/* Item 3 */}
          <div className="mb-16 flex justify-between items-center w-full">
            <div className="w-5/12 text-right pr-8">
              <p className="text-gray-700">Curug, perbukitan, taman kota semua bisa bikin feed IG kamu makin kece.</p>
            </div>
            <div className="z-10">
              <div className="w-6 h-6 bg-lime-600 rounded-full"></div>
            </div>
            <div className="w-5/12 pl-8">
              <Image src="/foto3.jpg" alt="Wisata Banyumas" width={400} height={300} className="rounded-lg shadow-lg" />
            </div>
          </div>

          {/* Item 4 */}
          <div className="mb-16 flex justify-between items-center w-full flex-row-reverse">
            <div className="w-5/12 text-left pl-8">
              <p className="text-gray-700">Mendoan krispi, soto hangat, getuk manis... semua bikin lidah happy banget.</p>
            </div>
            <div className="z-10">
              <div className="w-6 h-6 bg-lime-600 rounded-full"></div>
            </div>
            <div className="w-5/12 pr-8">
              <Image src="/foto4.jpg" alt="Kuliner Banyumas" width={400} height={300} className="rounded-lg shadow-lg -rotate-6" />
            </div>
          </div>
        </div>
      </section>

      {/* ✅ SECTION BERAGAM KHAS */}
      <section className="khas py-20 px-6 md:px-16 bg-gray-50 text-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Beragam Khas Banyumas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-lime-100 p-8 rounded-xl">Gambar 1</div>
            <div className="bg-lime-100 p-8 rounded-xl">Gambar 2</div>
            <div className="bg-lime-100 p-8 rounded-xl">Gambar 3</div>
            <div className="bg-lime-100 p-8 rounded-xl">Gambar 4</div>
            <div className="bg-lime-100 p-8 rounded-xl col-span-2 md:col-span-2 lg:col-span-4">Gambar besar</div>
          </div>
        </div>
      </section>

      {/* ✅ CTA SECTION */}
      <section className="cta py-20 bg-[url('/batik.png')] bg-cover bg-center text-center text-white relative">
        <div className="absolute inset-0 bg-black/50"></div>
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
      <footer className="footer py-10 bg-[#26320e] text-white text-center">
        <div className="max-w-6xl mx-auto">
          <p className="mb-2 font-bold">✦ Jelajah Banyumas ✦</p>
          <p className="text-sm">© 2025 Banyumas. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
