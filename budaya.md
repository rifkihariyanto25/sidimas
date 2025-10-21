Buat halaman menggunakan Next.js + Tailwind + Framer Motion + GSAP ScrollTrigger.

Konsep desain meniru Ayana Bali – Dining (10 World Cuisines), dengan fitur berikut:
Scroll-snap per section (tiap kategori satu layar penuh)

Gambar dan teks muncul dengan animasi halus (fade, slide)

Beberapa section memiliki galeri horizontal yang bergerak saat user scroll vertikal (pinned horizontal scroll)

Efek smooth scroll (Lenis.js atau GSAP ScrollSmoother)

Warna tema alami: hijau, coklat muda, putih, dan abu-abu lembut
Font: Poppins untuk judul, Lato untuk deskripsi

Tombol CTA di akhir halaman “Jelajahi Budaya Banyumas”

✨ 2. Fitur-Fitur Utama (Sama Seperti Ayana)
Fitur Penjelasan Implementasi
🎞️ Full Page Scroll per Section Tiap kategori muncul 1 layar penuh (100vh), scroll berikutnya langsung ganti section CSS scroll-snap-type: y mandatory + Tailwind h-screen snap-start
🧭 Sticky Navigation Bar Navbar di atas menempel saat scroll, menampilkan kategori yang aktif position: sticky + IntersectionObserver buat highlight aktif
🌅 Hero Section Gambar latar besar, judul “Budaya Banyumas” dan tagline di tengah motion.div + fade-in dari bawah
📸 Horizontal Scrolling Gallery (dalam kategori tertentu) Saat scroll vertikal, foto di section tertentu bergerak horizontal (auto-scroll ke kanan) GSAP ScrollTrigger pin: true, scrub: true, xPercent
🧩 Animasi Masuk Tiap Section Judul, teks, dan gambar muncul halus saat section aktif Framer Motion whileInView={{ opacity:1, y:0 }}
🌫️ Overlay Text di Atas Foto Teks deskripsi muncul di atas foto seperti storytelling Ayana Tailwind absolute inset-0 bg-black/40 + motion fade
🪶 Smooth Scroll Transition Gerakan scroll lembut dan inertia Gunakan Lenis.js
🏝️ CTA Akhir (Explore More) Tombol “Jelajahi Budaya Banyumas” dengan hover animation Framer Motion whileHover={{ scale: 1.05 }}

🖼️ 3. Contoh Konsep Visual (Kayak Ayana tapi Versi Banyumas)
💃 Tari Lengger Penari lokal dengan pakaian tradisional Foto besar + fade-up animasi
🎭 Wayang Banyumasan Kesenian tradisional khas Banyumas Horizontal scroll galeri wayang
🍽️ Kuliner Banyumas Mendoan, Nopia, Getuk Goreng Horizontal auto-scroll gambar makanan
🗣️ Bahasa & Tradisi Ngapak Foto komunitas, suasana pasar Parallax scroll text dan background
