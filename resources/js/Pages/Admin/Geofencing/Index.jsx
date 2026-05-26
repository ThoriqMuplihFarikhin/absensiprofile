import { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Circle,
} from "react-leaflet";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Index() {
    const [position, setPosition] = useState({
        lat: -6.200000,
        lng: 106.816666,
    });

    const [radius, setRadius] = useState(100);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigator.geolocation.watchPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });

                setLoading(false);
            },
            (err) => {
                console.log(err);
                alert("GPS gagal diakses");

                setLoading(false);
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
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            GPS Geofencing
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Realtime tracking lokasi kantor
                        </p>
                    </div>

                    <div className="bg-white px-4 py-2 rounded-xl shadow">
                        Radius:
                        <span className="font-bold text-blue-600 ml-2">
                            {radius} Meter
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                            {loading ? (
                                <div className="h-[600px] flex items-center justify-center">
                                    <p>Loading GPS...</p>
                                </div>
                            ) : (
                                <MapContainer
                                    center={[
                                        position.lat,
                                        position.lng,
                                    ]}
                                    zoom={18}
                                    scrollWheelZoom={true}
                                    className="h-[600px] w-full"
                                >
                                    <TileLayer
                                        attribution='&copy; OpenStreetMap'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    <Marker
                                        position={[
                                            position.lat,
                                            position.lng,
                                        ]}
                                    >
                                        <Popup>
                                            Lokasi Kantor
                                        </Popup>
                                    </Marker>

                                    <Circle
                                        center={[
                                            position.lat,
                                            position.lng,
                                        ]}
                                        radius={radius}
                                        pathOptions={{
                                            color: "#2563eb",
                                            fillColor: "#3b82f6",
                                            fillOpacity: 0.2,
                                        }}
                                    />
                                </MapContainer>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl shadow-lg p-5">
                            <h2 className="text-xl font-bold mb-4">
                                GPS Information
                            </h2>

                            <div className="space-y-3">
                                <div className="bg-gray-100 p-3 rounded-xl">
                                    <p className="text-sm text-gray-500">
                                        Latitude
                                    </p>

                                    <p className="font-bold">
                                        {position.lat}
                                    </p>
                                </div>

                                <div className="bg-gray-100 p-3 rounded-xl">
                                    <p className="text-sm text-gray-500">
                                        Longitude
                                    </p>

                                    <p className="font-bold">
                                        {position.lng}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-lg p-5">
                            <h2 className="text-xl font-bold mb-4">
                                Radius Control
                            </h2>

                            <input
                                type="range"
                                min="50"
                                max="500"
                                value={radius}
                                onChange={(e) =>
                                    setRadius(e.target.value)
                                }
                                className="w-full"
                            />

                            <div className="flex justify-between mt-2 text-sm text-gray-500">
                                <span>50m</span>
                                <span>500m</span>
                            </div>
                        </div>

                        <div className="bg-blue-600 text-white rounded-3xl shadow-lg p-5">
                            <h2 className="text-xl font-bold mb-3">
                                Live Status
                            </h2>

                            <div className="space-y-2">
                                <p>
                                    GPS:
                                    <span className="font-bold ml-2">
                                        Active
                                    </span>
                                </p>

                                <p>
                                    Tracking:
                                    <span className="font-bold ml-2">
                                        Realtime
                                    </span>
                                </p>

                                <p>
                                    Accuracy:
                                    <span className="font-bold ml-2">
                                        High
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}