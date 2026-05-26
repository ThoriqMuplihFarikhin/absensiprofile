import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import { Users, Clock3, Calendar, MapPin } from "lucide-react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    Tooltip,
} from "recharts";

export default function Dashboard({ stats, attendance, weeklyChart }) {

    const statCards = [
        { title: "Total Employees", value: stats?.employees ?? 0, icon: Users, color: "bg-blue-100 text-blue-600" },
        { title: "Present Today", value: stats?.present ?? 0, icon: Clock3, color: "bg-green-100 text-green-600" },
        { title: "Late Arrivals", value: stats?.late ?? 0, icon: Calendar, color: "bg-yellow-100 text-yellow-600" },
        { title: "On Leave", value: stats?.leave ?? 0, icon: MapPin, color: "bg-purple-100 text-purple-600" },
    ];

    const getStatusBadge = (status) => {
        const map = {
            present: "bg-green-100 text-green-600",
            late: "bg-yellow-100 text-yellow-600",
            leave: "bg-purple-100 text-purple-600",
        };
        return map[status] ?? "bg-gray-100 text-gray-600";
    };

    return (
        <AdminLayout>

            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-2">Monitor attendance performance</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => router.post(route("admin.check-in"))}
                        className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-blue-700 transition"
                    >
                        Check In
                    </button>
                    <button
                        onClick={() => router.post(route("admin.check-out"))}
                        className="bg-red-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-red-600 transition"
                    >
                        Check Out
                    </button>
                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                {statCards.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="bg-white rounded-3xl p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500">{item.title}</p>
                                    <h2 className="text-4xl font-bold mt-3">{item.value}</h2>
                                </div>
                                <div className={`p-4 rounded-2xl ${item.color}`}>
                                    <Icon size={28} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CHART */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
                <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold mb-1">Attendance Trends</h2>
                    <p className="text-gray-500 mb-6">Weekly attendance overview</p>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weeklyChart ?? []}>
                                <XAxis dataKey="day" />
                                <Tooltip />
                                <Area type="monotone" dataKey="attendance" stroke="#2563eb" fill="#93c5fd" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold mb-2">Active Geofencing</h2>
                    <p className="text-gray-500 mb-6">Real-time office location</p>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl h-72 flex items-center justify-center text-white text-2xl font-bold">
                        GPS ACTIVE
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-1">Recent Attendance</h2>
                <p className="text-gray-500 mb-6">Latest employee attendance activity</p>
                <table className="w-full">
                    <thead>
                        <tr className="border-b text-gray-500">
                            <th className="text-left py-4">Employee</th>
                            <th className="text-left py-4">Date</th>
                            <th className="text-left py-4">Check In</th>
                            <th className="text-left py-4">Check Out</th>
                            <th className="text-left py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance?.length > 0 ? (
                            attendance.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                    <td className="py-4 font-medium">{item.user?.name ?? "-"}</td>
                                    <td>{item.date}</td>
                                    <td>{item.check_in ?? "-"}</td>
                                    <td>{item.check_out ?? "-"}</td>
                                    <td>
                                        <span className={`px-4 py-2 rounded-full text-sm ${getStatusBadge(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-gray-400">
                                    No attendance records yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </AdminLayout>
    );
}