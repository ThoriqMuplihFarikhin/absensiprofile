import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowRight, Fingerprint } from "lucide-react";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <>
            <Head title="Login" />

            <div className="min-h-screen grid lg:grid-cols-2 bg-white">

                {/* LEFT */}
                <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-14 relative overflow-hidden">

                    {/* dot pattern */}
                    <div className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage: "radial-gradient(circle, #bfdbfe 1px, transparent 1px)",
                            backgroundSize: "24px 24px"
                        }}
                    />

                    {/* accent shape */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400/20 rounded-bl-[100px]" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/15 rounded-tr-[80px]" />

                    {/* LOGO */}
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                            <Fingerprint className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-blue-700 font-black text-xl">AbsensiPro</span>
                    </div>

                    {/* CENTER VISUAL */}
                    <div className="relative z-10">

                        {/* CUBE — lebih terang */}
                        <div className="flex justify-center mb-10">
                            <div className="relative">
                                <div className="w-44 h-44 rounded-[32px] bg-white/60 backdrop-blur-sm border border-blue-200 shadow-xl flex items-center justify-center">
                                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-200">
                                        <Fingerprint className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                                {/* ring */}
                                <div className="absolute inset-0 rounded-[32px] border-2 border-blue-300/40 scale-110" />
                                <div className="absolute inset-0 rounded-[32px] border border-blue-200/30 scale-125" />

                                {/* floating dot */}
                                <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-500 rounded-full shadow-lg shadow-blue-200" />
                                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-indigo-400 rounded-full" />
                            </div>
                        </div>

                        <div className="text-center">
                            <h2 className="text-3xl font-black text-slate-800 leading-tight mb-3">
                                Kelola Kehadiran<br />
                                <span className="text-blue-600">Tim Anda</span>
                            </h2>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                                Sistem absensi modern berbasis web. Pantau kehadiran karyawan secara real-time.
                            </p>
                        </div>

                        {/* mini stats */}
                        <div className="flex justify-center gap-6 mt-8">
                            {[
                                { num: "500+", label: "Perusahaan" },
                                { num: "50K+", label: "Karyawan" },
                                { num: "98%", label: "Uptime" },
                            ].map((s, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-xl font-black text-blue-700">{s.num}</div>
                                    <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="relative z-10 text-xs text-slate-400 text-center">© 2026 AbsensiPro — HR Enterprise Solution</p>
                </div>

                {/* RIGHT — FORM */}
                <div className="flex flex-col justify-center px-8 sm:px-16 py-16">

                    {/* mobile logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-10">
                        <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
                            <Fingerprint className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-blue-700 font-black text-lg">AbsensiPro</span>
                    </div>

                    <div className="max-w-sm w-full mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-black text-slate-900">Welcome Back</h1>
                            <p className="text-slate-400 text-sm mt-2">
                                Belum punya akun?{" "}
                                <Link href="/register" className="text-blue-600 font-semibold hover:underline">Daftar sekarang</Link>
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-5">

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    placeholder="kamu@perusahaan.com"
                                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 focus:bg-white transition"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-semibold text-slate-700">Password</label>
                                    <Link href="/forgot-password" className="text-xs text-slate-400 hover:text-blue-600 transition">Lupa password?</Link>
                                </div>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 focus:bg-white transition"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
                            </div>

                            <label className="flex items-center gap-2.5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData("remember", e.target.checked)}
                                    className="rounded border-slate-300 accent-blue-600 w-4 h-4"
                                />
                                <span className="text-sm text-slate-500">Ingat saya</span>
                            </label>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-100"
                            >
                                {processing ? "Memproses..." : <>Sign in to Dashboard <ArrowRight className="w-4 h-4" /></>}
                            </button>
                        </form>

                        {/* trust */}
                        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <img key={i} src={`https://i.pravatar.cc/32?img=${i + 10}`} className="w-7 h-7 rounded-full border-2 border-white" />
                                ))}
                            </div>
                            <p className="text-xs text-slate-400">Dipercaya <span className="font-semibold text-slate-600">500+ perusahaan</span> di Indonesia</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}