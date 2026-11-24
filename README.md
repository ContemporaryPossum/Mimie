# The Mimie's Catering & Food Delivery - laman web statik

Laman satu halaman (single page) dalam HTML, CSS dan JavaScript biasa. Tiada framework, tiada build step.
Semua fail berada di root supaya boleh terus dimuat naik ke GitHub dan disambung ke Cloudflare Pages.

## Fail

| Fail | Kegunaan |
| --- | --- |
| `index.html` | Laman utama The Mimie's, tema hijau dan emas profil syarikat 2026 (`<body class="mimie-page">`). Seksyen termasuk `#katalog`, `#acara`, `#klien` dan `#maklum-balas` |
| `bento.html` | Halaman Bento On The Go, tema pink (tidak berubah). Seksyen `#katalog-bento` (Bento Budget dan Bento Special) di atas `#set-menu` (50 set) |
| `styles.css` | Semua gaya. Tema pink dalam `:root` (bento.html); tema hijau dan emas dalam blok `.mimie-page` di hujung fail (index.html sahaja) |
| `script.js` | Menu mudah alih, semua tab, lightbox, penapis harga set, butang rel (maklum balas dan katalog bento), butang "Lihat semua" senarai klien, borang sebut harga ke WhatsApp |
| `playfair.woff2`, `playfair-italic.woff2`, `jakarta.woff2` | Fon (self-hosted, tiada panggilan ke Google Fonts) |
| `logo-tm.jpg`, `logo-tm-112.jpg` | Logo baharu monogram TM (dipotong daripada fail profil klien). Footer dan navbar index.html |
| `favicon-tm.png`, `favicon-tm-32.png`, `apple-touch-tm.png` | Ikon tab pelayar index.html (logo TM) |
| `og-mimies.jpg` | Gambar pratonton pautan index.html (1200x630, logo TM) |
| `logo-dark.png`, `emblem.png`, `favicon.png`, `favicon-32.png` | Logo dan ikon lama The Mimie's, masih digunakan oleh bento.html sahaja |
| `bento-budget-01.jpg` hingga `-13.jpg`, `bento-special-01.jpg` hingga `-15.jpg` (+ `-thumb`) | Poster Katalog Menu Bento daripada klien (24 Nov 2026), rel di `#katalog-bento` |
| `acara-pdrm-1.jpg` hingga `-3.jpg`, `acara-zepp.jpg` | Gambar acara dipotong daripada profil syarikat 2026, seksyen `#acara` |
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
5. Save and Deploy. Domain `themimiess.com` sudah disambung; `canonical`, `og:url`, `og:image` dan JSON-LD dalam kedua-dua
   halaman menggunakan URL penuh `https://themimiess.com/...`. Tukar di situ jika domain berubah.

## Perkara yang perlu disahkan dengan klien sebelum live

Kemas kini 24 Nov 2026:
- Logo TM dipotong daripada imej JPG di atas latar baldu hijau. Minta fail PNG telus atau resolusi tinggi untuk hasil lebih tajam.
- bento.html masih menggunakan logo krim lama The Mimie's di footer dan kad "Perlukan buffet". Sahkan sama ada mahu ditukar kepada logo TM.
- Katalog Bento Special: 2 poster pendua tidak dipaparkan (2a1547e1 dan 431a5363 sama; e47b12f1 versi lain 5a4e1e5d). Poster 5a4e1e5d dan e47b12f1 menyebut "Spicy Chicken Wing: Tanya Harga".
- Katalog Bento Budget halaman 8 menyenaraikan "Nasi Goreng Cina RM15" tetapi hanya Nugget 2pcs dan Hotdog 2pcs; sahkan harga.
- Senarai klien (132 nama) disalin daripada profil syarikat, "Selected names from customer billing records". Sahkan klien bersetuju nama mereka dipaparkan di laman awam.
- Profil syarikat menyebut liputan "Kuala Lumpur, Selangor, Putrajaya, Cyberjaya" (tanpa Kuala Selangor). Laman masih menyebut Kuala Selangor.
- Navbar index.html kini: Servis, Pakej, Katalog, Menu, Acara, Bento On The Go, Kisah Kami, Hubungi. Galeri dibuang daripada navbar (masih di footer) supaya navbar muat satu baris.

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
