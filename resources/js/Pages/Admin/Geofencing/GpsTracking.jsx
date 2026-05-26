import { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";

import {
    MapContainer,
    TileLayer,
    Marker,
    Circle,
    Popup,
    useMap,
} from "react-leaflet";

function ChangeMapView({ center }) {
    const map = useMap();

    useEffect(() => {
        map.setView(center, 17);
    }, [center]);

    return null;
}

export default function GpsTracking() {
    const [position, setPosition] = useState([-6.2088, 106.8456]);
    const [radius, setRadius] = useState(100);

    useEffect(() => {
        navigator.geolocation.watchPosition(
            (pos) => {
                setPosition([
                    pos.coords.latitude,
                    pos.coords.longitude,
                ]);
            },
            (err) => {
                console.log(err);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000,
            }
        );
    }, []);

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        GPS Tracking Realtime
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Monitoring lokasi kantor realtime
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* MAP */}
                    <div className="lg:col-span-3 bg-white rounded-3xl shadow-xl overflow-hidden">

                        <div className="p-4 border-b">
                            <h2 className="font-semibold text-lg">
                                Live GPS Area
                            </h2>
                        </div>

                        <MapContainer
                            center={position}
                            zoom={17}
                            style={{
                                height: "650px",
                                width: "100%",
                            }}
                        >
                            <ChangeMapView center={position} />

                            <TileLayer
                                attribution='&copy; OpenStreetMap'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <Marker position={position}>
                                <Popup>
                                    Lokasi Kantor
                                </Popup>
                            </Marker>

                            <Circle
                                center={position}
                                radius={radius}
                                pathOptions={{
                                    color: "#2563eb",
                                    fillColor: "#3b82f6",
                                    fillOpacity: 0.3,
                                }}
                            />
                        </MapContainer>
                    </div>

                    {/* SIDE PANEL */}
                    <div className="bg-white rounded-3xl shadow-xl p-6">

                        <h2 className="text-xl font-bold mb-6">
                            Pengaturan Radius
                        </h2>

                        <div className="mb-4">
                            <label className="text-sm text-gray-500">
                                Radius Kantor
                            </label>

                            <input
                                type="range"
                                min="50"
                                max="500"
                                value={radius}
                                onChange={(e) =>
                                    setRadius(e.target.value)
                                }
                                className="w-full mt-3"
                            />

                            <div className="text-center mt-4">
                                <span className="text-4xl font-bold text-blue-600">
                                    {radius}
                                </span>

                                <p className="text-gray-500">
                                    meter
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">

                            <div className="bg-blue-50 rounded-2xl p-4">
                                <p className="text-sm text-gray-500">
                                    Latitude
                                </p>

                                <p className="font-bold text-blue-700">
                                    {position[0]}
                                </p>
                            </div>

                            <div className="bg-blue-50 rounded-2xl p-4">
                                <p className="text-sm text-gray-500">
                                    Longitude
                                </p>

                                <p className="font-bold text-blue-700">
                                    {position[1]}
                                </p>
                            </div>

                            <button
                                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-2xl font-semibold"
                            >
                                Simpan Lokasi Kantor
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}