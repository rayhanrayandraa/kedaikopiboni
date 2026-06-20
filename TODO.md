# Agent Kedaikopiboni — Awwwards-Level Landing Page (React + Vite)

## Senior Developer Mindset
Setiap baris kode harus mempertimbangkan: **mobile-first, performance, scalability, accessibility, maintainability, dan pixel-perfect visuals.** Ini bukan landing page biasa — ini portofolio yang harus bersaing di level Awwwards.

## Mobile-First Commandments
1. **Desain untuk 375px dulu, lalu scale up** — bukan sebaliknya
2. **Touch targets minimal 44x44px** — jangan bikin user jemari salah tap
3. **Image sequence di mobile: kurangi resolusi canvas 50%** — performa > fidelity
4. **GSAP animasi di mobile: durasi lebih cepat, efek lebih ringan** — hindari lag
5. **Lenis smooth scroll: nonaktifkan di mobile < 768px** — native scroll lebih natural
6. **Semua font: ukuran minimal 16px** — cegah iOS zoom on focus
7. **Test di Chrome DevTools + real device** — emulator saja tidak cukup

---

## Tech Stack
- **React 18 + TypeScript + Vite**
- **GSAP** (ScrollTrigger, Flip, Motion)
- **Lenis** — smooth scroll (desktop only)
- **Canvas API** — render image sequence
- **CSS Modules** + CSS custom properties (light/dark mode)
- **React Lazy + Suspense** — code splitting

---

## TODO

### 1. Project Scaffolding
- [ ] `npm create vite@latest . -- --template react-ts`
- [ ] Install deps: `gsap`, `@studio-freight/lenis`, `react-intersection-observer`
- [ ] Hapus boilerplate
- [ ] Struktur folder:
  ```
  src/
    components/
      layout/
        Header.tsx
        Footer.tsx
        SmoothScroll.tsx
      sections/
        Hero.tsx
        About.tsx
        Menu.tsx
        Contact.tsx
      ui/
        Preloader.tsx
        ToggleTheme.tsx
        CTAButton.tsx
    hooks/
      useImageSequence.ts
      useScrollProgress.ts
      useTheme.ts
      useIsMobile.ts
    utils/
      preloadImages.ts
      framePath.ts
      responsiveCanvas.ts
    types/
      index.ts
    constants/
      frames.ts
      menu.ts
      breakpoints.ts
    styles/
      globals.css
      variables.css
    App.tsx
    main.tsx
  ```

### 2. Types (`types/index.ts`)
- [ ] Definisikan `FrameData`, `MenuItem`, `Theme`, `Breakpoint`
- [ ] Gunakan strictly typed interfaces, no `any`

### 3. Breakpoints & Constants (`constants/breakpoints.ts`)
- [ ] `MOBILE: 375`, `TABLET: 768`, `DESKTOP: 1024`, `WIDE: 1440`
- [ ] `IS_MOBILE`: window width < 768
- [ ] `CANVAS_SCALE`: 0.5 untuk mobile, 1 untuk desktop
- [ ] `FRAME_QUALITY`: `WEBP_QUALITY_MOBILE: 60`, `WEBP_QUALITY_DESKTOP: 85`

### 4. Canvas Image Sequence (`hooks/useImageSequence.ts`)
- [ ] Terima `canvasRef`, `totalFrames`, `frameDir`, `digits`
- [ ] **Mobile**: render canvas dengan resolusi 50% (set `canvas.width = targetW * 0.5`)
- [ ] Preload images via `Promise.all` + `new Image()` — track progress
- [ ] Render frame dengan `ctx.drawImage()` — anti flicker
- [ ] `requestAnimationFrame` + throttle (30fps di mobile, 60fps di desktop)
- [ ] Cleanup: revoke object URLs, cancel animation frame
- [ ] Return: `currentIndex`, `isLoaded`, `loadProgress`

### 5. Responsive Canvas (`utils/responsiveCanvas.ts`)
- [ ] Fungsi `getCanvasSize()` — return width/height based on breakpoint
- [ ] Fungsi `getFrameQuality()` — return kualitas WebP sesuai device
- [ ] Handle `devicePixelRatio` untuk sharp display di Retina (desktop only — matikan di mobile hemat performa)

### 6. Mobile Detection (`hooks/useIsMobile.ts`)
- [ ] `useIsMobile()` — return boolean, listen resize
- [ ] Matikan Lenis saat mobile
- [ ] Shortcut: `const [isMobile] = useIsMobile()`

### 7. Preloader (`components/ui/Preloader.tsx`)
- [ ] **Mobile**: progress bar lebih besar, teks lebih jelas, loading lebih cepat (skip GSAP heavy animation)
- [ ] **Desktop**: GSAP logo animate + progress bar dramatis
- [ ] Barrier: user tidak bisa scroll sebelum preload selesai

### 8. Smooth Scroll (`components/layout/SmoothScroll.tsx`)
- [ ] `Lenis` hanya aktif di **≥ 768px** — mobile pakai native scroll
- [ ] Integrasi GSAP ScrollTrigger: `lenis.on('scroll', ScrollTrigger.update)`
- [ ] Provide scroll instance via React context
- [ ] Cleanup on unmount

### 9. Hero Section (`components/sections/Hero.tsx`)
- [ ] Full viewport, fixed position
- [ ] **Mobile**: canvas lebih kecil (50% res), touch scroll tetap 60fps
- [ ] **Mobile**: teks hero lebih besar, padding kiri-kanan 24px, CTA full-width
- [ ] **Desktop**: GSAP stagger fade-in title, subtitle, CTA
- [ ] **Mobile**: fade-in sederhana (CSS animation, no GSAP — hemat memory)
- [ ] Overlay gradient — lebih gelap di mobile (kontras di layar kecil)
- [ ] Scroll indicator di bottom — hide di mobile (gesture sudah jelas)
- [ ] Setelah scroll lewat viewport → frame terakhir freeze

### 10. Navbar (`components/layout/Header.tsx`)
- [ ] **Mobile**: `position: fixed`, height 56px (compact)
- [ ] **Mobile**: hamburger icon (bukan "Menu" text) — tap target 48x48
- [ ] **Mobile**: mobile drawer dari kanan, cover 100% width, backdrop blur
- [ ] **Mobile**: nav link vertikal, font size 20px, tap target 48px
- [ ] **Desktop**: horizontal nav, transparan → solid on scroll
- [ ] Theme toggle (moon/sun)

### 11. About Section (`components/sections/About.tsx`)
- [ ] **Mobile**: single column — image full-width, text di bawah
- [ ] **Desktop**: asymmetrical layout
- [ ] **Mobile**: stat counter ditampilkan sebagai row horizontal, angka lebih besar
- [ ] **Mobile**: padding section 48px 24px
- [ ] **Desktop**: GSAP clip-path reveal + slide-up text

### 12. Menu Section (`components/sections/Menu.tsx`)
- [ ] **Mobile**: single column grid, card full-width
- [ ] **Mobile**: card padding 16px, gambar ratio 16:9
- [ ] **Desktop**: 3-column grid, masonry atau staggered
- [ ] **Mobile**: hover effect diubah jadi tap effect (active state)
- [ ] GSAP stagger reveal — nonaktifkan di mobile, pakai CSS `animate-on-enter` aja

### 13. Contact / Reservation (`components/sections/Contact.tsx`)
- [ ] **Mobile**: stacked layout — form di atas, info di bawah
- [ ] **Mobile**: input fields full-width, font size 16px (cegah iOS zoom)
- [ ] **Mobile**: Google Maps embed ratio 4:3
- [ ] **Desktop**: split layout form kiri, info kanan
- [ ] CTA WhatsApp — di mobile langsung buka `wa.me` link

### 14. Footer (`components/layout/Footer.tsx`)
- [ ] **Mobile**: stacked vertikal, center align
- [ ] **Desktop**: grid horizontal
- [ ] Back to top button — muncul setelah scroll 2x viewport

### 15. Theme System (`hooks/useTheme.ts` + `styles/variables.css`)
- [ ] CSS custom properties untuk semua token warna
- [ ] `useTheme()` hook: toggle, detect `prefers-color-scheme`, persist ke localStorage
- [ ] Transisi smooth antar theme

#### Light Mode Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#FFF8F0` | Background utama (krem hangat) |
| `--bg-secondary` | `#F5E6D3` | Card / section alt |
| `--text-primary` | `#2C1810` | Teks utama |
| `--text-secondary` | `#6B4C3B` | Teks sekunder |
| `--accent` | `#C67F4E` | Aksen / CTA |
| `--accent-hover` | `#A8652E` | Hover aksen |
| `--border` | `#E8D5C4` | Garis / divider |
| `--overlay` | `rgba(0,0,0,0.4)` | Hero overlay |

#### Dark Mode Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#1A1110` | Background utama |
| `--bg-secondary` | `#2C1810` | Card / section alt |
| `--text-primary` | `#F5E6D3` | Teks utama |
| `--text-secondary` | `#C4A999` | Teks sekunder |
| `--accent` | `#D4A574` | Aksen / CTA |
| `--accent-hover` | `#E8C49A` | Hover aksen |
| `--border` | `#3D2A1E` | Garis / divider |
| `--overlay` | `rgba(0,0,0,0.6)` | Hero overlay |

### 16. Typography & Spacing
- [ ] **Root font size**: `clamp(14px, 1vw + 0.5rem, 16px)` — tidak pernah < 16px di mobile
- [ ] **Heading scale**: `clamp()` untuk fluid typography
  - H1: `clamp(2rem, 5vw, 4rem)` — tidak terlalu besar di mobile
  - H2: `clamp(1.5rem, 3vw, 2.5rem)`
- [ ] **Line height**: 1.4 (heading), 1.7 (body) — nyaman baca di layar kecil
- [ ] **Padding section**: `clamp(48px, 10vh, 120px)` top-bottom, 24px kiri-kanan mobile
- [ ] **Max-width konten**: 1200px, padding otomatis

### 17. GSAP Animasi (mobile-aware)
- [ ] **Hero**: desktop — stagger fade-in, mobile — CSS fade-in saja
- [ ] **About**: desktop — clip-path reveal, mobile — CSS slide-up
- [ ] **Menu**: desktop — stagger scale-opacity, mobile — single CSS fade
- [ ] **Counter**: desktop — GSAP number count, mobile — tampilkan angka langsung
- [ ] **Navbar**: GSAP ScrollTrigger ganti class — sama di mobile & desktop
- [ ] **Micro-interactions hover**: nonaktifkan di mobile (ganti active state)

### 18. Image Sequence Optimization
- [ ] Canvas resolusi 50% di mobile (hemat GPU memory)
- [ ] Konversi frame ke WebP (quality: 60 mobile, 85 desktop)
- [ ] Preload priority: frame awal & akhir duluan
- [ ] Cache di `Map<number, HTMLImageElement>`
- [ ] **Mobile**: throttle di 30fps (mata manusia tidak bisa bedakan >30fps di layar kecil)
- [ ] Fallback: static image jika JS disabled

### 19. Touch & Interaction (Mobile UX)
- [ ] Semua CTA: `min-height: 48px`, `padding: 14px 24px`
- [ ] Nav link: `min-height: 48px`
- [ ] Form input: `font-size: 16px` (cegah iOS auto-zoom)
- [ ] Menu card: `active` state ganti `hover` — beri feedback sentuhan
- [ ] Swipe gesture? Tidak perlu — semua navigasi via tap
- [ ] No pinch-zoom disable — user wajib bisa zoom

### 20. SEO & Accessibility
- [ ] Semantic HTML
- [ ] `<meta>` tags lengkap (OG, twitter card, description)
- [ ] `alt` text di semua gambar (decorative → `alt=""`)
- [ ] Skip to content link
- [ ] Focus trap di mobile menu drawer
- [ ] ARIA labels
- [ ] Heading hierarchy: h1 → h2 → h3
- [ ] `prefers-reduced-motion` — matikan semua animasi

### 21. Performance Budget
- [ ] Lighthouse mobile score ≥ 90 (Performance, Accessibility, SEO)
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Total JS bundle ≤ 200KB (gzipped)
- [ ] Frame images WebP, total ≤ 5MB
- [ ] Lazy load section images di bawah fold
- [ ] Font: self-hosted + `font-display: swap`

### 22. Testing Checklist (Mobile Priority)
- [ ] Chrome DevTools: 375px, 425px, 768px
- [ ] Real device: iOS Safari, Android Chrome
- [ ] Touch scroll: image sequence tidak lag
- [ ] Tap target tidak saling tumpuk
- [ ] Form focus tidak zoom-in (iOS)
- [ ] Dark/light mode berfungsi di mobile
- [ ] Preloader muncul dan selesai di koneksi lambat (throttle 3G)

### 23. Build & Deploy
- [ ] `npm run build` — verifikasi tidak ada TS error
- [ ] Push ke GitHub
- [ ] Deploy ke Vercel / Netlify
- [ ] Custom domain (jika ada)
- [ ] Setup `_redirects` untuk SPA fallback

---

## Referensi Frame
- Path: `sequence/ezgif-frame-{001..245}.jpg` (245 frame)
- Konversi ke WebP untuk production
- Sumber: video di `RESOURCE/`

## Prinsip Senior Developer
1. **Mobile-first** — bukan afterthought, tapi foundation
2. **No `any` types** — TypeScript strict mode
3. **No magic numbers** — semua konstanta di file terpisah
4. **Component granular** — 1 file = 1 tanggung jawab
5. **Custom hooks** — pisahkan logic dari UI
6. **Performance first** — monitor re-render, `useMemo`/`useCallback` bijak
7. **Accessibility bukan opsional** — ARIA, keyboard nav, screen reader
8. **Touch UX** — 44x44 minimum, no hover-only interaction
9. **Test di real device** — emulator tidak cukup
10. **Code review ready** — naming konsisten, struktur jelas, komentar minimal
