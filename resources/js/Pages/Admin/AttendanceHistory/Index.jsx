import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import { Settings2, Download } from "lucide-react";

export default function Index({ attendance, filters }) {

    const handleFilter = (newFilters) => {
        router.get(
            route("admin.attendance-history"),
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
    const presentPct = attendance?.total > 0
        ? Math.round((attendance.data.filter(a => a.status === "present").length / (attendance?.data?.length || 1)) * 100)
        : 0;

    return (
        <AdminLayout>
            <div className="space-y-6">

                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Attendance History</h1>
                        <p className="text-gray-500 mt-1">
                            Manage and monitor employee attendance logs
                        </p>
                    </div>
                    {/* ✅ FIX: tag <a yang tadinya hilang */}
                    <a
                        href={route("admin.attendance-export")}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
                    >
                        <Download size={16} />
                        Quick Export
                    </a>
                </div>

                {/* FILTER TABS */}
                <div className="flex items-center gap-6 border-b">
                    {["Overview", "Reports", "Schedules"].map((tab, i) => (
                        <button
                            key={tab}
                            className={`pb-3 text-sm font-medium transition ${
                                i === 1
                                    ? "border-b-2 border-blue-600 text-blue-600"
                                    : "text-gray-400 hover:text-gray-600"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* STATS ROW */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Average Present</p>
                                <h2 className="text-4xl font-black text-gray-800 mt-1">
                                    {presentPct}%
                                </h2>
                            </div>
                            <span className="text-green-500 text-sm font-semibold bg-green-50 px-2 py-1 rounded-lg">
                                +4%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Late Arrivals</p>
                                <h2 className="text-4xl font-black text-gray-800 mt-1">
                                    {totalLate} Users
                                </h2>
                            </div>
                            <span className="text-red-500 text-sm font-semibold bg-red-50 px-2 py-1 rounded-lg">
                                +12%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <div>
                            <p className="text-sm font-semibold text-gray-700">
                                Weekly Attendance Summary
                            </p>
                            <p className="text-green-600 font-bold mt-1">
                                Operations are running optimal.
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                                {attendance?.data?.length ?? 0} employees recorded today
                            </p>
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                    <div className="flex items-center justify-between p-5 border-b">
                        <h2 className="text-lg font-bold">Detailed Records</h2>
                        <div className="flex items-center gap-3">
                            {/* SEARCH */}
                            <input
                                type="text"
                                placeholder="Search employee..."
                                defaultValue={filters?.search}
                                onChange={(e) => handleFilter({ search: e.target.value })}
                                className="border rounded-xl px-4 py-2 text-sm w-48"
                            />
                            {/* DATE FROM */}
                            <input
                                type="date"
                                defaultValue={filters?.from}
                                onChange={(e) => handleFilter({ from: e.target.value })}
                                className="border rounded-xl px-4 py-2 text-sm"
                            />
                            {/* DATE TO */}
                            <input
                                type="date"
                                defaultValue={filters?.to}
                                onChange={(e) => handleFilter({ to: e.target.value })}
                                className="border rounded-xl px-4 py-2 text-sm"
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
                                                    <p className="font-medium text-gray-800">
                                                        {item.user?.name ?? "-"}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        {item.user?.department ?? item.user?.email ?? "-"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {item.date}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium">
                                            {item.check_in
                                                ? <span className={item.status === "late" ? "text-red-500" : "text-gray-800"}>
                                                    {item.check_in}
                                                  </span>
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
                                            <button className="text-gray-400 hover:text-blue-600 transition">
                                                👁
                                            </button>
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

                    {/* PAGINATION */}
                    {attendance?.last_page > 1 && (
                        <div className="flex justify-center gap-2 p-4 border-t">
                            {attendance.links.map((link, i) => (
                                <button
                                    key={i}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                    className={`px-4 py-2 rounded-lg text-sm ${
                                        link.active
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    } disabled:opacity-40`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </AdminLayout>
    );
}