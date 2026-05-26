import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";

export default function Index({ scheduler }) {
    const { props } = usePage();

    const { data, setData, put, processing } = useForm({
        auto_checkout_time: scheduler?.auto_checkout_time?.slice(0, 5) ?? "17:00",
        enabled: scheduler?.enabled ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("admin.settings.update"));
    };

    return (
        <AdminLayout>
            <div className="space-y-6">

                {/* FLASH */}
                {props.flash?.success && (
                    <div className="bg-green-100 text-green-700 px-5 py-4 rounded-2xl">
                        ✅ {props.flash.success}
                    </div>
                )}

                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold">Scheduler Config</h1>
                    <p className="text-slate-500 mt-1">
                        Manage auto checkout settings
                    </p>
                </div>

                {/* STATUS CARD */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <p className="text-slate-500 text-sm">Global Automation</p>
                        <h2 className={`text-2xl font-bold mt-1 ${
                            data.enabled ? "text-green-600" : "text-red-500"
                        }`}>
                            {data.enabled ? "Enabled" : "Disabled"}
                        </h2>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <p className="text-slate-500 text-sm">Auto Checkout Time</p>
                        <h2 className="text-2xl font-bold mt-1">{data.auto_checkout_time}</h2>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <p className="text-slate-500 text-sm">Status</p>
                        <h2 className="text-2xl font-bold mt-1 text-blue-600">Active</h2>
                    </div>
                </div>

                {/* FORM */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Auto-Checkout Rules</h2>

                    <form onSubmit={submit} className="space-y-6">

                        {/* TIME */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Checkout Time
                            </label>
                            <input
                                type="time"
                                value={data.auto_checkout_time}
                                onChange={(e) => setData("auto_checkout_time", e.target.value)}
                                className="border rounded-xl px-4 py-3 w-full md:w-64"
                            />
                            <p className="text-xs text-slate-400 mt-2">
                                Karyawan akan otomatis checkout pada jam ini
                            </p>
                        </div>

                        {/* TOGGLE */}
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-medium text-slate-700">
                                Enable Auto Checkout
                            </label>
                            <button
                                type="button"
                                onClick={() => setData("enabled", !data.enabled)}
                                className={`relative w-14 h-7 rounded-full transition-colors ${
                                    data.enabled ? "bg-blue-600" : "bg-gray-300"
                                }`}
                            >
                                <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                                    data.enabled ? "translate-x-8" : "translate-x-1"
                                }`} />
                            </button>
                        </div>

                        {/* BEST PRACTICES */}
                        <div className="bg-blue-50 rounded-2xl p-5 text-sm text-blue-700 space-y-2">
                            <p className="font-bold">💡 Best Practices:</p>
                            <p>• Set checkout time minimal 30 menit setelah jam kerja resmi</p>
                            <p>• Aktifkan notifikasi untuk reminder sebelum auto checkout</p>
                            <p>• Review laporan bulanan untuk pola overtime</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                Save Configuration
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </AdminLayout>
    );
}