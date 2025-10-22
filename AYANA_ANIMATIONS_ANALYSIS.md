# Analisis Animasi Website Ayana & Implementasi

## 📊 Analisis Website Ayana (https://www.ayana.com/bali/dining/)

### Teknologi & Animasi yang Digunakan:

#### 1. **Clip-path Animation**

- **Class:** `js_soloClip`, `js_clip`, `is_clipVisible`
- **Fungsi:** Reveal effect pada gambar dengan polygon clip-path
- **Implementasi:** Animasi reveal dari kiri ke kanan

```css
clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
```

#### 2. **Parallax Effect**

- **Attribute:** `data-parallax="0.1"`, `data-parallax="0.2"`, `data-parallax="0.3"`
- **Fungsi:** Pergerakan elemen dengan kecepatan berbeda saat scroll
- **Implementasi:** GSAP ScrollTrigger dengan scrub

#### 3. **Wave Animation**

- **Attribute:** `data-wave-amp="2"`
- **Fungsi:** Efek gelombang halus pada gambar
- **Implementasi:** Keyframe animation translateY

#### 4. **Custom Slider**

- **Class:** `m_slider`, `js_slider`, `js_slider_item`
- **Fungsi:** Slider gambar dengan transform translate
- **Features:**
  - Custom cursor dengan arrow SVG
  - Smooth transition antar slide
  - Organic dots navigation

#### 5. **Typography Animation**

- **Class:** `js_heading`, `js_typo`, `js_heading_text`
- **Fungsi:** Text reveal dengan custom letter spacing
- **Implementasi:** Staggered character animation

#### 6. **Observer Pattern**

- **Attribute:** `data-observer-id`
- **Fungsi:** Trigger animasi ketika element masuk viewport
- **Implementasi:** IntersectionObserver API / Framer Motion useInView

#### 7. **Custom Cursor**

- **Class:** `js_cursor`, `js_cursor_body`, `js_cursor_arw`
- **Fungsi:** Cursor khusus untuk interactive elements
- **Design:** Arrow SVG yang mengikuti mouse

#### 8. **Module System**

- **Attribute:** `data-initialized-module-img`, `data-initialized-module-slider`
- **Fungsi:** Lazy loading dan initialization tracking

---

## 🎨 Implementasi pada Halaman Budaya

### Struktur Animasi yang Diterapkan:

#### 1. **Clip-path Reveal Animation**

```javascript
// Framer Motion
<motion.div
  initial={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
  animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
  transition={{ duration: 1.2, ease: [0.645, 0.045, 0.355, 1] }}
>
```

#### 2. **GSAP Parallax Effect**

```javascript
gsap.to(element, {
  y: -30,
  ease: "none",
  scrollTrigger: {
    trigger: element,
    start: "top bottom",
    end: "bottom top",
    scrub: 1.5,
  },
});
```

#### 3. **Diamond Image Animation**

- Rotation effect saat scroll
- Hover scale interaction
- Floating animation dengan keyframes

#### 4. **Slider dengan Custom Cursor**

- Auto-play slider (3 detik per slide)
- Manual navigation dengan dots
- Custom SVG cursor on hover
- Smooth image transitions

#### 5. **CTA Section Stagger Animation**

- Sequential reveal: Image → Tagline → Title → Button
- Parallax pada gambar CTA
- Button arrow animation dengan gradient shine

---

## 📁 File yang Dimodifikasi

### 1. **page.js** (src/app/budaya/page.js)

#### Imports Baru:

```javascript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
```

#### Komponen BudayaSection:

- **Refs:** `sliderRef`, `diamondRef`, `descriptionRef`, `ctaImageRef`, `galleryRef`
- **State:** `isClipVisible` untuk clip animation trigger
- **GSAP Effects:**
  - Parallax pada slider images (berbeda kecepatan)
  - Diamond rotation & scale
  - CTA image parallax
  - Text reveal animation

#### Key Features:

```javascript
// Parallax images in gallery
images.forEach((img, idx) => {
  gsap.to(img, {
    y: () => idx * 10 - 20,
    ease: "none",
    scrollTrigger: { scrub: 1 },
  });
});

// Diamond rotation
gsap.fromTo(
  diamondRef.current,
  { rotation: 45, scale: 0.9 },
  { rotation: 50, scale: 1, scrollTrigger: { scrub: 2 } }
);
```

### 2. **budaya.css** (src/app/budaya/budaya.css)

#### Animasi Baru yang Ditambahkan:

1. **Clip Reveal Animation**

```css
@keyframes clipReveal {
  from {
    clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
  }
  to {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
}
```

2. **Wave Effect**

```css
@keyframes waveEffect {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-5px) scale(1.01);
  }
}
```

3. **Text Reveal**

```css
@keyframes textReveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

4. **Diamond Float**

```css
@keyframes diamondFloat {
  0%,
  100% {
    transform: rotate(45deg) translateY(0);
  }
  50% {
    transform: rotate(45deg) translateY(-10px);
  }
}
```

5. **Pulse Background**

```css
@keyframes pulseBackground {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}
```

6. **Fade In Up**

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

7. **Pulse Glow (Tagline)**

```css
@keyframes pulseGlow {
  0%,
  100% {
    box-shadow: 0 4px 20px rgba(139, 115, 85, 0.15);
  }
  50% {
    box-shadow: 0 6px 30px rgba(139, 115, 85, 0.25);
  }
}
```

8. **Image Load**

```css
@keyframes imageLoad {
  to {
    opacity: 1;
  }
}
```

#### Custom Styles:

- **Custom Slider Cursor:** SVG cursor dengan opacity transition
- **Organic Slider Dots:** Scale animation dengan box-shadow
- **CTA Button Shine:** Gradient overlay animation
- **Staggered Delays:** Sequential animation untuk child elements

---

## 🎯 Fitur-Fitur Ayana yang Berhasil Diterapkan

### ✅ Implemented:

1. ✅ **Clip-path reveal animation** (js_clip, is_clipVisible)
2. ✅ **Parallax scrolling** dengan GSAP ScrollTrigger (data-parallax)
3. ✅ **Wave animation** pada deskripsi (data-wave-amp)
4. ✅ **Custom slider** dengan auto-play dan manual navigation
5. ✅ **Typography animation** dengan staggered reveal
6. ✅ **Observer pattern** menggunakan useInView
7. ✅ **Custom cursor** untuk slider interaction
8. ✅ **Diamond rotation** dengan hover effect
9. ✅ **CTA section stagger** animation
10. ✅ **Image scale** on load dan hover
11. ✅ **Smooth transitions** dengan cubic-bezier easing
12. ✅ **Responsive design** dengan mobile optimization

### 🎨 Animation Details:

| Element       | Animation Type       | Duration | Easing                               |
| ------------- | -------------------- | -------- | ------------------------------------ |
| Clip Reveal   | clip-path            | 1.2s     | cubic-bezier(0.645, 0.045, 0.355, 1) |
| Parallax      | transform Y          | scrub    | none (scroll-linked)                 |
| Diamond Float | rotate + translateY  | 6s       | ease-in-out infinite                 |
| Text Reveal   | opacity + translateY | 0.8s     | cubic-bezier(0.645, 0.045, 0.355, 1) |
| Image Load    | opacity              | 0.8s     | ease-out                             |
| Wave Effect   | translateY + scale   | 3s       | ease-in-out infinite                 |
| Pulse Glow    | box-shadow           | 4s       | ease-in-out infinite                 |

---

## 🚀 Cara Penggunaan

### 1. Install Dependencies (sudah ada):

```bash
npm install framer-motion gsap
```

### 2. Jalankan Development Server:

```bash
npm run dev
```

### 3. Akses Halaman:

```
http://localhost:3000/budaya
```

### 4. Testing Animasi:

- **Scroll** halaman untuk trigger parallax
- **Hover** pada diamond image untuk scale effect
- **Hover** pada slider untuk custom cursor
- **Click** dots untuk navigation
- **Wait** untuk auto-slider (3 detik per slide)

---

## 🎨 Perbedaan dengan Ayana Original

### Yang Sama:

- Clip-path reveal animation
- Parallax effect pada scroll
- Custom slider dengan dots
- Typography animation
- Observer pattern
- Staggered animations

### Penyesuaian:

- Color palette: Brown theme (#8b7355) sesuai Banyumas
- Layout: Disesuaikan dengan budaya content (10 sections)
- Typography: Bahasa Indonesia dengan font Georgia
- Content structure: Header + Slider + Description + Diamond + CTA

---

## 📝 Catatan Teknis

### Performance:

- GSAP ScrollTrigger di-register sekali
- useEffect cleanup untuk prevent memory leaks
- CSS animations untuk performance optimal
- will-change property pada animated elements

### Browser Support:

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Clip-path support: ~96% global
- GSAP compatibility: Universal
- Framer Motion: React 18+

### Optimization:

- Lazy loading dapat ditambahkan untuk images
- Next.js Image component untuk production
- CSS containment untuk improve rendering
- requestAnimationFrame untuk smooth animations

---

## 🔧 Troubleshooting

### Jika animasi tidak smooth:

1. Check browser hardware acceleration
2. Reduce parallax scrub values
3. Disable wave animations on low-end devices

### Jika slider tidak auto-play:

1. Verify useEffect dependencies
2. Check interval cleanup
3. Ensure budayaData has 5 images per item

### Jika GSAP errors:

1. Verify ScrollTrigger registration
2. Check element refs are attached
3. Ensure GSAP context cleanup

---

## 📚 Resources

- [Ayana Website](https://www.ayana.com/bali/dining/)
- [GSAP ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [MDN Clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)

---

**Developed by:** Rifki Hariyanto
**Date:** January 2025
**Project:** Sidimas - Sistem Informasi Dinas Pariwisata Banyumas
