import { Link } from "@inertiajs/react";
import {
    ArrowRight, CheckCircle2, ShieldCheck, QrCode,
    MapPinned, FileBarChart, Menu, X, Check,
    Users, Clock, Star, Mail, Phone, MapPin
} from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activePricing, setActivePricing] = useState("monthly");

    const features = [
        { title: "QR Code Dinamis", desc: "Generate QR code otomatis untuk absensi realtime dan aman.", icon: QrCode },
        { title: "Face Recognition AI", desc: "Verifikasi wajah karyawan untuk meningkatkan keamanan sistem.", icon: ShieldCheck },
        { title: "Laporan Otomatis", desc: "Export laporan absensi otomatis dalam format Excel & PDF.", icon: FileBarChart },
    ];

    const pricingPlans = [
        {
            name: "Starter",
            desc: "Cocok untuk tim kecil",
            price: { monthly: 99, yearly: 79 },
            color: "border-slate-200",
            badge: null,
            features: ["Hingga 10 karyawan", "Check In & Check Out", "Laporan bulanan", "Support email"],
        },
        {
            name: "Professional",
            desc: "Paling populer untuk bisnis",
            price: { monthly: 299, yearly: 239 },
            color: "border-blue-500",
            badge: "Terpopuler",
            features: ["Hingga 100 karyawan", "Geofencing & QR Code", "Laporan real-time", "Auto check-out scheduler", "Support prioritas"],
        },
        {
            name: "Enterprise",
            desc: "Untuk perusahaan besar",
            price: { monthly: 799, yearly: 639 },
            color: "border-slate-200",
            badge: null,
            features: ["Karyawan tak terbatas", "Face Recognition AI", "Custom integrasi", "Multi-cabang", "Dedicated account manager", "SLA 99.9% uptime"],
        },
    ];

    const team = [
        { name: "Andi Pratama", role: "CEO & Founder", img: "https://i.pravatar.cc/120?img=11" },
        { name: "Sari Dewi", role: "Head of Product", img: "https://i.pravatar.cc/120?img=5" },
        { name: "Budi Santoso", role: "Lead Engineer", img: "https://i.pravatar.cc/120?img=12" },
        { name: "Rina Kusuma", role: "HR Specialist", img: "https://i.pravatar.cc/120?img=9" },
    ];

    const stats = [
        { num: "500+", label: "Perusahaan" },
        { num: "50K+", label: "Karyawan Aktif" },
        { num: "98.2%", label: "Uptime" },
        { num: "4.9★", label: "Rating" },
    ];

    return (
        <div className="bg-[#F7F9FC] text-slate-900">

            {/* NAVBAR */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                    <h1 className="text-2xl sm:text-3xl font-black text-blue-600">AbsensiPro</h1>

                    <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                        <a href="#hero" className="hover:text-blue-600 transition">Beranda</a>
                        <a href="#fitur" className="hover:text-blue-600 transition">Fitur</a>
                        <a href="#harga" className="hover:text-blue-600 transition">Harga</a>
                        <a href="#tentang" className="hover:text-blue-600 transition">Tentang</a>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="text-slate-600 font-semibold hover:text-blue-600 transition">Login</Link>
                        <Link href="/register" className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-xl font-bold shadow">Register</Link>
                    </div>

                    <button className="md:hidden p-2 rounded-xl border text-slate-600" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {menuOpen && (
                    <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-1 text-sm font-semibold text-slate-700">
                        {["hero", "fitur", "harga", "tentang"].map((id) => (
                            <a key={id} href={`#${id}`} className="py-2.5 border-b border-slate-100 last:border-0 capitalize"
                                onClick={() => setMenuOpen(false)}>{id}</a>
                        ))}
                        <div className="flex gap-3 pt-3">
                            <Link href="/login" className="flex-1 text-center border rounded-xl py-2.5 font-bold">Login</Link>
                            <Link href="/register" className="flex-1 text-center bg-blue-600 text-white rounded-xl py-2.5 font-bold">Register</Link>
                        </div>
                    </div>
                )}
            </header>

            {/* HERO */}
            <section id="hero" className="py-16 sm:py-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <CheckCircle2 size={16} /> Sistem Absensi Modern
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                            Kelola <span className="text-blue-600">Kehadiran Tim</span><br />Anda dengan<br />Satu Sentuhan.
                        </h1>
                        <p className="mt-6 text-base sm:text-xl text-slate-500 leading-relaxed max-w-xl">
                            Sistem absensi berbasis web dan mobile dengan teknologi modern. Pantau kehadiran, kelola data, dan tingkatkan produktivitas tim.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <Link href="/register" className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 sm:px-8 py-4 rounded-2xl font-bold shadow-xl flex items-center gap-2">
                                Mulai Absensi <ArrowRight size={18} />
                            </Link>
                            <Link href="/login" className="bg-white border px-6 sm:px-8 py-4 rounded-2xl font-bold shadow-sm hover:shadow-md transition">
                                Lihat Demo
                            </Link>
                        </div>
                        <div className="flex items-center gap-4 mt-8">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <img key={i} src={`https://i.pravatar.cc/40?img=${i}`} className="w-10 h-10 rounded-full border-2 border-white" />
                                ))}
                            </div>
                            <p className="text-slate-500 font-medium text-sm">100+ perusahaan bergabung</p>
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="bg-white p-4 rounded-[40px] shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400"
                                className="rounded-[30px] h-[540px] object-cover w-full" />
                        </div>
                        <div className="absolute -bottom-5 left-0 bg-white rounded-3xl shadow-xl border px-5 py-4">
                            <p className="text-sm text-slate-500">Tingkat Kehadiran</p>
                            <div className="flex items-center gap-3">
                                <h2 className="text-3xl font-black text-blue-600">98.2%</h2>
                                <span className="text-green-500 font-bold">+12%</span>
                            </div>
                        </div>
                    </div>

                    {/* stat card mobile only */}
                    <div className="lg:hidden bg-white rounded-3xl shadow-xl border px-6 py-5 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">Tingkat Kehadiran</p>
                            <div className="flex items-center gap-3 mt-1">
                                <h2 className="text-3xl font-black text-blue-600">98.2%</h2>
                                <span className="text-green-500 font-bold">+12%</span>
                            </div>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                            <CheckCircle2 className="text-blue-600" size={32} />
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS BAR */}
            <section className="px-4 sm:px-6 pb-10">
                <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm border">
                            <div className="text-2xl sm:text-3xl font-black text-blue-600">{s.num}</div>
                            <div className="text-slate-500 text-sm mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FITUR */}
            <section id="fitur" className="py-16 sm:py-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 sm:mb-16">
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Fitur Unggulan</span>
                        <h2 className="text-3xl sm:text-5xl font-black mt-2">Semua yang Kamu Butuhkan</h2>
                        <p className="mt-4 text-slate-500 max-w-xl mx-auto">Dirancang untuk kebutuhan HR modern yang butuh efisiensi dan akurasi.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                        <div className="bg-white rounded-[28px] sm:rounded-[35px] p-7 sm:p-10 shadow-sm border sm:row-span-2">
                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                                <MapPinned className="text-blue-600" />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black">Geofencing Pintar</h3>
                            <p className="text-slate-500 mt-4 leading-relaxed">
                                Pastikan lokasi absensi valid dengan GPS realtime dan radius otomatis yang bisa dikonfigurasi per lokasi kantor.
                            </p>
                            <ul className="mt-6 space-y-3">
                                {["Radius lokasi fleksibel", "GPS realtime", "Multi lokasi kantor"].map((f, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <Check size={12} className="text-blue-600" />
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200"
                                className="rounded-2xl sm:rounded-3xl mt-8 h-[200px] sm:h-[240px] object-cover w-full" />
                        </div>

                        {features.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="bg-white rounded-[28px] sm:rounded-[35px] p-7 sm:p-8 border shadow-sm hover:shadow-md transition">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-5">
                                        <Icon className="text-blue-600" size={22} />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold">{item.title}</h3>
                                    <p className="text-slate-500 mt-3 leading-relaxed text-sm sm:text-base">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* HARGA */}
            <section id="harga" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-14">
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Harga</span>
                        <h2 className="text-3xl sm:text-5xl font-black mt-2">Pilih Paket yang Tepat</h2>
                        <p className="mt-4 text-slate-500">Mulai gratis, upgrade kapan saja.</p>
                        <div className="inline-flex items-center gap-1 bg-slate-100 rounded-2xl p-1 mt-6">
                            {["monthly", "yearly"].map((type) => (
                                <button key={type} onClick={() => setActivePricing(type)}
                                    className={`px-5 py-2 rounded-xl text-sm font-bold transition ${activePricing === type ? "bg-white shadow text-blue-600" : "text-slate-500"}`}>
                                    {type === "monthly" ? "Bulanan" : <span>Tahunan <span className="text-green-500 text-xs">Hemat 20%</span></span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pricingPlans.map((plan, i) => (
                            <div key={i} className={`relative bg-[#F7F9FC] rounded-[28px] p-7 sm:p-8 border-2 ${plan.color} ${plan.badge ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}>
                                {plan.badge && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                                        {plan.badge}
                                    </div>
                                )}
                                <h3 className="text-xl font-black">{plan.name}</h3>
                                <p className="text-slate-500 text-sm mt-1 mb-5">{plan.desc}</p>
                                <div className="mb-6">
                                    <span className="text-4xl font-black text-blue-600">Rp {plan.price[activePricing].toLocaleString("id")}K</span>
                                    <span className="text-slate-400 text-sm"> / bulan</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <Check size={11} className="text-blue-600" />
                                            </div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/register"
                                    className={`block text-center py-3 rounded-2xl font-bold text-sm transition ${plan.badge ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg" : "bg-white border hover:border-blue-400 hover:text-blue-600"}`}>
                                    Mulai Sekarang
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TENTANG */}
            <section id="tentang" className="py-16 sm:py-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">

                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
                        <div>
                            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Tentang Kami</span>
                            <h2 className="text-3xl sm:text-5xl font-black mt-2 leading-tight">Dibuat oleh Tim yang Peduli HR</h2>
                            <p className="mt-5 text-slate-500 leading-relaxed">
                                AbsensiPro lahir dari keresahan nyata — proses absensi manual yang lambat, rawan manipulasi, dan menyita waktu HR. Kami hadir untuk mengubah itu semua menjadi sistem yang cepat, akurat, dan modern.
                            </p>
                            <p className="mt-4 text-slate-500 leading-relaxed">
                                Sejak 2023, kami telah membantu ratusan perusahaan dari berbagai industri untuk mengelola kehadiran karyawan dengan lebih efisien dan transparan.
                            </p>
                            <div className="flex flex-wrap gap-5 mt-8">
                                {[{ icon: Users, label: "500+ Perusahaan" }, { icon: Clock, label: "Since 2023" }, { icon: Star, label: "4.9 Rating" }].map(({ icon: Icon, label }, i) => (
                                    <div key={i} className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                                        <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <Icon size={16} className="text-blue-600" />
                                        </div>
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-[30px] p-4 shadow-xl border">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200"
                                className="rounded-[22px] h-[280px] sm:h-[360px] object-cover w-full" />
                        </div>
                    </div>

                    {/* TEAM */}
                    <div className="text-center mb-8">
                        <h3 className="text-2xl sm:text-4xl font-black">Tim Kami</h3>
                        <p className="text-slate-500 mt-2">Orang-orang di balik AbsensiPro</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-16">
                        {team.map((member, i) => (
                            <div key={i} className="bg-white rounded-[24px] p-5 text-center shadow-sm border hover:shadow-md transition">
                                <img src={member.img} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mx-auto mb-3 object-cover" />
                                <div className="font-bold text-sm sm:text-base">{member.name}</div>
                                <div className="text-slate-500 text-xs sm:text-sm mt-1">{member.role}</div>
                            </div>
                        ))}
                    </div>

                    {/* KONTAK */}
                    <div className="bg-white rounded-[28px] sm:rounded-[35px] p-7 sm:p-12 border shadow-sm">
                        <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-black mb-3">Hubungi Kami</h3>
                                <p className="text-slate-500 mb-6 leading-relaxed">Ada pertanyaan? Tim kami siap membantu kamu 24/7.</p>
                                <div className="space-y-4">
                                    {[
                                        { icon: Mail, label: "info@absensipro.id" },
                                        { icon: Phone, label: "+62 812-3456-7890" },
                                        { icon: MapPin, label: "Jakarta, Indonesia" },
                                    ].map(({ icon: Icon, label }, i) => (
                                        <div key={i} className="flex items-center gap-3 text-slate-700">
                                            <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Icon size={16} className="text-blue-600" />
                                            </div>
                                            <span className="text-sm sm:text-base">{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <input type="text" placeholder="Nama kamu"
                                    className="w-full border rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-blue-400 transition" />
                                <input type="email" placeholder="Email kamu"
                                    className="w-full border rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-blue-400 transition" />
                                <textarea rows={4} placeholder="Pesan kamu..."
                                    className="w-full border rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-blue-400 transition resize-none" />
                                <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3.5 rounded-2xl font-bold text-sm shadow">
                                    Kirim Pesan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="pb-16 sm:pb-28 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto rounded-[28px] sm:rounded-[40px] bg-gradient-to-r from-blue-600 to-indigo-600 p-10 sm:p-20 text-center text-white shadow-2xl">
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight">Siap Mentransformasi HR Anda?</h2>
                    <p className="mt-5 text-blue-100 text-base sm:text-xl max-w-xl mx-auto">Gunakan sistem absensi modern untuk meningkatkan efisiensi perusahaan.</p>
                    <div className="flex justify-center gap-4 mt-10 flex-wrap">
                        <Link href="/register" className="bg-yellow-400 text-black hover:bg-yellow-300 transition px-7 sm:px-9 py-4 sm:py-5 rounded-2xl font-black shadow-xl">
                            Coba Gratis 14 Hari
                        </Link>
                        <Link href="/login" className="border border-white/30 bg-white/10 backdrop-blur-xl px-7 sm:px-9 py-4 sm:py-5 rounded-2xl font-bold">
                            Hubungi Sales
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-white border-t px-4 sm:px-6 py-8 text-center text-slate-400 text-sm">
                © {new Date().getFullYear()} AbsensiPro. Dibuat dengan hati untuk HR Indonesia.
            </footer>

        </div>
    );
}