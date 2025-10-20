"use client";

import Image from "next/image";
import Link from "next/link";
import "./wisata.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function WisataPage() {
  return (
    <>
      <Navbar />
      <main className="wisata-page">
        {/* HERO SECTION */}
        <section 
          className="hero-slide h-screen flex items-center relative text-white bg-cover bg-center"
          style={{ backgroundImage: "url('/pemandangan.png')" }}
        >
          <div className="absolute inset-0 bg-black/25"></div>
          
          <div className="hero-content relative z-10 px-6 md:px-16 max-w-3xl">
            <p className="text-base md:text-lg italic mb-1 font-light tracking-wide">
              Nikmati pengalaman tak terlupakan,
            </p>
            <p className="text-base md:text-lg italic mb-8 font-light tracking-wide">
              jelajahi setiap keindahan yang memanjakan mata
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              Wisata Banyumas.
            </h1>
          </div>
        </section>

        {/* EKSPLORASI SECTION */}
        <section className="py-20 px-6 md:px-16 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Eksplorasi Berbagai Wisata <span className="text-lime-600">Banyumas,</span>
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold mb-8">Curug dan Keindahan Lainnya</h3>
              <p className="text-gray-700 text-left md:text-center max-w-4xl mx-auto leading-relaxed text-base">
                Loh.. Dari ratusan curug yang tersebar di Banyumas, kamu wajib tahu yang populer dan menarik perhatian traveler. Selain curug, Banyumas juga punya tempat wisata lainnya yang nggak kalah indah. Yuk, cobain sensasi liburan yang berbeda! Selain curug, ada juga destinasi seru lainnya yang bikin liburanmu lebih lengkap: pantai, waterboom, taman bermain, dan berbagai objek menarik lainnya yang siap memanjakan matamu. Jangan lewatkan kesempatan buat menjelajahi kekayaan alam dan budaya Banyumas yang bikin kangen!
              </p>
            </div>
          </div>
        </section>

        {/* REKOMENDASI WISATA SECTION */}
        <section className="py-20 px-6 md:px-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Rekomendasi Wisata</h2>
            
            <div className="relative flex items-center justify-center gap-8">
              {/* Info Cards Kiri */}
              <div className="hidden lg:flex flex-col gap-6">
                {/* Card 1 - Baturraden */}
                <div className="bg-lime-200 p-4 rounded-lg shadow-md max-w-xs">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <h3 className="font-bold text-lg">Baturraden</h3>
                  </div>
                  <p className="text-sm text-gray-800">
                    Destinasi wisata pegunungan dengan pemandangan indah dan udara sejuk yang menenangkan
                  </p>
                </div>

                {/* Card 2 - Curug Cipendok */}
                <div className="bg-lime-200 p-4 rounded-lg shadow-md max-w-xs">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <h3 className="font-bold text-lg">Curug Cipendok</h3>
                  </div>
                  <p className="text-sm text-gray-800">
                    Air terjun eksotis yang tersembunyi di tengah hutan dengan keindahan alam yang memukau
                  </p>
                </div>

                {/* Card 3 - Telaga Sunyi */}
                <div className="bg-lime-200 p-4 rounded-lg shadow-md max-w-xs">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <h3 className="font-bold text-lg">Telaga Sunyi</h3>
                  </div>
                  <p className="text-sm text-gray-800">
                    Danau tenang dengan suasana damai dan pemandangan asri yang menyejukkan hati
                  </p>
                </div>
              </div>

              {/* Peta Banyumas - Center */}
              <div className="relative mx-auto" style={{ maxWidth: '500px' }}>
                <Image 
                  src="/pemandangan.png" 
                  alt="Peta Banyumas" 
                  width={500} 
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
                
                {/* Pin Lokasi */}
                <div className="absolute top-[20%] left-[15%] w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute top-[20%] left-[15%] w-4 h-4 bg-yellow-400 rounded-full"></div>
                
                <div className="absolute top-[35%] left-[45%] w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute top-[35%] left-[45%] w-4 h-4 bg-yellow-400 rounded-full"></div>
                
                <div className="absolute top-[50%] right-[20%] w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute top-[50%] right-[20%] w-4 h-4 bg-yellow-400 rounded-full"></div>
                
                <div className="absolute bottom-[30%] left-[25%] w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-[30%] left-[25%] w-4 h-4 bg-yellow-400 rounded-full"></div>
                
                <div className="absolute bottom-[20%] left-[50%] w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-[20%] left-[50%] w-4 h-4 bg-yellow-400 rounded-full"></div>
              </div>

              {/* Info Cards Kanan */}
              <div className="hidden lg:flex flex-col gap-6">
                {/* Card 4 - Banyumas */}
                <div className="bg-green-800 text-white p-4 rounded-lg shadow-md max-w-xs">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white text-gray-800 rounded-full flex items-center justify-center font-bold">4</div>
                    <h3 className="font-bold text-lg">Banyumas</h3>
                  </div>
                  <p className="text-sm">
                    Pusat kota dengan berbagai destinasi wisata menarik dan kuliner khas yang wajib dicoba
                  </p>
                </div>

                {/* Card 5 - Patikraja */}
                <div className="bg-green-800 text-white p-4 rounded-lg shadow-md max-w-xs">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white text-gray-800 rounded-full flex items-center justify-center font-bold">5</div>
                    <h3 className="font-bold text-lg">Patikraja</h3>
                  </div>
                  <p className="text-sm">
                    Kota kecil dengan wisata alam yang mempesona dan udara sejuk pegunungan
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Card - Baturaden */}
            <div className="mt-12 max-w-md mx-auto bg-lime-200 p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-lg">6</div>
              </div>
              <h3 className="font-bold text-xl mb-2">Baturaden</h3>
              <p className="text-sm text-gray-800">
                Kawasan wisata dengan berbagai wahana menarik, pemandian air panas, dan pemandangan alam yang indah
              </p>
            </div>
          </div>
        </section>

        {/* ITINERARY SECTION */}
        <section className="py-20 px-6 md:px-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Itinerary Sange Destinasi di Banyumas</h2>
            
            <div className="space-y-6 text-gray-800">
              <p className="leading-relaxed text-justify">
                Mau jalan-jalan tapi bingung mulai dari mana? Tenang, nih! Ada itinerary seru yang bakal bawa kamu menjelajahi destinasi wisata hits di Banyumas! Dari alam yang asri sampe spot foto Instagram-able, semuanya ada. Yuk, simak rekomendasi itinerary dari pagi sampe sore yang bikin liburanmu makin berkesan!
              </p>

              <div className="space-y-4">
                <p className="leading-relaxed text-justify">
                  <span className="font-semibold">Pagi (08:00 - 12:00):</span> Mulai hari dengan sarapan nasi lengko atau soto khas Banyumas di warung legendaris. Setelah itu, langsung meluncur ke Baturraden buat nikmatin udara sejuk pegunungan dan pemandangan Gunung Slamet yang bikin adem. Jangan lupa foto-foto di spot yang kece!
                </p>

                <p className="leading-relaxed text-justify">
                  <span className="font-semibold">Siang (12:00 - 15:00):</span> Makan siang sambil menikmati view di resto lokal yang ada di sekitar Baturraden. Habis itu, lanjut ke Curug Cipendok atau curug-curug lainnya yang terkenal di Banyumas. Rasain sensasi kesegaran air terjun yang bikin semua penat hilang!
                </p>

                <p className="leading-relaxed text-justify">
                  <span className="font-semibold">Sore (15:00 - 18:00):</span> Sore hari, mampir ke Telaga Sunyi atau Small World buat hunting sunset yang Instagramable. Kalau masih kuat, bisa juga main ke Owabong atau tempat wisata lainnya yang ada di sekitaran situ. Dijamin liburan kamu nggak bakal boring!
                </p>

                <p className="leading-relaxed text-justify italic text-gray-600 mt-6">
                  Catatan: Itinerary ini bisa kamu sesuaikan dengan kondisi dan budget. Yang penting, jangan lupa bawa kamera buat dokumentasi dan siap-siap bikin teman-teman kamu iri dengan foto-foto liburan yang keren!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
