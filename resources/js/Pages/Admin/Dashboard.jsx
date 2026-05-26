import AdminLayout from "@/Layouts/AdminLayout";
import { router, usePage } from "@inertiajs/react";
import { Users, Clock3, Calendar, MapPin } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet icon bug
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Dashboard({ stats, attendance, weeklyChart, geofence }) {
    const { props } = usePage();
    const [processing, setProcessing] = useState(false);

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

    const handleCheckIn = () => {
        setProcessing(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    router.post(route("admin.check-in"), {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    }, { onFinish: () => setProcessing(false) });
                },
                () => {
                    router.post(route("admin.check-in"), {}, 
                        { onFinish: () => setProcessing(false) }
                    );
                }
            );
        } else {
            router.post(route("admin.check-in"), {}, 
                { onFinish: () => setProcessing(false) }
            );
        }
    };

    const handleCheckOut = () => {
        setProcessing(true);
        router.post(route("admin.check-out"), {}, 
            { onFinish: () => setProcessing(false) }
        );
    };

    const mapCenter = geofence
        ? [geofence.latitude, geofence.longitude]
        : [-6.2088, 106.8456]; // default Jakarta

    return (
        <AdminLayout>

            {/* FLASH MESSAGE */}
            {props.flash?.success && (
                <div className="mb-6 bg-green-100 text-green-700 px-5 py-3 rounded-2xl text-sm">
                    ✅ {props.flash.success}
                </div>
            )}
            {props.flash?.error && (
                <div className="mb-6 bg-red-100 text-red-700 px-5 py-3 rounded-2xl text-sm">
                    ❌ {props.flash.error}
                </div>
            )}

            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-2">Monitor attendance performance</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleCheckIn}
                        disabled={processing}
                        className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {processing ? "Loading..." : "Check In"}
                    </button>
                    <button
                        onClick={handleCheckOut}
                        disabled={processing}
                        className="bg-red-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-red-600 transition disabled:opacity-50"
                    >
                        {processing ? "Loading..." : "Check Out"}
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

            {/* CHART + MAP */}
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

                {/* MAP */}
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold mb-1">Active Geofencing</h2>
                    <p className="text-gray-500 mb-4">
                        {geofence ? geofence.name : "No geofence set"}
                    </p>
                    <div className="h-72 rounded-2xl overflow-hidden">
                        <MapContainer
                            center={mapCenter}
                            zoom={16}
                            style={{ height: "100%", width: "100%" }}
                            scrollWheelZoom={false}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="© OpenStreetMap contributors"
                            />
                            {geofence && (
                                <>
                                    <Marker position={[geofence.latitude, geofence.longitude]}>
                                        <Popup>{geofence.name}</Popup>
                                    </Marker>
                                    <Circle
                                        center={[geofence.latitude, geofence.longitude]}
                                        radius={geofence.radius}
                                        pathOptions={{ color: "blue", fillColor: "#93c5fd", fillOpacity: 0.3 }}
                                    />
                                </>
                            )}
                        </MapContainer>
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