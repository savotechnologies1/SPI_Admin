import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';

const SuccessPage = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('id');
    const gateway = searchParams.get('gateway');
    const paypalToken = searchParams.get('token');
    const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
    const hasProcessed = useRef(false); 
    const verifyStatus = async () => {
        const authToken = localStorage.getItem('auth_token');
        try {
            const res = await axios.get(`https://api.bhives.co/api/admin/get-order-status?id=${orderId}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });

            if (res.data.status === 'PAID') {
                setStatus('success');
            } else {
                // If not paid yet, check again in 3 seconds (Polling)
                console.log("Payment status still pending... retrying in 3s");
                setTimeout(verifyStatus, 3000);
            }
        } catch (err) {
            console.error("Verification API Error:", err);
            setStatus('failed');
        }
    };

    useEffect(() => {
        if (!orderId) {
            setStatus('failed');
            return;
        }

        if (hasProcessed.current) return;
        hasProcessed.current = true;

        const processPayment = async () => {
            const authToken = localStorage.getItem('auth_token');

            try {
                if (gateway === 'paypal' && paypalToken) {
                    console.log("Capturing PayPal Payment...");
                    await axios.post('https://api.bhives.co/api/admin/capture-paypal', 
                        { paypalToken: paypalToken }, 
                        { headers: { Authorization: `Bearer ${authToken}` } }
                    );
                }

                verifyStatus();
            } catch (err: any) {
                console.error("Payment Capture/Process Error:", err);
                                if (err.response?.data?.message?.includes("ORDER_ALREADY_CAPTURED")) {
                    verifyStatus();
                } else {
                    setStatus('failed');
                }
            }
        };

        processPayment();
    }, [orderId, gateway, paypalToken]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6">
                
                {status === 'loading' && (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="animate-spin text-indigo-600" size={50} />
                        <h1 className="text-2xl font-bold">Verifying Payment...</h1>
                        <p className="text-gray-500">Please wait while we confirm your order.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="bg-green-100 p-4 rounded-full">
                            <CheckCircle className="text-green-600" size={60} />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
                        <p className="text-gray-500 text-lg">Thank you for your order. Your transaction has been completed successfully.</p>
                        <div className="bg-gray-50 p-3 rounded-lg w-full border border-dashed border-gray-300">
                            <p className="text-xs text-gray-400 font-bold uppercase">Order Reference</p>
                            <p className="text-sm font-mono">{orderId}</p>
                        </div>
                        <Link to="/order-managment" className="mt-6 inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
                            Back to Dashboard
                        </Link>
                    </div>
                )}

                {status === 'failed' && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="bg-red-100 p-4 rounded-full">
                            <XCircle className="text-red-500" size={60} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Verification Failed</h1>
                        <p className="text-gray-500">We couldn't confirm your payment status. If the amount was deducted, please contact support.</p>
                        <Link to="/" className="text-indigo-600 font-bold underline">Go to Catalog</Link>
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default SuccessPage;