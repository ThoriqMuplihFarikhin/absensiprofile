import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { UserPlus, Search, Filter, Users, UserCheck, Clock, Plane, MoreVertical, X } from "lucide-react";

export default function Index({ employees }) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState("");

    const { data, setData, post, put, processing, reset } = useForm({
        name: "", email: "", department: "", position: "", phone: "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            put(route("admin.employees.update", editing.id), {
                onSuccess: () => { setOpen(false); reset(); setEditing(null); }
            });
        } else {
            post(route("admin.employees.store"), {
                onSuccess: () => { setOpen(false); reset(); }
            });
        }
    };

    const editEmployee = (employee) => {
        setEditing(employee);
        setData({
            name: employee.name, email: employee.email,
            department: employee.department || "",
            position: employee.position || "",
            phone: employee.phone || "",
        });
        setOpen(true);
    };

    const deleteEmployee = (id) => {
        if (confirm("Hapus karyawan ini?")) router.delete(route("admin.employees.destroy", id));
    };

    const filtered = employees?.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase())
    );

    const totalEmployees = employees?.length ?? 0;
    const activeToday = employees?.filter(e => e.role === "employee").length ?? 0;

    const statusColor = (role) => role === "admin"
        ? "bg-purple-50 text-purple-700 border border-purple-100"
        : "bg-green-50 text-green-700 border border-green-100";

    const avatarColors = [
        "from-blue-400 to-blue-600",
        "from-purple-400 to-purple-600",
        "from-pink-400 to-pink-600",
        "from-orange-400 to-orange-600",
        "from-teal-400 to-teal-600",
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">

                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900">Employee Directory</h1>
                        <p className="text-gray-400 mt-1 text-sm">Manage your workforce of {totalEmployees} active employees.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 border border-gray-200 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition">
                            <Filter size={15} /> Filter
                        </button>
                        <button
                            onClick={() => { setEditing(null); reset(); setOpen(true); }}
                            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-sm shadow-blue-100 text-sm font-semibold"
                        >
                            <UserPlus size={16} /> Add Employee
                        </button>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Total Employees", value: totalEmployees, change: "+12%", icon: Users, iconBg: "bg-blue-50", iconColor: "text-blue-600", changeBg: "bg-blue-50 text-blue-600" },
                        { label: "Clocked In", value: activeToday, change: null, icon: UserCheck, iconBg: "bg-green-50", iconColor: "text-green-600", changeBg: "" },
                        { label: "Late Arrivals", value: 0, change: "-6% avg", icon: Clock, iconBg: "bg-yellow-50", iconColor: "text-yellow-600", changeBg: "bg-red-50 text-red-500" },
                        { label: "Planned Leave", value: 0, icon: Plane, iconBg: "bg-purple-50", iconColor: "text-purple-600", changeBg: "" },
                    ].map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                                <div className="flex items-start justify-between mb-3">
                                    <p className="text-gray-400 text-xs font-medium">{s.label}</p>
                                    {s.change && (
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.changeBg}`}>{s.change}</span>
                                    )}
                                </div>
                                <div className="flex items-end justify-between">
                                    <h2 className="text-3xl font-black text-gray-900">{s.value.toLocaleString()}</h2>
                                    <div className={`w-10 h-10 ${s.iconBg} rounded-xl flex items-center justify-center`}>
                                        <Icon size={18} className={s.iconColor} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* TABLE */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* toolbar */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <div className="relative">
                            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                            <input
                                type="text"
                                placeholder="Search employees..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
                            />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            Overview &nbsp;·&nbsp; <span className="text-blue-600 font-semibold border-b border-blue-600 pb-0.5">Reports</span> &nbsp;·&nbsp; Schedules
                        </div>
                    </div>

                    {/* table head */}
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Employee</th>
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Department</th>
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Position</th>
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered?.length > 0 ? filtered.map((employee, idx) => (
                                <tr key={employee.id} className="hover:bg-gray-50/60 transition group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[idx % avatarColors.length]} flex items-center justify-center font-bold text-white text-sm flex-shrink-0`}>
                                                {employee.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm">{employee.name}</p>
                                                <p className="text-xs text-gray-400">{employee.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                            <span className="text-xs text-gray-600 font-medium">Active</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{employee.department || "-"}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor(employee.role)}`}>
                                            {employee.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{employee.position || "-"}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                                            <button
                                                onClick={() => editEmployee(employee)}
                                                className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteEmployee(employee.id)}
                                                className="px-3 py-1.5 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition"
                                            >
                                                Hapus
                                            </button>
                                            <button className="p-1.5 text-gray-300 hover:text-gray-500 rounded-lg hover:bg-gray-100 transition">
                                                <MoreVertical size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-16 text-gray-300">
                                        <Users size={32} className="mx-auto mb-3 opacity-30" />
                                        <p className="text-sm">No employees found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* footer */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                        <p className="text-xs text-gray-400">Showing 1–{filtered?.length ?? 0} of {totalEmployees} employees</p>
                        <div className="flex items-center gap-1">
                            <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 text-sm flex items-center justify-center">‹</button>
                            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-sm font-bold flex items-center justify-center">1</button>
                            <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 text-sm flex items-center justify-center">2</button>
                            <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 text-sm flex items-center justify-center">3</button>
                            <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 text-sm flex items-center justify-center">›</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between px-6 py-5 border-b">
                            <h2 className="text-lg font-black text-gray-900">
                                {editing ? "Edit Employee" : "Add New Employee"}
                            </h2>
                            <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 transition">
                                <X size={16} />
                            </button>
                        </div>
                        <form onSubmit={submit} className="p-6 space-y-4">
                            {[
                                { placeholder: "Full Name", key: "name", type: "text" },
                                { placeholder: "Email Address", key: "email", type: "email" },
                                { placeholder: "Department", key: "department", type: "text" },
                                { placeholder: "Position / Role", key: "position", type: "text" },
                                { placeholder: "Phone Number", key: "phone", type: "text" },
                            ].map((field) => (
                                <input
                                    key={field.key}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    value={data[field.key]}
                                    onChange={(e) => setData(field.key, e.target.value)}
                                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 focus:bg-white transition"
                                />
                            ))}
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setOpen(false)}
                                    className="flex-1 border border-gray-200 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition text-sm font-semibold">
                                    Batal
                                </button>
                                <button type="submit" disabled={processing}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-bold text-sm disabled:opacity-50">
                                    {processing ? "Menyimpan..." : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </AdminLayout>
    );
}