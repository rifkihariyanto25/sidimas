# 🚀 Quick Start Guide - Admin Dashboard v2.0

## 📋 Panduan Singkat Penggunaan Fitur Baru

---

## 1️⃣ Menambah Konten dengan Subtitle & Multiple Images

### Step-by-Step:

1. **Login ke Admin Dashboard**

   - Buka `/admin/login`
   - Masukkan kredensial admin

2. **Isi Form Konten Baru**

   ```
   📝 Nama Konten: Baturraden
   📝 Sub Judul: Wisata Alam Sejuk di Kaki Gunung Slamet ← BARU!
   📝 Kategori: Wisata
   📝 Deskripsi: Destinasi wisata alam...
   ```

3. **Upload Gambar (1-5 foto)** ← BARU!

   - Klik area upload "Klik untuk upload gambar"
   - Pilih 1-5 gambar sekaligus (hold Ctrl/Cmd untuk multi-select)
   - Lihat preview dalam grid
   - Counter otomatis muncul: **3/5** ✅

4. **Manage Gambar**

   - ❌ Hapus gambar spesifik → klik tombol ✕ di preview
   - 🗑️ Hapus semua → klik tombol "Hapus Semua Gambar"
   - ➕ Tambah gambar lagi → klik upload area (jika belum 5)

5. **Submit**
   - Klik tombol **"✨ Tambah Konten"**
   - Tunggu upload selesai
   - Alert sukses muncul ✅

---

## 2️⃣ Mengedit Konten yang Sudah Ada

1. **Klik tombol Edit (✏️)** di konten yang mau diedit
2. **Form otomatis terisi** dengan data konten
3. **Gambar yang sudah ada tetap muncul** di preview
4. **Bisa tambah/hapus gambar:**
   - Hapus gambar lama yang tidak diinginkan
   - Tambah gambar baru (max total 5 gambar)
5. **Update Subtitle** jika perlu
6. **Klik "💾 Update Konten"**

---

## 3️⃣ Fitur-Fitur Baru

### ✨ Subtitle

- **Opsional** (boleh dikosongkan)
- **Tampil dengan warna hijau** di list konten
- **Contoh penggunaan:**
  - Nama: "Baturraden"
  - Subtitle: "Wisata Alam Sejuk di Kaki Gunung Slamet"

### 📷 Multi-Upload (5 Gambar)

- **Upload sekaligus:** Select 5 gambar langsung
- **Upload bertahap:** Upload 2 gambar dulu, nanti tambah lagi 3 gambar
- **Preview Grid:** Semua gambar tampil rapi dalam grid
- **Numbering:** Setiap gambar punya nomor urut (#1, #2, dst)
- **Counter:** Selalu tahu sudah upload berapa gambar (3/5)

### 🎨 UI Improvements

- **Grid Layout** untuk preview images
- **Hover Effects** pada tombol
- **Badge Counter** dengan warna hijau
- **Info Slot Tersisa:** "2 slot tersisa"
- **Display Multiple Images** di list konten

---

## ⚠️ Validasi & Batasan

| Validasi        | Keterangan          |
| --------------- | ------------------- |
| **Max Gambar**  | 5 gambar per konten |
| **Max Size**    | 5MB per file        |
| **Format**      | PNG, JPG, JPEG      |
| **Nama Konten** | Wajib diisi         |
| **Subtitle**    | Opsional            |
| **Deskripsi**   | Opsional            |

### Error Messages:

```
⚠️ Maksimal 2 gambar lagi (Total maksimal 5 gambar)
⚠️ Beberapa file melebihi 5MB. Silakan pilih file yang lebih kecil.
✅ Konten berhasil ditambahkan!
✅ Konten berhasil diupdate!
```

---

## 🎯 Tips & Tricks

### 💡 Upload Multiple Images

1. **Windows:** Hold `Ctrl` + Click multiple files
2. **Mac:** Hold `Cmd` + Click multiple files
3. **All:** Drag select area in file explorer

### 💡 Best Practices

- ✅ Upload gambar berkualitas tinggi
- ✅ Compress gambar sebelum upload (< 5MB)
- ✅ Gunakan gambar landscape untuk hasil terbaik
- ✅ Upload minimal 3 gambar untuk konten wisata
- ✅ Isi subtitle untuk informasi tambahan

### 💡 Urutan Gambar

- Gambar pertama (#1) = Gambar utama
- Urutkan gambar dari yang paling menarik
- Bisa hapus & upload ulang untuk re-order

---

## 📱 Display di Frontend

### List Konten (Admin):

```
┌─────────────────────────────────┐
│ [IMG1] [IMG2] [IMG3] [IMG4]     │ ← Grid 4 gambar
│                                 │
│ 🏞️ WISATA                       │
│ Baturraden                      │
│ Wisata Alam Sejuk di Kaki...   │ ← Subtitle (hijau)
│ Destinasi wisata alam yang...  │ ← Deskripsi
│                                 │
│                    [Edit] [Del] │
└─────────────────────────────────┘
```

### Image Numbering:

```
1/5  2/5  3/5  4/5  5/5
[#1] [#2] [#3] [#4] [#5]
```

---

## 🐛 Troubleshooting

### Gambar tidak terupload?

- ✅ Cek ukuran file < 5MB
- ✅ Cek format gambar (PNG/JPG/JPEG)
- ✅ Cek koneksi internet
- ✅ Cek Supabase Storage bucket "images" sudah dibuat

### Subtitle tidak tersimpan?

- ✅ Update database dulu (lihat `DATABASE_UPDATE_INSTRUCTIONS.md`)
- ✅ Cek kolom `subtitle` sudah ada di tabel `konten`

### Gambar lama hilang saat edit?

- ✅ Jangan hapus semua gambar
- ✅ Gambar lama otomatis tetap ada jika tidak dihapus
- ✅ Bisa tambah gambar baru tanpa hapus yang lama

---

## 📞 Butuh Bantuan?

- 📖 Baca `ADMIN_CHANGELOG.md` untuk detail teknis
- 🗄️ Baca `DATABASE_UPDATE_INSTRUCTIONS.md` untuk setup database
- 💬 Hubungi tim development

---

**Happy Managing! 🎉**
