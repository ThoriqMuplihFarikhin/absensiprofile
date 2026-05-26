import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ employees }) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const { data, setData, post, put, processing, reset } = useForm({
        name: "",
        email: "",
        department: "",
        position: "",
        phone: "",
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
            name: employee.name,
            email: employee.email,
            department: employee.department || "",
            position: employee.position || "",
            phone: employee.phone || "",
        });
        setOpen(true);
    };

    const deleteEmployee = (id) => {
        if (confirm("Delete employee?")) {
            router.delete(route("admin.employees.destroy", id));
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Employee Directory</h1>
                        <p className="text-slate-500 mt-1">Manage all employees</p>
                    </div>
                    <button
                        onClick={() => { setEditing(null); reset(); setOpen(true); }}
                        className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
                    >
                        + Add Employee
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="text-left p-5 text-sm text-gray-500">Employee</th>
                                <th className="text-left p-5 text-sm text-gray-500">Department</th>
                                <th className="text-left p-5 text-sm text-gray-500">Position</th>
                                <th className="text-left p-5 text-sm text-gray-500">Role</th>
                                <th className="text-left p-5 text-sm text-gray-500">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees?.length > 0 ? employees.map((employee) => (
                                <tr key={employee.id} className="border-t hover:bg-gray-50 transition">
                                    <td className="p-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                                                {employee.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{employee.name}</p>
                                                <p className="text-sm text-slate-500">{employee.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5 text-sm">{employee.department || "-"}</td>
                                    <td className="p-5 text-sm">{employee.position || "-"}</td>
                                    <td className="p-5">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            employee.role === "admin"
                                                ? "bg-purple-100 text-purple-600"
                                                : "bg-green-100 text-green-600"
                                        }`}>
                                            {employee.role}
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => editEmployee(employee)}
                                                className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-lg text-sm hover:bg-yellow-200 transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteEmployee(employee.id)}
                                                className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-200 transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-10 text-gray-400">No employees found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6">
                            {editing ? "Edit Employee" : "Add Employee"}
                        </h2>
                        <form onSubmit={submit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="w-full border rounded-xl px-4 py-3"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="w-full border rounded-xl px-4 py-3"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Department"
                                value={data.department}
                                onChange={(e) => setData("department", e.target.value)}
                                className="w-full border rounded-xl px-4 py-3"
                            />
                            <input
                                type="text"
                                placeholder="Position"
                                value={data.position}
                                onChange={(e) => setData("position", e.target.value)}
                                className="w-full border rounded-xl px-4 py-3"
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                value={data.phone}
                                onChange={(e) => setData("phone", e.target.value)}
                                className="w-full border rounded-xl px-4 py-3"
                            />
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="flex-1 border py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </AdminLayout>
    );
}
