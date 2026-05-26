import { router, usePage, useForm } from "@inertiajs/react";
import { Home, History, QrCode, User, LogOut, ArrowLeft } from "lucide-react";

export default function ProfilePage() {
    const { props } = usePage();
    const user = props.auth?.user;

    const { data, setData, patch, processing } = useForm({
        name: user?.name ?? "",
        email: user?.email ?? "",
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="w-full max-w-sm bg-white min-h-screen flex flex-col">

                <div className="flex items-center gap-3 px-5 pt-6 pb-4 border-b">
                    <button onClick={() => router.visit(route("employee.dashboard"))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <ArrowLeft size={16} />
                    </button>
                    <h1 className="font-bold text-gray-800 text-lg">My Profile</h1>
                </div>

                <div className="flex-1 px-5 py-6 space-y-6 mb-24">

                    {/* PROFILE HEADER */}
                    <div className="flex flex-col items-center gap-3 py-4">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-4xl shadow-lg">
                                {user?.name?.charAt(0) ?? "U"}
                            </div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
                        </div>
                        <div className="text-center">
                            <p className="font-black text-gray-800 text-xl">{user?.name}</p>
                            <p className="text-gray-400 text-sm mt-0.5">{user?.email}</p>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full capitalize font-semibold">
                                    {user?.role}
                                </span>
                                <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-semibold">
                                    ● Active
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* INFO */}
                    <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
                        <h3 className="font-bold text-gray-700 text-sm">Informasi Karyawan</h3>
                        <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                            <span className="text-gray-400">Departemen</span>
                            <span className="font-medium text-gray-700">{user?.department ?? "-"}</span>
                        </div>
                        <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                            <span className="text-gray-400">Jabatan</span>
                            <span className="font-medium text-gray-700">{user?.position ?? "-"}</span>
                        </div>
                        <div className="flex justify-between text-sm py-1">
                            <span className="text-gray-400">No. Telepon</span>
                            <span className="font-medium text-gray-700">{user?.phone ?? "-"}</span>
                        </div>
                    </div>

                    {/* FLASH */}
                    {props.flash?.success && (
                        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-2xl text-sm">
                            ✅ {props.flash.success}
                        </div>
                    )}

                    {/* UPDATE FORM */}
                    <div className="bg-white rounded-2xl border p-5 space-y-4">
                        <div>
                            <h3 className="font-bold text-gray-700">Perbarui Profil</h3>
                            <p className="text-xs text-gray-400 mt-0.5">Ubah nama dan email akun Anda</p>
                        </div>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Nama Lengkap"
                            className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="Alamat Email"
                            className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <button
                            onClick={submit}
                            disabled={processing}
                            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {processing ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>

                    {/* DANGER ZONE */}
                    <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
                        <h3 className="font-bold text-red-600 text-sm mb-1">Keluar Akun</h3>
                        <p className="text-xs text-gray-400 mb-4">
                            Setelah logout, Anda harus login kembali untuk mengakses aplikasi. Pastikan semua pekerjaan Anda telah tersimpan.
                        </p>
                        <button
                            onClick={() => {
                                if (confirm("Apakah Anda yakin ingin keluar dari aplikasi?")) {
                                    router.post(route("logout"));
                                }
                            }}
                            className="w-full border-2 border-red-200 text-red-500 py-3 rounded-xl font-bold hover:bg-red-100 transition"
                        >
                            Keluar dari Aplikasi
                        </button>
                    </div>

                </div>

                {/* BOTTOM NAV */}
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t px-6 py-3 flex items-center justify-between z-50">
                    <button onClick={() => router.visit(route("employee.dashboard"))} className="flex flex-col items-center gap-1 text-gray-400">
                        <Home size={20} />
                        <span className="text-xs">Home</span>
                    </button>
                    <button onClick={() => router.visit(route("employee.history"))} className="flex flex-col items-center gap-1 text-gray-400">
                        <History size={20} />
                        <span className="text-xs">History</span>
                    </button>
                    <button className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200 -mt-6">
                        <QrCode size={24} className="text-white" />
                    </button>
                    <button className="flex flex-col items-center gap-1 text-blue-600">
                        <User size={20} />
                        <span className="text-xs font-medium">Profile</span>
                    </button>
                    <button onClick={() => router.post(route("logout"))} className="flex flex-col items-center gap-1 text-gray-400">
                        <LogOut size={20} />
                        <span className="text-xs">Logout</span>
                    </button>
                </div>

            </div>
        </div>
    );
}
