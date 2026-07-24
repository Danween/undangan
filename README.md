# Undangan Pernikahan

## Menjalankan
Buka folder ini di VS Code lalu jalankan `index.html` memakai Live Server.

Jangan membuka `index.html` langsung melalui `file://`, karena partial dimuat
menggunakan `fetch()`.

## Struktur partial

Setiap bagian undangan berada di folder `partials/`:

- `cover.html`
- `hero.html`
- `opening.html`
- `couple.html`
- `date.html`
- `gallery.html`
- `wishes.html`
- `footer.html`

`index.html` hanya menentukan urutan partial. Konten dan pengaturan animasi
diedit langsung pada file partial masing-masing.

## Animasi per section

Tambahkan class `reveal` pada elemen yang ingin dianimasikan. Karakter
animasinya diatur melalui CSS variables pada wrapper partial:

```html
<section
  style="
    --reveal-x: 0px;
    --reveal-y: 40px;
    --reveal-scale: .95;
    --reveal-duration: 900ms;
    --reveal-delay: 0ms;
    --reveal-blur: 3px;
  "
>
  <div class="reveal">Konten section</div>
</section>
```

Variabel yang tersedia:

- `--reveal-x`: posisi awal horizontal
- `--reveal-y`: posisi awal vertikal
- `--reveal-scale`: ukuran awal
- `--reveal-rotate`: rotasi awal
- `--reveal-duration`: durasi animasi
- `--reveal-delay`: jeda sebelum animasi
- `--reveal-blur`: blur awal
- `--reveal-ease`: kurva easing

Variabel pada elemen anak akan menimpa pengaturan wrapper untuk elemen
tersebut. Seluruh mesin animasi berada di `assets/css/style.css` dan
`assets/js/script.js`; tidak menggunakan Tailwind.

## Efek scroll (prismic.io/blog/css-scroll-effects)

Empat efek tambahan dari referensi tersebut sudah diterapkan:

- **Hero zoom (efek #26, GSAP ScrollTrigger)** — `assets/js/script.js`
  fungsi `initHeroZoom()`. Foto hero di-scrub zoom + parallax saat
  section hero discroll keluar layar. Butuh GSAP + ScrollTrigger, dimuat
  lewat CDN di `index.html` sebelum `script.js`.
- **Sticky stacking galeri (efek #8)** — `partials/gallery.html` +
  `.gallery-stack`/`.gallery-item` di `style.css`. Setiap foto
  `position: sticky` sehingga menumpuk satu per satu saat discroll;
  murni CSS, tanpa JS tambahan. Ada bounce halus lewat
  `animation-timeline: view()` di browser yang mendukung (Chrome/Edge
  terbaru), dengan fallback diam saja di browser lain.
- **Sticky section layout couple (efek #7)** — `partials/couple.html` +
  `.couple-layout`/`.couple-visual` di `style.css`. Foto mempelai
  (`.couple-visual`) tetap diam (`position: sticky`) sementara kartu
  bio di sebelahnya discroll. Otomatis jadi satu kolom biasa di layar
  mobile (`max-width: 760px`).
- **Scroll-driven fade-in teks (efek #20)** — tambahkan class
  `scroll-fade` di samping `reveal` pada elemen teks (lihat
  `section-heading` di tiap partial). Di browser yang mendukung
  `animation-timeline: view()`, elemen ini fade-in/blur murni lewat CSS
  sesuai progres scroll (bukan sekali jalan seperti `reveal` biasa);
  `script.js` otomatis tidak memasang IntersectionObserver pada elemen
  ini supaya kedua sistem tidak bentrok. Di browser lain, otomatis
  fallback ke `reveal` biasa.

Semua efek di atas menghormati `prefers-reduced-motion: reduce`.

## Nama tamu dari URL
Gunakan format:

`http://127.0.0.1:5500/?to=Nama%20Tamu`

## Foto
Masukkan foto ke `assets/images/` dengan nama:

- `hero.jpg`
- `groom.jpg`
- `bride.jpg`
- `gallery-1.jpg` sampai `gallery-6.jpg`

## Musik
Masukkan musik sebagai `assets/audio/music.mp3`.

## Pengaturan penting
Ubah tanggal acara dan nomor WhatsApp pada bagian `CONFIG` di `assets/js/script.js`.
