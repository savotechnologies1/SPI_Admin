import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, ShoppingCart, HelpCircle, RefreshCcw } from 'lucide-react';

const CancelPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6">
                
                {/* Error Icon Section */}
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-red-50 p-5 rounded-full border border-red-100 shadow-sm">
                        <XCircle className="text-red-500" size={60} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Payment Cancelled</h1>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        The transaction was not completed. If you faced any technical issue, you can try again.
                    </p>
                </div>

                {/* Info Card */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Next Steps</p>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-sm text-slate-600">
                            <div className="mt-1 bg-slate-200 rounded-full p-1"><RefreshCcw size={10} /></div>
                            <span>Check your card details and try the payment again.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-slate-600">
                            <div className="mt-1 bg-slate-200 rounded-full p-1"><ShoppingCart size={10} /></div>
                            <span>Return to your catalog to modify your order items.</span>
                        </li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-4">
                    <button 
                        onClick={() => navigate(-1)} // User ko wapas pichle page (Cart/Checkout) par bhejne ke liye
                        className="w-full bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
                    >
                        Try Payment Again
                    </button>
                    
                    <Link 
                        to="/order-catalog" // Aapka catalog route yahan aayega
                        className="w-full bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        Back to Catalog
                    </Link>
                </div>

                {/* Support Footer */}
                <div className="pt-8 border-t border-gray-100">
                    <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5 font-medium">
                        <HelpCircle size={14} className="text-gray-300" />
                        Need assistance? Contact our support team.
                    </p>
                </div>
                
            </div>
        </div>
    );
};

export default CancelPage;