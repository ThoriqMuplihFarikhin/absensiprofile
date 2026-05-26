import { Link, router, usePage } from "@inertiajs/react";

import {
    ClipboardList,
    LayoutDashboard,
    LogOut,
    MapPin,
    Monitor,
    QrCode,
    Settings,
    Users,
} from "lucide-react";

export default function AdminLayout({ children }) {

    const { url, props } = usePage();

    const user = props.auth?.user;

    /*
    |--------------------------------------------------------------------------
    | NAVIGATION MENU
    |--------------------------------------------------------------------------
    */

    const navItems = [
        {
            label: "Dashboard",
            href: route("admin.dashboard"),
            icon: LayoutDashboard,
        },
        {
            label: "Attendance",
            href: route("admin.attendance"),
            icon: ClipboardList,
        },
        {
            label: "Employees",
            href: route("admin.employees"),
            icon: Users,
        },
        {
            label: "Geofencing",
            href: route("admin.geofencing"),
            icon: MapPin,
        },
        {
            label: "Devices",
            href: route("admin.devices"),
            icon: Monitor,
        },
        {
            label: "QR Code",
            href: route("admin.qr-code"),
            icon: QrCode,
        },
        {
            label: "Settings",
            href: route("admin.settings"),
            icon: Settings,
        },
    ];

    /*
    |--------------------------------------------------------------------------
    | LOGOUT
    |--------------------------------------------------------------------------
    */
    const handleLogout = () => {
        router.post(route("logout"));
    };
    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* SIDEBAR */}
            <aside
                className="
                    flex
                    w-64
                    flex-col
                    justify-between
                    bg-white
                    p-6
                    shadow-lg
                "
            >
                <div>

                    {/* LOGO */}
                    <div className="mb-10">
                        <h1 className="text-2xl font-bold text-blue-600">
                            Absensi Pro
                        </h1>
                        <p className="mt-1 text-xs text-gray-400">
                            HR Administration
                        </p>
                    </div>

                    {/* NAVIGATION */}
                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive =
                                url ===
                                item.href.replace(
                                    window.location.origin,
                                    ""
                                );
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`
                                        flex
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-4
                                        py-3
                                        text-sm
                                        font-medium
                                        transition
                                        ${
                                            isActive
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-600 hover:bg-blue-50"
                                        }
                                    `}
                                >
                                    <Icon size={18} />
                                    <span>
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* USER SECTION */}
                <div className="border-t pt-4">
                    <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700">
                            {user?.name ?? "Admin"}
                        </p>
                        <p className="text-xs text-gray-400">
                            {user?.role ?? "admin"}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-red-500
                            transition
                            hover:text-red-700
                        "
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </aside>
            {/* MAIN CONTENT */}
            <main
                className="
                    flex-1
                    overflow-auto
                    p-8
                "
            >
                {children}
            </main>
        </div>
    );
}