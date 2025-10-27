# 🌄 SIDIMAS - Sistem Informasi Digital Banyumas

Platform digital komprehensif untuk mempromosikan dan mengelola informasi pariwisata, kuliner, dan budaya Kabupaten Banyumas.

## 📋 Deskripsi Sistem

SIDIMAS (Sistem Informasi Digital Banyumas) adalah sebuah platform web yang dikembangkan untuk memudahkan masyarakat dan wisatawan dalam mengeksplorasi kekayaan Kabupaten Banyumas. Sistem ini menyediakan informasi lengkap mengenai:

- 🏞️ **Wisata**: Destinasi wisata alam, budaya, dan edukasi
- 🍜 **Kuliner**: Makanan khas dan rekomendasi tempat makan
- 🎭 **Budaya**: Kesenian, tradisi, dan warisan budaya Banyumas

### ✨ Fitur Utama

1. **Homepage dengan Hero Slider**

   - Menampilkan slide dinamis untuk kategori Wisata, Kuliner, dan Budaya
   - Logo Loop untuk showcase gambar-gambar terkini dari setiap kategori
   - Navigasi interaktif dengan Swiper.js

2. **Halaman Kategori**

   - Halaman khusus untuk Wisata, Kuliner, dan Budaya
   - Menampilkan konten detail dari database
   - Timeline interaktif untuk eksplorasi konten

3. **Admin Dashboard**

   - Panel admin untuk mengelola konten
   - Upload gambar langsung ke Supabase Storage
   - CRUD (Create, Read, Update, Delete) untuk semua kategori
   - Manajemen Dashboard untuk konten homepage

4. **Responsive Design**
   - Optimasi untuk desktop, tablet, dan mobile
   - Menggunakan Tailwind CSS untuk styling modern

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org) (App Router)
- **Language**: JavaScript/JSX
- **Styling**: Tailwind CSS + Custom CSS
- **Database**: [Supabase](https://supabase.com) (PostgreSQL)
- **Storage**: Supabase Storage
- **UI Components**:
  - Swiper.js (Slider)
  - Framer Motion (Animations)
  - Next.js Image (Optimized Images)
- **Deployment**: Vercel

## 🗄️ Database Schema

### Tabel: `konten`

```sql
create table public.konten (
  id uuid primary key default uuid_generate_v4(),
  kategori text check (kategori in ('wisata', 'budaya', 'kuliner')) not null,
  gambar_url text default '',
  created_at timestamp with time zone default now()
);
```

**Deskripsi:**

- Menyimpan konten gambar untuk homepage (hero slider)
- Field `kategori` untuk memisahkan konten Wisata, Kuliner, dan Budaya
- Field `gambar_url` menyimpan URL gambar dari Supabase Storage

### Tabel: `konten_wisata`

```sql
create table public.konten_wisata (
  id uuid primary key default uuid_generate_v4(),
  nama text not null,
  deskripsi text,
  gambar_url text,
  lokasi text,
  created_at timestamp with time zone default now()
);
```

### Tabel: `konten_kuliner`

```sql
create table public.konten_kuliner (
  id uuid primary key default uuid_generate_v4(),
  nama text not null,
  deskripsi text,
  gambar_url text,
  lokasi text,
  created_at timestamp with time zone default now()
);
```

### Tabel: `konten_budaya`

```sql
create table public.konten_budaya (
  id uuid primary key default uuid_generate_v4(),
  nama text not null,
  deskripsi text,
  gambar_url text,
  lokasi text,
  created_at timestamp with time zone default now()
);
```

### Storage Bucket: `images`

- **Public Bucket**: Untuk menyimpan semua gambar yang diupload
- **Path Structure**: `/images/{filename}`
- **Access**: Public Read

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Akun Supabase

### Instalasi

1. **Clone repository**

```bash
git clone https://github.com/rifkihariyanto25/sidimas.git
cd sidimas
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup Environment Variables**

Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Setup Database di Supabase**

Jalankan SQL berikut di Supabase SQL Editor:

```sql
-- Tabel konten (untuk homepage)
create table public.konten (
  id uuid primary key default uuid_generate_v4(),
  kategori text check (kategori in ('wisata', 'budaya', 'kuliner')) not null,
  gambar_url text default '',
  created_at timestamp with time zone default now()
);

-- Tabel konten wisata
create table public.konten_wisata (
  id uuid primary key default uuid_generate_v4(),
  nama text not null,
  deskripsi text,
  gambar_url text,
  lokasi text,
  created_at timestamp with time zone default now()
);

-- Tabel konten kuliner
create table public.konten_kuliner (
  id uuid primary key default uuid_generate_v4(),
  nama text not null,
  deskripsi text,
  gambar_url text,
  lokasi text,
  created_at timestamp with time zone default now()
);

-- Tabel konten budaya
create table public.konten_budaya (
  id uuid primary key default uuid_generate_v4(),
  nama text not null,
  deskripsi text,
  gambar_url text,
  lokasi text,
  created_at timestamp with time zone default now()
);
```

5. **Setup Storage Bucket**

Di Supabase Dashboard:

- Buka **Storage**
- Klik **New Bucket**
- Nama: `images`
- Centang **Public bucket**
- Klik **Create bucket**

6. **Run Development Server**

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📂 Struktur Folder

```
sidimas/
├── public/              # Static assets
├── src/
│   ├── app/
│   │   ├── admin/       # Admin panel
│   │   │   ├── page.js
│   │   │   └── login/
│   │   ├── wisata/      # Halaman Wisata
│   │   ├── kuliner/     # Halaman Kuliner
│   │   ├── budaya/      # Halaman Budaya
│   │   ├── components/  # Reusable components
│   │   │   ├── AdminDashboard.js
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── LogoLoop.js
│   │   ├── layout.js    # Root layout
│   │   ├── page.js      # Homepage
│   │   └── globals.css  # Global styles
│   └── lib/
│       └── supabase.js  # Supabase client config
├── .env.local           # Environment variables
└── package.json
```

## 🔐 Admin Panel

### Login Admin

- URL: `/admin/login`
- Masukkan credentials
- Redirect ke dashboard admin

### Fitur Admin

1. **Dashboard**: Kelola konten homepage (hero slider)
2. **Wisata**: CRUD konten wisata
3. **Kuliner**: CRUD konten kuliner
4. **Budaya**: CRUD konten budaya

### Upload Gambar

- Ukuran maksimal: 5MB
- Format: JPG, JPEG, PNG, GIF, WebP
- Otomatis tersimpan di Supabase Storage bucket `images`

## 🌐 Deployment

### Deploy ke Vercel

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Tambahkan Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

```bash
# Atau via CLI
npm install -g vercel
vercel
```

## 📖 Cara Penggunaan

### Menambah Konten Homepage

1. Login ke `/admin/login`
2. Klik menu **Dashboard** (🏠)
3. Pilih **Kategori** (Wisata/Kuliner/Budaya)
4. Upload **Gambar**
5. Klik **Tambah**
6. Gambar akan muncul di hero slider homepage sesuai kategori

### Mengelola Konten Kategori

1. Login ke admin panel
2. Pilih sidebar (Wisata/Kuliner/Budaya)
3. Isi form:
   - Nama
   - Deskripsi
   - Lokasi
   - Upload Gambar
4. Klik **Tambah**
5. Konten akan tampil di halaman kategori masing-masing

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is open source.

## 👥 Team

Dikembangkan oleh Tim Asal Masuk dari Telkom University Purwokerto.

Rifki Aditya Hariyanto
Muhammad Fikri Fauzi
Muhamad Dimas Nurzaky
Aghisna Aulia Rahma

Made with ❤️ for Banyumas
