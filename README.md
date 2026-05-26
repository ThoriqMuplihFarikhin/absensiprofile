#  AbsensiProfile  
### Sistem Absensi Karyawan Berbasis GPS Geofencing & QR Code

<a href="#">
    <img src="https://img.shields.io/badge/Laravel-13-red?style=for-the-badge&logo=laravel" alt="Laravel">
</a>
<a href="#">
    <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React">
</a>
<a href="#">
    <img src="https://img.shields.io/badge/Inertia.js-purple?style=for-the-badge" alt="Inertia">
</a>
<a href="#">
    <img src="https://img.shields.io/badge/TailwindCSS-4-cyan?style=for-the-badge&logo=tailwindcss" alt="Tailwind">
</a>
<a href="#">
    <img src="https://img.shields.io/badge/Leaflet-GPS-green?style=for-the-badge" alt="Leaflet">
</a>

---

![Preview](./screenshots/dashboard-preview.png)

AbsensiProfile adalah aplikasi absensi modern berbasis web yang dibuat menggunakan Laravel 13 dan React Inertia.  
Sistem ini mendukung absensi berbasis GPS Geofencing realtime, QR Code Attendance, Employee Management, Dashboard Analytics, dan monitoring lokasi karyawan.

Aplikasi ini dirancang untuk membantu perusahaan melakukan monitoring kehadiran karyawan secara realtime, modern, dan efisien.

> [!IMPORTANT]
>
> Sistem mendukung:
>
> - GPS Geofencing Realtime
> - QR Attendance
> - Dashboard Analytics
> - Employee Management
> - Responsive Modern UI
> - Attendance Validation by Radius

---

#  Fitur Utama

##  Authentication

- Login
- Register
- Logout
- Role Management
- Session Authentication

---

##  Dashboard Analytics

- Statistik Kehadiran
- Statistik Karyawan
- Grafik Kehadiran
- Realtime Dashboard
- Monitoring Activity

---

##  Employee Management

- Tambah Karyawan
- Edit Karyawan
- Hapus Karyawan
- Data Employee
- Employee Detail

---

##  GPS Geofencing

- Live GPS Tracking
- Validasi Radius Kantor
- Dynamic Radius
- Realtime Geolocation
- Tracking Lokasi Employee
- Office Radius Detection

---

## 📷 QR Attendance

- QR Generator
- QR Scanner
- QR Check In
- QR Attendance Validation

---

##  Attendance System

- Check In
- Check Out
- Attendance History
- Attendance Export
- Daily Attendance

---

##  Modern UI

- Responsive Design
- Mobile Friendly
- Modern Dashboard
- Dark Clean Interface
- Professional HR UI

---

#  Framework dan Library Yang Digunakan

## Backend

- Laravel 13
- PHP 8.3
- MySQL

---

## Frontend

- React
- Inertia.js
- Tailwind CSS
- Vite

---

## Maps & GPS

- Leaflet.js
- React Leaflet
- OpenStreetMap
- Browser Geolocation API

---

## Library Tambahan

- Axios
- Lucide React
- React Icons

---

#  Cara Penggunaan

# A. Persyaratan

Sebelum menjalankan project, pastikan perangkat sudah memiliki:

- PHP 8.3+
- Composer
- Node.js
- NPM
- MySQL / MariaDB
- Git

---

# B. Instalasi

## 1. Clone Repository

```bash
git clone https://github.com/username/absensiprofile.git

## 2. Masuk Folder Project

```bash
cd absensiprofile

## 3. Install Dependency

```bash
composer install
npm install

## 4. Setup Environment

```bash
cp .env.example .env

## 5. Generate App Key

```bash
php artisan key:generate

## 6. Konfigurasi Database

```.env
APP_NAME=AbsensiProfile
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=absensiprofile
DB_USERNAME=root
DB_PASSWORD=

## 7. Jalankan Migration

```bash
php artisan migrate

## 8. Jalankan Seeder

```bash
php artisan db:seed

## 9. Jalankan Server

```bash
php artisan serve

## Vite

```bash
npm run dev

## 10. Akses Aplikasi

```
http://127.0.0.1:8000

# C. Daftar Roles

| Role | Akses |
|------|--------|
| Admin | Mengelola seluruh sistem |
| Employee | Melakukan absensi dan melihat dashboard |

---

# D. Import Data dari CSV

Admin dapat melakukan import employee menggunakan file CSV.

## Format CSV

```csv
name,email,position
John Doe,john@example.com,Staff
Jane Doe,jane@example.com,Manager
```

---

## Langkah Import CSV

1. Login sebagai Admin
2. Masuk menu Employee
3. Klik Import CSV
4. Upload file CSV
5. Data otomatis tersimpan

---

#  Konfigurasi

##  GPS Radius

Radius kantor dapat diubah melalui menu:

```txt
Admin > GPS Geofencing
```

---

##  Office Location

Lokasi kantor dapat dipindahkan secara realtime melalui map GPS.

---

##  Environment

Konfigurasi utama berada pada file:

```txt
.env
```

---

##  Database Seeder

Seeder digunakan untuk membuat data awal aplikasi.

Jalankan perintah berikut:

```bash
php artisan db:seed
```

Atau refresh database sekaligus seed:

```bash
php artisan migrate:fresh --seed
```

---

##  Default Login Admin

```txt
Email    : admin@gmail.com
Password : password123
```

---

##  Struktur Database

Database utama:

```txt
absensiprofile
```

Tabel utama:

- users
- employees
- attendances
- geofences
- devices
- qr_codes
- attendance_histories

---

##  Vite Development Server

```bash
npm run dev
```

---

##  Laravel Server

```bash
php artisan serve
```

---

---

#  Scheduler Otomatis

AbsensiProfile mendukung fitur scheduler otomatis untuk melakukan proses tertentu secara realtime tanpa harus dijalankan manual oleh admin.

Fitur scheduler ini digunakan untuk:

- Auto Check-Out Karyawan
- Reset Attendance Harian
- Update Status Kehadiran
- Monitoring Karyawan Terlambat
- Auto Generate Attendance Report

---

##  Cara Kerja Scheduler

Scheduler Laravel berjalan menggunakan command:

```bash
php artisan schedule:run
```

Command tersebut akan menjalankan task otomatis yang sudah didaftarkan pada:

```txt
routes/console.php
```

---

##  Contoh Scheduler Auto Check-Out

Contoh implementasi auto check-out karyawan:

```php
use Illuminate\Support\Facades\Schedule;

Schedule::call(function () {

    \App\Models\Attendance::whereDate('created_at', today())
        ->whereNull('check_out')
        ->update([
            'check_out' => now(),
        ]);

})->everyMinute();
```

---

##  Jadwal Scheduler

| Scheduler | Fungsi |
|-----------|---------|
| everyMinute() | Menjalankan setiap menit |
| hourly() | Menjalankan setiap jam |
| daily() | Menjalankan setiap hari |
| weekly() | Menjalankan setiap minggu |

---

##  Menjalankan Scheduler

### Manual

```bash
php artisan schedule:run
```

---

### Realtime Mode

```bash
php artisan schedule:work
```

---

##  Scheduler pada Windows

Jika menggunakan Windows, scheduler dapat dijalankan menggunakan:

```bash
php artisan schedule:work
```

Biarkan terminal tetap aktif agar scheduler berjalan realtime.

---

##  Scheduler pada Linux / Hosting

Tambahkan cron job:

```bash
* * * * * php /path-to-project/artisan schedule:run >> /dev/null 2>&1
```

---

##  Fitur Scheduler di AbsensiProfile

- Auto Check-Out
- Auto Attendance Monitoring
- Auto Daily Attendance Reset
- Auto Employee Activity Update
- Auto Attendance Recap

---

##  Auto Check-Out System

Jika karyawan lupa melakukan check-out, sistem akan otomatis melakukan check-out berdasarkan jam kerja yang telah ditentukan admin.

Contoh:

```txt
Jam Pulang : 17:00
Auto Checkout : 17:05
```

---

##  Keuntungan Scheduler

- Mengurangi human error
- Attendance lebih realtime
- Monitoring lebih otomatis
- Menghemat pekerjaan admin
- Sistem berjalan otomatis

---

#  Kesimpulan

AbsensiProfile adalah aplikasi absensi modern berbasis Laravel dan React yang dirancang untuk membantu perusahaan melakukan monitoring kehadiran secara realtime.

Dengan dukungan GPS Geofencing, QR Attendance, Dashboard Analytics, dan UI modern, sistem ini dapat digunakan sebagai solusi absensi digital berbasis web yang efisien dan professional.

Project ini juga dapat dikembangkan lebih lanjut menjadi:

- Face Recognition Attendance
- Mobile App Attendance
- Multi Branch Office
- Live Employee Tracking
- AI Attendance Monitoring

---

#  Contributing

Kontribusi terbuka untuk pengembangan project ini.

Jika menemukan bug atau memiliki ide pengembangan:

- Fork repository
- Create new branch
- Commit changes
- Open Pull Request

---

#  Developer

Developed by:

### Thoriq Mplh

---

#  License

This project is licensed under the MIT License.
