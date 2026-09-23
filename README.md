# The Mimie's Catering & Food Delivery - laman web statik

Laman satu halaman (single page) dalam HTML, CSS dan JavaScript biasa. Tiada framework, tiada build step.
Semua fail berada di root supaya boleh terus dimuat naik ke GitHub dan disambung ke Cloudflare Pages.

## Fail

| Fail | Kegunaan |
| --- | --- |
| `index.html` | Laman utama (semua seksyen) |
| `styles.css` | Semua gaya, termasuk mobile dan reduced-motion |
| `script.js` | Menu mudah alih, tab menu, galeri lightbox, borang sebut harga ke WhatsApp |
| `playfair.woff2`, `playfair-italic.woff2`, `jakarta.woff2` | Fon (self-hosted, tiada panggilan ke Google Fonts) |
| `logo.png`, `logo-dark.png`, `emblem.png` | Logo telus untuk latar cerah, latar gelap, dan emblem sahaja (navbar) |
| `favicon.png`, `favicon-32.png` | Ikon tab pelayar |
| `og-image.jpg` | Gambar pratonton bila pautan dikongsi di WhatsApp / Facebook |
| `hero-buffet.jpg`, `bento-overhead.jpg`, `kuih-hitea.jpg`, `dewan-majlis.jpg` | Gambar hero dan seksyen (dijana AI mengikut gaya jenama) |
| `galeri-*.jpg`, `majlis-*.jpg`, `bernama-radio.jpg` | Gambar sebenar daripada Instagram @themimiess |

## Deploy ke Cloudflare Pages

1. Cipta repo GitHub baharu dan muat naik SEMUA fail dalam folder ini ke root repo.
2. Cloudflare Dashboard > Workers & Pages > Create > Pages > Connect to Git > pilih repo.
3. Build settings: Framework preset `None`, Build command kosong, Build output directory `/` (atau kosong).
4. Save and Deploy. Selepas domain sebenar disambung, kemas kini `og:image` dalam `index.html` kepada URL penuh
   (contoh `https://themimies.com/og-image.jpg`) supaya pratonton WhatsApp berfungsi.

## Perkara yang perlu disahkan dengan klien sebelum live

- Harga pakej (diambil daripada poster Instagram/TikTok mereka pada 2026). Tukar dalam seksyen `#pakej` dan `#menu` jika berubah.
- E-mel `mimisyahirah22@gmail.com` (daripada poster mereka). Tukar di seksyen `#hubungi` dan JSON-LD di `<head>` jika perlu.
- Kedudukan pin Google Maps. Iframe menggunakan carian alamat; jika pin tidak tepat, ganti `src` iframe dengan embed daripada Google Maps > Share > Embed a map.
- Jika mereka mahukan pautan Facebook, tambah di footer (`.footer__social`). Halaman Facebook mereka tidak dijumpai secara awam semasa penyelidikan.

## Nota teknikal

- Nombor WhatsApp ditetapkan sekali dalam `script.js` (`WA_NUMBER`) dan dalam pautan `wa.me` di `index.html`.
- Borang sebut harga tidak menghantar data ke mana-mana pelayan. Ia membina mesej dan membuka WhatsApp.
- Semua ikon adalah SVG sebaris (Phosphor Icons, lesen MIT). Tiada CDN luar kecuali iframe Google Maps.
- Fon dan gambar dimuat dari fail tempatan. Jika dibuka dengan double-click (file://), Chrome mungkin tidak memuat fon .woff2; ini normal dan tidak berlaku selepas deploy.

## Fail pratonton (tidak perlu dimuat naik ke GitHub)

`preview-desktop-full.jpg`, `preview-desktop-hero.jpg`, `preview-mobile-hero.jpg` adalah tangkapan skrin untuk rujukan anda dan klien sahaja. Boleh dipadam sebelum upload.
