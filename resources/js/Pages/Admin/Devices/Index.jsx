import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage, router } from "@inertiajs/react";

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

    return (
        <AdminLayout>
            <div className="space-y-6">

                {props.flash?.success && (
                    <div className="bg-green-100 text-green-700 px-5 py-4 rounded-2xl">
                        {props.flash.success}
                    </div>
                )}

                <div>
                    <h1 className="text-3xl font-bold">Devices Management</h1>
                    <p className="text-slate-500 mt-1">Manage QR attendance devices</p>
                </div>

                <form onSubmit={submit} className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Device Code"
                            value={data.device_code}
                            onChange={(e) => setData("device_code", e.target.value)}
                            className="border rounded-xl px-4 py-3"
                        />
                        <input
                            type="text"
                            placeholder="Device Name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="border rounded-xl px-4 py-3"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={data.location}
                            onChange={(e) => setData("location", e.target.value)}
                            className="border rounded-xl px-4 py-3"
                        />
                    </div>
                    <button
                        disabled={processing}
                        className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        Add Device
                    </button>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {devices.length > 0 ? devices.map((device) => (
                        <div key={device.id} className="bg-white rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">{device.name}</h2>
                                    <p className="text-slate-500 text-sm">{device.device_code}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                    device.status === "online"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-red-100 text-red-600"
                                }`}>
                                    {device.status}
                                </span>
                            </div>
                            <div className="mt-4 space-y-1">
                                <p>📍 {device.location}</p>
                                <p className="text-sm text-slate-500">
                                    Last heartbeat: {device.last_heartbeat ?? "-"}
                                </p>
                            </div>
                            <button
                                onClick={() => deleteDevice(device.id)}
                                className="mt-5 bg-red-100 text-red-600 px-4 py-2 rounded-xl hover:bg-red-200 transition"
                            >
                                Delete
                            </button>
                        </div>
                    )) : (
                        <div className="col-span-3 text-center py-10 text-slate-400 bg-white rounded-2xl">
                            No devices found
                        </div>
                    )}
                </div>

            </div>
        </AdminLayout>
    );
}