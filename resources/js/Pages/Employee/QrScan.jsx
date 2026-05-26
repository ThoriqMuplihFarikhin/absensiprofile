import { router, usePage, useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { Home, History, QrCode, User, LogOut, ArrowLeft, Camera, Keyboard } from "lucide-react";
import jsQR from "jsqr";

export default function QrScan() {
    const { props } = usePage();
    const { data, setData, post, processing } = useForm({ token: "" });
    const [mode, setMode] = useState("manual");
    const [scanning, setScanning] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const animRef = useRef(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            streamRef.current = stream;
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setScanning(true);
            scanFrame();
        } catch (err) {
            alert("Kamera tidak dapat diakses. Gunakan mode manual.");
            setMode("manual");
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop());
            streamRef.current = null;
        }
        if (animRef.current) cancelAnimationFrame(animRef.current);
        setScanning(false);
    };

    const scanFrame = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
                stopCamera();
                router.post(route("admin.qr-code.scan"), { token: code.data });
                return;
            }
        }
        animRef.current = requestAnimationFrame(scanFrame);
    };

    useEffect(() => {
        return () => stopCamera();
    }, []);

    const switchMode = (m) => {
        stopCamera();
        setMode(m);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.qr-code.scan"), {
            onSuccess: () => setData("token", ""),
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="w-full max-w-sm bg-white min-h-screen flex flex-col">

                <div className="flex items-center gap-3 px-5 pt-6 pb-4 border-b">
                    <button onClick={() => { stopCamera(); router.visit(route("employee.dashboard")); }} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <ArrowLeft size={16} />
                    </button>
                    <h1 className="font-bold text-gray-800 text-lg">Scan QR Absensi</h1>
                </div>

                <div className="flex-1 px-5 py-6 space-y-5 mb-24">

                    {props.flash?.success && (
                        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-2xl text-sm">✅ {props.flash.success}</div>
                    )}
                    {props.flash?.error && (
                        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-2xl text-sm">❌ {props.flash.error}</div>
                    )}

                    {/* MODE TOGGLE */}
                    <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-2xl">
                        <button
                            onClick={() => switchMode("camera")}
                            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition ${mode === "camera" ? "bg-white shadow text-blue-600" : "text-gray-400"}`}
                        >
                            <Camera size={16} /> Kamera
                        </button>
                        <button
                            onClick={() => switchMode("manual")}
                            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition ${mode === "manual" ? "bg-white shadow text-blue-600" : "text-gray-400"}`}
                        >
                            <Keyboard size={16} /> Manual
                        </button>
                    </div>

                    {/* CAMERA MODE */}
                    {mode === "camera" && (
                        <div className="space-y-4">
                            <div className="relative bg-black rounded-2xl overflow-hidden aspect-square">
                                <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
                                <canvas ref={canvasRef} className="hidden" />
                                {!scanning && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button
                                            onClick={startCamera}
                                            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                                        >
                                            <Camera size={20} /> Aktifkan Kamera
                                        </button>
                                    </div>
                                )}
                                {scanning && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-48 h-48 border-2 border-blue-400 rounded-2xl">
                                            <div className="w-6 h-6 border-t-4 border-l-4 border-blue-400 rounded-tl-lg absolute top-0 left-0" />
                                            <div className="w-6 h-6 border-t-4 border-r-4 border-blue-400 rounded-tr-lg absolute top-0 right-0" />
                                            <div className="w-6 h-6 border-b-4 border-l-4 border-blue-400 rounded-bl-lg absolute bottom-0 left-0" />
                                            <div className="w-6 h-6 border-b-4 border-r-4 border-blue-400 rounded-br-lg absolute bottom-0 right-0" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            {scanning && (
                                <p className="text-center text-sm text-gray-400 animate-pulse">
                                    📷 Mendeteksi QR Code...
                                </p>
                            )}
                        </div>
                    )}

                    {/* MANUAL MODE */}
                    {mode === "manual" && (
                        <div className="bg-white rounded-2xl border p-5 space-y-4">
                            <div>
                                <h3 className="font-bold text-gray-700">Input Token QR</h3>
                                <p className="text-xs text-gray-400 mt-0.5">Masukkan token dari QR Code absensi kantor</p>
                            </div>
                            <input
                                type="text"
                                value={data.token}
                                onChange={(e) => setData("token", e.target.value)}
                                placeholder="Masukkan token QR Code..."
                                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                            <button
                                onClick={submit}
                                disabled={processing || !data.token}
                                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {processing ? "Memproses..." : "🔍 Verifikasi & Absen"}
                            </button>
                        </div>
                    )}

                    {/* PETUNJUK */}
                    <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
                        <p className="text-xs font-bold text-gray-600">📋 Petunjuk:</p>
                        {mode === "camera" ? (
                            <>
                                <p className="text-xs text-gray-400">1. Klik "Aktifkan Kamera"</p>
                                <p className="text-xs text-gray-400">2. Arahkan ke QR Code absensi</p>
                                <p className="text-xs text-gray-400">3. Tahan stabil hingga terbaca otomatis</p>
                            </>
                        ) : (
                            <>
                                <p className="text-xs text-gray-400">1. Lihat token di bawah QR Code kantor</p>
                                <p className="text-xs text-gray-400">2. Ketik token di kolom input</p>
                                <p className="text-xs text-gray-400">3. Klik Verifikasi untuk absen</p>
                            </>
                        )}
                    </div>

                </div>

                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t px-6 py-3 flex items-center justify-between z-50">
                    <button onClick={() => { stopCamera(); router.visit(route("employee.dashboard")); }} className="flex flex-col items-center gap-1 text-gray-400">
                        <Home size={20} />
                        <span className="text-xs">Home</span>
                    </button>
                    <button onClick={() => { stopCamera(); router.visit(route("employee.history")); }} className="flex flex-col items-center gap-1 text-gray-400">
                        <History size={20} />
                        <span className="text-xs">History</span>
                    </button>
                    <button className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200 -mt-6">
                        <QrCode size={24} className="text-white" />
                    </button>
                    <button onClick={() => { stopCamera(); router.visit(route("employee.profile")); }} className="flex flex-col items-center gap-1 text-gray-400">
                        <User size={20} />
                        <span className="text-xs">Profile</span>
                    </button>
                    <button onClick={() => { stopCamera(); router.post(route("logout")); }} className="flex flex-col items-center gap-1 text-gray-400">
                        <LogOut size={20} />
                        <span className="text-xs">Logout</span>
                    </button>
                </div>

            </div>
        </div>
    );
}
