# 🗄️ Update Database Supabase (OPSIONAL)

## ℹ️ Info Penting

**Fitur multi-upload 5 gambar sudah bisa digunakan TANPA update database!**

Sistem saat ini menggunakan kolom `gambar_url` yang sudah ada, dengan menyimpan multiple URLs menggunakan separator `|||`.

**Update database hanya diperlukan jika Anda ingin menambahkan kolom `subtitle`.**

---

## 🎯 Dua Pilihan:

### Pilihan 1: TANPA Update Database (Recommended - Lebih Mudah) ✅

**Yang Sudah Berfungsi:**

- ✅ Upload 1-5 gambar sekaligus
- ✅ Preview multiple images
- ✅ Delete individual images
- ✅ Display multiple images di list
- ✅ Edit konten dengan multiple images

**Yang Belum Tersedia:**

- ❌ Field Subtitle (di-comment di kode)

**Tidak perlu melakukan apa-apa!** Langsung bisa digunakan.

---

### Pilihan 2: Dengan Update Database (Untuk Fitur Subtitle)

Jika Anda ingin menambahkan fitur **Subtitle**, ikuti langkah berikut:

#### 1️⃣ Login ke Supabase Dashboard

- Buka [https://supabase.com](https://supabase.com)
- Login dan pilih project Anda

#### 2️⃣ Buka SQL Editor

- Klik menu **SQL Editor** di sidebar kiri
- Klik **New Query**

#### 3️⃣ Jalankan Query Berikut

```sql
-- Tambah kolom subtitle
ALTER TABLE konten
ADD COLUMN IF NOT EXISTS subtitle TEXT;
```

#### 4️⃣ Update Kode AdminDashboard.js

Setelah menambahkan kolom `subtitle`, uncomment baris-baris berikut di `AdminDashboard.js`:

**Cari dan uncomment:**

```javascript
// Line ~18: State
const [subtitle, setSubtitle] = useState("");

// Line ~95: handleEdit
setSubtitle(item.subtitle || "");

// Line ~106: cancelEdit
setSubtitle("");

// Line ~185: Reset form after submit
setSubtitle("");

// Line ~520-565: Form input subtitle (remove comment wrapper)

// Line ~995-1005: Display subtitle in list (remove comment wrapper)
```

---

## 📝 Format Penyimpanan Multiple Images

### Di Database:

```
gambar_url column (TEXT):
"https://url1.jpg|||https://url2.jpg|||https://url3.jpg"
```

### Di Kode:

```javascript
// Save
const urls = ["url1", "url2", "url3"];
gambar_url = urls.join("|||");

// Load
const urls = item.gambar_url.split("|||");
```

---

## ✅ Verifikasi

### Test Multi-Upload (Tanpa Update DB):

1. ✅ Buka `/admin`
2. ✅ Upload 3 gambar sekaligus
3. ✅ Lihat preview muncul
4. ✅ Submit konten
5. ✅ Cek di list, semua gambar muncul

### Test Subtitle (Setelah Update DB):

1. ✅ Uncomment kode subtitle
2. ✅ Isi field subtitle
3. ✅ Submit konten
4. ✅ Subtitle muncul dengan warna hijau

---

## � Rekomendasi

**Untuk Development/Testing:**

- Gunakan **Pilihan 1** (tanpa update DB)
- Lebih cepat dan simple
- Fitur utama (multi-upload) sudah jalan

**Untuk Production:**

- Gunakan **Pilihan 2** (dengan update DB)
- Struktur data lebih rapi
- Fitur subtitle tersedia
