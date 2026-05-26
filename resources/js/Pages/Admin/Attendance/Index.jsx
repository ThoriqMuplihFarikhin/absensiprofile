import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import { Settings2, Download, TrendingUp, Users, Clock, Calendar } from "lucide-react";
import { useState } from "react";

export default function Index({ attendance, filters }) {
    const [activeTab, setActiveTab] = useState("Reports");

    const handleFilter = (newFilters) => {
        router.get(
            route("admin.attendance"),
            {
                search: newFilters.search ?? filters?.search,
                from: newFilters.from ?? filters?.from,
                to: newFilters.to ?? filters?.to,
            },
            { preserveState: true, replace: true }
        );
    };

    const getStatusBadge = (status) => {
        const map = {
            present: "bg-green-100 text-green-700 border border-green-200",
            late: "bg-yellow-100 text-yellow-700 border border-yellow-200",
            leave: "bg-blue-100 text-blue-700 border border-blue-200",
        };
        return map[status] ?? "bg-gray-100 text-gray-600";
    };

    const totalPresent = attendance?.data?.filter(a => a.status === "present").length ?? 0;
    const totalLate = attendance?.data?.filter(a => a.status === "late").length ?? 0;
    const presentPct = attendance?.data?.length > 0
        ? Math.round((totalPresent / attendance.data.length) * 100)
        : 0;

    return (
        <AdminLayout>
            <div className="space-y-6">

                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Attendance</h1>
                        <p className="text-gray-500 mt-1">Manage and monitor employee attendance logs</p>
                    </div>
                    
                    <a href={route("admin.attendance-export")}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
                    >
                        <Download size={16} />
                        Quick Export
                    </a>
                </div>

                {/* TABS */}
                <div className="flex items-center gap-6 border-b">
                    {["Overview", "Reports", "Schedules"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-sm font-medium transition ${
                                activeTab === tab
                                    ? "border-b-2 border-blue-600 text-blue-600"
                                    : "text-gray-400 hover:text-gray-600"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* ===== TAB: OVERVIEW ===== */}
                {activeTab === "Overview" && (
                    <div className="space-y-6">
                        {/* stat cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Total Hadir", value: totalPresent, icon: Users, color: "text-green-600", bg: "bg-green-50" },
                                { label: "Terlambat", value: totalLate, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
                                { label: "Rata-rata Hadir", value: `${presentPct}%`, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
                                { label: "Total Record", value: attendance?.data?.length ?? 0, icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
                            ].map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border">
                                        <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                                            <Icon size={20} className={s.color} />
                                        </div>
                                        <p className="text-gray-400 text-xs">{s.label}</p>
                                        <p className={`text-3xl font-black mt-1 ${s.color}`}>{s.value}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* recent list */}
                        <div className="bg-white rounded-2xl shadow-sm border p-5">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Absensi Terbaru</h2>
                            {attendance?.data?.length > 0 ? (
                                <div className="space-y-3">
                                    {attendance.data.slice(0, 5).map((item) => (
                                        <div key={item.id} className="flex items-center justify-between py-3 border-b last:border-0">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-sm">
                                                    {item.user?.name?.charAt(0) ?? "?"}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm text-gray-800">{item.user?.name ?? "-"}</p>
                                                    <p className="text-xs text-gray-400">{item.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                                <span>Masuk: <b className="text-gray-700">{item.check_in ?? "--:--"}</b></span>
                                                <span>Keluar: <b className="text-gray-700">{item.check_out ?? "--:--"}</b></span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-400 py-8">Belum ada data absensi</p>
                            )}
                        </div>
                    </div>
                )}

                {/* ===== TAB: REPORTS ===== */}
                {activeTab === "Reports" && (
                    <div className="space-y-4">
                        {/* stats row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-2xl p-5 shadow-sm border">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Average Present</p>
                                        <h2 className="text-4xl font-black text-gray-800 mt-1">{presentPct}%</h2>
                                    </div>
                                    <span className="text-green-500 text-sm font-semibold bg-green-50 px-2 py-1 rounded-lg">+4%</span>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-5 shadow-sm border">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Late Arrivals</p>
                                        <h2 className="text-4xl font-black text-gray-800 mt-1">{totalLate} Users</h2>
                                    </div>
                                    <span className="text-red-500 text-sm font-semibold bg-red-50 px-2 py-1 rounded-lg">+12%</span>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-5 shadow-sm border">
                                <p className="text-sm font-semibold text-gray-700">Weekly Attendance Summary</p>
                                <p className="text-green-600 font-bold mt-1">Operations are running optimal.</p>
                                <p className="text-gray-400 text-sm mt-1">{attendance?.data?.length ?? 0} employees recorded today</p>
                            </div>
                        </div>

                        {/* table */}
                        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                            <div className="flex items-center justify-between p-5 border-b">
                                <h2 className="text-lg font-bold">Detailed Records</h2>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        placeholder="Search employee..."
                                        defaultValue={filters?.search}
                                        onChange={(e) => handleFilter({ search: e.target.value })}
                                        className="border rounded-xl px-4 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                    />
                                    <input
                                        type="date"
                                        defaultValue={filters?.from}
                                        onChange={(e) => handleFilter({ from: e.target.value })}
                                        className="border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                                    />
                                    <input
                                        type="date"
                                        defaultValue={filters?.to}
                                        onChange={(e) => handleFilter({ to: e.target.value })}
                                        className="border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                                    />
                                    <button className="p-2 rounded-xl border hover:bg-gray-50">
                                        <Settings2 size={18} className="text-gray-500" />
                                    </button>
                                </div>
                            </div>

                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-gray-50 text-sm text-gray-500">
                                        <th className="text-left px-6 py-4">Employee</th>
                                        <th className="text-left px-6 py-4">Date</th>
                                        <th className="text-left px-6 py-4">Clock In</th>
                                        <th className="text-left px-6 py-4">Clock Out</th>
                                        <th className="text-left px-6 py-4">Status</th>
                                        <th className="text-left px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendance?.data?.length > 0 ? (
                                        attendance.data.map((item) => (
                                            <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-sm">
                                                            {item.user?.name?.charAt(0) ?? "?"}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-800">{item.user?.name ?? "-"}</p>
                                                            <p className="text-xs text-gray-400">{item.user?.email ?? "-"}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                                                <td className="px-6 py-4 text-sm font-medium">
                                                    {item.check_in
                                                        ? <span className={item.status === "late" ? "text-red-500" : "text-gray-800"}>{item.check_in}</span>
                                                        : <span className="text-gray-300">----</span>
                                                    }
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        {item.check_out
                                                            ? <span>{item.check_out}</span>
                                                            : <span className="text-gray-300">----</span>
                                                        }
                                                        {item.auto_checkout && (
                                                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">AUTO</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusBadge(item.status)}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button className="text-gray-400 hover:text-blue-600 transition">👁</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="text-center py-12 text-gray-400">
                                                No attendance records found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {attendance?.last_page > 1 && (
                                <div className="flex justify-center gap-2 p-4 border-t">
                                    {attendance.links.map((link, i) => (
                                        <button
                                            key={i}
                                            disabled={!link.url}
                                            onClick={() => link.url && router.get(link.url)}
                                            className={`px-4 py-2 rounded-lg text-sm ${
                                                link.active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            } disabled:opacity-40`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ===== TAB: SCHEDULES ===== */}
                {activeTab === "Schedules" && (
                    <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
                        <h2 className="text-lg font-bold text-gray-800">Jadwal Kerja</h2>

                        {[
                            { shift: "Full Time", hari: "Senin – Jumat", masuk: "10:00", pulang: "17:00", status: "Aktif" },
                            { shift: "Part Time", hari: "Senin – Rabu", masuk: "08:00", pulang: "13:00", status: "Aktif" },
                            { shift: "Weekend", hari: "Sabtu – Minggu", masuk: "09:00", pulang: "15:00", status: "Nonaktif" },
                        ].map((s, i) => (
                            <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                        <Calendar size={18} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{s.shift}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{s.hari}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 text-sm text-gray-600">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-400">Masuk</p>
                                        <p className="font-bold text-green-600">{s.masuk}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-400">Pulang</p>
                                        <p className="font-bold text-blue-600">{s.pulang}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        s.status === "Aktif"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-500"
                                    }`}>
                                        {s.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}