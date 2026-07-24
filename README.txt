UNDANGAN WEB MODERN

Cara memakai:
1. Jalankan index.html melalui Live Server.
2. Edit setiap bagian undangan di folder partials.
3. Atur animasi melalui variabel --reveal-* pada wrapper partial.
4. Tambahkan foto ke:
   assets/images/hero.jpg
   assets/images/groom.jpg
   assets/images/bride.jpg
   assets/images/gallery-1.jpg sampai gallery-6.jpg
5. Letakkan musik sebagai assets/audio/music.mp3.
6. Ubah tanggal, nomor WhatsApp, dan pengaturan lain pada bagian CONFIG
   di assets/js/script.js.
7. Nama tamu dapat dikirim melalui URL:
   index.html?to=Nama%20Tamu

Daftar variabel animasi:
--reveal-x, --reveal-y, --reveal-scale, --reveal-rotate,
--reveal-duration, --reveal-delay, --reveal-blur, --reveal-ease.

Contoh:
style="--reveal-x:-50px; --reveal-duration:1000ms;"
