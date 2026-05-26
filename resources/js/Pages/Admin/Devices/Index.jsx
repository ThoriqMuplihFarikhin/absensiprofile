import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage, router } from "@inertiajs/react";
import { Plus, Wifi, WifiOff, AlertTriangle, RefreshCw, Settings, FileText, Download } from "lucide-react";

export default function Index({ devices }) {
    const { props } = usePage();

    const { data, setData, post, processing, reset } = useForm({
        device_code: "",
        name: "",
        location: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.devices.store"), {
            onSuccess: () => reset(),
        });
    };

    const deleteDevice = (id) => {
        if (confirm("Delete this device?")) {
            router.delete(route("admin.devices.destroy", id));
        }
    };

    const totalOnline = devices.filter(d => d.status === "online").length;
    const totalOffline = devices.filter(d => d.status === "offline").length;

    return (
        <AdminLayout>
            <div className="space-y-6">

                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Devices</h1>
                        <p className="text-gray-500 mt-1">HR Administration</p>
                    </div>
                    <button
                        onClick={() => document.getElementById("add-form").scrollIntoView({ behavior: "smooth" })}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition shadow"
                    >
                        <Plus size={18} />
                        Add Device
                    </button>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <p className="text-gray-400 text-sm">Total Units</p>
                        <h2 className="text-3xl font-black text-gray-800 mt-1">{devices.length}</h2>
                        <p className="text-green-500 text-xs mt-1 font-medium">+{devices.length} from last month</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <p className="text-gray-400 text-sm">Online Now</p>
                        <h2 className="text-3xl font-black text-gray-800 mt-1">{totalOnline}</h2>
                        <p className="text-blue-500 text-xs mt-1 font-medium">{totalOnline > 0 ? Math.round((totalOnline/devices.length)*100) : 0}% operational rate</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <p className="text-gray-400 text-sm">Offline</p>
                        <h2 className="text-3xl font-black text-red-500 mt-1">{totalOffline}</h2>
                        <p className="text-red-400 text-xs mt-1 font-medium">Maintenance required</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <p className="text-gray-400 text-sm">Updates</p>
                        <h2 className="text-3xl font-black text-yellow-500 mt-1">0</h2>
                        <p className="text-yellow-400 text-xs mt-1 font-medium">Firmware v2.4 pending</p>
                    </div>
                </div>

                {/* DEVICE LIST */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Device Management</h2>
                            <p className="text-gray-400 text-sm mt-0.5">Monitor and configure your QR scanning hardware</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-xl border hover:bg-gray-50">
                                <Settings size={18} className="text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {devices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {devices.map((device) => (
                                <div key={device.id} className="border rounded-2xl overflow-hidden hover:shadow-md transition">
                                    {/* DEVICE IMAGE */}
                                    <div className="relative bg-gray-100 h-44 flex items-center justify-center">
                                        <div className="w-24 h-24 bg-white rounded-2xl shadow flex items-center justify-center">
                                            <div className="grid grid-cols-3 gap-0.5 w-12 h-12">
                                                {[...Array(9)].map((_, i) => (
                                                    <div key={i} className={`rounded-sm ${i % 2 === 0 ? "bg-gray-800" : "bg-white"}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                            device.status === "online"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-500"
                                        }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${device.status === "online" ? "bg-green-500" : "bg-red-500"}`} />
                                            {device.status === "online" ? "Online" : "Offline"}
                                        </div>
                                        <button className="absolute top-3 left-3 w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow text-gray-400 hover:text-gray-600">
                                            ⋯
                                        </button>
                                    </div>

                                    {/* DEVICE INFO */}
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-800">{device.name}</h3>
                                        <div className="mt-2 space-y-1 text-sm text-gray-500">
                                            <p>Serial Number <span className="text-gray-700 font-medium float-right">{device.device_code}</span></p>
                                            <p>Location <span className="text-gray-700 font-medium float-right">{device.location}</span></p>
                                            <p>Last Heartbeat <span className={`font-medium float-right ${device.status === "online" ? "text-green-600" : "text-red-500"}`}>
                                                {device.last_heartbeat ? "Just now" : "Never"}
                                            </span></p>
                                        </div>

                                        {device.status === "offline" && (
                                            <div className="mt-3 flex items-center gap-1 text-xs text-red-500 bg-red-50 px-3 py-2 rounded-xl">
                                                <AlertTriangle size={12} />
                                                Network Timeout
                                            </div>
                                        )}

                                        <div className="mt-4 flex gap-2">
                                            {device.status === "online" ? (
                                                <>
                                                    <button className="flex-1 flex items-center justify-center gap-1 border py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition">
                                                        <Settings size={14} /> Configure
                                                    </button>
                                                    <button className="flex-1 flex items-center justify-center gap-1 border py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition">
                                                        <FileText size={14} /> Logs
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white py-2 rounded-xl text-sm hover:bg-blue-700 transition">
                                                        <RefreshCw size={14} /> Restart Remote
                                                    </button>
                                                    <button className="flex-1 flex items-center justify-center gap-1 border py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition">
                                                        <FileText size={14} /> Report
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => deleteDevice(device.id)}
                                            className="mt-2 w-full text-xs text-red-400 hover:text-red-600 transition py-1"
                                        >
                                            Delete Device
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 text-gray-400">
                            <p className="text-4xl mb-3">📱</p>
                            <p>No devices found</p>
                        </div>
                    )}
                </div>

                {/* ASSIGNMENT HISTORY */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Assignment History</h2>
                            <p className="text-gray-400 text-sm">Track movement and ownership of scanning units</p>
                        </div>
                        <button className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-700">
                            <Download size={14} />
                            Download CSV
                        </button>
                    </div>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b text-gray-400">
                                <th className="text-left py-3">Device ID</th>
                                <th className="text-left py-3">Assigned Admin</th>
                                <th className="text-left py-3">Site Location</th>
                                <th className="text-left py-3">Deployment Date</th>
                                <th className="text-left py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devices.length > 0 ? devices.map((device) => (
                                <tr key={device.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3">
                                        <p className="font-medium text-gray-700">{device.device_code}</p>
                                        <p className="text-xs text-gray-400">Firmware v2.1</p>
                                    </td>
                                    <td className="py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                A
                                            </div>
                                            <span className="text-gray-700">Admin</span>
                                        </div>
                                    </td>
                                    <td className="py-3 text-gray-600">{device.location}</td>
                                    <td className="py-3 text-gray-600">
                                        {device.created_at ? new Date(device.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "-"}
                                    </td>
                                    <td className="py-3">
                                        <button className="text-blue-600 hover:text-blue-700">✏️</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-8 text-gray-400">No assignment history</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ADD DEVICE FORM */}
                <div id="add-form" className="bg-white rounded-2xl shadow-sm border p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Device</h2>
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="Device Code (e.g. QR-0001)"
                                value={data.device_code}
                                onChange={(e) => setData("device_code", e.target.value)}
                                className="border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Device Name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Location"
                                value={data.location}
                                onChange={(e) => setData("location", e.target.value)}
                                className="border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            <Plus size={16} />
                            {processing ? "Adding..." : "Add Device"}
                        </button>
                    </form>
                </div>

            </div>
        </AdminLayout>
    );
}
