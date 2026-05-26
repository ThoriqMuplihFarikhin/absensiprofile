import AdminLayout from "@/Layouts/AdminLayout";

import {
    useEffect,
    useRef
} from "react";

import {
    router,
    usePage
} from "@inertiajs/react";

import { Html5QrcodeScanner } from "html5-qrcode";

export default function Scanner() {

    const scannerRef = useRef(null);

    const { props } = usePage();

    useEffect(() => {

        if (!scannerRef.current) {

            scannerRef.current = new Html5QrcodeScanner(
                "reader",
                {
                    fps: 5,
                    qrbox: 250,
                },
                false
            );

            scannerRef.current.render(
                handleSuccess,
                handleError
            );

        }

        return () => {

            if (scannerRef.current) {

                scannerRef.current.clear();

            }

        };

    }, []);

    /*
    |--------------------------------------------------------------------------
    | SUCCESS SCAN
    |--------------------------------------------------------------------------
    */

    const handleSuccess = (decodedText) => {

        router.post('/qr-scan', {

            token: decodedText,

        });

    };

    /*
    |--------------------------------------------------------------------------
    | ERROR SCAN
    |--------------------------------------------------------------------------
    */

    const handleError = () => {

        // ignore scan errors

    };

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

                <div>

                    <h1 className="
                        text-3xl font-bold
                    ">
                        QR Scanner
                    </h1>

                    <p className="
                        text-slate-500 mt-1
                    ">
                        Scan attendance QR code
                    </p>

                </div>

                {/* SCANNER */}

                <div className="
                    bg-white
                    rounded-2xl
                    shadow-sm
                    p-5
                ">

                    <div id="reader"></div>

                </div>

            </div>

        </AdminLayout>
    );
}