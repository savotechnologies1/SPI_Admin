// import React, { useState, useEffect } from 'react';
// import { 
//   ShoppingCart, 
//   Package, 
//   Settings, 
//   User, 
//   Plus, 
//   Minus, 
//   Trash2, 
//   CreditCard, 
//   ArrowRight 
// } from 'lucide-react';

// // --- Types ---
// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   available: number;
//   image?: string;
//   type: 'STOCK' | 'CUSTOM';
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// // --- Mock Data (Based on your Screenshots) ---
// const CATALOG_PRODUCTS: Product[] = [
//   { id: '1', name: 'Wireless Headphones', price: 129.99, available: 14, type: 'STOCK' },
//   { id: '2', name: 'Smart Watch Series X', price: 199.00, available: 8, type: 'STOCK' },
//   { id: '3', name: 'USB-C Portable SSD 1TB', price: 89.50, available: 32, type: 'STOCK' },
//   { id: '4', name: 'Ergonomic Office Chair', price: 279.99, available: 12, type: 'STOCK' },
// ];

// const CUSTOM_ORDERS: Product[] = [
//   { id: 'C1', name: 'Custom Engraved Watches', price: 150.00, available: 5, type: 'CUSTOM' },
//   { id: 'C2', name: 'Logo-printed Mugs', price: 15.00, available: 50, type: 'CUSTOM' },
// ];

// const OrderCateglog: React.FC = () => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [paymentGateway, setPaymentGateway] = useState<'STRIPE' | 'PAYPAL'>('STRIPE');
//   const [customerName, setCustomerName] = useState('John Doe'); // From Custom Order Form

//   // --- Logic ---
//   const addToCart = (product: Product) => {
//     setCart((prev) => {
//       const existing = prev.find((item) => item.id === product.id);
//       if (existing) {
//         return prev.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };

//   const updateQuantity = (id: string, delta: number) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
//       )
//     );
//   };

//   const removeFromCart = (id: string) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 lg:p-10">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
//         {/* LEFT COLUMN: Catalog & Custom Selection */}
//         <div className="lg:col-span-8 space-y-8">
//           <header className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
//             <div>
//               <h1 className="text-2xl font-bold text-slate-800">Order Management</h1>
//               <p className="text-slate-500 text-sm">Select items from catalog or custom orders</p>
//             </div>
//             <div className="bg-indigo-50 p-3 rounded-full">
//               <Package className="text-indigo-600" size={24} />
//             </div>
//           </header>

//           {/* Catalog Section */}
//           <section>
//             <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//               <div className="w-2 h-6 bg-indigo-500 rounded-full"></div>
//               Product Catalog
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {CATALOG_PRODUCTS.map((prod) => (
//                 <div key={prod.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-all group">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-semibold text-slate-800">{prod.name}</h3>
//                       <p className="text-indigo-600 font-bold mt-1">${prod.price.toFixed(2)}</p>
//                       <span className="text-xs text-slate-400">Available: {prod.available}</span>
//                     </div>
//                     <button 
//                       onClick={() => addToCart(prod)}
//                       className="bg-slate-100 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors"
//                     >
//                       <Plus size={20} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Custom Orders Section */}
//           <section>
//             <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//               <div className="w-2 h-6 bg-amber-500 rounded-full"></div>
//               Custom Orders Ready
//             </h2>
//             <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
//               {CUSTOM_ORDERS.map((item) => (
//                 <div key={item.id} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 font-bold">
//                       C
//                     </div>
//                     <div>
//                       <p className="font-medium">{item.name}</p>
//                       <p className="text-xs text-slate-400">Custom request for {customerName}</p>
//                     </div>
//                   </div>
//                   <button 
//                     onClick={() => addToCart(item)}
//                     className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 px-4 py-2 bg-indigo-50 rounded-lg"
//                   >
//                     Add to Cart <ArrowRight size={14} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>

//         {/* RIGHT COLUMN: Cart & Checkout Summary */}
//         <div className="lg:col-span-4">
//           <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-6">
//             <div className="flex items-center gap-2 mb-6">
//               <ShoppingCart className="text-indigo-600" size={20} />
//               <h2 className="text-xl font-bold">Order Summary</h2>
//             </div>

//             {/* Cart Items */}
//             <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
//               {cart.length === 0 ? (
//                 <p className="text-slate-400 text-center py-10">Cart is empty</p>
//               ) : (
//                 cart.map((item) => (
//                   <div key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
//                     <div className="flex-1">
//                       <p className="text-sm font-bold truncate max-w-[150px]">{item.name}</p>
//                       <p className="text-xs text-slate-500">${item.price.toFixed(2)}</p>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center bg-white rounded-lg border border-slate-200">
//                         <button onClick={() => updateQuantity(item.id, -1)} className="p-1"><Minus size={14} /></button>
//                         <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
//                         <button onClick={() => updateQuantity(item.id, 1)} className="p-1"><Plus size={14} /></button>
//                       </div>
//                       <button onClick={() => removeFromCart(item.id)} className="text-rose-500"><Trash2 size={18} /></button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* Tenant Payment Settings */}
//             <div className="border-t pt-6 space-y-4">
//               <div>
//                 <label className="text-xs font-bold text-slate-500 uppercase">Customer Info</label>
//                 <div className="flex items-center gap-2 mt-1 text-sm bg-slate-50 p-3 rounded-lg">
//                   <User size={16} className="text-slate-400" />
//                   <span className="font-medium">{customerName}</span>
//                 </div>
//               </div>

//               <div>
//                 <label className="text-xs font-bold text-slate-500 uppercase">Payment Gateway (Tenant Settings)</label>
//                 <div className="grid grid-cols-2 gap-2 mt-2">
//                   <button 
//                     onClick={() => setPaymentGateway('STRIPE')}
//                     className={`py-2 px-3 rounded-lg border text-sm font-bold transition-all ${paymentGateway === 'STRIPE' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-400'}`}
//                   >
//                     Stripe
//                   </button>
//                   <button 
//                     onClick={() => setPaymentGateway('PAYPAL')}
//                     className={`py-2 px-3 rounded-lg border text-sm font-bold transition-all ${paymentGateway === 'PAYPAL' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-400'}`}
//                   >
//                     PayPal
//                   </button>
//                 </div>
//               </div>

//               <div className="pt-4 space-y-2 border-t">
//                 <div className="flex justify-between text-slate-500">
//                   <span>Subtotal</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-lg text-slate-800">
//                   <span>Total Amount</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>
//               </div>

//               <button 
//                 disabled={cart.length === 0}
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all mt-4"
//               >
//                 <CreditCard size={20} />
//                 Proceed to Pay with {paymentGateway}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderCateglog;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Make sure to install axios
// import { 
//   ShoppingCart, 
//   Package, 
//   User, 
//   Plus, 
//   Minus, 
//   Trash2, 
//   CreditCard, 
//   ArrowRight,
//   Search,
//   Loader2
// } from 'lucide-react';

// // --- Updated Types to match Prisma Output ---
// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   stock: number;
//   type: 'STOCK' | 'CUSTOM';
//   customerName?: string; // For custom orders
//   orderNumber?: string;  // For custom orders
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// const OrderCatalog: React.FC = () => {
//   // --- State Management ---
//   const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
//   const [readyCustomOrders, setReadyCustomOrders] = useState<Product[]>([]);
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [paymentGateway, setPaymentGateway] = useState<'STRIPE' | 'PAYPAL'>('STRIPE');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // --- API Integration ---
//   const fetchCatalogData = async (query: string = '') => {
//     try {
//       setLoading(true);
//       // Replace with your actual API endpoint
//       const response = await axios.get(`http://localhost:8080/api/admin/get-order-catelog-data?searchQuery=${query}`);
      
//       const { catalogProducts, readyCustomOrders, settings } = response.data.data;

//       // Map backend fields to frontend interface
//       const formattedCatalog = catalogProducts.map((p: any) => ({
//         id: p.id,
//         name: p.name,
//         price: parseFloat(p.price),
//         stock: p.stock,
//         type: 'STOCK'
//       }));

//       const formattedCustom = readyCustomOrders.map((co: any) => ({
//         id: co.id,
//         name: co.orderNumber, // Showing order number as title
//         price: parseFloat(co.totalCost),
//         stock: co.quantity,
//         customerName: co.customerName,
//         type: 'CUSTOM'
//       }));

//       setCatalogProducts(formattedCatalog);
//       setReadyCustomOrders(formattedCustom);
//       setPaymentGateway(settings.activeGateway);
//       setError(null);
//     } catch (err: any) {
//       setError("Failed to load catalog data.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch on mount
//   useEffect(() => {
//     fetchCatalogData();
//   }, []);

//   // Handle Search
//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     fetchCatalogData(searchQuery);
//   };

//   // --- Cart Logic ---
//   const addToCart = (product: Product) => {
//     setCart((prev) => {
//       const existing = prev.find((item) => item.id === product.id);
//       if (existing) {
//         return prev.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };

//   const updateQuantity = (id: string, delta: number) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
//       )
//     );
//   };

//   const removeFromCart = (id: string) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 lg:p-10">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
//         {/* LEFT COLUMN */}
//         <div className="lg:col-span-8 space-y-8">
//           <header className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-slate-800">Order Management</h1>
//               <p className="text-slate-500 text-sm">Select items from catalog or custom orders</p>
//             </div>
            
//             {/* Search Bar */}
//             <form onSubmit={handleSearch} className="relative flex items-center">
//               <input 
//                 type="text" 
//                 placeholder="Search products or orders..."
//                 className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <Search className="absolute left-3 text-slate-400" size={16} />
//               <button type="submit" className="hidden">Search</button>
//             </form>
//           </header>

//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-20 text-slate-400">
//               <Loader2 className="animate-spin mb-2" size={32} />
//               <p>Loading Catalog...</p>
//             </div>
//           ) : error ? (
//             <div className="bg-rose-50 text-rose-600 p-6 rounded-xl border border-rose-100 text-center">
//               {error}
//             </div>
//           ) : (
//             <>
//               {/* Catalog Section */}
//               <section>
//                 <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//                   <div className="w-2 h-6 bg-indigo-500 rounded-full"></div>
//                   Product Catalog
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {catalogProducts.map((prod) => (
//                     <div key={prod.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-all group">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h3 className="font-semibold text-slate-800">{prod.name}</h3>
//                           <p className="text-indigo-600 font-bold mt-1">${prod.price.toFixed(2)}</p>
//                           <span className="text-xs text-slate-400">Available: {prod.stock}</span>
//                         </div>
//                         <button 
//                           onClick={() => addToCart(prod)}
//                           className="bg-slate-100 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors"
//                         >
//                           <Plus size={20} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>

//               {/* Custom Orders Section */}
//               <section>
//                 <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//                   <div className="w-2 h-6 bg-amber-500 rounded-full"></div>
//                   Custom Orders Ready
//                 </h2>
//                 <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
//                   {readyCustomOrders.length === 0 ? (
//                     <p className="p-10 text-center text-slate-400">No ready custom orders found.</p>
//                   ) : (
//                     readyCustomOrders.map((item) => (
//                       <div key={item.id} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 font-bold">C</div>
//                           <div>
//                             <p className="font-medium">Order: {item.name}</p>
//                             <p className="text-xs text-slate-400">Customer: {item.customerName}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-6">
//                             <span className="font-bold text-slate-700">${item.price.toFixed(2)}</span>
//                             <button 
//                                 onClick={() => addToCart(item)}
//                                 className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 px-4 py-2 bg-indigo-50 rounded-lg"
//                             >
//                                 Add to Cart <ArrowRight size={14} />
//                             </button>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </section>
//             </>
//           )}
//         </div>

//         {/* RIGHT COLUMN (Cart) remains mostly the same, ensuring it displays dynamic prices */}
//         <div className="lg:col-span-4">
//           <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-6">
//             <div className="flex items-center gap-2 mb-6">
//               <ShoppingCart className="text-indigo-600" size={20} />
//               <h2 className="text-xl font-bold">Order Summary</h2>
//             </div>

//             <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
//               {cart.length === 0 ? (
//                 <p className="text-slate-400 text-center py-10">Cart is empty</p>
//               ) : (
//                 cart.map((item) => (
//                   <div key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
//                     <div className="flex-1">
//                       <p className="text-sm font-bold truncate max-w-[150px]">{item.type === 'CUSTOM' ? `Order ${item.name}` : item.name}</p>
//                       <p className="text-xs text-slate-500">${item.price.toFixed(2)}</p>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center bg-white rounded-lg border border-slate-200">
//                         <button onClick={() => updateQuantity(item.id, -1)} className="p-1"><Minus size={14} /></button>
//                         <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
//                         <button onClick={() => updateQuantity(item.id, 1)} className="p-1"><Plus size={14} /></button>
//                       </div>
//                       <button onClick={() => removeFromCart(item.id)} className="text-rose-500"><Trash2 size={18} /></button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* Total & Checkout Section */}
//             <div className="border-t pt-6 space-y-4">
//               <div className="pt-4 space-y-2">
//                 <div className="flex justify-between text-slate-500">
//                   <span>Subtotal</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-lg text-slate-800">
//                   <span>Total Amount</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>
//               </div>

//               <button 
//                 disabled={cart.length === 0 || loading}
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all mt-4"
//               >
//                 <CreditCard size={20} />
//                 Proceed to Pay with {paymentGateway}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderCatalog;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  ShoppingCart, Package, User, Plus, Minus, Trash2, 
  CreditCard, ArrowRight, Search, Loader2, X, Mail, Send, CheckCircle, 
  Phone
} from 'lucide-react';

// --- Types ---
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  type: 'STOCK' | 'CUSTOM';
  customerName?: string;
  orderNumber?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const OrderCatalog: React.FC = () => {
  // --- States ---
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const [readyCustomOrders, setReadyCustomOrders] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentGateway, setPaymentGateway] = useState<'STRIPE' | 'PAYPAL'>('STRIPE');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Guest Checkout States ---
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Form, 2: Success
  const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '' });
  const [selectedMethod, setSelectedMethod] = useState<'NOW' | 'EMAIL' | 'SMS' | ''>('');

  const fetchCatalogData = async (query: string = '') => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/admin/get-order-catelog-data?searchQuery=${query}`);
      const { catalogProducts, readyCustomOrders, settings } = response.data.data;

      setCatalogProducts(catalogProducts.map((p: any) => ({
        id: p.id, name: p.name, price: parseFloat(p.price), stock: p.stock, type: 'STOCK'
      })));

      setReadyCustomOrders(readyCustomOrders.map((co: any) => ({
        id: co.id, name: co.orderNumber, price: parseFloat(co.totalCost), stock: co.quantity, customerName: co.customerName, type: 'CUSTOM'
      })));

      setPaymentGateway(settings.activeGateway);
    } catch (err: any) {
      setError("Failed to load catalog data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCatalogData(); }, []);

  // --- Cart Actions ---
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // --- Guest Logic ---
  const handleFinalCheckout = () => {
    // Abhi ke liye bas UI success dikhayega (Baad mein yahan API call hogi)
    setCheckoutStep(2);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 lg:p-10 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          <header className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Order Management</h1>
              <p className="text-slate-500 text-sm">Guest checkout & Payment links ready</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); fetchCatalogData(searchQuery); }} className="relative">
              <input 
                type="text" placeholder="Search..." 
                className="pl-10 pr-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            </form>
          </header>

          {loading ? (
            <div className="flex flex-col items-center py-20 text-slate-400"><Loader2 className="animate-spin mb-2" /> Loading...</div>
          ) : (
            <div className="space-y-8">
              <section>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><div className="w-2 h-6 bg-indigo-500 rounded-full"></div> Catalog</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {catalogProducts.map(p => (
                    <div key={p.id} className="bg-white p-5 rounded-xl border flex justify-between items-center group hover:border-indigo-500 transition-all">
                      <div><h3 className="font-semibold">{p.name}</h3><p className="text-indigo-600 font-bold">${p.price.toFixed(2)}</p></div>
                      <button onClick={() => addToCart(p)} className="bg-slate-100 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white"><Plus size={20}/></button>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><div className="w-2 h-6 bg-amber-500 rounded-full"></div> Custom Ready</h2>
                <div className="bg-white rounded-xl border divide-y overflow-hidden">
                  {readyCustomOrders.map(co => (
                    <div key={co.id} className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-50 rounded flex items-center justify-center text-amber-600 font-bold">C</div>
                        <div><p className="font-medium">Order: {co.name}</p><p className="text-xs text-slate-400">Customer: {co.customerName}</p></div>
                      </div>
                      <button onClick={() => addToCart(co)} className="flex items-center gap-1 text-indigo-600 font-semibold bg-indigo-50 px-3 py-2 rounded-lg">Add <Plus size={14}/></button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN (Cart) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><ShoppingCart className="text-indigo-600"/> Cart</h2>
            <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto">
              {cart.length === 0 ? <p className="text-slate-400 text-center py-10">Cart is empty</p> : 
                cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                    <span className="text-sm font-medium">{item.name} (x{item.quantity})</span>
                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))
              }
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between font-bold text-lg"><span>Total Amount</span><span>${subtotal.toFixed(2)}</span></div>
            </div>
            <button 
              disabled={cart.length === 0}
              onClick={() => setIsGuestModalOpen(true)}
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl mt-6 shadow-lg hover:bg-indigo-700 disabled:bg-slate-200 transition-all"
            >
              Proceed to Guest Checkout
            </button>
          </div>
        </div>
      </div>

      {/* --- GUEST CHECKOUT MODAL --- */}
      {isGuestModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
            <div className="bg-slate-50 p-6 border-b flex justify-between items-center">
              <div><h2 className="text-xl font-bold">Guest Checkout</h2><p className="text-slate-500 text-xs">Complete info to pay or get link.</p></div>
              <button onClick={() => { setIsGuestModalOpen(false); setCheckoutStep(1); }} className="p-2 hover:bg-slate-200 rounded-full"><X size={20}/></button>
            </div>

            <div className="p-8">
              {checkoutStep === 1 ? (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative"><User className="absolute left-3 top-3.5 text-slate-400" size={18} /><input type="text" placeholder="Full Name" className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:border-indigo-500" onChange={e => setGuestInfo({...guestInfo, name: e.target.value})} /></div>
                    <div className="relative"><Mail className="absolute left-3 top-3.5 text-slate-400" size={18} /><input type="email" placeholder="Email Address" className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:border-indigo-500" onChange={e => setGuestInfo({...guestInfo, email: e.target.value})} /></div>
                    <div className="relative"><Phone className="absolute left-3 top-3.5 text-slate-400" size={18} /><input type="tel" placeholder="Phone (Optional)" className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:border-indigo-500" onChange={e => setGuestInfo({...guestInfo, phone: e.target.value})} /></div>
                  </div>

                  <label className="text-xs font-bold text-slate-400 uppercase">Select Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setSelectedMethod('EMAIL')} className={`flex flex-col items-center p-3 border-2 rounded-2xl gap-1 transition-all ${selectedMethod === 'EMAIL' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100'}`}><Mail size={20} className="text-indigo-600"/><span className="text-[10px] font-bold">EMAIL LINK</span></button>
                    {/* <button onClick={() => setSelectedMethod('SMS')} className={`flex flex-col items-center p-3 border-2 rounded-2xl gap-1 transition-all ${selectedMethod === 'SMS' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100'}`}><Send size={20} className="text-indigo-600"/><span className="text-[10px] font-bold">SMS LINK</span></button> */}
                    <button onClick={() => setSelectedMethod('NOW')} className={`flex flex-col items-center p-3 border-2 rounded-2xl gap-1 transition-all ${selectedMethod === 'NOW' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100'}`}><CreditCard size={20} className="text-indigo-600"/><span className="text-[10px] font-bold">PAY NOW</span></button>
                  </div>

                  <button 
                    disabled={!selectedMethod || !guestInfo.email}
                    onClick={handleFinalCheckout}
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 disabled:opacity-50"
                  >
                    Confirm Order
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={40} /></div>
                  <h3 className="text-2xl font-bold">Success!</h3>
                  <p className="text-slate-500 mt-2 px-4">Order created. Payment link or redirect is processing for <b>{guestInfo.email}</b>.</p>
                  <button onClick={() => { setIsGuestModalOpen(false); setCheckoutStep(1); setCart([]); }} className="mt-8 text-indigo-600 font-bold hover:underline">Done</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCatalog;