import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { Clock, ToggleLeft, ToggleRight, Shield, Bell, CheckCircle, Calendar, Users } from "lucide-react";

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
                    <div className="bg-green-100 text-green-700 px-5 py-4 rounded-2xl flex items-center gap-3">
                        <CheckCircle size={18} />
                        {props.flash.success}
                    </div>
                )}

                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Scheduler Config</h1>
                    <p className="text-gray-500 mt-1">Manage automated workforce check-out rules</p>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <p className="text-gray-400 text-sm">Global Automation</p>
                        <h2 className={`text-2xl font-black mt-1 ${data.enabled ? "text-green-600" : "text-red-500"}`}>
                            {data.enabled ? "Enabled" : "Disabled"}
                        </h2>
                        <div className={`mt-2 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${data.enabled ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${data.enabled ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                            {data.enabled ? "Active" : "Inactive"}
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <p className="text-gray-400 text-sm">Auto Checkout Time</p>
                        <h2 className="text-2xl font-black text-gray-800 mt-1">{data.auto_checkout_time}</h2>
                        <p className="text-xs text-gray-400 mt-2">Jam pulang kerja</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <p className="text-gray-400 text-sm">System Updates</p>
                        <h2 className="text-2xl font-black text-gray-800 mt-1">2h ago</h2>
                        <p className="text-xs text-gray-400 mt-2">Last sync</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <p className="text-gray-400 text-sm">Affected Staff</p>
                        <h2 className="text-2xl font-black text-blue-600 mt-1">All</h2>
                        <p className="text-xs text-gray-400 mt-2">Semua karyawan</p>
                    </div>
                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* FORM */}
                    <div className="xl:col-span-2 space-y-5">

                        {/* AUTO CHECKOUT RULES */}
                        <div className="bg-white rounded-2xl shadow-sm border p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Auto-Checkout Rules</h2>
                                <button
                                    type="button"
                                    onClick={() => put(route("admin.settings.update"))}
                                    className="text-sm text-gray-400 hover:text-gray-600 border px-3 py-1.5 rounded-lg transition"
                                >
                                    Reset to Defaults
                                </button>
                            </div>

                            <form onSubmit={submit} className="space-y-6">

                                {/* STANDARD SHIFT */}
                                <div className="border rounded-2xl p-5">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="font-bold text-gray-700">Standard Shift</p>
                                            <p className="text-xs text-gray-400 mt-0.5">Mon - Fri • 9:00 - 18:00</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setData("enabled", !data.enabled)}
                                            className={`relative w-12 h-6 rounded-full transition-colors ${data.enabled ? "bg-blue-600" : "bg-gray-200"}`}
                                        >
                                            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${data.enabled ? "translate-x-7" : "translate-x-1"}`} />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-gray-400 mb-1 block">Trigger Time</label>
                                            <input
                                                type="time"
                                                value={data.auto_checkout_time}
                                                onChange={(e) => setData("auto_checkout_time", e.target.value)}
                                                className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-400 mb-1 block">Grace Period (mins)</label>
                                            <input
                                                type="number"
                                                defaultValue={30}
                                                className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* NOTIFICATION SETTINGS */}
                                <div className="border rounded-2xl p-5">
                                    <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                                        <Bell size={16} className="text-gray-400" />
                                        Notification Settings
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            "Send SMS reminder 10m before checkout",
                                            "Email daily exception reports to HR",
                                        ].map((item, i) => (
                                            <label key={i} className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-blue-600" />
                                                <span className="text-sm text-gray-600">{item}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        className="px-5 py-3 border rounded-xl text-gray-600 hover:bg-gray-50 transition text-sm"
                                    >
                                        Discard Changes
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm font-bold disabled:opacity-50"
                                    >
                                        {processing ? "Saving..." : "Save Configuration"}
                                    </button>
                                </div>

                            </form>
                        </div>

                        {/* DEPARTMENT SHIFTS */}
                        <div className="bg-white rounded-2xl shadow-sm border p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Department Specific Shifts</h2>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-gray-400">
                                        <th className="text-left py-3">Department</th>
                                        <th className="text-left py-3">Shift Timing</th>
                                        <th className="text-left py-3">Automation</th>
                                        <th className="text-left py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { dept: "Engineering", icon: "⚙️", shift: "09:00 — 18:00", automation: "ENABLED", color: "bg-green-100 text-green-600" },
                                        { dept: "Customer Support", icon: "🎧", shift: "Rotational (24/7)", automation: "MANUAL ONLY", color: "bg-yellow-100 text-yellow-600" },
                                        { dept: "Marketing", icon: "📢", shift: "10:00 — 19:00", automation: "ENABLED", color: "bg-green-100 text-green-600" },
                                    ].map((item, i) => (
                                        <tr key={i} className="border-b hover:bg-gray-50">
                                            <td className="py-3 flex items-center gap-2">
                                                <span>{item.icon}</span>
                                                <span className="font-medium text-gray-700">{item.dept}</span>
                                            </td>
                                            <td className="py-3 text-gray-500">{item.shift}</td>
                                            <td className="py-3">
                                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.color}`}>
                                                    {item.automation}
                                                </span>
                                            </td>
                                            <td className="py-3">
                                                <button className="text-blue-600 hover:text-blue-700 text-xs">✏️ Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>

                    {/* SIDEBAR */}
                    <div className="space-y-4">

                        {/* AUTOMATION HEALTH */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
                            <div className="flex items-center gap-2 mb-3">
                                <Shield size={18} />
                                <h3 className="font-bold">Automation Health</h3>
                            </div>
                            <p className="text-blue-200 text-sm mb-4">
                                All systems are operational. Today's auto-checkout scheduled for {data.auto_checkout_time} PM.
                            </p>
                            <button className="w-full bg-white/20 hover:bg-white/30 transition py-2.5 rounded-xl text-sm font-semibold">
                                🔄 System Sync OK
                            </button>
                        </div>

                        {/* BEST PRACTICES */}
                        <div className="bg-white rounded-2xl shadow-sm border p-5">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                💡 Best Practices
                            </h3>
                            <div className="space-y-3 text-sm text-gray-500">
                                <div className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    <p>Set checkout times at least 30 minutes after official shift ends for wrap-up.</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    <p>Enable reminders to prevent sudden disconnections from ongoing tasks.</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    <p>Review monthly auto-checkout reports to identify consistent overtime patterns.</p>
                                </div>
                            </div>
                        </div>

                        {/* NEED HELP */}
                        <div className="bg-gray-50 rounded-2xl border p-5 text-center">
                            <p className="text-2xl mb-2">❓</p>
                            <h3 className="font-bold text-gray-700 mb-1">Need Help?</h3>
                            <p className="text-xs text-gray-400 mb-4">
                                Our documentation covers complex shift configurations.
                            </p>
                            <button className="w-full border py-2.5 rounded-xl text-sm text-gray-600 hover:bg-white transition font-medium">
                                View Documentation
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </AdminLayout>
    );
}
