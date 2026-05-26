import { Head, Link, useForm } from "@inertiajs/react";
import {
    ShieldCheck,
    MapPin,
    QrCode,
    Fingerprint,
    ArrowRight,
    UserPlus,
} from "lucide-react";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-[#e0f2fe] flex items-center justify-center p-6 overflow-hidden">

                {/* BACKGROUND EFFECT */}
                <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-400/20 blur-3xl rounded-full"></div>

                <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-cyan-400/20 blur-3xl rounded-full"></div>

                <div className="relative z-10 w-full max-w-7xl bg-white/80 backdrop-blur-xl border border-white/40 rounded-[35px] overflow-hidden shadow-[0_20px_80px_rgba(15,23,42,0.12)] grid lg:grid-cols-2">

                    {/* LEFT SIDE */}
                    <div className="relative bg-gradient-to-br from-[#0b1120] via-[#111827] to-[#172554] text-white p-14 flex flex-col justify-between overflow-hidden">

                        {/* GLOW */}
                        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

                        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"></div>

                        {/* LOGO */}
                        <div className="relative z-10">

                            <div className="flex items-center gap-4 mb-10">

                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_10px_30px_rgba(59,130,246,0.5)]">

                                    <Fingerprint className="w-8 h-8 text-white" />

                                </div>

                                <div>
                                    <h1 className="text-4xl font-bold">
                                        Absensi Pro
                                    </h1>

                                    <p className="text-blue-200 text-sm tracking-wide">
                                        Enterprise Attendance System
                                    </p>
                                </div>
                            </div>

                            <h2 className="text-5xl leading-tight font-bold mb-6">

                                Create Your <br />
                                Admin Account

                            </h2>

                            <p className="text-blue-100 text-lg leading-relaxed max-w-xl">

                                Sistem absensi modern dengan teknologi
                                GPS Geofencing, QR Attendance, monitoring
                                realtime, dan dashboard analytics premium.

                            </p>
                        </div>

                        {/* FEATURE CARD */}
                        <div className="relative z-10 grid grid-cols-2 gap-5 mt-16">

                            <div className="bg-white/5 border border-white/20 shadow-2xl backdrop-blur-xl rounded-3xl p-6">

                                <MapPin className="w-10 h-10 text-cyan-300 mb-5" />

                                <h3 className="font-semibold text-lg mb-3">
                                    GPS Tracking
                                </h3>

                                <p className="text-sm text-blue-100 leading-relaxed">
                                    Monitoring realtime lokasi absensi dengan
                                    geofencing system modern.
                                </p>

                            </div>

                            <div className="bg-white/5 border border-white/20 shadow-2xl backdrop-blur-xl rounded-3xl p-6">

                                <QrCode className="w-10 h-10 text-yellow-300 mb-5" />

                                <h3 className="font-semibold text-lg mb-3">
                                    QR Attendance
                                </h3>

                                <p className="text-sm text-blue-100 leading-relaxed">
                                    Sistem scan QR code untuk check-in dan
                                    check-out otomatis.
                                </p>

                            </div>

                            <div className="bg-white/5 border border-white/20 shadow-2xl backdrop-blur-xl rounded-3xl p-6">

                                <ShieldCheck className="w-10 h-10 text-green-300 mb-5" />

                                <h3 className="font-semibold text-lg mb-3">
                                    Secure System
                                </h3>

                                <p className="text-sm text-blue-100 leading-relaxed">
                                    Data terenkripsi dan aman untuk kebutuhan
                                    perusahaan.
                                </p>

                            </div>

                            <div className="bg-white/5 border border-white/20 shadow-2xl backdrop-blur-xl rounded-3xl p-6">

                                <Fingerprint className="w-10 h-10 text-pink-300 mb-5" />

                                <h3 className="font-semibold text-lg mb-3">
                                    Smart Analytics
                                </h3>

                                <p className="text-sm text-blue-100 leading-relaxed">
                                    Dashboard analytics realtime dan monitoring
                                    performa karyawan.
                                </p>

                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="relative z-10 mt-10 text-sm text-blue-200">
                            © 2026 Absensi Pro — HR Enterprise Solution
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="bg-white/70 backdrop-blur-xl p-12 lg:p-20 flex flex-col justify-center">

                        <div className="mb-10">

                            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">

                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>

                                Secure Registration

                            </div>

                            <h2 className="text-5xl font-bold text-gray-900 mb-4">
                                Create Account 🚀
                            </h2>

                            <p className="text-gray-500 text-lg leading-relaxed">
                                Daftarkan akun administrator untuk mulai
                                menggunakan sistem absensi modern.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">

                            {/* NAME */}
                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="John Doe"
                                    className="w-full bg-white shadow-sm border border-gray-200 rounded-2xl px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                />

                                {errors.name && (
                                    <div className="text-red-500 text-sm mt-2">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            {/* EMAIL */}
                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="admin@company.com"
                                    className="w-full bg-white shadow-sm border border-gray-200 rounded-2xl px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                />

                                {errors.email && (
                                    <div className="text-red-500 text-sm mt-2">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            {/* PASSWORD */}
                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="••••••••"
                                    className="w-full bg-white shadow-sm border border-gray-200 rounded-2xl px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                />

                                {errors.password && (
                                    <div className="text-red-500 text-sm mt-2">
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    placeholder="••••••••"
                                    className="w-full bg-white shadow-sm border border-gray-200 rounded-2xl px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                />

                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#60a5fa] hover:scale-[1.01] transition-all duration-300 text-white font-semibold py-4 rounded-2xl shadow-[0_10px_40px_rgba(37,99,235,0.35)] flex items-center justify-center gap-3"
                            >

                                {processing ? (
                                    "Loading..."
                                ) : (
                                    <>
                                        Create Account

                                        <UserPlus className="w-5 h-5" />
                                    </>
                                )}

                            </button>

                            {/* DIVIDER */}
                            <div className="flex items-center gap-4 py-2">

                                <div className="flex-1 h-[1px] bg-gray-200"></div>

                                <span className="text-sm text-gray-400">
                                    OR
                                </span>

                                <div className="flex-1 h-[1px] bg-gray-200"></div>
                            </div>

                            {/* LOGIN */}
                            <div className="text-center text-gray-600">

                                Sudah punya akun?{" "}

                                <Link
                                    href="/login"
                                    className="text-blue-600 font-semibold hover:underline"
                                >
                                    Login Sekarang
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}