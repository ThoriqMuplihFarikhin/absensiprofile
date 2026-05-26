import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";

export default function Index({ attendances }) {

    const getStatusBadge = (status) => {
        const map = {
            present: "bg-green-100 text-green-700 border border-green-200",
            late: "bg-yellow-100 text-yellow-700 border border-yellow-200",
            leave: "bg-blue-100 text-blue-700 border border-blue-200",
        };
        return map[status] ?? "bg-gray-100 text-gray-600";
    };

    return (
        <AdminLayout>
            <div className="space-y-6">

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Attendance</h1>
                        <p className="text-gray-500 mt-1">Today's attendance records</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-gray-50 text-sm text-gray-500">
                                <th className="text-left px-6 py-4">Employee</th>
                                <th className="text-left px-6 py-4">Date</th>
                                <th className="text-left px-6 py-4">Check In</th>
                                <th className="text-left px-6 py-4">Check Out</th>
                                <th className="text-left px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendances?.length > 0 ? (
                                attendances.map((item) => (
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
                                                {item.check_out ?? <span className="text-gray-300">----</span>}
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
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-gray-400">
                                        No attendance records found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </AdminLayout>
    );
}
