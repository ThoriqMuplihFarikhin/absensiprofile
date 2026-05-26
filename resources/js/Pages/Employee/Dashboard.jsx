import { router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Home, History, User, Settings, QrCode, Bell, CheckCircle2, LogOut } from "lucide-react";

export default function Dashboard({ stats, attendance }) {
    const { props } = usePage();
    const user = props.auth?.user;
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timeStr = time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
    const dateStr = time.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    const todayStr = time.toLocaleDateString("en-CA");
    const todayAttendance = attendance?.find((a) => a.date === todayStr);

    const presentDays = stats?.present ?? 0;
    const totalDays = stats?.total ?? 0;
    const punctuality = totalDays > 0 ? Math.round(((totalDays - (stats?.late ?? 0)) / totalDays) * 100) : 0;
    const attendancePct = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

    const handleCheckIn = () => router.post(route("employee.check-in"));
    const handleCheckOut = () => router.post(route("employee.check-out"));

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="w-full max-w-sm bg-white min-h-screen flex flex-col relative">

                {/* HEADER */}
                <div className="flex items-center justify-between px-5 pt-6 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                            {user?.name?.charAt(0) ?? "U"}
                        </div>
                        <div>
                            <p className="font-bold text-gray-800 text-sm">{user?.name ?? "User"}</p>
                            <p className="text-xs text-gray-400">HR Administration</p>
                        </div>
                    </div>
                    <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <Bell size={16} className="text-gray-500" />
                    </button>
                </div>

                {/* FLASH */}
                {props.flash?.success && (
                    <div className="mx-5 mb-3 bg-green-100 text-green-700 px-4 py-3 rounded-2xl text-sm">
                        ✅ {props.flash.success}
                    </div>
                )}

                {/* GEOLOCATION */}
                <div className="flex justify-center mb-2">
                    <div className="flex items-center gap-2 bg-green-50 px-4 py-1.5 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-green-600 text-xs font-medium">Geolocation Active</span>
                    </div>
                </div>

                {/* CLOCK */}
                <div className="text-center px-5 mb-4">
                    <h1 className="text-7xl font-black text-gray-800 tracking-tight">{timeStr}</h1>
                    <p className="text-gray-400 text-sm mt-1">{dateStr}</p>
                </div>

                {/* CHECK IN / OUT BUTTONS */}
                <div className="grid grid-cols-2 gap-3 px-5 mb-5">
                    <button
                        onClick={handleCheckIn}
                        disabled={!!todayAttendance?.check_in}
                        className="bg-blue-600 text-white py-5 rounded-2xl font-bold flex flex-col items-center gap-2 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
                    >
                        <CheckCircle2 size={28} />
                        Check In
                    </button>
                    <button
                        onClick={handleCheckOut}
                        disabled={!todayAttendance?.check_in || !!todayAttendance?.check_out}
                        className="bg-white border-2 border-gray-100 text-gray-600 py-5 rounded-2xl font-bold flex flex-col items-center gap-2 hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                    >
                        <LogOut size={28} />
                        Check Out
                    </button>
                </div>

                {/* CHECK IN TIME & STATUS */}
                <div className="flex items-center justify-between px-5 mb-5">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span>🕐</span>
                        <span>Check-in time</span>
                        <span className="font-semibold text-gray-700 ml-1">
                            {todayAttendance?.check_in ?? "--:--"}
                        </span>
                    </div>
                    <div className="text-right text-sm">
                        <p className="text-gray-400">Status</p>
                        <p className={`font-semibold capitalize ${
                            todayAttendance?.status === "present" ? "text-green-600"
                            : todayAttendance?.status === "late" ? "text-yellow-600"
                            : "text-gray-400"
                        }`}>
                            {todayAttendance?.status ?? "Not Started"}
                        </p>
                    </div>
                </div>

                {/* MONTHLY PROGRESS */}
                <div className="mx-5 bg-white rounded-3xl p-5 shadow-sm border mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-800">Monthly Progress</h3>
                        <button className="text-blue-600 text-sm font-medium">Details</button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Attendance</span>
                                <span className="font-bold text-gray-800">{attendancePct}%</span>
                            </div>
                            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${attendancePct}%` }} />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{presentDays} / {totalDays} Days</p>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Punctuality</span>
                                <span className="font-bold text-gray-800">{punctuality}%</span>
                            </div>
                            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${punctuality}%` }} />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{totalDays - (stats?.late ?? 0)} On-time</p>
                        </div>
                    </div>
                </div>

                {/* RECENT ACTIVITY */}
                <div className="mx-5 bg-white rounded-3xl p-5 shadow-sm border mb-24">
                    <h3 className="font-bold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        {attendance?.length > 0 ? (
                            attendance.slice(0, 5).map((item) => (
                                <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                            item.status === "present" ? "bg-green-100"
                                            : item.status === "late" ? "bg-yellow-100"
                                            : "bg-purple-100"
                                        }`}>
                                            {item.status === "present"
                                                ? <span className="text-green-600 text-sm">✓</span>
                                                : <span className="text-yellow-600 text-sm">⚠</span>
                                            }
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">
                                                {item.status === "present" ? "Checked In" : "Late Arrival"}
                                            </p>
                                            <p className="text-xs text-gray-400">{item.date}, {item.check_in ?? "-"}</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                                        item.status === "present" ? "text-green-600 bg-green-50"
                                        : "text-yellow-600 bg-yellow-50"
                                    }`}>
                                        {item.status === "present" ? "ON TIME" : "LATE"}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-400 py-4 text-sm">No activity yet</p>
                        )}
                    </div>
                </div>

                {/* BOTTOM NAV */}
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t px-6 py-3 flex items-center justify-between z-50">
                    <button className="flex flex-col items-center gap-1 text-blue-600">
                        <Home size={20} />
                        <span className="text-xs font-medium">Home</span>
                    </button>
                    <button onClick={() => router.visit(route("employee.history"))} className="flex flex-col items-center gap-1 text-gray-400">
                        <History size={20} />
                        <span className="text-xs">History</span>
                    </button>
                    <button
                        onClick={() => router.visit(route("employee.qr-scan"))}
                        className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200 -mt-6"
                    >
                        <QrCode size={24} className="text-white" />
                    </button>

                    <button onClick={() => router.visit(route("employee.profile"))} className="flex flex-col items-center gap-1 text-gray-400">
                        <User size={20} />
                        <span className="text-xs">Profile</span>
                    </button>
                    <button
                        onClick={() => router.post(route("logout"))}
                        className="flex flex-col items-center gap-1 text-gray-400"
                    >
                        <LogOut size={20} />
                        <span className="text-xs">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
