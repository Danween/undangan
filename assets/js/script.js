/* =========================================================
   UNDANGAN — script.js
   Vanilla JS saja, tanpa library scroll animasi eksternal.
   Fitur: buka undangan, toggle musik, countdown, reveal on scroll.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Buka Undangan ---------- */
  const cover      = document.getElementById('cover');
  const openBtn    = document.getElementById('btnOpen');
  const nav        = document.getElementById('nav');
  const bgAudio    = document.getElementById('bgAudio');
  const musicBtn   = document.getElementById('musicToggle');

  document.body.classList.add('lock');

  openBtn.addEventListener('click', () => {
    cover.classList.add('is-hidden');
    nav.classList.add('is-visible');
    document.body.classList.remove('lock');

    // mainkan musik latar setelah interaksi pengguna (butuh gesture untuk browser modern)
    bgAudio.volume = 0.6;
    bgAudio.play().catch(() => {
      // jika autoplay diblokir, biarkan tombol musik yang menyalakannya
      musicBtn.classList.add('is-paused');
    });

    // ScrollTrigger perlu di-refresh setelah cover hilang & scroll ke-unlock,
    // karena posisi elemen di halaman baru "benar" setelah body tidak lagi terkunci.
    if (window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  });

  /* ---------- Toggle musik ---------- */
  musicBtn.addEventListener('click', () => {
    if (bgAudio.paused) {
      bgAudio.play();
      musicBtn.classList.remove('is-paused');
    } else {
      bgAudio.pause();
      musicBtn.classList.add('is-paused');
    }
  });

  /* ---------- Countdown ---------- */
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    const targetDate = new Date(document.body.dataset.weddingDate).getTime();
    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-minutes');
    const sEl = document.getElementById('cd-seconds');

    const pad = n => String(n).padStart(2, '0');

    function updateCountdown() {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        dEl.textContent = '00';
        hEl.textContent = '00';
        mEl.textContent = '00';
        sEl.textContent = '00';
        return;
      }

      const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      dEl.textContent = pad(days);
      hEl.textContent = pad(hours);
      mEl.textContent = pad(minutes);
      sEl.textContent = pad(seconds);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ---------- Reveal on scroll (GSAP ScrollTrigger) ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.batch(".fade-item", {
      start: "top 88%",
      onEnter: batch => batch.forEach((el, i) => {
        setTimeout(() => el.classList.add("is-visible"), i * 60);
      }),
      once: true
    });
  } else {
    // fallback kalau GSAP gagal dimuat (mis. CDN diblokir): langsung tampilkan semua
    document.querySelectorAll('.fade-item').forEach(item => item.classList.add('is-visible'));
  }

  /* ---------- Form ucapan (tanpa backend) ---------- */
  const wishForm = document.getElementById('wishForm');
  if (wishForm) {
    wishForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = wishForm.querySelector('[name="name"]').value.trim();
      const message = wishForm.querySelector('[name="message"]').value.trim();
      const attend = wishForm.querySelector('[name="attendance"]').value;

      if (!name || !message) return;

      // TODO: sambungkan ke Google Form / API / WhatsApp sesuai kebutuhan.
      // Sementara ini hanya menampilkan konfirmasi di layar.
      const note = document.getElementById('wishNote');
      note.textContent = `Terima kasih, ${name}. Ucapan kamu (${attend}) sudah tercatat.`;
      wishForm.reset();
    });
  }

});