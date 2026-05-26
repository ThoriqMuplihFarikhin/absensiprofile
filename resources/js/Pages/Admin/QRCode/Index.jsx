import AdminLayout from "@/Layouts/AdminLayout";

import {
    router,
    usePage
} from "@inertiajs/react";

export default function Index({ qr }) {

    const { props } = usePage();

    return (
        <AdminLayout>

            <div className="space-y-6">

                {/* FLASH */}

                {props.flash?.success && (

                    <div className="
                        bg-green-100
                        text-green-700
                        px-5 py-4
                        rounded-2xl
                    ">

                        {props.flash.success}

                    </div>

                )}

                {props.flash?.error && (

                    <div className="
                        bg-red-100
                        text-red-700
                        px-5 py-4
                        rounded-2xl
                    ">

                        {props.flash.error}

                    </div>

                )}

                {/* HEADER */}

                <div className="
                    flex items-center justify-between
                ">

                    <div>

                        <h1 className="
                            text-3xl font-bold
                        ">
                            QR Attendance
                        </h1>

                        <p className="
                            text-slate-500 mt-1
                        ">
                            Generate attendance QR code
                        </p>

                    </div>

                    <button
                        onClick={() =>
                            router.post('/qr-generate')
                        }
                        className="
                            bg-blue-600
                            text-white
                            px-5 py-3
                            rounded-xl
                        "
                    >
                        Generate QR
                    </button>

                </div>

                {/* QR */}

                <div className="
                    bg-white
                    rounded-2xl
                    p-10
                    shadow-sm
                    flex justify-center
                ">

                    {qr ? (

                        <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qr.token}`}
                            alt="QR"
                        />

                    ) : (

                        <p>No QR generated</p>

                    )}

                </div>

            </div>

        </AdminLayout>
    );
}