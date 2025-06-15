# Absensi SekolahKu 🏫

Sistem Manajemen Absensi Siswa berbasis web yang modern, cepat, dan andal. Dibangun dengan Next.js 15 dan Firebase, dirancang untuk memudahkan para guru dalam mengelola kehadiran siswa setiap hari.

---

### Daftar Isi

1.  [Tentang Proyek](#tentang-proyek)
2.  [Fitur Utama](#fitur-utama)
3.  [Teknologi yang Digunakan](#teknologi-yang-digunakan)
4.  [Panduan Setup](#panduan-setup)
    - [Prasyarat](#prasyarat)
    - [Instalasi](#instalasi)
5.  [Konfigurasi Environment](#konfigurasi-environment)
6.  [Skrip yang Tersedia](#skrip-yang-tersedia)

---

## Tentang Proyek

**Absensi SekolahKu** adalah sebuah aplikasi web yang bertujuan untuk mendigitalisasi dan menyederhanakan proses pencatatan kehadiran siswa di sekolah. Guru dapat dengan mudah masuk ke sistem, memilih kelas, dan mencatat status kehadiran setiap siswa (Hadir, Sakit, Izin, atau Alpha). Data ini disimpan secara _real-time_ dan dapat dilihat kembali dalam bentuk rekapitulasi harian.

Proyek ini juga mengintegrasikan layanan notifikasi (melalui Twilio) untuk mengirim pemberitahuan kepada orang tua siswa terkait status kehadiran anak mereka.

## Fitur Utama

- 🔑 **Autentikasi Guru**: Sistem login dan registrasi yang aman untuk para guru menggunakan Firebase Auth.
- 👨‍🎓 **Manajemen Siswa**: Mendaftarkan siswa baru ke dalam sistem dengan informasi penting seperti Nomor Induk dan nomor telepon orang tua.
- ✅ **Input Kehadiran Harian**: Form input kehadiran yang intuitif untuk mencatat status setiap siswa per kelas.
- 📊 **Rekap Kehadiran**: Fitur untuk melihat riwayat kehadiran siswa berdasarkan tanggal dan kelas yang dipilih.
- 📱 **Notifikasi Orang Tua**: Mengirimkan pemberitahuan kepada orang tua siswa (membutuhkan konfigurasi Twilio).
- 🔐 **Rute Terproteksi**: Memisahkan halaman yang hanya bisa diakses setelah login (Dashboard, Siswa, Absensi) dan halaman publik (Login, Register).
- ✨ **Desain Modern**: Antarmuka yang bersih dan responsif dibangun dengan Tailwind CSS.

## Teknologi yang Digunakan

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication & Firestore)
- **Layanan Notifikasi**: [Twilio](https://www.twilio.com/)
- **Manajemen Cookies**: [cookies-next](https://www.npmjs.com/package/cookies-next)

---

## Panduan Setup

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di lingkungan lokal Anda.

### Prasyarat

Pastikan Anda telah menginstal perangkat lunak berikut di komputer Anda:

- [Node.js](https://nodejs.org/en/) (v18.18.0 atau lebih tinggi direkomendasikan)
- [npm](https://www.npmjs.com/) atau package manager lain seperti [yarn](https://yarnpkg.com/) atau [pnpm](https://pnpm.io/)

### Instalasi

1.  **Clone repositori ini**

    ```bash
    git clone https://github.com/username/absensi-sekolahku.git
    cd absensi-sekolahku
    ```

2.  **Install semua dependencies**
    Gunakan package manager pilihan Anda:

    ```bash
    npm install
    ```

3.  **Konfigurasi Environment Variables**
    Salin file `.env.local.example` (jika ada) menjadi `.env.local` dan isi semua variabel yang dibutuhkan. Lihat detailnya di bawah ini.

    ```bash
    cp .env.local.example .env.local
    ```

4.  **Jalankan server development**
    Proyek ini menggunakan **Turbopack** untuk development yang lebih cepat.

    ```bash
    npm run dev
    ```

5.  **Buka aplikasi**
    Buka [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) di browser Anda untuk melihat hasilnya.

---

## Konfigurasi Environment

Aplikasi ini membutuhkan koneksi ke layanan eksternal seperti Firebase dan Twilio. Buat file bernama `.env.local` di root direktori proyek dan isi dengan kredensial Anda.

Anda bisa mendapatkan kredensial Firebase dari [Firebase Console](https://console.firebase.google.com/).

```env
# =================================
# FIREBASE CONFIGURATION
# Dapatkan nilai ini dari Firebase Console project Anda
# > Project Settings > General > Your apps > Firebase SDK snippet (click config)
# =================================
NEXT_PUBLIC_FIREBASE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx

# =================================
# TWILIO CONFIGURATION (Optional, untuk notifikasi)
# Dapatkan nilai ini dari Twilio Console
# =================================
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
```

> **Penting**: Implementasi Twilio di dalam kode belum sepenuhnya terhubung dengan environment variables ini. Anda perlu menambahkannya sendiri pada fungsi yang relevan jika ingin mengaktifkan fitur notifikasi.

## Skrip yang Tersedia

Dalam direktori proyek, Anda dapat menjalankan:

- `npm run dev`
  Menjalankan aplikasi dalam mode development dengan Turbopack.

- `npm run build`
  Mem-build aplikasi untuk production ke dalam folder `.next`.

- `npm run start`
  Menjalankan aplikasi hasil build production.

- `npm run lint`
  Menjalankan ESLint untuk menganalisis kode dan mencari potensi error.
