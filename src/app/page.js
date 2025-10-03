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
 <section className="about relative py-16">

{/* Background wayang kiri */}
  <div className="wayang-left">
    <img src="/ayang.png" alt="Wayang Kiri" />
  </div>

  {/* Background wayang kanan */}
  <div className="wayang-right">
    <img src="/wayang-right.png" alt="Wayang Kanan" />
  </div>



  <h2 className="text-center text-3xl font-bold mb-2">Alasan</h2>
  <p className="text-center mb-12">
    Kenapa Kamu Harus Mengetahui Kekayaan <span className="text-lime-700 font-semibold">Banyumas</span>
  </p>

  <div className="timeline relative z-10">
    {/* Item kiri */}
    <div className="timeline-item left">
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
    </div>

    {/* Item kanan */}
    <div className="timeline-item right">
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
