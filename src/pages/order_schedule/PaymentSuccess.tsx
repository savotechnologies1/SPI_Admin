import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={50} />
      </div>
      <h1 className="text-3xl font-bold mb-2">Payment Received!</h1>
      <p className="text-slate-500 mb-8">Thank you for your purchase. Your order is being processed.</p>
      <Link to="/order-managment" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700">
        Back to Dashboard
      </Link>
    </div>
  </div>
);
export default PaymentSuccess;