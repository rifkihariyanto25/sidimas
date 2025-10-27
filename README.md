# 🌄 SIDIMAS - Sistem Informasi Digital Banyumas

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

> **🏆 Project Lomba** - Platform digital komprehensif untuk mempromosikan dan mengelola informasi pariwisata, kuliner, dan budaya Kabupaten Banyumas.

<div align="center">

### 🌐 Live Demo

**🔗 Production:** [https://sidimas-six.vercel.app](https://sidimas-six.vercel.app)

**🔐 Admin Panel:** [https://sidimas-six.vercel.app/admin/login](https://sidimas-six.vercel.app/admin/login)

---

</div>

## 📋 Deskripsi Sistem

**SIDIMAS (Sistem Informasi Digital Banyumas)** adalah platform web modern yang dikembangkan untuk memudahkan masyarakat dan wisatawan dalam mengeksplorasi kekayaan Kabupaten Banyumas. Sistem ini menyediakan informasi lengkap mengenai:

- 🏞️ **Wisata**: Destinasi wisata alam, budaya, dan edukasi
- 🍜 **Kuliner**: Makanan khas dan rekomendasi tempat makan
- 🎭 **Budaya**: Kesenian, tradisi, dan warisan budaya Banyumas

### 🎯 Tujuan Proyek

**SIDIMAS** dikembangkan sebagai solusi digital untuk mendukung pariwisata dan pelestarian budaya Kabupaten Banyumas dengan tujuan:

1. **📈 Promosi Pariwisata Lokal**: Meningkatkan visibilitas destinasi wisata Banyumas ke tingkat nasional
2. **🎨 Pelestarian Budaya**: Mendokumentasikan dan mempromosikan warisan budaya lokal
3. **💻 Digitalisasi Informasi**: Menyediakan akses informasi pariwisata yang mudah, cepat, dan terpusat
4. **⚡ Kemudahan Pengelolaan**: Admin dapat mengelola konten secara real-time tanpa coding
5. **🎯 User Experience**: Interface modern dan responsif untuk semua perangkat

---

## ✨ Fitur Utama

#### 1. **Homepage dengan Hero Slider**

- **Dynamic Slides**: 3 slide utama (Wisata, Kuliner, Budaya) dengan transisi smooth
- **Logo Loop Animation**: Showcasing 4 gambar terbaru per kategori dengan infinite scroll
- **Auto-Play**: Slide otomatis berganti setiap 5 detik
- **Swiper Navigation**: Pagination dots dan navigation arrows
- **Fade Effect**: Transisi slide menggunakan fade effect
- **Real-time Data**: Data langsung dari database Supabase

#### 2. **Halaman Kategori**

- **Wisata Page**:
  - Grid display destinasi wisata
  - Filter dan search functionality
  - Detail view dengan gambar, deskripsi, dan lokasi
- **Kuliner Page**:
  - Showcase makanan khas Banyumas
  - Informasi tempat kuliner
  - Rating dan review (upcoming)
- **Budaya Page**:
  - Timeline kesenian dan tradisi
  - Galeri budaya interaktif
  - Informasi event budaya

#### 3. **Admin Dashboard**

- **Multi-Category Management**:
  - Dashboard (Homepage Content)
  - Wisata Management
  - Kuliner Management
  - Budaya Management
- **CRUD Operations**:
  - Create: Upload gambar + isi form
  - Read: Tampilan grid/list konten
  - Update: Edit konten dengan preview
  - Delete: Hapus konten dengan konfirmasi
- **Image Upload**:
  - Direct upload ke Supabase Storage
  - Auto-resize dan optimization
  - Preview sebelum upload
  - Validasi format dan ukuran
- **Real-time Updates**: Perubahan langsung tersinkronisasi

#### 4. **Responsive Design**

- **Mobile First**: Optimasi untuk mobile devices
- **Tablet Support**: Layout adaptif untuk tablet
- **Desktop Optimization**: Full feature untuk desktop
- **Cross-browser Compatible**: Support Chrome, Firefox, Safari, Edge

#### 5. **Performance Optimization**

- **Next.js Image Component**: Automatic image optimization
- **Lazy Loading**: Load image on demand
- **Code Splitting**: Automatic code splitting oleh Next.js
- **Static Generation**: Pre-rendering untuk performa maksimal
- **CDN Delivery**: Asset delivery via Vercel CDN

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 14+](https://nextjs.org) (App Router)
  - Server Components & Client Components
  - File-based Routing
  - API Routes (unused, prefer Supabase direct)
- **Language**: JavaScript/JSX (ES6+)
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
  - Custom CSS - Untuk animasi dan styling khusus
  - CSS Modules - Scoped styling per component
- **UI Libraries**:
  - [Swiper.js](https://swiperjs.com) - Modern slider/carousel (v11+)
  - [Framer Motion](https://www.framer.com/motion) - Animation library
  - Next.js Image - Automatic image optimization

### Backend

- **Database**: [Supabase](https://supabase.com) PostgreSQL
  - Real-time subscriptions
  - Row Level Security (RLS)
  - Auto-generated REST API
- **Storage**: Supabase Storage
  - Public bucket untuk images
  - CDN delivery
  - Automatic URL generation
- **Authentication**: Supabase Auth (untuk admin panel)

### Development Tools

- **Version Control**: Git & GitHub
- **Package Manager**: npm
- **Code Quality**: ESLint
- **Deployment**: Vercel (CI/CD)

### Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@supabase/supabase-js": "^2.x",
    "swiper": "^11.x",
    "framer-motion": "^10.x"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.x",
    "eslint-config-next": "^14.x"
  }
}
```

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```
┌─────────────────────┐
│      konten         │  (Homepage Hero Slider)
├─────────────────────┤
│ PK  id (uuid)       │
│     kategori (text) │  ← CHECK: wisata, budaya, kuliner
│     gambar_url      │
│     created_at      │
└─────────────────────┘

┌─────────────────────┐       ┌─────────────────────┐       ┌─────────────────────┐
│  konten_wisata      │       │  konten_kuliner     │       │  konten_budaya      │
├─────────────────────┤       ├─────────────────────┤       ├─────────────────────┤
│ PK  id (uuid)       │       │ PK  id (uuid)       │       │ PK  id (uuid)       │
│     nama (text)     │       │     nama (text)     │       │     nama (text)     │
│     deskripsi       │       │     deskripsi       │       │     deskripsi       │
│     gambar_url      │       │     gambar_url      │       │     gambar_url      │
│     lokasi          │       │     lokasi          │       │     lokasi          │
│     created_at      │       │     created_at      │       │     created_at      │
└─────────────────────┘       └─────────────────────┘       └─────────────────────┘
```

### 1. Tabel `konten` (Homepage Content)

```sql
create table public.konten (
  id uuid primary key default uuid_generate_v4(),
  kategori text check (kategori in ('wisata', 'budaya', 'kuliner')) not null,
  gambar_url text default '',
  created_at timestamp with time zone default now()
);

-- Indexes untuk performa
create index idx_konten_kategori on public.konten(kategori);
create index idx_konten_created_at on public.konten(created_at desc);
```

**Deskripsi Field:**

| Field        | Type        | Constraint      | Deskripsi                         |
| ------------ | ----------- | --------------- | --------------------------------- |
| `id`         | UUID        | PRIMARY KEY     | Unique identifier, auto-generated |
| `kategori`   | TEXT        | CHECK, NOT NULL | Kategori: wisata/budaya/kuliner   |
| `gambar_url` | TEXT        | DEFAULT ''      | URL gambar dari Supabase Storage  |
| `created_at` | TIMESTAMPTZ | DEFAULT now()   | Timestamp pembuatan record        |

**Fungsi:**

- ✅ Menyimpan gambar untuk hero slider homepage
- ✅ Sistem mengambil 4 gambar terbaru per kategori
- ✅ Digunakan oleh LogoLoop component di setiap slide

**Contoh Query:**

```sql
-- Ambil 4 gambar wisata terbaru
SELECT id, gambar_url
FROM konten
WHERE kategori = 'wisata'
ORDER BY created_at DESC
LIMIT 4;
```

#### 2. Tabel: `konten_wisata` (Wisata Content)

```sql
create table public.konten_wisata (
  id uuid primary key default uuid_generate_v4(),
  nama text not null,
  deskripsi text,
  gambar_url text,
  lokasi text,
  created_at timestamp with time zone default now()
);

-- Create index untuk search
create index idx_wisata_nama on public.konten_wisata(nama);
create index idx_wisata_created_at on public.konten_wisata(created_at desc);
```

**Deskripsi Field:**
| Field | Type | Constraint | Deskripsi |
|-------|------|------------|-----------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `nama` | TEXT | NOT NULL | Nama destinasi wisata |
| `deskripsi` | TEXT | - | Deskripsi lengkap destinasi |
| `gambar_url` | TEXT | - | URL gambar wisata |
| `lokasi` | TEXT | - | Alamat/lokasi wisata |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | Timestamp pembuatan |

**Fungsi:**

- Menyimpan data destinasi wisata detail
- Ditampilkan di halaman `/wisata`
- Support CRUD dari admin dashboard

#### 3. Tabel: `konten_kuliner` (Kuliner Content)

```sql
create table public.konten_kuliner (
  id uuid primary key default uuid_generate_v4(),
  nama text not null,
  deskripsi text,
  gambar_url text,
  lokasi text,
  created_at timestamp with time zone default now()
);

-- Create index
create index idx_kuliner_nama on public.konten_kuliner(nama);
create index idx_kuliner_created_at on public.konten_kuliner(created_at desc);
```

**Deskripsi Field:**
| Field | Type | Constraint | Deskripsi |
|-------|------|------------|-----------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `nama` | TEXT | NOT NULL | Nama makanan/tempat kuliner |
| `deskripsi` | TEXT | - | Deskripsi kuliner |
| `gambar_url` | TEXT | - | URL gambar kuliner |
| `lokasi` | TEXT | - | Lokasi tempat kuliner |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | Timestamp pembuatan |

**Fungsi:**

- Menyimpan data kuliner Banyumas
- Ditampilkan di halaman `/kuliner`
- Managed dari admin panel

#### 4. Tabel: `konten_budaya` (Budaya Content)

#### 4. Tabel: `konten_budaya` (Budaya Content)

```sql
create table public.konten_budaya (
  id uuid primary key default uuid_generate_v4(),
  nama text not null,
  deskripsi text,
  gambar_url text,
  lokasi text,
  created_at timestamp with time zone default now()
);

-- Create index
create index idx_budaya_nama on public.konten_budaya(nama);
create index idx_budaya_created_at on public.konten_budaya(created_at desc);
```

**Deskripsi Field:**
| Field | Type | Constraint | Deskripsi |
|-------|------|------------|-----------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `nama` | TEXT | NOT NULL | Nama kesenian/budaya |
| `deskripsi` | TEXT | - | Deskripsi budaya |
| `gambar_url` | TEXT | - | URL gambar budaya |
| `lokasi` | TEXT | - | Lokasi event/pertunjukan |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | Timestamp pembuatan |

**Fungsi:**

- Menyimpan data budaya dan kesenian Banyumas
- Ditampilkan di halaman `/budaya`
- Managed dari admin dashboard

### Storage Configuration

#### Bucket: `images`

**Setup:**

```
Bucket Name: images
Visibility: Public
File Size Limit: 5MB (enforced di frontend)
Allowed MIME Types: image/jpeg, image/png, image/gif, image/webp
```

**Structure:**

```
images/
├── {timestamp}-{filename}.jpg
├── {timestamp}-{filename}.png
└── {timestamp}-{filename}.webp
```

**URL Format:**

```
https://{project-id}.supabase.co/storage/v1/object/public/images/{filename}
```

**Policies:**

```sql
-- Enable public read access
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'images' );

-- Enable authenticated insert (untuk admin)
create policy "Authenticated users can upload"
on storage.objects for insert
with check ( bucket_id = 'images' and auth.role() = 'authenticated' );

-- Enable authenticated delete (untuk admin)
create policy "Authenticated users can delete"
on storage.objects for delete
using ( bucket_id = 'images' and auth.role() = 'authenticated' );
```

---

## 🚀 Getting Started

### Prerequisites

Sebelum memulai, pastikan telah terinstal:

- **Node.js**: v18.0.0 atau lebih tinggi ([Download](https://nodejs.org))
- **npm**: v9.0.0 atau lebih tinggi (included dengan Node.js)
- **Git**: Untuk version control ([Download](https://git-scm.com))
- **Akun Supabase**: Gratis di [supabase.com](https://supabase.com)
- **Code Editor**: VS Code recommended ([Download](https://code.visualstudio.com))

### Instalasi

1. **Clone repository**

```bash
git clone https://github.com/rifkihariyanto25/sidimas.git
cd sidimas
```

#### 2. **Install Dependencies**

```bash
# Menggunakan npm
npm install

# Atau menggunakan yarn
yarn install

# Atau menggunakan pnpm
pnpm install
```

**Dependencies yang akan terinstall:**

- Next.js framework
- React & React DOM
- Supabase client library
- Swiper.js untuk slider
- Framer Motion untuk animasi
- Tailwind CSS untuk styling

#### 3. **Setup Environment Variables**

Buat file `.env.local` di root project dan isi dengan:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Admin Credentials (untuk development)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

**Cara mendapatkan Supabase credentials:**

1. Buka [supabase.com](https://supabase.com) dan login
2. Create new project atau pilih existing project
3. Buka **Settings** → **API**
4. Copy **Project URL** ke `NEXT_PUBLIC_SUPABASE_URL`
5. Copy **anon/public key** ke `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### 4. **Setup Database di Supabase**

Jalankan SQL berikut di Supabase SQL Editor:

```sql
-- ===============================================
-- SIDIMAS Database Schema Setup
-- ===============================================

-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. Create konten table (Homepage)
create table public.konten (
  id uuid primary key default uuid_generate_v4(),
  kategori text check (kategori in ('wisata', 'budaya', 'kuliner')) not null,
  gambar_url text default '',
  created_at timestamp with time zone default now()
);

-- 3. Create konten_wisata table
create table public.konten_wisata (
  id uuid primary key default uuid_generate_v4(),
  nama text not null,
  deskripsi text,
  gambar_url text,
  lokasi text,
  created_at timestamp with time zone default now()
);

-- 4. Create konten_kuliner table
create table public.konten_kuliner (
  id uuid primary key default uuid_generate_v4(),
  nama text not null,
  deskripsi text,
  gambar_url text,
  lokasi text,
  created_at timestamp with time zone default now()
);

-- 5. Create konten_budaya table
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

Server akan berjalan di [http://localhost:3000](http://localhost:3000)

**Output yang diharapkan:**

```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.5s
```

#### 7. **Verify Installation**

Buka browser dan test:

- ✅ Homepage: `http://localhost:3000`
- ✅ Wisata: `http://localhost:3000/wisata`
- ✅ Kuliner: `http://localhost:3000/kuliner`
- ✅ Budaya: `http://localhost:3000/budaya`
- ✅ Admin Login: `http://localhost:3000/admin/login`
- ✅ Admin Dashboard: `http://localhost:3000/admin`

---

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

### Login Credentials

**Development Mode:**

- URL: `http://localhost:3000/admin/login`
- Username: (sesuai `.env.local`)
- Password: (sesuai `.env.local`)

**Production:**

- Gunakan Supabase Authentication
- Setup user via Supabase Dashboard → Authentication

### Admin Features

#### 1. **Dashboard (🏠 Homepage Management)**

**Fungsi:**

- Mengelola konten hero slider homepage
- Upload gambar untuk 3 kategori: Wisata, Kuliner, Budaya
- Setiap kategori menampilkan 4 gambar terbaru di LogoLoop

**Cara Pakai:**

1. Login ke admin panel
2. Klik menu **Dashboard** di sidebar
3. Pilih **Kategori** dari dropdown (Wisata/Kuliner/Budaya)
4. Klik **Choose File** dan pilih gambar (max 5MB)
5. Preview gambar akan muncul
6. Klik **Tambah** untuk upload
7. Gambar tersimpan ke Supabase Storage bucket `images`
8. URL gambar tersimpan ke database tabel `konten`
9. Homepage otomatis update dengan gambar baru

**Validasi:**

- ✅ Format: JPG, JPEG, PNG, GIF, WebP
- ✅ Ukuran: Maksimal 5MB
- ✅ Kategori: Harus dipilih

#### 2. **Wisata Management**

**Fungsi:**

- CRUD destinasi wisata Banyumas
- Form: Nama, Deskripsi, Lokasi, Upload Gambar

**Workflow:**

```
Add → Fill Form → Upload Image → Submit
      ↓
   Database: konten_wisata table
      ↓
   Display: /wisata page
```

#### 3. **Kuliner Management**

**Fungsi:**

- CRUD kuliner dan tempat makan
- Form: Nama, Deskripsi, Lokasi, Upload Gambar

**Workflow:**

```
Add → Fill Form → Upload Image → Submit
      ↓
   Database: konten_kuliner table
      ↓
   Display: /kuliner page
```

#### 4. **Budaya Management**

**Fungsi:**

- CRUD kesenian dan budaya lokal
- Form: Nama, Deskripsi, Lokasi, Upload Gambar

**Workflow:**

```
Add → Fill Form → Upload Image → Submit
      ↓
   Database: konten_budaya table
      ↓
   Display: /budaya page
```

### Upload Gambar

- Ukuran maksimal: 5MB
- Format: JPG, JPEG, PNG, GIF, WebP
- Otomatis tersimpan di Supabase Storage bucket `images`

## 🌐 Deployment

### Deploy ke Vercel (Recommended)

#### Method 1: Via GitHub (Otomatis)

#### Method 1: Via GitHub (Otomatis)

1. **Push ke GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import di Vercel**

   - Buka [vercel.com](https://vercel.com)
   - Login dengan GitHub account
   - Klik **Add New** → **Project**
   - Import repository `rifkihariyanto25/sidimas`
   - Klik **Import**

3. **Configure Project**

   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

4. **Add Environment Variables**

   Klik **Environment Variables** dan tambahkan:

   ```
   NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
   ```

5. **Deploy**
   - Klik **Deploy**
   - Tunggu build selesai (~2-3 menit)
   - Selesai! 🎉

#### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

### Post-Deployment Checklist

- ✅ Check homepage: `https://your-app.vercel.app`
- ✅ Test hero slider functionality
- ✅ Test admin login
- ✅ Test image upload
- ✅ Verify database connection
- ✅ Check mobile responsiveness
- ✅ Test all navigation links

### Environment Variables di Vercel

Di **Vercel Dashboard** → **Settings** → **Environment Variables**:

| Key                             | Value                     | Environment                      |
| ------------------------------- | ------------------------- | -------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | `https://xxx.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJxxx...`               | Production, Preview, Development |

### Custom Domain (Optional)

1. Buka **Vercel Dashboard** → **Settings** → **Domains**
2. Klik **Add Domain**
3. Masukkan domain (contoh: `sidimas.com`)
4. Follow instruksi DNS configuration
5. Tunggu DNS propagation (~24 jam)

---

## 📖 Cara Penggunaan

### Untuk Pengunjung (Public)

#### 1. **Menjelajahi Homepage**

- Buka website
- Hero slider otomatis berganti setiap 5 detik
- Lihat showcase 3 kategori: Wisata, Kuliner, Budaya
- Klik slide untuk navigasi ke halaman kategori

#### 2. **Mengakses Halaman Kategori**

**Wisata:**

- Klik navbar **Wisata** atau slide Wisata
- Browse destinasi wisata Banyumas
- Lihat detail: nama, deskripsi, lokasi, gambar

**Kuliner:**

- Klik navbar **Kuliner** atau slide Kuliner
- Explore kuliner khas Banyumas
- Informasi tempat makan dan menu khas

**Budaya:**

- Klik navbar **Budaya** atau slide Budaya
- Pelajari kesenian dan tradisi lokal
- Timeline budaya Banyumas

### Untuk Admin

#### 1. **Login Admin**

```
URL: /admin/login
Username: (sesuai config)
Password: (sesuai config)
```

**Langkah:**

1. Buka `/admin/login`
2. Masukkan username dan password
3. Klik **Login**
4. Redirect ke admin dashboard

#### 2. **Menambah Konten Homepage (Dashboard)**

**Tujuan:** Mengisi hero slider dengan gambar kategori

**Step-by-step:**

1. Di sidebar, klik **Dashboard** (ikon 🏠)
2. Pilih **Kategori** dari dropdown:
   - Wisata
   - Kuliner
   - Budaya
3. Klik **Choose File**
4. Pilih gambar (JPG/PNG, max 5MB)
5. Preview muncul otomatis
6. Klik **Tambah**
7. Loading... Upload ke Supabase Storage
8. Success! Gambar muncul di list
9. Refresh homepage → Gambar tampil di LogoLoop

**Edit/Hapus:**

- **Edit**: Klik tombol ✏️ → Upload gambar baru → Save
- **Hapus**: Klik tombol 🗑️ → Konfirmasi → Delete

#### 3. **Mengelola Konten Wisata**

**Step-by-step:**

1. Klik sidebar **Wisata**
2. Lihat list konten wisata existing
3. Klik **Tambah Wisata** (tombol + hijau)
4. Isi form:
   - **Nama**: Nama destinasi (contoh: "Curug Cipendok")
   - **Deskripsi**: Deskripsi lengkap destinasi
   - **Lokasi**: Alamat lengkap (contoh: "Cilongok, Banyumas")
   - **Gambar**: Upload foto destinasi
5. Preview gambar muncul
6. Klik **Tambah**
7. Data tersimpan ke database `konten_wisata`
8. Konten muncul di halaman `/wisata`

**Edit Konten:**

1. Klik tombol **Edit** (✏️) pada item
2. Form terisi dengan data existing
3. Ubah field yang diinginkan
4. Upload gambar baru (optional)
5. Klik **Update**

**Hapus Konten:**

1. Klik tombol **Hapus** (🗑️)
2. Konfirmasi penghapusan
3. Data dan gambar terhapus permanent

#### 4. **Mengelola Konten Kuliner**

**Same workflow as Wisata:**

- Sidebar → **Kuliner**
- Form: Nama, Deskripsi, Lokasi, Gambar
- Table: `konten_kuliner`
- Display: `/kuliner` page

#### 5. **Mengelola Konten Budaya**

**Same workflow as Wisata:**

- Sidebar → **Budaya**
- Form: Nama, Deskripsi, Lokasi, Gambar
- Table: `konten_budaya`
- Display: `/budaya` page

### Tips & Best Practices

#### Upload Gambar

✅ **DO:**

- Gunakan gambar berkualitas tinggi (min 1280x720px)
- Compress gambar sebelum upload (gunakan TinyPNG)
- Gunakan format JPG untuk foto, PNG untuk logo/grafis
- Rename file dengan nama deskriptif (`curug-cipendok.jpg`)

❌ **DON'T:**

- Upload gambar > 5MB
- Gunakan gambar blur/low quality
- Upload file dengan nama random (`IMG_1234.jpg`)

#### Content Writing

✅ **DO:**

- Tulis deskripsi informatif dan menarik
- Include informasi penting (jam buka, harga, akses)
- Gunakan bahasa Indonesia yang baik dan benar
- Tambahkan keyword untuk SEO

❌ **DON'T:**

- Copy-paste dari website lain
- Tulis deskripsi terlalu pendek
- Gunakan bahasa informal/slang berlebihan

---

## 🔧 Troubleshooting

### Common Issues

#### 1. **Build Error: Module not found**

**Error:**

```
Module not found: Can't resolve '@/lib/supabase'
```

**Solution:**

```bash
# Check jsconfig.json exists
# Verify paths configuration
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### 2. **Supabase Connection Error**

**Error:**

```
Error: Invalid Supabase URL
```

**Solution:**

1. Check `.env.local` file exists
2. Verify `NEXT_PUBLIC_SUPABASE_URL` format
3. Ensure no trailing slash in URL
4. Restart dev server: `npm run dev`

#### 3. **Image Upload Failed**

**Error:**

```
Bucket not found: images
```

**Solution:**

1. Buka Supabase Dashboard → Storage
2. Create bucket named `images`
3. **IMPORTANT:** Check **Public bucket**
4. Retry upload

#### 4. **Hero Slider Images Not Showing**

**Diagnosis:**

```javascript
// Open browser console (F12)
// Check logs:
console.log("📸 Wisata data:", data); // Should show array
```

**Possible Causes:**

- ❌ Database table `konten` empty
- ❌ `gambar_url` field null/empty
- ❌ Supabase RLS blocking query
- ❌ Wrong bucket permissions

**Solution:**

1. Check database has data:
   ```sql
   SELECT * FROM konten WHERE kategori = 'wisata';
   ```
2. Verify `gambar_url` has valid URLs
3. Check Supabase RLS policies
4. Ensure bucket `images` is public

#### 5. **Vercel Deployment Failed**

**Error:**

```
Error: NEXT_PUBLIC_SUPABASE_URL is not defined
```

**Solution:**

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add missing variables
3. Redeploy: **Deployments** → **...** → **Redeploy**

### Debug Mode

Enable console logs untuk debugging:

```javascript
// src/app/page.js
useEffect(() => {
  const fetchData = async () => {
    console.log("🔍 Fetching data...");
    const { data, error } = await supabase.from("konten").select("*");
    console.log("📊 Data:", data);
    console.log("❌ Error:", error);
  };
  fetchData();
}, []);
```

---

## 🚀 Performance Optimization

### Current Optimizations

1. **Next.js Image Component**

   - Automatic image optimization
   - Lazy loading by default
   - Responsive images with srcset

2. **Code Splitting**

   - Automatic route-based splitting
   - Dynamic imports for heavy components

3. **Static Generation**
   - Pre-render pages at build time
   - Faster page loads

### Further Optimizations (TODO)

- [ ] Implement ISR (Incremental Static Regeneration)
- [ ] Add image blur placeholders
- [ ] Implement pagination for large datasets
- [ ] Add service worker for offline support
- [ ] Optimize bundle size with tree shaking
- [ ] Implement Redis caching for Supabase queries

---

## 📊 Project Statistics

| Metric              | Value                                                    |
| ------------------- | -------------------------------------------------------- |
| **Lines of Code**   | ~5,000+                                                  |
| **Components**      | 10+                                                      |
| **Pages**           | 7                                                        |
| **Database Tables** | 4                                                        |
| **Tech Stack**      | Next.js + Supabase                                       |
| **Deployment**      | Vercel (Production)                                      |
| **Live URL**        | [sidimas-six.vercel.app](https://sidimas-six.vercel.app) |

---

## 🏆 Informasi Lomba

**Project:** SIDIMAS - Sistem Informasi Digital Banyumas  
**Tim:** Asal Masuk  
**Institusi:** Telkom University Purwokerto  
**Kategori:** Web Development / Digital Innovation  
**Target:** Digitalisasi Pariwisata Kabupaten Banyumas

### 🎯 Keunggulan Project

1. ✅ **Real-time Content Management** - Admin dapat update konten kapan saja
2. ✅ **Responsive Design** - Optimal di semua perangkat
3. ✅ **Modern Tech Stack** - Next.js 14 + Supabase
4. ✅ **SEO Optimized** - Untuk visibilitas maksimal
5. ✅ **Scalable Architecture** - Siap untuk pertumbuhan
6. ✅ **User-friendly Interface** - Mudah digunakan semua kalangan
7. ✅ **Cloud Deployment** - Hosting di Vercel dengan CDN global

---

## 🤝 Contributing

Contributions are welcome! Project ini terbuka untuk kontribusi.

### How to Contribute

1. **Fork repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open Pull Request**

### Contribution Guidelines

- ✅ Follow existing code style
- ✅ Write descriptive commit messages
- ✅ Test your changes locally
- ✅ Update documentation if needed
- ✅ Ensure no breaking changes

---

## 📝 License

This project is **open source** and available for educational purposes.

---

## 👥 Team

<div align="center">

### **Tim Asal Masuk**

**Telkom University Purwokerto**

</div>

| Role | Name                       | Responsibility                         |
| ---- | -------------------------- | -------------------------------------- |
| 👨‍💻   | **Rifki Aditya Hariyanto** | Backend Developer & Project Lead       |
| 👨‍💻   | **Muhammad Fikri Fauzi**   | Frontend Developer & UI Implementation |
| 👨‍💻   | **Muhamad Dimas Nurzaky**  | Frontend Developer & UI/UX Designer    |
| 👩‍💻   | **Aghisna Aulia Rahma**    | UI/UX Designer & Content Management    |

---

## 📞 Contact & Support

<div align="center">

**🌐 Live Website:** [https://sidimas-six.vercel.app](https://sidimas-six.vercel.app)
**🌐 Admin Panel:** [https://sidimas-six.vercel.app/admin/login](https://sidimas-six.vercel.app/admin/login)

**📧 Email:** hariyantorifki25@gmail.com  
**💻 GitHub:** [rifkihariyanto25/sidimas](https://github.com/rifkihariyanto25/sidimas)  
**🎓 Institution:** Telkom University Purwokerto

</div>

---

## 🙏 Acknowledgments

Terima kasih kepada:

- **Next.js Team** - Framework React yang powerful
- **Supabase** - Backend-as-a-Service yang menakjubkan
- **Tailwind CSS** - CSS framework yang memudahkan styling
- **Vercel** - Platform deployment yang cepat dan reliable
- **Kabupaten Banyumas** - Untuk data dan dukungan
- **Telkom University Purwokerto** - Dukungan akademik dan fasilitas
- **Tim Juri Lomba** - Kesempatan untuk berpartisipasi

---

<div align="center">

### 🌟 Made with ❤️ for Kabupaten Banyumas

**Jelajahi Keindahan Bumi Ngapak**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-success?style=for-the-badge)](https://sidimas-six.vercel.app)
[![Admin Panel](https://img.shields.io/badge/🔐_Admin-Login_Here-blue?style=for-the-badge)](https://sidimas-six.vercel.app/admin/login)

---

**⭐ Star this repo if you find it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/rifkihariyanto25/sidimas?style=social)](https://github.com/rifkihariyanto25/sidimas)
[![GitHub forks](https://img.shields.io/github/forks/rifkihariyanto25/sidimas?style=social)](https://github.com/rifkihariyanto25/sidimas/fork)
[![GitHub watchers](https://img.shields.io/github/watchers/rifkihariyanto25/sidimas?style=social)](https://github.com/rifkihariyanto25/sidimas)

---

**© 2025 Tim Asal Masuk - Telkom University Purwokerto**

_Project Lomba - SIDIMAS: Digitalisasi Pariwisata Banyumas_

</div>
