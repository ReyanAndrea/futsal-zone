# ⚽ FutsalZone - Aplikasi Booking Lapangan Futsal

Aplikasi web booking lapangan futsal online yang dibangun dengan AdonisJS 6 dan SQLite.

## 🚀 Teknologi yang Digunakan

- **Backend:** AdonisJS 6 (Node.js MVC Framework)
- **Database:** SQLite (via Lucid ORM)
- **Template Engine:** Edge.js
- **CSS:** Tailwind CSS
- **Auth:** AdonisJS Auth (Session-based)

## ✨ Fitur

### Halaman User (Public)

- Landing page dengan daftar lapangan tersedia
- Detail lapangan + cek jadwal terpesan per tanggal
- Form booking lapangan (nama, no HP, tanggal, jam)
- Halaman sukses setelah booking
- Riwayat booking saya (berbasis session)

### Dashboard Admin

- Login/logout admin
- Dashboard statistik (total lapangan, booking, pending)
- CRUD lapangan (tambah, edit, hapus + upload foto)
- Manajemen booking (ubah status: pending/confirmed/cancelled)

## 📦 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/ReyanAndrea/futsal-zone.git
cd futsal-zone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

```bash
cp .env.example .env
```

### 4. Generate App Key

```bash
node ace generate:key
```

### 5. Jalankan Migration & Seeder

```bash
node ace migration:run
node ace db:seed --files database/seeders/admin_seeder.ts
```

### 6. Jalankan Aplikasi

```bash
npm run dev
```

Buka browser di **http://localhost:3333**

## 🔑 Akun Admin Default

| Field | Value |
|----------|-------=--------------|
| Email | admin@futsalzone.com |
| Password | admin123 |

## 📁 Struktur Folder

futsal-zone/
├── app/
│ ├── controllers/
│ │ ├── lapangans_controller.ts # Controller public
│ │ └── admin_controller.ts # Controller admin
│ └── models/
│ ├── lapangan.ts
│ ├── booking.ts
│ └── user.ts
├── database/
│ ├── migrations/ # Migration tabel
│ └── seeders/ # Seeder admin
├── resources/
│ └── views/
│ ├── components/ # Layout utama
│ ├── pages/ # Halaman public
│ └── admin/ # Halaman admin
├── public/
│ └── uploads/ # Foto lapangan
└── start/
└── routes.ts # Semua routes

## 👨‍💻 Developer

Dibuat untuk memenuhi tugas UAS Mata Kuliah Praktikum Proyek Perangkat Lunak.
