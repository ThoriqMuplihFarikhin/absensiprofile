import { Link, router, usePage } from "@inertiajs/react";
import {
    ClipboardList, LayoutDashboard, LogOut,
    MapPin, Monitor, QrCode, Settings, Users,
} from "lucide-react";

export default function AdminLayout({ children }) {
    const { url, props } = usePage();
    const user = props.auth?.user;

    const navItems = [
        { label: "Dashboard",   href: "/admin/dashboard",   icon: LayoutDashboard },
        { label: "Attendance",  href: "/admin/attendance",  icon: ClipboardList },
        { label: "Employees",   href: "/admin/employees",   icon: Users },
        { label: "Geofencing",  href: "/admin/geofencing",  icon: MapPin },
        { label: "Devices",     href: "/admin/devices",     icon: Monitor },
        { label: "QR Code",     href: "/admin/qr-code",     icon: QrCode },
        { label: "Settings",    href: "/admin/settings",    icon: Settings },
    ];

    const isActive = (href) => url.startsWith(href);

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* SIDEBAR */}
            <aside className="flex w-64 flex-col justify-between bg-white p-6 shadow-sm border-r border-gray-100 fixed h-full">
                <div>
                    {/* LOGO */}
                    <div className="mb-10">
                        <h1 className="text-2xl font-black text-blue-600">Absensi Pro</h1>
                        <p className="mt-1 text-xs text-gray-400">HR Administration</p>
                    </div>

                    {/* NAVIGATION */}
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                                        active
                                            ? "bg-blue-600 text-white shadow-sm shadow-blue-100"
                                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                    }`}
                                >
                                    <Icon size={18} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* USER SECTION */}
                <div className="border-t pt-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-sm flex-shrink-0">
                            {user?.name?.charAt(0)?.toUpperCase() ?? "A"}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-700">{user?.name ?? "Admin"}</p>
                            <p className="text-xs text-gray-400">{user?.role ?? "admin"}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => router.post(route("logout"))}
                        className="flex items-center gap-2 text-sm text-red-400 hover:text-red-600 transition"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-auto p-8 ml-64">
                {children}
            </main>
        </div>
    );
}