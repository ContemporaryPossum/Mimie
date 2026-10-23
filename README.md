# The Mimie's Catering & Food Delivery - laman web statik

Laman satu halaman (single page) dalam HTML, CSS dan JavaScript biasa. Tiada framework, tiada build step.
Semua fail berada di root supaya boleh terus dimuat naik ke GitHub dan disambung ke Cloudflare Pages.

## Fail

| Fail | Kegunaan |
| --- | --- |
| `index.html` | Laman utama The Mimie's (semua seksyen, termasuk `#katalog` dan `#maklum-balas`) |
| `bento.html` | Halaman Bento On The Go (packed food, lunch box, korporat). Dipaut dari navbar, kad servis Packed Food & Bento, dan footer |
| `styles.css` | Semua gaya, termasuk mobile dan reduced-motion. Palet pink dikongsi kedua-dua halaman (token dalam `:root`, nilai emas asal dicatat dalam komen di atas fail) |
| `script.js` | Menu mudah alih, tab menu dan katalog, lightbox (galeri, poster katalog, maklum balas, set bento), penapis harga set, butang rel maklum balas, borang sebut harga ke WhatsApp |
| `playfair.woff2`, `playfair-italic.woff2`, `jakarta.woff2` | Fon (self-hosted, tiada panggilan ke Google Fonts) |
| `logo.png`, `logo-dark.png`, `emblem.png` | Logo telus untuk latar cerah, latar gelap, dan emblem sahaja (navbar) |
| `favicon.png`, `favicon-32.png` | Ikon tab pelayar |
| `og-image.jpg` | Gambar pratonton bila pautan dikongsi di WhatsApp / Facebook |
| `bento-overhead.jpg`, `hero-buffet.jpg`, `kuih-hitea.jpg`, `dewan-majlis.jpg` | Gambar hero dan seksyen (dijana AI mengikut gaya jenama). Hero laman utama kini `bento-overhead.jpg`; `hero-buffet.jpg` digunakan dalam kad servis Katering & Buffet |
| `galeri-*.jpg`, `majlis-*.jpg`, `bernama-radio.jpg` | Gambar sebenar daripada Instagram @themimiess |
| `bento-logo.png`, `bento-prep.jpg`, `bento-nasi-geprek.jpg` | Logo dan gambar sebenar daripada Instagram @bentoonthegomalaysia |
| `set-<nama>.jpg` (50), `set-<nama>-thumb.jpg` (50) | Poster set Bento On The Go daripada klien (21 Okt 2026). Poster penuh untuk lightbox, thumbnail 4:5 untuk kad di `#set-menu` (bento.html) |
| `bento-banner.jpg` | Banner "Packed Food" daripada klien, digunakan sebagai `og:image` bento.html |
| `katalog-*.jpg` (43), `goodies-logo.jpg` | Poster katalog asal daripada klien (20 dan 21 Okt 2026), dipaparkan dalam seksyen `#katalog` mengikut kategori. Poster yang sama dalam dua kategori menggunakan satu fail |
| `feedback-01.jpg` hingga `feedback-11.jpg` | Poster maklum balas pelanggan daripada klien, rel di seksyen `#maklum-balas` |
| `preview-*.jpg` | Tangkapan skrin pratonton sahaja. Tidak dirujuk oleh laman dan boleh dikecualikan daripada repo |

## Deploy ke Cloudflare Pages

1. Cipta repo GitHub baharu dan muat naik SEMUA fail dalam folder ini ke root repo. GitHub web menerima maksimum 100 fail setiap kali muat naik, jadi muat naik dalam dua kumpulan (contoh: semua `set-*.jpg` dahulu, kemudian fail lain).
2. Cloudflare Dashboard > Workers & Pages > Create > Pages > Connect to Git > pilih repo.
3. Build settings: Framework preset `None`, Build command kosong, Build output directory `/` (atau kosong).
4. Projek ini dibina sebagai Cloudflare Worker (`npx wrangler deploy`, tetapan dalam `wrangler.jsonc`, folder aset `.`).
   Fail `.assetsignore` WAJIB ada di root: ia mengecualikan folder `.git` (sejarah repo, lebih 25 MiB, melebihi had Cloudflare),
   `README.md`, `wrangler.jsonc` dan `preview-*.jpg` daripada deploy. Tanpa fail ini deploy gagal dengan "Asset too large".
5. Save and Deploy. Selepas domain sebenar disambung, kemas kini `og:image` dalam `index.html` kepada URL penuh
   (contoh `https://themimies.com/og-image.jpg`) supaya pratonton WhatsApp berfungsi.

## Perkara yang perlu disahkan dengan klien sebelum live

- Harga pakej (diambil daripada poster Instagram/TikTok mereka pada 2026). Tukar dalam seksyen `#pakej`, `#katalog` dan `#menu` (index.html) serta `#set-menu` dan `#pakej-harian` (bento.html) jika berubah.
- Harga 50 set Bento On The Go diambil daripada poster klien (RM5 hingga RM30 sekotak). Dua poster tidak dipaparkan kerana menu tidak sepadan dengan nama: "Set Daging Kunyit" (2c8b545e, menu Ayam Lemak Cili Api) dan "Set Bolognese" (b889d333, menu Spaghetti Oglio Olio Chicken).
- Set dengan nama sama tetapi menu atau harga berbeza: Set Vegetarian (RM10, RM10, RM12), Set Nasi Putih (RM8, RM13, RM22), Set Nasi Istimewa (RM8, RM10), Set Nasi Goreng Cina (RM9, RM12). Semua dipaparkan.
- Salah eja pada poster Bento (teks laman sudah dibetulkan): "Lomak Cili Api", "Ariomatic Rice", "Salad Timato", "Pakeri Nenas", "Spagheti", "Oglio Oglio".
- Poster Lunch & Dinner Bajet 4 menyenaraikan "Melati" dua kali (RM12 dan RM15). Nama Melati, Cempaka dan Kemboja juga digunakan semula dengan harga lain dalam poster 9.
- Pakej Ainur Madhihah: poster bajet menyebut buffet RM15 / individu RM17, poster kenduri "Hot Selling" menyebut RM16/pax (RM1,600 untuk 100 pax).
- Poster Ainur Madhihah menyebut liputan "KL, Selangor, Negeri Sembilan". Laman masih menyebut KL, Selangor, Putrajaya, Cyberjaya dan Kuala Selangor; tambah Negeri Sembilan jika disahkan.
- Poster maklum balas 11 (Euroclear Bank) mencetak nombor WhatsApp "018-97336421" (satu digit lebih).
- Poster akhir Bento menyebut Instagram "bentooonthegomalaysia" (tiga huruf o) dan Facebook/TikTok "Bento On The Go Malaysia" tanpa pautan. Laman masih memaut @bentoonthegomalaysia sahaja.
- E-mel `mimisyahirah22@gmail.com` (daripada poster mereka). Tukar di seksyen `#hubungi` dan JSON-LD di `<head>` jika perlu.
- Kedudukan pin Google Maps. Iframe menggunakan carian alamat; jika pin tidak tepat, ganti `src` iframe dengan embed daripada Google Maps > Share > Embed a map.
- Jika mereka mahukan pautan Facebook, tambah di footer (`.footer__social`). Halaman Facebook mereka tidak dijumpai secara awam semasa penyelidikan.
- Poster Popcorn, Cotton Candy dan Deepavali menggunakan e-mel `themimiess.co@gmail.com`, berbeza daripada e-mel di laman. Sahkan e-mel mana yang betul.
- Popcorn dan Cotton Candy: poster menyebut "1 cup RM2" tetapi jadual harga bermula RM2.20 (100 hingga 300 pax). Laman memaparkan jadual harga.
- Poster Cotton Candy menyebut "Bukan jagung transgenik" (disalin daripada poster popcorn).
- Poster Limited Offer mengeja "Micheal Jackson"; teks laman menggunakan "Michael Jackson". Sahkan juga sama ada tawaran ini masih aktif.
- Pakej musim perayaan (Deepavali, Krismas, CNY, Hari Raya): sahkan harga dan sama ada dibuka untuk musim akan datang. Tab boleh dibuang atau disusun semula dalam `#katalog`.

## Nota teknikal

- Nombor WhatsApp ditetapkan sekali dalam `script.js` (`WA_NUMBER`) dan dalam pautan `wa.me` di `index.html`.
- Borang sebut harga tidak menghantar data ke mana-mana pelayan. Ia membina mesej dan membuka WhatsApp.
- Semua ikon adalah SVG sebaris (Phosphor Icons, lesen MIT). Tiada CDN luar kecuali iframe Google Maps.
- Fon dan gambar dimuat dari fail tempatan. Jika dibuka dengan double-click (file://), Chrome mungkin tidak memuat fon .woff2; ini normal dan tidak berlaku selepas deploy.
