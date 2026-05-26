import AdminLayout from "@/Layouts/AdminLayout";
import { router, usePage, Link } from "@inertiajs/react";
import { QrCode, RefreshCw, Scan, CheckCircle, Clock, Shield } from "lucide-react";

export default function Index({ qr }) {
    const { props } = usePage();

    return (
        <AdminLayout>
            <div className="space-y-6">

                {props.flash?.success && (
                    <div className="bg-green-100 text-green-700 px-5 py-4 rounded-2xl flex items-center gap-3">
                        <CheckCircle size={18} />
                        {props.flash.success}
                    </div>
                )}
                {props.flash?.error && (
                    <div className="bg-red-100 text-red-700 px-5 py-4 rounded-2xl">
                        ❌ {props.flash.error}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">QR Attendance</h1>
                        <p className="text-gray-500 mt-1">Generate & manage attendance QR codes</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => router.post(route("admin.qr-code.generate"))}
                            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition shadow"
                        >
                            <RefreshCw size={16} />
                            Generate QR
                        </button>
                        <Link
                            href={route("admin.qr-code.scanner")}
                            className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition shadow"
                        >
                            <Scan size={16} />
                            Open Scanner
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                <QrCode size={20} className="text-blue-600" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">QR Status</p>
                                <p className={`font-bold ${qr?.is_active ? "text-green-600" : "text-red-500"}`}>
                                    {qr?.is_active ? "Active" : "Inactive"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                <Clock size={20} className="text-green-600" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Generated Date</p>
                                <p className="font-bold text-gray-700">{qr?.date ?? "-"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Shield size={20} className="text-purple-600" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Security</p>
                                <p className="font-bold text-gray-700">Token Based</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border overflow-hidden">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white text-center">
                            <h2 className="text-xl font-bold mb-1">Today's Attendance QR</h2>
                            <p className="text-blue-200 text-sm">Scan this QR code to record attendance</p>
                        </div>
                        <div className="p-8 flex flex-col items-center gap-6">
                            {qr ? (
                                <>
                                    <div className="relative">
                                        <div className="absolute -inset-3 bg-blue-50 rounded-3xl" />
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qr.token}&bgcolor=ffffff&color=1e40af&qzone=2`}
                                            alt="QR Code"
                                            className="relative rounded-2xl shadow-lg w-56 h-56"
                                        />
                                    </div>
                                    <div className="text-center space-y-2 w-full max-w-sm">
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                                            qr.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                                        }`}>
                                            <div className={`w-2 h-2 rounded-full ${qr.is_active ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                                            {qr.is_active ? "Active & Ready to Scan" : "Inactive"}
                                        </div>
                                        <div className="bg-gray-50 rounded-2xl p-4 mt-4">
                                            <p className="text-xs text-gray-400 mb-1">Token</p>
                                            <p className="font-mono text-sm text-gray-700 break-all">{qr.token}</p>
                                        </div>
                                        <p className="text-sm text-gray-400">
                                            Valid for: <span className="font-semibold text-gray-600">{qr.date}</span>
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                        <QrCode size={40} className="text-gray-300" />
                                    </div>
                                    <p className="text-gray-400 font-medium">No QR Generated Yet</p>
                                    <p className="text-gray-300 text-sm mt-1">Click "Generate QR" to create one</p>
                                    <button
                                        onClick={() => router.post(route("admin.qr-code.generate"))}
                                        className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition mx-auto"
                                    >
                                        <RefreshCw size={16} />
                                        Generate Now
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl shadow-sm border p-5">
                            <h3 className="font-bold text-gray-800 mb-4">How to Use</h3>
                            <div className="space-y-4">
                                {[
                                    { step: "1", title: "Generate QR", desc: "Klik tombol Generate QR untuk membuat kode baru", color: "bg-blue-100 text-blue-600" },
                                    { step: "2", title: "Tampilkan", desc: "Tampilkan QR code ini di layar untuk karyawan", color: "bg-green-100 text-green-600" },
                                    { step: "3", title: "Scan", desc: "Karyawan scan QR via aplikasi untuk absensi", color: "bg-purple-100 text-purple-600" },
                                    { step: "4", title: "Tercatat", desc: "Absensi otomatis tersimpan di sistem", color: "bg-yellow-100 text-yellow-600" },
                                ].map((item) => (
                                    <div key={item.step} className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${item.color}`}>
                                            {item.step}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-700 text-sm">{item.title}</p>
                                            <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100 p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <Shield size={16} className="text-purple-600" />
                                <h3 className="font-bold text-purple-700 text-sm">Security Info</h3>
                            </div>
                            <div className="space-y-2 text-xs text-gray-500">
                                <p>✅ Token unik setiap generate</p>
                                <p>✅ QR lama otomatis nonaktif</p>
                                <p>✅ Satu karyawan satu absensi per hari</p>
                                <p>✅ Token tersimpan aman di database</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border p-5">
                            <h3 className="font-bold text-gray-800 mb-3 text-sm">Quick Actions</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => router.post(route("admin.qr-code.generate"))}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition text-left"
                                >
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <RefreshCw size={14} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Regenerate QR</p>
                                        <p className="text-xs text-gray-400">Buat token QR baru</p>
                                    </div>
                                </button>
                                <Link
                                    href={route("admin.qr-code.scanner")}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition"
                                >
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Scan size={14} className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Open Scanner</p>
                                        <p className="text-xs text-gray-400">Scan QR karyawan</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </AdminLayout>
    );
}
