import { router, usePage } from "@inertiajs/react";
import { Home, History, QrCode, User, LogOut, ArrowLeft } from "lucide-react";

export default function HistoryPage({ attendance }) {
    const getStatusBadge = (status) => {
        const map = {
            present: "text-green-600 bg-green-50",
            late: "text-yellow-600 bg-yellow-50",
            leave: "text-purple-600 bg-purple-50",
        };
        return map[status] ?? "text-gray-600 bg-gray-50";
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="w-full max-w-sm bg-white min-h-screen flex flex-col">

                <div className="flex items-center gap-3 px-5 pt-6 pb-4 border-b">
                    <button onClick={() => router.visit(route("employee.dashboard"))} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <ArrowLeft size={16} />
                    </button>
                    <h1 className="font-bold text-gray-800 text-lg">Attendance History</h1>
                </div>

                <div className="flex-1 px-5 py-4 space-y-3 mb-24 overflow-y-auto">
                    {attendance?.length > 0 ? (
                        attendance.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-semibold text-gray-800">{item.date}</p>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusBadge(item.status)}`}>
                                        {item.status?.toUpperCase()}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <p className="text-xs text-gray-400">Check In</p>
                                        <p className="font-medium text-gray-700">{item.check_in ?? "--:--"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Check Out</p>
                                        <div className="flex items-center gap-1">
                                            <p className="font-medium text-gray-700">{item.check_out ?? "--:--"}</p>
                                            {item.auto_checkout && (
                                                <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">AUTO</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 text-gray-400">
                            <p className="text-4xl mb-3">📋</p>
                            <p>No attendance records yet</p>
                        </div>
                    )}
                </div>

                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t px-6 py-3 flex items-center justify-between z-50">
                    <button onClick={() => router.visit(route("employee.dashboard"))} className="flex flex-col items-center gap-1 text-gray-400">
                        <Home size={20} />
                        <span className="text-xs">Home</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-blue-600">
                        <History size={20} />
                        <span className="text-xs font-medium">History</span>
                    </button>
                    <button className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200 -mt-6">
                        <QrCode size={24} className="text-white" />
                    </button>
                    <button onClick={() => router.visit(route("employee.profile"))} className="flex flex-col items-center gap-1 text-gray-400">
                        <User size={20} />
                        <span className="text-xs">Profile</span>
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
