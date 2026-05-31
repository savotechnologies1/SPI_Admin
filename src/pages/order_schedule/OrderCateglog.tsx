// // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // import { 
// // // // // // // // //   ShoppingCart, 
// // // // // // // // //   Package, 
// // // // // // // // //   Settings, 
// // // // // // // // //   User, 
// // // // // // // // //   Plus, 
// // // // // // // // //   Minus, 
// // // // // // // // //   Trash2, 
// // // // // // // // //   CreditCard, 
// // // // // // // // //   ArrowRight 
// // // // // // // // // } from 'lucide-react';

// // // // // // // // // // --- Types ---
// // // // // // // // // interface Product {
// // // // // // // // //   id: string;
// // // // // // // // //   name: string;
// // // // // // // // //   price: number;
// // // // // // // // //   available: number;
// // // // // // // // //   image?: string;
// // // // // // // // //   type: 'STOCK' | 'CUSTOM';
// // // // // // // // // }

// // // // // // // // // interface CartItem extends Product {
// // // // // // // // //   quantity: number;
// // // // // // // // // }

// // // // // // // // // // --- Mock Data (Based on your Screenshots) ---
// // // // // // // // // const CATALOG_PRODUCTS: Product[] = [
// // // // // // // // //   { id: '1', name: 'Wireless Headphones', price: 129.99, available: 14, type: 'STOCK' },
// // // // // // // // //   { id: '2', name: 'Smart Watch Series X', price: 199.00, available: 8, type: 'STOCK' },
// // // // // // // // //   { id: '3', name: 'USB-C Portable SSD 1TB', price: 89.50, available: 32, type: 'STOCK' },
// // // // // // // // //   { id: '4', name: 'Ergonomic Office Chair', price: 279.99, available: 12, type: 'STOCK' },
// // // // // // // // // ];

// // // // // // // // // const CUSTOM_ORDERS: Product[] = [
// // // // // // // // //   { id: 'C1', name: 'Custom Engraved Watches', price: 150.00, available: 5, type: 'CUSTOM' },
// // // // // // // // //   { id: 'C2', name: 'Logo-printed Mugs', price: 15.00, available: 50, type: 'CUSTOM' },
// // // // // // // // // ];

// // // // // // // // // const OrderCateglog: React.FC = () => {
// // // // // // // // //   const [cart, setCart] = useState<CartItem[]>([]);
// // // // // // // // //   const [paymentGateway, setPaymentGateway] = useState<'STRIPE' | 'PAYPAL'>('STRIPE');
// // // // // // // // //   const [customerName, setCustomerName] = useState('John Doe'); // From Custom Order Form

// // // // // // // // //   // --- Logic ---
// // // // // // // // //   const addToCart = (product: Product) => {
// // // // // // // // //     setCart((prev) => {
// // // // // // // // //       const existing = prev.find((item) => item.id === product.id);
// // // // // // // // //       if (existing) {
// // // // // // // // //         return prev.map((item) =>
// // // // // // // // //           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
// // // // // // // // //         );
// // // // // // // // //       }
// // // // // // // // //       return [...prev, { ...product, quantity: 1 }];
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   const updateQuantity = (id: string, delta: number) => {
// // // // // // // // //     setCart((prev) =>
// // // // // // // // //       prev.map((item) =>
// // // // // // // // //         item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
// // // // // // // // //       )
// // // // // // // // //     );
// // // // // // // // //   };

// // // // // // // // //   const removeFromCart = (id: string) => {
// // // // // // // // //     setCart((prev) => prev.filter((item) => item.id !== id));
// // // // // // // // //   };

// // // // // // // // //   const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

// // // // // // // // //   return (
// // // // // // // // //     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 lg:p-10">
// // // // // // // // //       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
// // // // // // // // //         {/* LEFT COLUMN: Catalog & Custom Selection */}
// // // // // // // // //         <div className="lg:col-span-8 space-y-8">
// // // // // // // // //           <header className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
// // // // // // // // //             <div>
// // // // // // // // //               <h1 className="text-2xl font-bold text-slate-800">Order Management</h1>
// // // // // // // // //               <p className="text-slate-500 text-sm">Select items from catalog or custom orders</p>
// // // // // // // // //             </div>
// // // // // // // // //             <div className="bg-indigo-50 p-3 rounded-full">
// // // // // // // // //               <Package className="text-indigo-600" size={24} />
// // // // // // // // //             </div>
// // // // // // // // //           </header>

// // // // // // // // //           {/* Catalog Section */}
// // // // // // // // //           <section>
// // // // // // // // //             <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
// // // // // // // // //               <div className="w-2 h-6 bg-indigo-500 rounded-full"></div>
// // // // // // // // //               Product Catalog
// // // // // // // // //             </h2>
// // // // // // // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // // // //               {CATALOG_PRODUCTS.map((prod) => (
// // // // // // // // //                 <div key={prod.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-all group">
// // // // // // // // //                   <div className="flex justify-between items-start">
// // // // // // // // //                     <div>
// // // // // // // // //                       <h3 className="font-semibold text-slate-800">{prod.name}</h3>
// // // // // // // // //                       <p className="text-indigo-600 font-bold mt-1">${prod.price.toFixed(2)}</p>
// // // // // // // // //                       <span className="text-xs text-slate-400">Available: {prod.available}</span>
// // // // // // // // //                     </div>
// // // // // // // // //                     <button 
// // // // // // // // //                       onClick={() => addToCart(prod)}
// // // // // // // // //                       className="bg-slate-100 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors"
// // // // // // // // //                     >
// // // // // // // // //                       <Plus size={20} />
// // // // // // // // //                     </button>
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               ))}
// // // // // // // // //             </div>
// // // // // // // // //           </section>

// // // // // // // // //           {/* Custom Orders Section */}
// // // // // // // // //           <section>
// // // // // // // // //             <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
// // // // // // // // //               <div className="w-2 h-6 bg-amber-500 rounded-full"></div>
// // // // // // // // //               Custom Orders Ready
// // // // // // // // //             </h2>
// // // // // // // // //             <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
// // // // // // // // //               {CUSTOM_ORDERS.map((item) => (
// // // // // // // // //                 <div key={item.id} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0">
// // // // // // // // //                   <div className="flex items-center gap-3">
// // // // // // // // //                     <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 font-bold">
// // // // // // // // //                       C
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                       <p className="font-medium">{item.name}</p>
// // // // // // // // //                       <p className="text-xs text-slate-400">Custom request for {customerName}</p>
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>
// // // // // // // // //                   <button 
// // // // // // // // //                     onClick={() => addToCart(item)}
// // // // // // // // //                     className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 px-4 py-2 bg-indigo-50 rounded-lg"
// // // // // // // // //                   >
// // // // // // // // //                     Add to Cart <ArrowRight size={14} />
// // // // // // // // //                   </button>
// // // // // // // // //                 </div>
// // // // // // // // //               ))}
// // // // // // // // //             </div>
// // // // // // // // //           </section>
// // // // // // // // //         </div>

// // // // // // // // //         {/* RIGHT COLUMN: Cart & Checkout Summary */}
// // // // // // // // //         <div className="lg:col-span-4">
// // // // // // // // //           <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-6">
// // // // // // // // //             <div className="flex items-center gap-2 mb-6">
// // // // // // // // //               <ShoppingCart className="text-indigo-600" size={20} />
// // // // // // // // //               <h2 className="text-xl font-bold">Order Summary</h2>
// // // // // // // // //             </div>

// // // // // // // // //             {/* Cart Items */}
// // // // // // // // //             <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
// // // // // // // // //               {cart.length === 0 ? (
// // // // // // // // //                 <p className="text-slate-400 text-center py-10">Cart is empty</p>
// // // // // // // // //               ) : (
// // // // // // // // //                 cart.map((item) => (
// // // // // // // // //                   <div key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
// // // // // // // // //                     <div className="flex-1">
// // // // // // // // //                       <p className="text-sm font-bold truncate max-w-[150px]">{item.name}</p>
// // // // // // // // //                       <p className="text-xs text-slate-500">${item.price.toFixed(2)}</p>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="flex items-center gap-3">
// // // // // // // // //                       <div className="flex items-center bg-white rounded-lg border border-slate-200">
// // // // // // // // //                         <button onClick={() => updateQuantity(item.id, -1)} className="p-1"><Minus size={14} /></button>
// // // // // // // // //                         <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
// // // // // // // // //                         <button onClick={() => updateQuantity(item.id, 1)} className="p-1"><Plus size={14} /></button>
// // // // // // // // //                       </div>
// // // // // // // // //                       <button onClick={() => removeFromCart(item.id)} className="text-rose-500"><Trash2 size={18} /></button>
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>
// // // // // // // // //                 ))
// // // // // // // // //               )}
// // // // // // // // //             </div>

// // // // // // // // //             {/* Tenant Payment Settings */}
// // // // // // // // //             <div className="border-t pt-6 space-y-4">
// // // // // // // // //               <div>
// // // // // // // // //                 <label className="text-xs font-bold text-slate-500 uppercase">Customer Info</label>
// // // // // // // // //                 <div className="flex items-center gap-2 mt-1 text-sm bg-slate-50 p-3 rounded-lg">
// // // // // // // // //                   <User size={16} className="text-slate-400" />
// // // // // // // // //                   <span className="font-medium">{customerName}</span>
// // // // // // // // //                 </div>
// // // // // // // // //               </div>

// // // // // // // // //               <div>
// // // // // // // // //                 <label className="text-xs font-bold text-slate-500 uppercase">Payment Gateway (Tenant Settings)</label>
// // // // // // // // //                 <div className="grid grid-cols-2 gap-2 mt-2">
// // // // // // // // //                   <button 
// // // // // // // // //                     onClick={() => setPaymentGateway('STRIPE')}
// // // // // // // // //                     className={`py-2 px-3 rounded-lg border text-sm font-bold transition-all ${paymentGateway === 'STRIPE' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-400'}`}
// // // // // // // // //                   >
// // // // // // // // //                     Stripe
// // // // // // // // //                   </button>
// // // // // // // // //                   <button 
// // // // // // // // //                     onClick={() => setPaymentGateway('PAYPAL')}
// // // // // // // // //                     className={`py-2 px-3 rounded-lg border text-sm font-bold transition-all ${paymentGateway === 'PAYPAL' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-400'}`}
// // // // // // // // //                   >
// // // // // // // // //                     PayPal
// // // // // // // // //                   </button>
// // // // // // // // //                 </div>
// // // // // // // // //               </div>

// // // // // // // // //               <div className="pt-4 space-y-2 border-t">
// // // // // // // // //                 <div className="flex justify-between text-slate-500">
// // // // // // // // //                   <span>Subtotal</span>
// // // // // // // // //                   <span>${subtotal.toFixed(2)}</span>
// // // // // // // // //                 </div>
// // // // // // // // //                 <div className="flex justify-between font-bold text-lg text-slate-800">
// // // // // // // // //                   <span>Total Amount</span>
// // // // // // // // //                   <span>${subtotal.toFixed(2)}</span>
// // // // // // // // //                 </div>
// // // // // // // // //               </div>

// // // // // // // // //               <button 
// // // // // // // // //                 disabled={cart.length === 0}
// // // // // // // // //                 className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all mt-4"
// // // // // // // // //               >
// // // // // // // // //                 <CreditCard size={20} />
// // // // // // // // //                 Proceed to Pay with {paymentGateway}
// // // // // // // // //               </button>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default OrderCateglog;

// // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // import axios from 'axios'; // Make sure to install axios
// // // // // // // // // import { 
// // // // // // // // //   ShoppingCart, 
// // // // // // // // //   Package, 
// // // // // // // // //   User, 
// // // // // // // // //   Plus, 
// // // // // // // // //   Minus, 
// // // // // // // // //   Trash2, 
// // // // // // // // //   CreditCard, 
// // // // // // // // //   ArrowRight,
// // // // // // // // //   Search,
// // // // // // // // //   Loader2
// // // // // // // // // } from 'lucide-react';

// // // // // // // // // // --- Updated Types to match Prisma Output ---
// // // // // // // // // interface Product {
// // // // // // // // //   id: string;
// // // // // // // // //   name: string;
// // // // // // // // //   price: number;
// // // // // // // // //   stock: number;
// // // // // // // // //   type: 'STOCK' | 'CUSTOM';
// // // // // // // // //   customerName?: string; // For custom orders
// // // // // // // // //   orderNumber?: string;  // For custom orders
// // // // // // // // // }

// // // // // // // // // interface CartItem extends Product {
// // // // // // // // //   quantity: number;
// // // // // // // // // }

// // // // // // // // // const OrderCatalog: React.FC = () => {
// // // // // // // // //   // --- State Management ---
// // // // // // // // //   const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
// // // // // // // // //   const [readyCustomOrders, setReadyCustomOrders] = useState<Product[]>([]);
// // // // // // // // //   const [cart, setCart] = useState<CartItem[]>([]);
// // // // // // // // //   const [paymentGateway, setPaymentGateway] = useState<'STRIPE' | 'PAYPAL'>('STRIPE');
// // // // // // // // //   const [searchQuery, setSearchQuery] = useState('');
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // // // // //   // --- API Integration ---
// // // // // // // // //   const fetchCatalogData = async (query: string = '') => {
// // // // // // // // //     try {
// // // // // // // // //       setLoading(true);
// // // // // // // // //       // Replace with your actual API endpoint
// // // // // // // // //       const response = await axios.get(`http://localhost:8080/api/admin/get-order-catelog-data?searchQuery=${query}`);
      
// // // // // // // // //       const { catalogProducts, readyCustomOrders, settings } = response.data.data;

// // // // // // // // //       // Map backend fields to frontend interface
// // // // // // // // //       const formattedCatalog = catalogProducts.map((p: any) => ({
// // // // // // // // //         id: p.id,
// // // // // // // // //         name: p.name,
// // // // // // // // //         price: parseFloat(p.price),
// // // // // // // // //         stock: p.stock,
// // // // // // // // //         type: 'STOCK'
// // // // // // // // //       }));

// // // // // // // // //       const formattedCustom = readyCustomOrders.map((co: any) => ({
// // // // // // // // //         id: co.id,
// // // // // // // // //         name: co.orderNumber, // Showing order number as title
// // // // // // // // //         price: parseFloat(co.totalCost),
// // // // // // // // //         stock: co.quantity,
// // // // // // // // //         customerName: co.customerName,
// // // // // // // // //         type: 'CUSTOM'
// // // // // // // // //       }));

// // // // // // // // //       setCatalogProducts(formattedCatalog);
// // // // // // // // //       setReadyCustomOrders(formattedCustom);
// // // // // // // // //       setPaymentGateway(settings.activeGateway);
// // // // // // // // //       setError(null);
// // // // // // // // //     } catch (err: any) {
// // // // // // // // //       setError("Failed to load catalog data.");
// // // // // // // // //       console.error(err);
// // // // // // // // //     } finally {
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Fetch on mount
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     fetchCatalogData();
// // // // // // // // //   }, []);

// // // // // // // // //   // Handle Search
// // // // // // // // //   const handleSearch = (e: React.FormEvent) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     fetchCatalogData(searchQuery);
// // // // // // // // //   };

// // // // // // // // //   // --- Cart Logic ---
// // // // // // // // //   const addToCart = (product: Product) => {
// // // // // // // // //     setCart((prev) => {
// // // // // // // // //       const existing = prev.find((item) => item.id === product.id);
// // // // // // // // //       if (existing) {
// // // // // // // // //         return prev.map((item) =>
// // // // // // // // //           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
// // // // // // // // //         );
// // // // // // // // //       }
// // // // // // // // //       return [...prev, { ...product, quantity: 1 }];
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   const updateQuantity = (id: string, delta: number) => {
// // // // // // // // //     setCart((prev) =>
// // // // // // // // //       prev.map((item) =>
// // // // // // // // //         item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
// // // // // // // // //       )
// // // // // // // // //     );
// // // // // // // // //   };

// // // // // // // // //   const removeFromCart = (id: string) => {
// // // // // // // // //     setCart((prev) => prev.filter((item) => item.id !== id));
// // // // // // // // //   };

// // // // // // // // //   const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

// // // // // // // // //   return (
// // // // // // // // //     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 lg:p-10">
// // // // // // // // //       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
// // // // // // // // //         {/* LEFT COLUMN */}
// // // // // // // // //         <div className="lg:col-span-8 space-y-8">
// // // // // // // // //           <header className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
// // // // // // // // //             <div>
// // // // // // // // //               <h1 className="text-2xl font-bold text-slate-800">Order Management</h1>
// // // // // // // // //               <p className="text-slate-500 text-sm">Select items from catalog or custom orders</p>
// // // // // // // // //             </div>
            
// // // // // // // // //             {/* Search Bar */}
// // // // // // // // //             <form onSubmit={handleSearch} className="relative flex items-center">
// // // // // // // // //               <input 
// // // // // // // // //                 type="text" 
// // // // // // // // //                 placeholder="Search products or orders..."
// // // // // // // // //                 className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
// // // // // // // // //                 value={searchQuery}
// // // // // // // // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // // // // // // // //               />
// // // // // // // // //               <Search className="absolute left-3 text-slate-400" size={16} />
// // // // // // // // //               <button type="submit" className="hidden">Search</button>
// // // // // // // // //             </form>
// // // // // // // // //           </header>

// // // // // // // // //           {loading ? (
// // // // // // // // //             <div className="flex flex-col items-center justify-center py-20 text-slate-400">
// // // // // // // // //               <Loader2 className="animate-spin mb-2" size={32} />
// // // // // // // // //               <p>Loading Catalog...</p>
// // // // // // // // //             </div>
// // // // // // // // //           ) : error ? (
// // // // // // // // //             <div className="bg-rose-50 text-rose-600 p-6 rounded-xl border border-rose-100 text-center">
// // // // // // // // //               {error}
// // // // // // // // //             </div>
// // // // // // // // //           ) : (
// // // // // // // // //             <>
// // // // // // // // //               {/* Catalog Section */}
// // // // // // // // //               <section>
// // // // // // // // //                 <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
// // // // // // // // //                   <div className="w-2 h-6 bg-indigo-500 rounded-full"></div>
// // // // // // // // //                   Product Catalog
// // // // // // // // //                 </h2>
// // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // // // //                   {catalogProducts.map((prod) => (
// // // // // // // // //                     <div key={prod.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-all group">
// // // // // // // // //                       <div className="flex justify-between items-start">
// // // // // // // // //                         <div>
// // // // // // // // //                           <h3 className="font-semibold text-slate-800">{prod.name}</h3>
// // // // // // // // //                           <p className="text-indigo-600 font-bold mt-1">${prod.price.toFixed(2)}</p>
// // // // // // // // //                           <span className="text-xs text-slate-400">Available: {prod.stock}</span>
// // // // // // // // //                         </div>
// // // // // // // // //                         <button 
// // // // // // // // //                           onClick={() => addToCart(prod)}
// // // // // // // // //                           className="bg-slate-100 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors"
// // // // // // // // //                         >
// // // // // // // // //                           <Plus size={20} />
// // // // // // // // //                         </button>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>
// // // // // // // // //                   ))}
// // // // // // // // //                 </div>
// // // // // // // // //               </section>

// // // // // // // // //               {/* Custom Orders Section */}
// // // // // // // // //               <section>
// // // // // // // // //                 <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
// // // // // // // // //                   <div className="w-2 h-6 bg-amber-500 rounded-full"></div>
// // // // // // // // //                   Custom Orders Ready
// // // // // // // // //                 </h2>
// // // // // // // // //                 <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
// // // // // // // // //                   {readyCustomOrders.length === 0 ? (
// // // // // // // // //                     <p className="p-10 text-center text-slate-400">No ready custom orders found.</p>
// // // // // // // // //                   ) : (
// // // // // // // // //                     readyCustomOrders.map((item) => (
// // // // // // // // //                       <div key={item.id} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0">
// // // // // // // // //                         <div className="flex items-center gap-3">
// // // // // // // // //                           <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 font-bold">C</div>
// // // // // // // // //                           <div>
// // // // // // // // //                             <p className="font-medium">Order: {item.name}</p>
// // // // // // // // //                             <p className="text-xs text-slate-400">Customer: {item.customerName}</p>
// // // // // // // // //                           </div>
// // // // // // // // //                         </div>
// // // // // // // // //                         <div className="flex items-center gap-6">
// // // // // // // // //                             <span className="font-bold text-slate-700">${item.price.toFixed(2)}</span>
// // // // // // // // //                             <button 
// // // // // // // // //                                 onClick={() => addToCart(item)}
// // // // // // // // //                                 className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 px-4 py-2 bg-indigo-50 rounded-lg"
// // // // // // // // //                             >
// // // // // // // // //                                 Add to Cart <ArrowRight size={14} />
// // // // // // // // //                             </button>
// // // // // // // // //                         </div>
// // // // // // // // //                       </div>
// // // // // // // // //                     ))
// // // // // // // // //                   )}
// // // // // // // // //                 </div>
// // // // // // // // //               </section>
// // // // // // // // //             </>
// // // // // // // // //           )}
// // // // // // // // //         </div>

// // // // // // // // //         {/* RIGHT COLUMN (Cart) remains mostly the same, ensuring it displays dynamic prices */}
// // // // // // // // //         <div className="lg:col-span-4">
// // // // // // // // //           <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-6">
// // // // // // // // //             <div className="flex items-center gap-2 mb-6">
// // // // // // // // //               <ShoppingCart className="text-indigo-600" size={20} />
// // // // // // // // //               <h2 className="text-xl font-bold">Order Summary</h2>
// // // // // // // // //             </div>

// // // // // // // // //             <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
// // // // // // // // //               {cart.length === 0 ? (
// // // // // // // // //                 <p className="text-slate-400 text-center py-10">Cart is empty</p>
// // // // // // // // //               ) : (
// // // // // // // // //                 cart.map((item) => (
// // // // // // // // //                   <div key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
// // // // // // // // //                     <div className="flex-1">
// // // // // // // // //                       <p className="text-sm font-bold truncate max-w-[150px]">{item.type === 'CUSTOM' ? `Order ${item.name}` : item.name}</p>
// // // // // // // // //                       <p className="text-xs text-slate-500">${item.price.toFixed(2)}</p>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="flex items-center gap-3">
// // // // // // // // //                       <div className="flex items-center bg-white rounded-lg border border-slate-200">
// // // // // // // // //                         <button onClick={() => updateQuantity(item.id, -1)} className="p-1"><Minus size={14} /></button>
// // // // // // // // //                         <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
// // // // // // // // //                         <button onClick={() => updateQuantity(item.id, 1)} className="p-1"><Plus size={14} /></button>
// // // // // // // // //                       </div>
// // // // // // // // //                       <button onClick={() => removeFromCart(item.id)} className="text-rose-500"><Trash2 size={18} /></button>
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>
// // // // // // // // //                 ))
// // // // // // // // //               )}
// // // // // // // // //             </div>

// // // // // // // // //             {/* Total & Checkout Section */}
// // // // // // // // //             <div className="border-t pt-6 space-y-4">
// // // // // // // // //               <div className="pt-4 space-y-2">
// // // // // // // // //                 <div className="flex justify-between text-slate-500">
// // // // // // // // //                   <span>Subtotal</span>
// // // // // // // // //                   <span>${subtotal.toFixed(2)}</span>
// // // // // // // // //                 </div>
// // // // // // // // //                 <div className="flex justify-between font-bold text-lg text-slate-800">
// // // // // // // // //                   <span>Total Amount</span>
// // // // // // // // //                   <span>${subtotal.toFixed(2)}</span>
// // // // // // // // //                 </div>
// // // // // // // // //               </div>

// // // // // // // // //               <button 
// // // // // // // // //                 disabled={cart.length === 0 || loading}
// // // // // // // // //                 className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all mt-4"
// // // // // // // // //               >
// // // // // // // // //                 <CreditCard size={20} />
// // // // // // // // //                 Proceed to Pay with {paymentGateway}
// // // // // // // // //               </button>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default OrderCatalog;


// // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // import axios from 'axios';
// // // // // // // // import { 
// // // // // // // //   ShoppingCart, Package, User, Plus, Minus, Trash2, 
// // // // // // // //   CreditCard, ArrowRight, Search, Loader2, X, Mail, Send, CheckCircle, 
// // // // // // // //   Phone
// // // // // // // // } from 'lucide-react';

// // // // // // // // // --- Types ---
// // // // // // // // interface Product {
// // // // // // // //   id: string;
// // // // // // // //   name: string;
// // // // // // // //   price: number;
// // // // // // // //   stock: number;
// // // // // // // //   type: 'STOCK' | 'CUSTOM';
// // // // // // // //   customerName?: string;
// // // // // // // //   orderNumber?: string;
// // // // // // // // }

// // // // // // // // interface CartItem extends Product {
// // // // // // // //   quantity: number;
// // // // // // // // }

// // // // // // // // const OrderCatalog: React.FC = () => {
// // // // // // // //   // --- States ---
// // // // // // // //   const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
// // // // // // // //   const [readyCustomOrders, setReadyCustomOrders] = useState<Product[]>([]);
// // // // // // // //   const [cart, setCart] = useState<CartItem[]>([]);
// // // // // // // //   const [paymentGateway, setPaymentGateway] = useState<'STRIPE' | 'PAYPAL'>('STRIPE');
// // // // // // // //   const [searchQuery, setSearchQuery] = useState('');
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // // // //   // --- Guest Checkout States ---
// // // // // // // //   const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
// // // // // // // //   const [checkoutStep, setCheckoutStep] = useState(1); // 1: Form, 2: Success
// // // // // // // //   const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '' });
// // // // // // // //   const [selectedMethod, setSelectedMethod] = useState<'NOW' | 'EMAIL' | 'SMS' | ''>('');

// // // // // // // //   const fetchCatalogData = async (query: string = '') => {
// // // // // // // //     try {
// // // // // // // //       setLoading(true);
// // // // // // // //       const response = await axios.get(`http://localhost:8080/api/admin/get-order-catelog-data?searchQuery=${query}`);
// // // // // // // //       const { catalogProducts, readyCustomOrders, settings } = response.data.data;

// // // // // // // //       setCatalogProducts(catalogProducts.map((p: any) => ({
// // // // // // // //         id: p.id, name: p.name, price: parseFloat(p.price), stock: p.stock, type: 'STOCK'
// // // // // // // //       })));

// // // // // // // //       setReadyCustomOrders(readyCustomOrders.map((co: any) => ({
// // // // // // // //         id: co.id, name: co.orderNumber, price: parseFloat(co.totalCost), stock: co.quantity, customerName: co.customerName, type: 'CUSTOM'
// // // // // // // //       })));

// // // // // // // //       setPaymentGateway(settings.activeGateway);
// // // // // // // //     } catch (err: any) {
// // // // // // // //       setError("Failed to load catalog data.");
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   useEffect(() => { fetchCatalogData(); }, []);

// // // // // // // //   // --- Cart Actions ---
// // // // // // // //   const addToCart = (product: Product) => {
// // // // // // // //     setCart((prev) => {
// // // // // // // //       const existing = prev.find((item) => item.id === product.id);
// // // // // // // //       if (existing) {
// // // // // // // //         return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
// // // // // // // //       }
// // // // // // // //       return [...prev, { ...product, quantity: 1 }];
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

// // // // // // // //   // --- Guest Logic ---
// // // // // // // //   const handleFinalCheckout = () => {
// // // // // // // //     // Abhi ke liye bas UI success dikhayega (Baad mein yahan API call hogi)
// // // // // // // //     setCheckoutStep(2);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 lg:p-10 relative">
// // // // // // // //       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
// // // // // // // //         {/* LEFT COLUMN */}
// // // // // // // //         <div className="lg:col-span-8 space-y-8">
// // // // // // // //           <header className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
// // // // // // // //             <div>
// // // // // // // //               <h1 className="text-2xl font-bold text-slate-800">Order Management</h1>
// // // // // // // //               <p className="text-slate-500 text-sm">Guest checkout & Payment links ready</p>
// // // // // // // //             </div>
// // // // // // // //             <form onSubmit={(e) => { e.preventDefault(); fetchCatalogData(searchQuery); }} className="relative">
// // // // // // // //               <input 
// // // // // // // //                 type="text" placeholder="Search..." 
// // // // // // // //                 className="pl-10 pr-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
// // // // // // // //                 value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
// // // // // // // //               />
// // // // // // // //               <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
// // // // // // // //             </form>
// // // // // // // //           </header>

// // // // // // // //           {loading ? (
// // // // // // // //             <div className="flex flex-col items-center py-20 text-slate-400"><Loader2 className="animate-spin mb-2" /> Loading...</div>
// // // // // // // //           ) : (
// // // // // // // //             <div className="space-y-8">
// // // // // // // //               <section>
// // // // // // // //                 <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><div className="w-2 h-6 bg-indigo-500 rounded-full"></div> Catalog</h2>
// // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // // //                   {catalogProducts.map(p => (
// // // // // // // //                     <div key={p.id} className="bg-white p-5 rounded-xl border flex justify-between items-center group hover:border-indigo-500 transition-all">
// // // // // // // //                       <div><h3 className="font-semibold">{p.name}</h3><p className="text-indigo-600 font-bold">${p.price.toFixed(2)}</p></div>
// // // // // // // //                       <button onClick={() => addToCart(p)} className="bg-slate-100 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white"><Plus size={20}/></button>
// // // // // // // //                     </div>
// // // // // // // //                   ))}
// // // // // // // //                 </div>
// // // // // // // //               </section>

// // // // // // // //               <section>
// // // // // // // //                 <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><div className="w-2 h-6 bg-amber-500 rounded-full"></div> Custom Ready</h2>
// // // // // // // //                 <div className="bg-white rounded-xl border divide-y overflow-hidden">
// // // // // // // //                   {readyCustomOrders.map(co => (
// // // // // // // //                     <div key={co.id} className="p-4 flex justify-between items-center">
// // // // // // // //                       <div className="flex items-center gap-3">
// // // // // // // //                         <div className="w-10 h-10 bg-amber-50 rounded flex items-center justify-center text-amber-600 font-bold">C</div>
// // // // // // // //                         <div><p className="font-medium">Order: {co.name}</p><p className="text-xs text-slate-400">Customer: {co.customerName}</p></div>
// // // // // // // //                       </div>
// // // // // // // //                       <button onClick={() => addToCart(co)} className="flex items-center gap-1 text-indigo-600 font-semibold bg-indigo-50 px-3 py-2 rounded-lg">Add <Plus size={14}/></button>
// // // // // // // //                     </div>
// // // // // // // //                   ))}
// // // // // // // //                 </div>
// // // // // // // //               </section>
// // // // // // // //             </div>
// // // // // // // //           )}
// // // // // // // //         </div>

// // // // // // // //         {/* RIGHT COLUMN (Cart) */}
// // // // // // // //         <div className="lg:col-span-4">
// // // // // // // //           <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-6">
// // // // // // // //             <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><ShoppingCart className="text-indigo-600"/> Cart</h2>
// // // // // // // //             <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto">
// // // // // // // //               {cart.length === 0 ? <p className="text-slate-400 text-center py-10">Cart is empty</p> : 
// // // // // // // //                 cart.map(item => (
// // // // // // // //                   <div key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
// // // // // // // //                     <span className="text-sm font-medium">{item.name} (x{item.quantity})</span>
// // // // // // // //                     <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
// // // // // // // //                   </div>
// // // // // // // //                 ))
// // // // // // // //               }
// // // // // // // //             </div>
// // // // // // // //             <div className="border-t pt-4 space-y-2">
// // // // // // // //               <div className="flex justify-between font-bold text-lg"><span>Total Amount</span><span>${subtotal.toFixed(2)}</span></div>
// // // // // // // //             </div>
// // // // // // // //             <button 
// // // // // // // //               disabled={cart.length === 0}
// // // // // // // //               onClick={() => setIsGuestModalOpen(true)}
// // // // // // // //               className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl mt-6 shadow-lg hover:bg-indigo-700 disabled:bg-slate-200 transition-all"
// // // // // // // //             >
// // // // // // // //               Proceed to Guest Checkout
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* --- GUEST CHECKOUT MODAL --- */}
// // // // // // // //       {isGuestModalOpen && (
// // // // // // // //         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
// // // // // // // //           <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
// // // // // // // //             <div className="bg-slate-50 p-6 border-b flex justify-between items-center">
// // // // // // // //               <div><h2 className="text-xl font-bold">Guest Checkout</h2><p className="text-slate-500 text-xs">Complete info to pay or get link.</p></div>
// // // // // // // //               <button onClick={() => { setIsGuestModalOpen(false); setCheckoutStep(1); }} className="p-2 hover:bg-slate-200 rounded-full"><X size={20}/></button>
// // // // // // // //             </div>

// // // // // // // //             <div className="p-8">
// // // // // // // //               {checkoutStep === 1 ? (
// // // // // // // //                 <div className="space-y-6">
// // // // // // // //                   <div className="space-y-4">
// // // // // // // //                     <div className="relative"><User className="absolute left-3 top-3.5 text-slate-400" size={18} /><input type="text" placeholder="Full Name" className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:border-indigo-500" onChange={e => setGuestInfo({...guestInfo, name: e.target.value})} /></div>
// // // // // // // //                     <div className="relative"><Mail className="absolute left-3 top-3.5 text-slate-400" size={18} /><input type="email" placeholder="Email Address" className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:border-indigo-500" onChange={e => setGuestInfo({...guestInfo, email: e.target.value})} /></div>
// // // // // // // //                     <div className="relative"><Phone className="absolute left-3 top-3.5 text-slate-400" size={18} /><input type="tel" placeholder="Phone (Optional)" className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:border-indigo-500" onChange={e => setGuestInfo({...guestInfo, phone: e.target.value})} /></div>
// // // // // // // //                   </div>

// // // // // // // //                   <label className="text-xs font-bold text-slate-400 uppercase">Select Method</label>
// // // // // // // //                   <div className="grid grid-cols-2 gap-2">
// // // // // // // //                     <button onClick={() => setSelectedMethod('EMAIL')} className={`flex flex-col items-center p-3 border-2 rounded-2xl gap-1 transition-all ${selectedMethod === 'EMAIL' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100'}`}><Mail size={20} className="text-indigo-600"/><span className="text-[10px] font-bold">EMAIL LINK</span></button>
// // // // // // // //                     {/* <button onClick={() => setSelectedMethod('SMS')} className={`flex flex-col items-center p-3 border-2 rounded-2xl gap-1 transition-all ${selectedMethod === 'SMS' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100'}`}><Send size={20} className="text-indigo-600"/><span className="text-[10px] font-bold">SMS LINK</span></button> */}
// // // // // // // //                     <button onClick={() => setSelectedMethod('NOW')} className={`flex flex-col items-center p-3 border-2 rounded-2xl gap-1 transition-all ${selectedMethod === 'NOW' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100'}`}><CreditCard size={20} className="text-indigo-600"/><span className="text-[10px] font-bold">PAY NOW</span></button>
// // // // // // // //                   </div>

// // // // // // // //                   <button 
// // // // // // // //                     disabled={!selectedMethod || !guestInfo.email}
// // // // // // // //                     onClick={handleFinalCheckout}
// // // // // // // //                     className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 disabled:opacity-50"
// // // // // // // //                   >
// // // // // // // //                     Confirm Order
// // // // // // // //                   </button>
// // // // // // // //                 </div>
// // // // // // // //               ) : (
// // // // // // // //                 <div className="text-center py-6">
// // // // // // // //                   <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={40} /></div>
// // // // // // // //                   <h3 className="text-2xl font-bold">Success!</h3>
// // // // // // // //                   <p className="text-slate-500 mt-2 px-4">Order created. Payment link or redirect is processing for <b>{guestInfo.email}</b>.</p>
// // // // // // // //                   <button onClick={() => { setIsGuestModalOpen(false); setCheckoutStep(1); setCart([]); }} className="mt-8 text-indigo-600 font-bold hover:underline">Done</button>
// // // // // // // //                 </div>
// // // // // // // //               )}
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default OrderCatalog;
// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import axios from 'axios';
// // // // // // // import { 
// // // // // // //   ShoppingCart, Plus, Minus, Trash2, CreditCard, ArrowRight, 
// // // // // // //   Search, Loader2, X, Mail, User, CheckCircle, Phone
// // // // // // // } from 'lucide-react';

// // // // // // // // --- Types ---
// // // // // // // interface Product {
// // // // // // //   id: string;
// // // // // // //   name: string;
// // // // // // //   price: number;
// // // // // // //   stock: number;
// // // // // // //   type: 'STOCK' | 'CUSTOM';
// // // // // // //   customerName?: string;
// // // // // // //   orderNumber?: string;
// // // // // // // }

// // // // // // // interface CartItem extends Product {
// // // // // // //   quantity: number;
// // // // // // // }

// // // // // // // const OrderCatalog: React.FC = () => {
// // // // // // //   // --- States ---
// // // // // // //   const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
// // // // // // //   const [readyCustomOrders, setReadyCustomOrders] = useState<Product[]>([]);
// // // // // // //   const [cart, setCart] = useState<CartItem[]>([]);
// // // // // // //   const [searchQuery, setSearchQuery] = useState('');
// // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // //   // --- Checkout UI States ---
// // // // // // //   const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
// // // // // // //   const [checkoutStep, setCheckoutStep] = useState(1); // 1: Form/Select, 2: Success
// // // // // // //   const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '' });
  
// // // // // // //   // Selection States
// // // // // // //   const [selectedGateway, setSelectedGateway] = useState<'STRIPE' | 'PAYPAL'>('STRIPE');
// // // // // // //   const [selectedMethod, setSelectedMethod] = useState<'NOW' | 'EMAIL' | ''>('');
// // // // // // //   const [isProcessing, setIsProcessing] = useState(false);

// // // // // // //   // --- API 1: Fetch Catalog & Custom Orders with Token ---
// // // // // // //   const fetchCatalogData = async (query: string = '') => {
// // // // // // //     try {
// // // // // // //       setLoading(true);
// // // // // // //       const token = localStorage.getItem('token'); // Authorization Token

// // // // // // //       const response = await axios.get(
// // // // // // //         `http://localhost:8080/api/admin/get-order-catelog-data?searchQuery=${query}`, 
// // // // // // //         {
// // // // // // //           headers: { Authorization: `Bearer ${token}` }
// // // // // // //         }
// // // // // // //       );

// // // // // // //       const { catalogProducts, readyCustomOrders } = response.data.data;

// // // // // // //       setCatalogProducts(catalogProducts.map((p: any) => ({
// // // // // // //         id: p.id, name: p.name, price: parseFloat(p.price), stock: p.stock, type: 'STOCK'
// // // // // // //       })));

// // // // // // //       setReadyCustomOrders(readyCustomOrders.map((co: any) => ({
// // // // // // //         id: co.id, name: co.orderNumber, price: parseFloat(co.totalCost), stock: co.quantity, customerName: co.customerName, type: 'CUSTOM'
// // // // // // //       })));

// // // // // // //     } catch (err: any) {
// // // // // // //       console.error("Auth failed or server error", err);
// // // // // // //       if (err.response?.status === 401) alert("Session expired. Please login again.");
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => { fetchCatalogData(); }, []);

// // // // // // //   // --- Cart Management ---
// // // // // // //   const addToCart = (product: Product) => {
// // // // // // //     setCart((prev) => {
// // // // // // //       const existing = prev.find((item) => item.id === product.id);
// // // // // // //       if (existing) {
// // // // // // //         return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
// // // // // // //       }
// // // // // // //       return [...prev, { ...product, quantity: 1 }];
// // // // // // //     });
// // // // // // //   };

// // // // // // //   const updateQuantity = (id: string, delta: number) => {
// // // // // // //     setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
// // // // // // //   };

// // // // // // //   const removeFromCart = (id: string) => {
// // // // // // //     setCart(prev => prev.filter(item => item.id !== id));
// // // // // // //   };

// // // // // // //   const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

// // // // // // //   // --- API 2: Process Payment/Email Link with Token ---
// // // // // // //   const handleFinalCheckout = async () => {
// // // // // // //     try {
// // // // // // //       setIsProcessing(true);
// // // // // // //       const token = localStorage.getItem('token');
// // // // // // //       const tId = localStorage.getItem('tenantId'); // Database se merchant keys pick karne ke liye

// // // // // // //       const payload = {
// // // // // // //         tenantId: tId,
// // // // // // //         items: cart,
// // // // // // //         customerDetails: guestInfo,
// // // // // // //         method: selectedMethod,    // 'NOW' or 'EMAIL'
// // // // // // //         gateway: selectedGateway   // 'STRIPE' or 'PAYPAL'
// // // // // // //       };

// // // // // // //       const response = await axios.post(
// // // // // // //         'http://localhost:8080/api/admin/create-payment', 
// // // // // // //         payload,
// // // // // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // // // // //       );

// // // // // // //       if (selectedMethod === 'NOW') {
// // // // // // //         // Redirect to Stripe/PayPal Checkout Page
// // // // // // //         window.location.href = response.data.url;
// // // // // // //       } else {
// // // // // // //         // Show Success Step for Email Link
// // // // // // //         setCheckoutStep(2);
// // // // // // //       }
// // // // // // //     } catch (err: any) {
// // // // // // //       alert("Checkout Failed: " + (err.response?.data?.message || "Internal server error"));
// // // // // // //     } finally {
// // // // // // //       setIsProcessing(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 lg:p-10 relative">
// // // // // // //       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
// // // // // // //         {/* LEFT COLUMN: Products */}
// // // // // // //         <div className="lg:col-span-8 space-y-8">
// // // // // // //           <header className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
// // // // // // //             <div>
// // // // // // //               <h1 className="text-2xl font-bold text-slate-800">Order Management</h1>
// // // // // // //               <p className="text-slate-500 text-sm">Select items & process dynamic payments</p>
// // // // // // //             </div>
// // // // // // //             <div className="relative">
// // // // // // //               <input 
// // // // // // //                 type="text" placeholder="Search products..." 
// // // // // // //                 className="pl-10 pr-4 py-2 border rounded-xl text-sm outline-none w-full md:w-64 focus:ring-2 focus:ring-indigo-500"
// // // // // // //                 value={searchQuery} 
// // // // // // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // // // // // //                 onKeyDown={(e) => e.key === 'Enter' && fetchCatalogData(searchQuery)}
// // // // // // //               />
// // // // // // //               <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
// // // // // // //             </div>
// // // // // // //           </header>

// // // // // // //           {loading ? (
// // // // // // //             <div className="flex flex-col items-center py-20 text-slate-400"><Loader2 className="animate-spin mb-2" /> Loading Catalog...</div>
// // // // // // //           ) : (
// // // // // // //             <div className="space-y-8">
// // // // // // //               {/* Catalog Section */}
// // // // // // //               <section>
// // // // // // //                 <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><div className="w-2 h-6 bg-indigo-500 rounded-full"></div> Product Catalog</h2>
// // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // // //                   {catalogProducts.map(p => (
// // // // // // //                     <div key={p.id} className="bg-white p-5 rounded-xl border flex justify-between items-center group hover:border-indigo-500 transition-all">
// // // // // // //                       <div><h3 className="font-semibold">{p.name}</h3><p className="text-indigo-600 font-bold">${p.price.toFixed(2)}</p></div>
// // // // // // //                       <button onClick={() => addToCart(p)} className="bg-slate-100 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white"><Plus size={20}/></button>
// // // // // // //                     </div>
// // // // // // //                   ))}
// // // // // // //                 </div>
// // // // // // //               </section>

// // // // // // //               {/* Custom Orders Section */}
// // // // // // //               <section>
// // // // // // //                 <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><div className="w-2 h-6 bg-amber-500 rounded-full"></div> Custom Orders Ready</h2>
// // // // // // //                 <div className="bg-white rounded-xl border divide-y overflow-hidden">
// // // // // // //                   {readyCustomOrders.map(co => (
// // // // // // //                     <div key={co.id} className="p-4 flex justify-between items-center">
// // // // // // //                       <div className="flex items-center gap-3">
// // // // // // //                         <div className="w-10 h-10 bg-amber-50 rounded flex items-center justify-center text-amber-600 font-bold text-xs">CUSTOM</div>
// // // // // // //                         <div><p className="font-medium">Order: {co.name}</p><p className="text-xs text-slate-400">Customer: {co.customerName}</p></div>
// // // // // // //                       </div>
// // // // // // //                       <button onClick={() => addToCart(co)} className="flex items-center gap-1 text-indigo-600 font-semibold bg-indigo-50 px-3 py-2 rounded-lg hover:bg-indigo-100">Add <Plus size={14}/></button>
// // // // // // //                     </div>
// // // // // // //                   ))}
// // // // // // //                 </div>
// // // // // // //               </section>
// // // // // // //             </div>
// // // // // // //           )}
// // // // // // //         </div>

// // // // // // //         {/* RIGHT COLUMN: Cart Summary */}
// // // // // // //         <div className="lg:col-span-4">
// // // // // // //           <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-6">
// // // // // // //             <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><ShoppingCart className="text-indigo-600"/> Cart Summary</h2>
// // // // // // //             <div className="space-y-4 mb-8 max-h-[350px] overflow-y-auto pr-2">
// // // // // // //               {cart.length === 0 ? <p className="text-slate-400 text-center py-10">Cart is empty</p> : 
// // // // // // //                 cart.map(item => (
// // // // // // //                   <div key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border">
// // // // // // //                     <div className="flex-1 min-w-0 mr-4">
// // // // // // //                         <p className="text-sm font-bold truncate">{item.name}</p>
// // // // // // //                         <p className="text-xs text-indigo-600">${item.price.toFixed(2)}</p>
// // // // // // //                     </div>
// // // // // // //                     <div className="flex items-center gap-2 bg-white rounded-lg border p-1">
// // // // // // //                         <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-rose-500"><Minus size={12}/></button>
// // // // // // //                         <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
// // // // // // //                         <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-indigo-600"><Plus size={12}/></button>
// // // // // // //                         <button onClick={() => removeFromCart(item.id)} className="ml-2 text-slate-300 hover:text-rose-500"><Trash2 size={14}/></button>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 ))
// // // // // // //               }
// // // // // // //             </div>
// // // // // // //             <div className="border-t pt-4 space-y-2">
// // // // // // //               <div className="flex justify-between font-bold text-lg"><span>Total Amount</span><span className="text-indigo-600">${subtotal.toFixed(2)}</span></div>
// // // // // // //             </div>
// // // // // // //             <button 
// // // // // // //               disabled={cart.length === 0}
// // // // // // //               onClick={() => setIsGuestModalOpen(true)}
// // // // // // //               className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl mt-6 shadow-lg hover:bg-indigo-700 disabled:bg-slate-200 transition-all flex items-center justify-center gap-2"
// // // // // // //             >
// // // // // // //               Proceed to Payment <ArrowRight size={18}/>
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* --- CHECKOUT MODAL --- */}
// // // // // // //       {isGuestModalOpen && (
// // // // // // //         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
// // // // // // //           <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
// // // // // // //             <div className="bg-slate-50 p-6 border-b flex justify-between items-center">
// // // // // // //               <div><h2 className="text-xl font-bold">Secure Checkout</h2><p className="text-slate-500 text-xs">Choose provider and payment method.</p></div>
// // // // // // //               <button onClick={() => { setIsGuestModalOpen(false); setCheckoutStep(1); }} className="p-2 hover:bg-slate-200 rounded-full"><X size={20}/></button>
// // // // // // //             </div>

// // // // // // //             <div className="p-8">
// // // // // // //               {checkoutStep === 1 ? (
// // // // // // //                 <div className="space-y-6">
// // // // // // //                   {/* Customer Info */}
// // // // // // //                   <div className="space-y-3">
// // // // // // //                     <label className="text-xs font-bold text-slate-400 uppercase">Customer Details</label>
// // // // // // //                     <div className="relative"><User className="absolute left-3 top-3.5 text-slate-400" size={18} /><input type="text" placeholder="Full Name" className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:border-indigo-500" onChange={e => setGuestInfo({...guestInfo, name: e.target.value})} /></div>
// // // // // // //                     <div className="relative"><Mail className="absolute left-3 top-3.5 text-slate-400" size={18} /><input type="email" placeholder="Email Address" className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:border-indigo-500" onChange={e => setGuestInfo({...guestInfo, email: e.target.value})} /></div>
// // // // // // //                   </div>

// // // // // // //                   {/* Gateway Choice */}
// // // // // // //                   <div className="space-y-3">
// // // // // // //                     <label className="text-xs font-bold text-slate-400 uppercase">1. Select Gateway</label>
// // // // // // //                     <div className="grid grid-cols-2 gap-3">
// // // // // // //                         <button 
// // // // // // //                             onClick={() => setSelectedGateway('STRIPE')}
// // // // // // //                             className={`flex flex-col items-center p-4 border-2 rounded-2xl gap-2 transition-all ${selectedGateway === 'STRIPE' ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-100' : 'border-slate-100'}`}
// // // // // // //                         >
// // // // // // //                             <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-[10px]">ST</div>
// // // // // // //                             <span className="text-[10px] font-bold">STRIPE</span>
// // // // // // //                         </button>
// // // // // // //                         <button 
// // // // // // //                             onClick={() => setSelectedGateway('PAYPAL')}
// // // // // // //                             className={`flex flex-col items-center p-4 border-2 rounded-2xl gap-2 transition-all ${selectedGateway === 'PAYPAL' ? 'border-yellow-500 bg-yellow-50 ring-2 ring-yellow-100' : 'border-slate-100'}`}
// // // // // // //                         >
// // // // // // //                             <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-[10px]">PP</div>
// // // // // // //                             <span className="text-[10px] font-bold">PAYPAL</span>
// // // // // // //                         </button>
// // // // // // //                     </div>
// // // // // // //                   </div>

// // // // // // //                   {/* Method Choice */}
// // // // // // //                   <div className="space-y-3">
// // // // // // //                     <label className="text-xs font-bold text-slate-400 uppercase">2. Select Method</label>
// // // // // // //                     <div className="grid grid-cols-2 gap-3">
// // // // // // //                         <button onClick={() => setSelectedMethod('NOW')} className={`flex flex-col items-center p-4 border-2 rounded-2xl gap-2 transition-all ${selectedMethod === 'NOW' ? 'border-green-600 bg-green-50' : 'border-slate-100'}`}>
// // // // // // //                             <CreditCard size={20} className="text-green-600"/>
// // // // // // //                             <span className="text-[10px] font-bold">PAY NOW (REDIRECT)</span>
// // // // // // //                         </button>
// // // // // // //                         <button onClick={() => setSelectedMethod('EMAIL')} className={`flex flex-col items-center p-4 border-2 rounded-2xl gap-2 transition-all ${selectedMethod === 'EMAIL' ? 'border-blue-600 bg-blue-50' : 'border-slate-100'}`}>
// // // // // // //                             <Mail size={20} className="text-blue-600"/>
// // // // // // //                             <span className="text-[10px] font-bold">SEND PAYMENT LINK</span>
// // // // // // //                         </button>
// // // // // // //                     </div>
// // // // // // //                   </div>

// // // // // // //                   <button 
// // // // // // //                     disabled={!selectedMethod || !guestInfo.email || isProcessing}
// // // // // // //                     onClick={handleFinalCheckout}
// // // // // // //                     className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center gap-2"
// // // // // // //                   >
// // // // // // //                     {isProcessing ? <Loader2 className="animate-spin" size={20}/> : <><CheckCircle size={20}/> Complete Order</>}
// // // // // // //                   </button>
// // // // // // //                 </div>
// // // // // // //               ) : (
// // // // // // //                 <div className="text-center py-6">
// // // // // // //                   <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={40} /></div>
// // // // // // //                   <h3 className="text-2xl font-bold">Link Emailed!</h3>
// // // // // // //                   <p className="text-slate-500 mt-2 px-4">A {selectedGateway} payment link has been sent to <b>{guestInfo.email}</b>.</p>
// // // // // // //                   <button onClick={() => { setIsGuestModalOpen(false); setCheckoutStep(1); setCart([]); }} className="mt-8 bg-indigo-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-indigo-700">Finished</button>
// // // // // // //                 </div>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default OrderCatalog;

// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import axios from 'axios';
// // // // // // import { 
// // // // // //   ShoppingCart, Plus, Minus, Trash2, CreditCard, ArrowRight, 
// // // // // //   Search, Loader2, X, Mail, User, CheckCircle, Phone, Tag
// // // // // // } from 'lucide-react';
// // // // // // const BASE_URL = import.meta.env.VITE_SERVER_URL;

// // // // // // interface Product {
// // // // // //   id: string;
// // // // // //   name: string;
// // // // // //   price: number;
// // // // // //   stock: number;
// // // // // //   type: 'STOCK' | 'CUSTOM';
// // // // // //   customerName?: string;
// // // // // //   orderNumber?: string;
// // // // // // }

// // // // // // interface CartItem extends Product {
// // // // // //   quantity: number;
// // // // // // }

// // // // // // const OrderCatalog: React.FC = () => {
// // // // // //   const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
// // // // // //   const [readyCustomOrders, setReadyCustomOrders] = useState<Product[]>([]);
// // // // // //   const [cart, setCart] = useState<CartItem[]>([]);
// // // // // //   const [searchQuery, setSearchQuery] = useState('');
// // // // // //   const [loading, setLoading] = useState(true);

// // // // // //   // --- Checkout UI States ---
// // // // // //   const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
// // // // // //   const [checkoutStep, setCheckoutStep] = useState(1); // 1: Form, 2: Email Success
// // // // // //   const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '' });
  
// // // // // //   const [selectedGateway, setSelectedGateway] = useState<'STRIPE' | 'PAYPAL'>('STRIPE');
// // // // // //   const [selectedMethod, setSelectedMethod] = useState<'NOW' | 'EMAIL' | ''>('');
// // // // // //   const [isProcessing, setIsProcessing] = useState(false);

// // // // // //   // --- API: Fetch Catalog Data ---
// // // // // //   const fetchCatalogData = async (query: string = '') => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       const token = localStorage.getItem('token'); 

// // // // // //       const response = await axios.get(
// // // // // //         `http://localhost:8080/api/admin/get-order-catelog-data?searchQuery=${query}`, 
// // // // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // // // //       );

// // // // // //       const { catalogProducts, readyCustomOrders } = response.data.data;

// // // // // //       setCatalogProducts(catalogProducts.map((p: any) => ({
// // // // // //         id: p.id, name: p.name, price: parseFloat(p.price), stock: p.stock, type: 'STOCK'
// // // // // //       })));

// // // // // //       setReadyCustomOrders(readyCustomOrders.map((co: any) => ({
// // // // // //         id: co.id, name: co.orderNumber, price: parseFloat(co.totalCost), stock: co.quantity, 
// // // // // //         customerName: co.customerName, type: 'CUSTOM'
// // // // // //       })));

// // // // // //     } catch (err: any) {
// // // // // //       console.error("Fetch error", err);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => { fetchCatalogData(); }, []);

// // // // // //   // --- Auto-fill logic for Custom Orders ---
// // // // // //   useEffect(() => {
// // // // // //     const customItem = cart.find(item => item.type === 'CUSTOM');
// // // // // //     if (customItem && customItem.customerName) {
// // // // // //       setGuestInfo(prev => ({ ...prev, name: customItem.customerName || '' }));
// // // // // //     }
// // // // // //   }, [cart]);

// // // // // //   // --- Cart Actions ---
// // // // // //   const addToCart = (product: Product) => {
// // // // // //     setCart((prev) => {
// // // // // //       const existing = prev.find((item) => item.id === product.id);
// // // // // //       if (existing) {
// // // // // //         return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
// // // // // //       }
// // // // // //       return [...prev, { ...product, quantity: 1 }];
// // // // // //     });
// // // // // //   };

// // // // // //   const updateQuantity = (id: string, delta: number) => {
// // // // // //     setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
// // // // // //   };

// // // // // //   const removeFromCart = (id: string) => {
// // // // // //     setCart(prev => prev.filter(item => item.id !== id));
// // // // // //   };

// // // // // //   const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

// // // // // //   // --- Final Checkout (API Call) ---
// // // // // //   // const handleFinalCheckout = async () => {
// // // // // //   //   if (!guestInfo.email) return alert("Email is required");

// // // // // //   //   try {
// // // // // //   //     setIsProcessing(true);
// // // // // //   //     const token = localStorage.getItem('auth_token');
// // // // // //   //     console.log('tokens',token)
// // // // // //   //     const tenantId = localStorage.getItem('tenantId'); // Managed by logged-in admin

// // // // // //   //     const payload = {
// // // // // //   //       tenantId: tenantId,
// // // // // //   //       items: cart,
// // // // // //   //       customerDetails: guestInfo,
// // // // // //   //       method: selectedMethod,    // 'NOW' or 'EMAIL'
// // // // // //   //       gateway: selectedGateway   // 'STRIPE' or 'PAYPAL'
// // // // // //   //     };

// // // // // //   //     const response = await axios.post(
// // // // // //   //       'http://localhost:8080/api/admin/create-payment', 
// // // // // //   //       payload,
// // // // // //   //       { headers: { Authorization: `Bearer ${token}` } }
// // // // // //   //     );

// // // // // //   //     if (selectedMethod === 'NOW') {
// // // // // //   //       // POS Style: Redirect direct to payment gateway
// // // // // //   //       window.location.href = response.data.url;
// // // // // //   //     } else {
// // // // // //   //       // Email Style: Show success screen
// // // // // //   //       setCheckoutStep(2);
// // // // // //   //     }
// // // // // //   //   } catch (err: any) {
// // // // // //   //     alert("Checkout Failed: " + (err.response?.data?.message || "Error"));
// // // // // //   //   } finally {
// // // // // //   //     setIsProcessing(false);
// // // // // //   //   }
// // // // // //   // };
// // // // // // // --- Final Checkout (API Call) ---
// // // // // //   // const handleFinalCheckout = async () => {
// // // // // //   //   // 1. Basic Validation
// // // // // //   //   if (!guestInfo.email) {
// // // // // //   //     alert("Customer email is required to process the order.");
// // // // // //   //     return;
// // // // // //   //   }

// // // // // //   //   if (!selectedMethod) {
// // // // // //   //     alert("Please select a payment method (Pay Now or Send Link).");
// // // // // //   //     return;
// // // // // //   //   }

// // // // // //   //   try {
// // // // // //   //     setIsProcessing(true);
      
// // // // // //   //     // 2. Token fetch karein (Ensure karein ki login ke waqt aap 'auth_token' hi save kar rahe hain)
// // // // // //   //     const token = localStorage.getItem('auth_token'); 
      
// // // // // //   //     // 3. Payload taiyar karein
// // // // // //   //     // Note: Backend 'req.user.id' se admin/tenant details khud nikal lega
// // // // // //   //     const payload = {
// // // // // //   //       items: cart.map(item => ({
// // // // // //   //         id: item.id,
// // // // // //   //         name: item.name,
// // // // // //   //         price: item.price,
// // // // // //   //         quantity: item.quantity,
// // // // // //   //         type: item.type // 'STOCK' or 'CUSTOM'
// // // // // //   //       })),
// // // // // //   //       customerDetails: {
// // // // // //   //         name: guestInfo.name,
// // // // // //   //         email: guestInfo.email,
// // // // // //   //         phone: guestInfo.phone
// // // // // //   //       },
// // // // // //   //       method: selectedMethod,    // 'NOW' or 'EMAIL'
// // // // // //   //       gateway: selectedGateway   // 'STRIPE' or 'PAYPAL'
// // // // // //   //     };

// // // // // //   //     // 4. Backend API Request
// // // // // //   //     const response = await axios.post(
// // // // // //   //       'http://localhost:8080/api/admin/create-payment', 
// // // // // //   //       payload,
// // // // // //   //       { 
// // // // // //   //         headers: { 
// // // // // //   //           'Authorization': `Bearer ${token}`,
// // // // // //   //           'Content-Type': 'application/json'
// // // // // //   //         } 
// // // // // //   //       }
// // // // // //   //     );

// // // // // //   //     // 5. Response Handle Karein
// // // // // //   //     if (response.data.success) {
// // // // // //   //       if (selectedMethod === 'NOW') {
// // // // // //   //         // Agar 'PAY NOW' hai toh Stripe Checkout ya PayPal Approval URL par redirect karein
// // // // // //   //         if (response.data.url) {
// // // // // //   //           window.location.href = response.data.url;
// // // // // //   //         } else {
// // // // // //   //           alert("Payment URL not received from server.");
// // // // // //   //         }
// // // // // //   //       } else {
// // // // // //   //         // Agar 'EMAIL' method hai toh sirf Step 2 (Success Screen) dikhayein
// // // // // //   //         setCheckoutStep(2);
// // // // // //   //       }
// // // // // //   //     } else {
// // // // // //   //       throw new Error(response.data.message || "Something went wrong");
// // // // // //   //     }

// // // // // //   //   } catch (err: any) {
// // // // // //   //     console.error("Checkout Error:", err);
// // // // // //   //     const errorMessage = err.response?.data?.message || err.message || "Server connection failed";
// // // // // //   //     alert("Checkout Failed: " + errorMessage);
// // // // // //   //   } finally {
// // // // // //   //     setIsProcessing(false);
// // // // // //   //   }
// // // // // //   // };

// // // // // //   const handleFinalCheckout = async () => {
// // // // // //     if (!guestInfo.email) {
// // // // // //       alert("Customer email is required.");
// // // // // //       return;
// // // // // //     }

// // // // // //     try {
// // // // // //       setIsProcessing(true);
// // // // // //       const token = localStorage.getItem('auth_token'); 

// // // // // //       const payload = {
// // // // // //         items: cart,
// // // // // //         customerDetails: guestInfo,
// // // // // //         method: selectedMethod,    
// // // // // //         gateway: selectedGateway  
// // // // // //       };

// // // // // //       const response = await axios.post(
// // // // // //         `${BASE_URL}/api/admin/create-payment`, 
// // // // // //         payload,
// // // // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // // // //       );

// // // // // //       if (response.data.success) {
// // // // // //         if (selectedMethod === 'NOW') {
// // // // // //           window.location.href = response.data.url;
// // // // // //         } else {
// // // // // //           setCheckoutStep(2);
// // // // // //         }
// // // // // //       }
// // // // // //     } catch (err: any) {
// // // // // //       alert("Checkout Failed: " + (err.response?.data?.message || "Error"));
// // // // // //     } finally {
// // // // // //       setIsProcessing(false);
// // // // // //     }
// // // // // //   };
// // // // // //   const resetAll = () => {
// // // // // //     setCart([]);
// // // // // //     setGuestInfo({ name: '', email: '', phone: '' });
// // // // // //     setSelectedMethod('');
// // // // // //     setIsGuestModalOpen(false);
// // // // // //     setCheckoutStep(1);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-slate-50 text-slate-900 p-4 lg:p-10 font-sans">
// // // // // //       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">        
// // // // // //         <div className="lg:col-span-8 space-y-6">
// // // // // //           <header className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
// // // // // //             <div>
// // // // // //               <h1 className="text-2xl font-bold">Order Management</h1>
// // // // // //               <p className="text-slate-500 text-sm">Add items and process guest payments</p>
// // // // // //             </div>
// // // // // //             <div className="relative w-full md:w-72">
// // // // // //               <input 
// // // // // //                 type="text" placeholder="Search..." 
// // // // // //                 className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
// // // // // //                 value={searchQuery}
// // // // // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // // // // //                 onKeyDown={(e) => e.key === 'Enter' && fetchCatalogData(searchQuery)}
// // // // // //               />
// // // // // //               <Search className="absolute left-3 top-3 text-slate-400" size={18} />
// // // // // //             </div>
// // // // // //           </header>

// // // // // //           {loading ? (
// // // // // //             <div className="text-center py-20 text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" /> Loading...</div>
// // // // // //           ) : (
// // // // // //             <>
// // // // // //               <section>
// // // // // //                 <div className="flex items-center gap-2 mb-4">
// // // // // //                   <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
// // // // // //                   <h2 className="font-bold text-lg">Product Catalog</h2>
// // // // // //                 </div>
// // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // //                   {catalogProducts.map(p => (
// // // // // //                     <div key={p.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow flex justify-between items-center group">
// // // // // //                       <div>
// // // // // //                         <p className="font-semibold">{p.name}</p>
// // // // // //                         <p className="text-indigo-600 font-bold">${p.price.toFixed(2)}</p>
// // // // // //                         <p className="text-[10px] text-slate-400">Stock: {p.stock}</p>
// // // // // //                       </div>
// // // // // //                       <button onClick={() => addToCart(p)} className="p-2 bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white rounded-lg transition-colors">
// // // // // //                         <Plus size={20} />
// // // // // //                       </button>
// // // // // //                     </div>
// // // // // //                   ))}
// // // // // //                 </div>
// // // // // //               </section>
// // // // // //               <section>
// // // // // //                 <div className="flex items-center gap-2 mb-4">
// // // // // //                   <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
// // // // // //                   <h2 className="font-bold text-lg">Custom Orders Ready</h2>
// // // // // //                 </div>
// // // // // //                 <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y">
// // // // // //                   {readyCustomOrders.length === 0 ? <p className="p-10 text-center text-slate-400 text-sm">No custom orders ready</p> : 
// // // // // //                     readyCustomOrders.map(co => (
// // // // // //                       <div key={co.id} className="p-4 flex justify-between items-center hover:bg-slate-50">
// // // // // //                         <div className="flex items-center gap-4">
// // // // // //                           <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center font-bold text-xs">CUSTOM</div>
// // // // // //                           <div>
// // // // // //                             <p className="font-semibold text-sm">Order: {co.name}</p>
// // // // // //                             <p className="text-xs text-slate-500">For: {co.customerName}</p>
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                         <div className="flex items-center gap-4">
// // // // // //                           <p className="font-bold text-slate-700">${co.price.toFixed(2)}</p>
// // // // // //                           <button onClick={() => addToCart(co)} className="flex items-center gap-1 text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
// // // // // //                             ADD <Plus size={14} />
// // // // // //                           </button>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                     ))
// // // // // //                   }
// // // // // //                 </div>
// // // // // //               </section>
// // // // // //             </>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         <div className="lg:col-span-4">
// // // // // //           <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-6">
// // // // // //             <div className="flex items-center justify-between mb-6">
// // // // // //               <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingCart className="text-indigo-600" /> Cart</h2>
// // // // // //               <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-full">{cart.length} Items</span>
// // // // // //             </div>
// // // // // //             <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
// // // // // //               {cart.length === 0 ? (
// // // // // //                 <div className="text-center py-10">
// // // // // //                   <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300"><ShoppingCart /></div>
// // // // // //                   <p className="text-slate-400 text-sm">Your cart is empty</p>
// // // // // //                 </div>
// // // // // //               ) : (
// // // // // //                 cart.map(item => (
// // // // // //                   <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center">
// // // // // //                     <div className="min-w-0 flex-1">
// // // // // //                       <p className="text-sm font-bold truncate">{item.name}</p>
// // // // // //                       <p className="text-xs text-indigo-600 font-semibold">${item.price.toFixed(2)}</p>
// // // // // //                     </div>
// // // // // //                     <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-sm">
// // // // // //                       <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-rose-500"><Minus size={14} /></button>
// // // // // //                       <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
// // // // // //                       <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-indigo-600"><Plus size={14} /></button>
// // // // // //                       <button onClick={() => removeFromCart(item.id)} className="ml-2 text-slate-300 hover:text-rose-500 border-l pl-2"><Trash2 size={14} /></button>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 ))
// // // // // //               )}
// // // // // //             </div>

// // // // // //             <div className="border-t pt-4 space-y-3">
// // // // // //               <div className="flex justify-between text-slate-500 text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
// // // // // //               <div className="flex justify-between font-bold text-xl text-slate-800"><span>Total Amount</span><span>${subtotal.toFixed(2)}</span></div>
// // // // // //             </div>

// // // // // //             <button 
// // // // // //               disabled={cart.length === 0}
// // // // // //               onClick={() => setIsGuestModalOpen(true)}
// // // // // //               className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl mt-6 shadow-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:bg-slate-200"
// // // // // //             >
// // // // // //               Checkout <ArrowRight size={18} />
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* --- CHECKOUT MODAL --- */}
// // // // // //       {isGuestModalOpen && (
// // // // // //         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
// // // // // //           <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transition-all">
// // // // // //             <div className="bg-slate-50 p-6 border-b flex justify-between items-center">
// // // // // //               <div>
// // // // // //                 <h2 className="text-xl font-bold">Secure Checkout</h2>
// // // // // //                 <p className="text-slate-500 text-xs">Finalize order details</p>
// // // // // //               </div>
// // // // // //               <button onClick={() => setIsGuestModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full"><X size={20} /></button>
// // // // // //             </div>

// // // // // //             <div className="p-8">
// // // // // //               {checkoutStep === 1 ? (
// // // // // //                 <div className="space-y-6">
// // // // // //                   {/* Customer Info */}
// // // // // //                   <div className="space-y-3">
// // // // // //                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer Details</label>
// // // // // //                     <div className="relative">
// // // // // //                       <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
// // // // // //                       <input 
// // // // // //                         type="text" placeholder="Full Name" 
// // // // // //                         className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:border-indigo-500" 
// // // // // //                         value={guestInfo.name}
// // // // // //                         onChange={e => setGuestInfo({...guestInfo, name: e.target.value})} 
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                     <div className="relative">
// // // // // //                       <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
// // // // // //                       <input 
// // // // // //                         type="email" placeholder="Email Address (Required)" 
// // // // // //                         className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:border-indigo-500" 
// // // // // //                         value={guestInfo.email}
// // // // // //                         onChange={e => setGuestInfo({...guestInfo, email: e.target.value})} 
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   {/* Gateway & Method */}
// // // // // //                   <div className="grid grid-cols-2 gap-4">
// // // // // //                     <div className="space-y-2">
// // // // // //                       <label className="text-[10px] font-bold text-slate-400 uppercase">Provider</label>
// // // // // //                       <button 
// // // // // //                         onClick={() => setSelectedGateway('STRIPE')}
// // // // // //                         className={`w-full py-3 rounded-xl border-2 font-bold text-xs transition-all ${selectedGateway === 'STRIPE' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 text-slate-400'}`}
// // // // // //                       >
// // // // // //                         STRIPE
// // // // // //                       </button>
// // // // // //                       <button 
// // // // // //                         onClick={() => setSelectedGateway('PAYPAL')}
// // // // // //                         className={`w-full py-3 rounded-xl border-2 font-bold text-xs transition-all ${selectedGateway === 'PAYPAL' ? 'border-yellow-500 bg-yellow-50 text-yellow-600' : 'border-slate-100 text-slate-400'}`}
// // // // // //                       >
// // // // // //                         PAYPAL
// // // // // //                       </button>
// // // // // //                     </div>
// // // // // //                     <div className="space-y-2">
// // // // // //                       <label className="text-[10px] font-bold text-slate-400 uppercase">Method</label>
// // // // // //                       <button 
// // // // // //                         onClick={() => setSelectedMethod('NOW')}
// // // // // //                         className={`w-full py-3 rounded-xl border-2 font-bold text-xs transition-all flex flex-col items-center gap-1 ${selectedMethod === 'NOW' ? 'border-green-600 bg-green-50 text-green-600' : 'border-slate-100 text-slate-400'}`}
// // // // // //                       >
// // // // // //                         <CreditCard size={14} /> PAY NOW
// // // // // //                       </button>
// // // // // //                       <button 
// // // // // //                         onClick={() => setSelectedMethod('EMAIL')}
// // // // // //                         className={`w-full py-3 rounded-xl border-2 font-bold text-xs transition-all flex flex-col items-center gap-1 ${selectedMethod === 'EMAIL' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400'}`}
// // // // // //                       >
// // // // // //                         <Mail size={14} /> SEND LINK
// // // // // //                       </button>
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   <button 
// // // // // //                     disabled={!selectedMethod || !guestInfo.email || isProcessing}
// // // // // //                     onClick={handleFinalCheckout}
// // // // // //                     className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center gap-2"
// // // // // //                   >
// // // // // //                     {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <><CheckCircle size={20} /> Complete Order</>}
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               ) : (
// // // // // //                 <div className="text-center py-6">
// // // // // //                   <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
// // // // // //                     <CheckCircle size={40} />
// // // // // //                   </div>
// // // // // //                   <h3 className="text-2xl font-bold">Link Emailed!</h3>
// // // // // //                   <p className="text-slate-500 mt-2 px-4 text-sm">
// // // // // //                     A secure {selectedGateway} payment link has been sent to <b>{guestInfo.email}</b>.
// // // // // //                   </p>
// // // // // //                   <button onClick={resetAll} className="mt-8 bg-indigo-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
// // // // // //                     Start New Order
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default OrderCatalog;


// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';
// // // // // import { 
// // // // //   ShoppingCart, Plus, Minus, Trash2, CreditCard, ArrowRight, 
// // // // //   Search, Loader2, X, Mail, User, CheckCircle, Phone, Tag
// // // // // } from 'lucide-react';

// // // // // const BASE_URL = import.meta.env.VITE_SERVER_URL;

// // // // // interface Product {
// // // // //   id: string;
// // // // //   name: string;
// // // // //   price: number;
// // // // //   stock: number;
// // // // //   type: 'STOCK' | 'CUSTOM';
// // // // //   customerName?: string;
// // // // //   orderNumber?: string;
// // // // // }

// // // // // interface CartItem extends Product {
// // // // //   quantity: number;
// // // // // }

// // // // // const OrderCatalog: React.FC = () => {
// // // // //   const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
// // // // //   const [readyCustomOrders, setReadyCustomOrders] = useState<Product[]>([]);
// // // // //   const [cart, setCart] = useState<CartItem[]>([]);
// // // // //   const [searchQuery, setSearchQuery] = useState('');
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
// // // // //   const [checkoutStep, setCheckoutStep] = useState(1); 
// // // // //   const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '' });
  
// // // // //   const [selectedGateway, setSelectedGateway] = useState<'STRIPE' | 'PAYPAL'>('STRIPE');
// // // // //   const [selectedMethod, setSelectedMethod] = useState<'NOW' | 'EMAIL' | ''>('');
// // // // //   const [isProcessing, setIsProcessing] = useState(false);

// // // // //   // --- API: Fetch Catalog Data (TOKEN ADDED HERE) ---
// // // // //   const fetchCatalogData = async (query: string = '') => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       // Login ke waqt jo token save kiya tha use yahan se nikalenge
// // // // //       const token = localStorage.getItem('auth_token'); 

// // // // //       const response = await axios.get(
// // // // //         `${BASE_URL}/api/admin/get-order-catelog-data?searchQuery=${query}`, 
// // // // //         { 
// // // // //           headers: { 
// // // // //             Authorization: `Bearer ${token}` // Header mein token lagaya
// // // // //           } 
// // // // //         }
// // // // //       );

// // // // //       const { catalogProducts, readyCustomOrders } = response.data.data;

// // // // //       setCatalogProducts(catalogProducts.map((p: any) => ({
// // // // //         id: p.id, name: p.name, price: parseFloat(p.price), stock: p.stock, type: 'STOCK'
// // // // //       })));

// // // // //       setReadyCustomOrders(readyCustomOrders.map((co: any) => ({
// // // // //         id: co.id, name: co.orderNumber, price: parseFloat(co.totalCost), stock: co.quantity, 
// // // // //         customerName: co.customerName, type: 'CUSTOM'
// // // // //       })));

// // // // //     } catch (err: any) {
// // // // //       console.error("Fetch error", err);
// // // // //       if (err.response?.status === 401) {
// // // // //         alert("Session expired. Please login again.");
// // // // //       }
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => { fetchCatalogData(); }, []);

// // // // //   useEffect(() => {
// // // // //     const customItem = cart.find(item => item.type === 'CUSTOM');
// // // // //     if (customItem && customItem.customerName) {
// // // // //       setGuestInfo(prev => ({ ...prev, name: customItem.customerName || '' }));
// // // // //     }
// // // // //   }, [cart]);

// // // // //   const addToCart = (product: Product) => {
// // // // //     setCart((prev) => {
// // // // //       const existing = prev.find((item) => item.id === product.id);
// // // // //       if (existing) {
// // // // //         return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
// // // // //       }
// // // // //       return [...prev, { ...product, quantity: 1 }];
// // // // //     });
// // // // //   };

// // // // //   const updateQuantity = (id: string, delta: number) => {
// // // // //     setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
// // // // //   };

// // // // //   const removeFromCart = (id: string) => {
// // // // //     setCart(prev => prev.filter(item => item.id !== id));
// // // // //   };

// // // // //   const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

// // // // //   // --- Final Checkout (API Call) ---
// // // // //   const handleFinalCheckout = async () => {
// // // // //     if (!guestInfo.email) {
// // // // //       alert("Customer email is required.");
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       setIsProcessing(true);
// // // // //       const token = localStorage.getItem('auth_token'); 

// // // // //       const payload = {
// // // // //         items: cart,
// // // // //         customerDetails: guestInfo,
// // // // //         method: selectedMethod,    
// // // // //         gateway: selectedGateway  
// // // // //       };

// // // // //       const response = await axios.post(
// // // // //         `${BASE_URL}/api/admin/create-payment`, 
// // // // //         payload,
// // // // //         { 
// // // // //           headers: { 
// // // // //             Authorization: `Bearer ${token}` // Token ensure kiya
// // // // //           } 
// // // // //         }
// // // // //       );

// // // // //       if (response.data.success) {
// // // // //         if (selectedMethod === 'NOW') {
// // // // //           window.location.href = response.data.url;
// // // // //         } else {
// // // // //           setCheckoutStep(2);
// // // // //         }
// // // // //       }
// // // // //     } catch (err: any) {
// // // // //       alert("Checkout Failed: " + (err.response?.data?.message || "Error"));
// // // // //     } finally {
// // // // //       setIsProcessing(false);
// // // // //     }
// // // // //   };

// // // // //   const resetAll = () => {
// // // // //     setCart([]);
// // // // //     setGuestInfo({ name: '', email: '', phone: '' });
// // // // //     setSelectedMethod('');
// // // // //     setIsGuestModalOpen(false);
// // // // //     setCheckoutStep(1);
// // // // //   };

// // // // //   return (
// // // // //     // ... UI same rahega ...
// // // // //     <div className="min-h-screen bg-slate-50 text-slate-900 p-4 lg:p-10 font-sans">
// // // // //         {/* Aapka existing JSX yahan aayega */}
// // // // //         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">        
// // // // //         <div className="lg:col-span-8 space-y-6">
// // // // //           <header className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
// // // // //             <div>
// // // // //               <h1 className="text-2xl font-bold">Order Management</h1>
// // // // //               <p className="text-slate-500 text-sm">Add items and process guest payments</p>
// // // // //             </div>
// // // // //             <div className="relative w-full md:w-72">
// // // // //               <input 
// // // // //                 type="text" placeholder="Search..." 
// // // // //                 className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
// // // // //                 value={searchQuery}
// // // // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // // // //                 onKeyDown={(e) => e.key === 'Enter' && fetchCatalogData(searchQuery)}
// // // // //               />
// // // // //               <Search className="absolute left-3 top-3 text-slate-400" size={18} />
// // // // //             </div>
// // // // //           </header>

// // // // //           {loading ? (
// // // // //             <div className="text-center py-20 text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" /> Loading...</div>
// // // // //           ) : (
// // // // //             <>
// // // // //               <section>
// // // // //                 <div className="flex items-center gap-2 mb-4">
// // // // //                   <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
// // // // //                   <h2 className="font-bold text-lg">Product Catalog</h2>
// // // // //                 </div>
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                   {catalogProducts.map(p => (
// // // // //                     <div key={p.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow flex justify-between items-center group">
// // // // //                       <div>
// // // // //                         <p className="font-semibold">{p.name}</p>
// // // // //                         <p className="text-indigo-600 font-bold">${p.price.toFixed(2)}</p>
// // // // //                         <p className="text-[10px] text-slate-400">Stock: {p.stock}</p>
// // // // //                       </div>
// // // // //                       <button onClick={() => addToCart(p)} className="p-2 bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white rounded-lg transition-colors">
// // // // //                         <Plus size={20} />
// // // // //                       </button>
// // // // //                     </div>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </section>
// // // // //               <section>
// // // // //                 <div className="flex items-center gap-2 mb-4">
// // // // //                   <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
// // // // //                   <h2 className="font-bold text-lg">Custom Orders Ready</h2>
// // // // //                 </div>
// // // // //                 <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y">
// // // // //                   {readyCustomOrders.length === 0 ? <p className="p-10 text-center text-slate-400 text-sm">No custom orders ready</p> : 
// // // // //                     readyCustomOrders.map(co => (
// // // // //                       <div key={co.id} className="p-4 flex justify-between items-center hover:bg-slate-50">
// // // // //                         <div className="flex items-center gap-4">
// // // // //                           <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center font-bold text-xs">CUSTOM</div>
// // // // //                           <div>
// // // // //                             <p className="font-semibold text-sm">Order: {co.name}</p>
// // // // //                             <p className="text-xs text-slate-500">For: {co.customerName}</p>
// // // // //                           </div>
// // // // //                         </div>
// // // // //                         <div className="flex items-center gap-4">
// // // // //                           <p className="font-bold text-slate-700">${co.price.toFixed(2)}</p>
// // // // //                           <button onClick={() => addToCart(co)} className="flex items-center gap-1 text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
// // // // //                             ADD <Plus size={14} />
// // // // //                           </button>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     ))
// // // // //                   }
// // // // //                 </div>
// // // // //               </section>
// // // // //             </>
// // // // //           )}
// // // // //         </div>

// // // // //         <div className="lg:col-span-4">
// // // // //           <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-6">
// // // // //             <div className="flex items-center justify-between mb-6">
// // // // //               <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingCart className="text-indigo-600" /> Cart</h2>
// // // // //               <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-full">{cart.length} Items</span>
// // // // //             </div>
// // // // //             <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
// // // // //               {cart.length === 0 ? (
// // // // //                 <div className="text-center py-10">
// // // // //                   <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300"><ShoppingCart /></div>
// // // // //                   <p className="text-slate-400 text-sm">Your cart is empty</p>
// // // // //                 </div>
// // // // //               ) : (
// // // // //                 cart.map(item => (
// // // // //                   <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center">
// // // // //                     <div className="min-w-0 flex-1">
// // // // //                       <p className="text-sm font-bold truncate">{item.name}</p>
// // // // //                       <p className="text-xs text-indigo-600 font-semibold">${item.price.toFixed(2)}</p>
// // // // //                     </div>
// // // // //                     <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-sm">
// // // // //                       <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-rose-500"><Minus size={14} /></button>
// // // // //                       <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
// // // // //                       <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-indigo-600"><Plus size={14} /></button>
// // // // //                       <button onClick={() => removeFromCart(item.id)} className="ml-2 text-slate-300 hover:text-rose-500 border-l pl-2"><Trash2 size={14} /></button>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 ))
// // // // //               )}
// // // // //             </div>

// // // // //             <div className="border-t pt-4 space-y-3">
// // // // //               <div className="flex justify-between text-slate-500 text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
// // // // //               <div className="flex justify-between font-bold text-xl text-slate-800"><span>Total Amount</span><span>${subtotal.toFixed(2)}</span></div>
// // // // //             </div>

// // // // //             <button 
// // // // //               disabled={cart.length === 0}
// // // // //               onClick={() => setIsGuestModalOpen(true)}
// // // // //               className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl mt-6 shadow-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:bg-slate-200"
// // // // //             >
// // // // //               Checkout <ArrowRight size={18} />
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* --- CHECKOUT MODAL --- */}
// // // // //       {isGuestModalOpen && (
// // // // //         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
// // // // //           <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transition-all">
// // // // //             <div className="bg-slate-50 p-6 border-b flex justify-between items-center">
// // // // //               <div>
// // // // //                 <h2 className="text-xl font-bold">Secure Checkout</h2>
// // // // //                 <p className="text-slate-500 text-xs">Finalize order details</p>
// // // // //               </div>
// // // // //               <button onClick={() => setIsGuestModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full"><X size={20} /></button>
// // // // //             </div>

// // // // //             <div className="p-8">
// // // // //               {checkoutStep === 1 ? (
// // // // //                 <div className="space-y-6">
// // // // //                   {/* Customer Info */}
// // // // //                   <div className="space-y-3">
// // // // //                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer Details</label>
// // // // //                     <div className="relative">
// // // // //                       <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
// // // // //                       <input 
// // // // //                         type="text" placeholder="Full Name" 
// // // // //                         className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:border-indigo-500" 
// // // // //                         value={guestInfo.name}
// // // // //                         onChange={e => setGuestInfo({...guestInfo, name: e.target.value})} 
// // // // //                       />
// // // // //                     </div>
// // // // //                     <div className="relative">
// // // // //                       <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
// // // // //                       <input 
// // // // //                         type="email" placeholder="Email Address (Required)" 
// // // // //                         className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:border-indigo-500" 
// // // // //                         value={guestInfo.email}
// // // // //                         onChange={e => setGuestInfo({...guestInfo, email: e.target.value})} 
// // // // //                       />
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   {/* Gateway & Method */}
// // // // //                   <div className="grid grid-cols-2 gap-4">
// // // // //                     <div className="space-y-2">
// // // // //                       <label className="text-[10px] font-bold text-slate-400 uppercase">Provider</label>
// // // // //                       <button 
// // // // //                         onClick={() => setSelectedGateway('STRIPE')}
// // // // //                         className={`w-full py-3 rounded-xl border-2 font-bold text-xs transition-all ${selectedGateway === 'STRIPE' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 text-slate-400'}`}
// // // // //                       >
// // // // //                         STRIPE
// // // // //                       </button>
// // // // //                       <button 
// // // // //                         onClick={() => setSelectedGateway('PAYPAL')}
// // // // //                         className={`w-full py-3 rounded-xl border-2 font-bold text-xs transition-all ${selectedGateway === 'PAYPAL' ? 'border-yellow-500 bg-yellow-50 text-yellow-600' : 'border-slate-100 text-slate-400'}`}
// // // // //                       >
// // // // //                         PAYPAL
// // // // //                       </button>
// // // // //                     </div>
// // // // //                     <div className="space-y-2">
// // // // //                       <label className="text-[10px] font-bold text-slate-400 uppercase">Method</label>
// // // // //                       <button 
// // // // //                         onClick={() => setSelectedMethod('NOW')}
// // // // //                         className={`w-full py-3 rounded-xl border-2 font-bold text-xs transition-all flex flex-col items-center gap-1 ${selectedMethod === 'NOW' ? 'border-green-600 bg-green-50 text-green-600' : 'border-slate-100 text-slate-400'}`}
// // // // //                       >
// // // // //                         <CreditCard size={14} /> PAY NOW
// // // // //                       </button>
// // // // //                       <button 
// // // // //                         onClick={() => setSelectedMethod('EMAIL')}
// // // // //                         className={`w-full py-3 rounded-xl border-2 font-bold text-xs transition-all flex flex-col items-center gap-1 ${selectedMethod === 'EMAIL' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400'}`}
// // // // //                       >
// // // // //                         <Mail size={14} /> SEND LINK
// // // // //                       </button>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   <button 
// // // // //                     disabled={!selectedMethod || !guestInfo.email || isProcessing}
// // // // //                     onClick={handleFinalCheckout}
// // // // //                     className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center gap-2"
// // // // //                   >
// // // // //                     {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <><CheckCircle size={20} /> Complete Order</>}
// // // // //                   </button>
// // // // //                 </div>
// // // // //               ) : (
// // // // //                 <div className="text-center py-6">
// // // // //                   <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
// // // // //                     <CheckCircle size={40} />
// // // // //                   </div>
// // // // //                   <h3 className="text-2xl font-bold">Link Emailed!</h3>
// // // // //                   <p className="text-slate-500 mt-2 px-4 text-sm">
// // // // //                     A secure {selectedGateway} payment link has been sent to <b>{guestInfo.email}</b>.
// // // // //                   </p>
// // // // //                   <button onClick={resetAll} className="mt-8 bg-indigo-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
// // // // //                     Start New Order
// // // // //                   </button>
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default OrderCatalog;


// // // // import React, { useState, useEffect } from 'react';
// // // // import axios from 'axios';
// // // // import { 
// // // //   ShoppingCart, Plus, Minus, Trash2, CreditCard, ArrowRight, 
// // // //   Search, Loader2, X, Mail, User, CheckCircle, Phone, Tag
// // // // } from 'lucide-react';

// // // // const BASE_URL = import.meta.env.VITE_SERVER_URL;

// // // // interface Product {
// // // //   id: string;
// // // //   name: string;
// // // //   price: number;
// // // //   stock: number;
// // // //   type: 'STOCK' | 'CUSTOM';
// // // //   customerName?: string;
// // // //   customerEmail?: string; // Backend se jo aa raha hai
// // // //   orderNumber?: string;
// // // // }

// // // // interface CartItem extends Product {
// // // //   quantity: number;
// // // // }

// // // // const OrderCatalog: React.FC = () => {
// // // //   const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
// // // //   const [readyCustomOrders, setReadyCustomOrders] = useState<Product[]>([]);
// // // //   const [cart, setCart] = useState<CartItem[]>([]);
// // // //   const [searchQuery, setSearchQuery] = useState('');
// // // //   const [loading, setLoading] = useState(true);

// // // //   // --- Checkout UI States ---
// // // //   const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
// // // //   const [checkoutStep, setCheckoutStep] = useState(1); 
// // // //   const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '' });
  
// // // //   const [selectedGateway, setSelectedGateway] = useState<'STRIPE' | 'PAYPAL'>('STRIPE');
// // // //   const [selectedMethod, setSelectedMethod] = useState<'NOW' | 'EMAIL' | ''>('');
// // // //   const [isProcessing, setIsProcessing] = useState(false);

// // // //   // --- API: Fetch Catalog Data ---
// // // //   const fetchCatalogData = async (query: string = '') => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const token = localStorage.getItem('auth_token'); 

// // // //       const response = await axios.get(
// // // //         `${BASE_URL}/api/admin/get-order-catelog-data?searchQuery=${query}`, 
// // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // //       );

// // // //       const { catalogProducts, readyCustomOrders, settings } = response.data.data;

// // // //       setCatalogProducts(catalogProducts.map((p: any) => ({
// // // //         id: p.id, name: p.name, price: parseFloat(p.price), stock: 10, type: 'STOCK',
// // // //         customerName: p.customerName, customerEmail: p.customerEmail
// // // //       })));

// // // //       setReadyCustomOrders(readyCustomOrders.map((co: any) => ({
// // // //         id: co.id, name: `Order: ${co.orderNumber}`, price: parseFloat(co.totalCost), stock: 1, 
// // // //         customerName: co.customerName, customerEmail: co.customerEmail, type: 'CUSTOM'
// // // //       })));

// // // //       // Set active gateway from tenant settings
// // // //       if (settings?.activeGateway) {
// // // //         setSelectedGateway(settings.activeGateway);
// // // //       }

// // // //     } catch (err: any) {
// // // //       console.error("Fetch error", err);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => { fetchCatalogData(); }, []);

// // // //   // --- Cart Actions with AUTO-FILL ---
// // // //   const addToCart = (product: Product) => {
// // // //     // Client Requirement: Auto-fill customer info if available
// // // //     if (product.customerName || product.customerEmail) {
// // // //         setGuestInfo(prev => ({
// // // //             ...prev,
// // // //             name: product.customerName || prev.name,
// // // //             email: product.customerEmail || prev.email
// // // //         }));
// // // //     }

// // // //     setCart((prev) => {
// // // //       const existing = prev.find((item) => item.id === product.id);
// // // //       if (existing) {
// // // //         return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
// // // //       }
// // // //       return [...prev, { ...product, quantity: 1 }];
// // // //     });
// // // //   };

// // // //   const updateQuantity = (id: string, delta: number) => {
// // // //     setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
// // // //   };

// // // //   const removeFromCart = (id: string) => {
// // // //     setCart(prev => prev.filter(item => item.id !== id));
// // // //   };

// // // //   const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

// // // //   // --- Final Checkout (API Call) ---
// // // //   const handleFinalCheckout = async () => {
// // // //     const hasCustomOrder = cart.some(item => item.type === 'CUSTOM');

// // // //     // 1. Validation Logic
// // // //     if (hasCustomOrder && !guestInfo.name.trim()) {
// // // //         alert("Customer Name is REQUIRED for Custom Orders.");
// // // //         return;
// // // //     }

// // // //     if (!guestInfo.email) {
// // // //       alert("Customer email is required.");
// // // //       return;
// // // //     }

// // // //     if (!selectedMethod) {
// // // //         alert("Please select a Payment Method.");
// // // //         return;
// // // //     }

// // // //     try {
// // // //       setIsProcessing(true);
// // // //       const token = localStorage.getItem('auth_token'); 

// // // //       const payload = {
// // // //         items: cart,
// // // //         customerDetails: guestInfo,
// // // //         method: selectedMethod,    
// // // //         gateway: selectedGateway  
// // // //       };

// // // //       const response = await axios.post(
// // // //         `${BASE_URL}/api/admin/create-payment`, 
// // // //         payload,
// // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // //       );

// // // //       if (response.data.success) {
// // // //         if (selectedMethod === 'NOW') {
// // // //           window.location.href = response.data.url;
// // // //         } else {
// // // //           setCheckoutStep(2);
// // // //         }
// // // //       }
// // // //     } catch (err: any) {
// // // //       alert("Checkout Failed: " + (err.response?.data?.message || "Error"));
// // // //     } finally {
// // // //       setIsProcessing(false);
// // // //     }
// // // //   };

// // // //   const resetAll = () => {
// // // //     setCart([]);
// // // //     setGuestInfo({ name: '', email: '', phone: '' });
// // // //     setSelectedMethod('');
// // // //     setIsGuestModalOpen(false);
// // // //     setCheckoutStep(1);
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-slate-50 text-slate-900 p-4 lg:p-10 font-sans">
// // // //       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">        
        
// // // //         {/* LEFT: Order List */}
// // // //         <div className="lg:col-span-8 space-y-6">
// // // //           <header className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
// // // //             <div>
// // // //               <h1 className="text-2xl font-bold">Order Management</h1>
// // // //               <p className="text-slate-500 text-sm">Select orders from catalog to process payment</p>
// // // //             </div>
// // // //             <div className="relative w-full md:w-72">
// // // //               <input 
// // // //                 type="text" placeholder="Search orders..." 
// // // //                 className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
// // // //                 value={searchQuery}
// // // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // // //                 onKeyDown={(e) => e.key === 'Enter' && fetchCatalogData(searchQuery)}
// // // //               />
// // // //               <Search className="absolute left-3 top-3 text-slate-400" size={18} />
// // // //             </div>
// // // //           </header>

// // // //           {loading ? (
// // // //             <div className="text-center py-20 text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" /> Loading...</div>
// // // //           ) : (
// // // //             <>
// // // //               <section>
// // // //                 <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Tag size={18} className="text-indigo-600"/> Stock Orders</h2>
// // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                   {catalogProducts.map(p => (
// // // //                     <div key={p.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow flex justify-between items-center group">
// // // //                       <div>
// // // //                         <p className="font-semibold">{p.name}</p>
// // // //                         <p className="text-indigo-600 font-bold">${p.price.toFixed(2)}</p>
// // // //                         <p className="text-[10px] text-slate-400">For: {p.customerName}</p>
// // // //                       </div>
// // // //                       <button onClick={() => addToCart(p)} className="p-2 bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white rounded-lg transition-colors">
// // // //                         <Plus size={20} />
// // // //                       </button>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               </section>

// // // //               <section>
// // // //                 <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><CreditCard size={18} className="text-amber-500"/> Custom Orders</h2>
// // // //                 <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y">
// // // //                   {readyCustomOrders.length === 0 ? <p className="p-10 text-center text-slate-400 text-sm">No custom orders found</p> : 
// // // //                     readyCustomOrders.map(co => (
// // // //                       <div key={co.id} className="p-4 flex justify-between items-center hover:bg-slate-50">
// // // //                         <div className="flex items-center gap-4">
// // // //                           <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center font-bold text-xs">C</div>
// // // //                           <div>
// // // //                             <p className="font-semibold text-sm">{co.name}</p>
// // // //                             <p className="text-xs text-slate-500">For: {co.customerName}</p>
// // // //                           </div>
// // // //                         </div>
// // // //                         <div className="flex items-center gap-4">
// // // //                           <p className="font-bold text-slate-700">${co.price.toFixed(2)}</p>
// // // //                           <button onClick={() => addToCart(co)} className="flex items-center gap-1 text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
// // // //                             ADD <Plus size={14} />
// // // //                           </button>
// // // //                         </div>
// // // //                       </div>
// // // //                     ))
// // // //                   }
// // // //                 </div>
// // // //               </section>
// // // //             </>
// // // //           )}
// // // //         </div>

// // // //         {/* RIGHT: Cart Summary */}
// // // //         <div className="lg:col-span-4">
// // // //           <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-6">
// // // //             <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><ShoppingCart className="text-indigo-600" /> Cart</h2>
            
// // // //             <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto">
// // // //               {cart.length === 0 ? (
// // // //                 <p className="text-slate-400 text-center py-10 text-sm">Cart is empty</p>
// // // //               ) : (
// // // //                 cart.map(item => (
// // // //                   <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center">
// // // //                     <div className="min-w-0 flex-1">
// // // //                       <p className="text-xs font-bold truncate">{item.name}</p>
// // // //                       <p className="text-xs text-indigo-600 font-semibold">${item.price.toFixed(2)}</p>
// // // //                     </div>
// // // //                     <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-sm">
// // // //                       <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-rose-500"><Minus size={14} /></button>
// // // //                       <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
// // // //                       <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-indigo-600"><Plus size={14} /></button>
// // // //                       <button onClick={() => removeFromCart(item.id)} className="ml-2 text-slate-300 hover:text-rose-500 border-l pl-2"><Trash2 size={14} /></button>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))
// // // //               )}
// // // //             </div>

// // // //             <div className="border-t pt-4">
// // // //               <div className="flex justify-between font-bold text-xl"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
// // // //             </div>

// // // //             <button 
// // // //               disabled={cart.length === 0}
// // // //               onClick={() => setIsGuestModalOpen(true)}
// // // //               className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl mt-6 shadow-lg flex items-center justify-center gap-2 hover:bg-slate-800 disabled:bg-slate-200"
// // // //             >
// // // //               Confirm & Checkout <ArrowRight size={18} />
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* --- CHECKOUT MODAL --- */}
// // // //       {isGuestModalOpen && (
// // // //         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
// // // //           <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
// // // //             <div className="bg-slate-50 p-6 border-b flex justify-between items-center">
// // // //               <h2 className="text-xl font-bold">Secure Checkout</h2>
// // // //               <button onClick={() => setIsGuestModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full"><X size={20} /></button>
// // // //             </div>

// // // //             <div className="p-8">
// // // //               {checkoutStep === 1 ? (
// // // //                 <div className="space-y-6">
// // // //                   {/* Customer Info */}
// // // //                   <div className="space-y-3">
// // // //                     <label className="text-[10px] font-bold text-slate-400 uppercase">
// // // //                         Customer Details {cart.some(i => i.type === 'CUSTOM') ? '(Name Required)' : '(Name Optional)'}
// // // //                     </label>
// // // //                     <div className="relative">
// // // //                       <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
// // // //                       <input 
// // // //                         type="text" placeholder="Full Name" 
// // // //                         className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
// // // //                         value={guestInfo.name}
// // // //                         onChange={e => setGuestInfo({...guestInfo, name: e.target.value})} 
// // // //                       />
// // // //                     </div>
// // // //                     <div className="relative">
// // // //                       <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
// // // //                       <input 
// // // //                         type="email" placeholder="Email Address (Required)" 
// // // //                         className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
// // // //                         value={guestInfo.email}
// // // //                         onChange={e => setGuestInfo({...guestInfo, email: e.target.value})} 
// // // //                       />
// // // //                     </div>
// // // //                   </div>

// // // //                   {/* Provider & Method */}
// // // //                   <div className="grid grid-cols-2 gap-4">
// // // //                     <div className="space-y-2">
// // // //                       <label className="text-[10px] font-bold text-slate-400 uppercase">Gateway</label>
// // // //                       <div className="flex bg-slate-100 p-1 rounded-xl">
// // // //                         <button 
// // // //                             className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${selectedGateway === 'STRIPE' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
// // // //                             onClick={() => setSelectedGateway('STRIPE')}
// // // //                         >STRIPE</button>
// // // //                         <button 
// // // //                             className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${selectedGateway === 'PAYPAL' ? 'bg-white shadow-sm text-yellow-600' : 'text-slate-400'}`}
// // // //                             onClick={() => setSelectedGateway('PAYPAL')}
// // // //                         >PAYPAL</button>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="space-y-2">
// // // //                       <label className="text-[10px] font-bold text-slate-400 uppercase">Method</label>
// // // //                       <button 
// // // //                         onClick={() => setSelectedMethod('NOW')}
// // // //                         className={`w-full py-2 rounded-lg border-2 font-bold text-[10px] flex items-center justify-center gap-1 transition-all ${selectedMethod === 'NOW' ? 'border-green-600 bg-green-50 text-green-600' : 'border-slate-100 text-slate-400'}`}
// // // //                       >
// // // //                         <CreditCard size={12} /> PAY NOW
// // // //                       </button>
// // // //                       <button 
// // // //                         onClick={() => setSelectedMethod('EMAIL')}
// // // //                         className={`w-full py-2 rounded-lg border-2 font-bold text-[10px] flex items-center justify-center gap-1 transition-all ${selectedMethod === 'EMAIL' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400'}`}
// // // //                       >
// // // //                         <Mail size={12} /> SEND LINK
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>

// // // //                   <button 
// // // //                     disabled={!selectedMethod || !guestInfo.email || isProcessing}
// // // //                     onClick={handleFinalCheckout}
// // // //                     className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100"
// // // //                   >
// // // //                     {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <><CheckCircle size={20} /> Process Order</>}
// // // //                   </button>
// // // //                 </div>
// // // //               ) : (
// // // //                 <div className="text-center py-6">
// // // //                   <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={40} /></div>
// // // //                   <h3 className="text-2xl font-bold">Link Emailed!</h3>
// // // //                   <p className="text-slate-500 mt-2 px-4 text-sm">Payment link has been sent to <b>{guestInfo.email}</b> via {selectedGateway}.</p>
// // // //                   <button onClick={resetAll} className="mt-8 bg-indigo-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-indigo-700">Finished</button>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default OrderCatalog;



// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { 
// // //   ShoppingCart, Plus, Minus, Trash2, CreditCard, ArrowRight, 
// // //   Search, Loader2, X, Mail, User, CheckCircle, Phone, Tag, Package
// // // } from 'lucide-react';

// // // const BASE_URL = import.meta.env.VITE_SERVER_URL;

// // // // --- Types ---
// // // interface Product {
// // //   id: string;
// // //   name: string;
// // //   description?: string;
// // //   price: number;
// // //   stock: number;
// // //   type: 'STOCK' | 'CUSTOM';
// // //   customerName?: string;
// // //   customerEmail?: string;
// // //   orderNumber?: string;
// // // }

// // // interface CartItem extends Product {
// // //   quantity: number;
// // // }

// // // const OrderCatalog: React.FC = () => {
// // //   // --- States ---
// // //   const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
// // //   const [readyCustomOrders, setReadyCustomOrders] = useState<Product[]>([]);
// // //   const [cart, setCart] = useState<CartItem[]>([]);
// // //   const [searchQuery, setSearchQuery] = useState('');
// // //   const [loading, setLoading] = useState(true);

// // //   // --- Checkout UI States ---
// // //   const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
// // //   const [checkoutStep, setCheckoutStep] = useState(1); // 1: Form, 2: Email Success
// // //   const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '' });
  
// // //   const [selectedGateway, setSelectedGateway] = useState<'STRIPE' | 'PAYPAL'>('STRIPE');
// // //   const [selectedMethod, setSelectedMethod] = useState<'NOW' | 'EMAIL' | ''>('');
// // //   const [isProcessing, setIsProcessing] = useState(false);

// // //   // --- API: Fetch Catalog Data ---
// // //   const fetchCatalogData = async (query: string = '') => {
// // //     try {
// // //       setLoading(true);
// // //       const token = localStorage.getItem('auth_token'); 

// // //       const response = await axios.get(
// // //         `${BASE_URL}/api/admin/get-order-catelog-data?searchQuery=${query}`, 
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );

// // //       const { catalogProducts, readyCustomOrders, settings } = response.data.data;

// // //       setCatalogProducts(catalogProducts.map((p: any) => ({
// // //         id: p.id, name: p.name, description: p.description, price: parseFloat(p.price), stock: 10, type: 'STOCK',
// // //         customerName: p.customerName, customerEmail: p.customerEmail
// // //       })));

// // //       setReadyCustomOrders(readyCustomOrders.map((co: any) => ({
// // //         id: co.id, name: `Order: ${co.orderNumber}`, description: co.description || `Custom order for ${co.customerName}`, 
// // //         price: parseFloat(co.totalCost), stock: 1, customerName: co.customerName, customerEmail: co.customerEmail, type: 'CUSTOM'
// // //       })));

// // //       if (settings?.activeGateway) {
// // //         setSelectedGateway(settings.activeGateway);
// // //       }

// // //     } catch (err: any) {
// // //       console.error("Fetch error", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => { fetchCatalogData(); }, []);

// // //   // --- Cart Actions with Auto-Fill ---
// // //   const addToCart = (product: Product) => {
// // //     // Agar catalog mein info hai toh auto-fill karein, warna empty rehne dein (Guest entry ke liye)
// // //     if (product.customerName || product.customerEmail) {
// // //         setGuestInfo(prev => ({
// // //             ...prev,
// // //             name: product.customerName || prev.name,
// // //             email: product.customerEmail || prev.email
// // //         }));
// // //     }

// // //     setCart((prev) => {
// // //       const existing = prev.find((item) => item.id === product.id);
// // //       if (existing) {
// // //         return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
// // //       }
// // //       return [...prev, { ...product, quantity: 1 }];
// // //     });
// // //   };

// // //   const updateQuantity = (id: string, delta: number) => {
// // //     setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
// // //   };

// // //   const removeFromCart = (id: string) => {
// // //     setCart(prev => prev.filter(item => item.id !== id));
// // //   };

// // //   const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

// // //   // --- Final Checkout (API Call) ---
// // //   const handleFinalCheckout = async () => {
// // //     const hasCustomOrder = cart.some(item => item.type === 'CUSTOM');

// // //     // 1. Validation Logic
// // //     if (hasCustomOrder && !guestInfo.name.trim()) {
// // //         alert("Customer Name is REQUIRED for Custom Orders.");
// // //         return;
// // //     }

// // //     if (!guestInfo.email) {
// // //       alert("Email is required for processing payment.");
// // //       return;
// // //     }

// // //     if (!selectedMethod) {
// // //         alert("Please select a Method (Pay Now or Send Link).");
// // //         return;
// // //     }

// // //     try {
// // //       setIsProcessing(true);
// // //       const token = localStorage.getItem('auth_token'); 

// // //       const payload = {
// // //         items: cart,
// // //         customerDetails: {
// // //             name: guestInfo.name || "Guest Customer",
// // //             email: guestInfo.email,
// // //             phone: guestInfo.phone
// // //         },
// // //         method: selectedMethod,    
// // //         gateway: selectedGateway  
// // //       };

// // //       const response = await axios.post(
// // //         `${BASE_URL}/api/admin/create-payment`, 
// // //         payload,
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );

// // //       if (response.data.success) {
// // //         if (selectedMethod === 'NOW') {
// // //           window.location.href = response.data.url;
// // //         } else {
// // //           setCheckoutStep(2);
// // //         }
// // //       }
// // //     } catch (err: any) {
// // //       alert("Checkout Failed: " + (err.response?.data?.message || "Error"));
// // //     } finally {
// // //       setIsProcessing(false);
// // //     }
// // //   };

// // //   const resetAll = () => {
// // //     setCart([]);
// // //     setGuestInfo({ name: '', email: '', phone: '' });
// // //     setSelectedMethod('');
// // //     setIsGuestModalOpen(false);
// // //     setCheckoutStep(1);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-[#0a1128] text-white p-4 lg:p-10 font-sans">
// // //       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">        
        
// // //         {/* LEFT: Products Area */}
// // //         <div className="lg:col-span-8 space-y-6">
// // //           <header className="bg-[#0d1b3e] p-6 rounded-2xl shadow-sm border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
// // //             <div>
// // //               <h1 className="text-2xl font-bold text-amber-400">Order Management</h1>
// // //               <p className="text-slate-400 text-sm">Select items and process payments</p>
// // //             </div>
// // //             <div className="relative w-full md:w-72">
// // //               <input 
// // //                 type="text" placeholder="Search orders..." 
// // //                 className="w-full pl-10 pr-4 py-2.5 bg-[#1a2a4a] border-none rounded-xl outline-none focus:ring-2 focus:ring-amber-500 text-white"
// // //                 value={searchQuery}
// // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // //                 onKeyDown={(e) => e.key === 'Enter' && fetchCatalogData(searchQuery)}
// // //               />
// // //               <Search className="absolute left-3 top-3 text-slate-500" size={18} />
// // //             </div>
// // //           </header>

// // //           {loading ? (
// // //             <div className="text-center py-20 text-slate-500"><Loader2 className="animate-spin mx-auto mb-2" /> Loading...</div>
// // //           ) : (
// // //             <>
// // //               {/* Stock Orders Section */}
// // //               <section>
// // //                 <div className="flex items-center gap-2 mb-4">
// // //                    <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
// // //                    <h2 className="font-bold text-lg text-slate-200">Stock Products</h2>
// // //                 </div>
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                   {catalogProducts.map(p => (
// // //                     <div key={p.id} className="bg-[#0d1b3e] p-4 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-all flex justify-between items-center group">
// // //                       <div className="flex-1 pr-4">
// // //                         <p className="font-semibold text-slate-100">{p.name}</p>
// // //                         <p className="text-xs text-slate-500 line-clamp-1 mb-1">{p.description || 'No description'}</p>
// // //                         <p className="text-amber-400 font-bold text-sm">${p.price.toFixed(2)}</p>
// // //                       </div>
// // //                       <button onClick={() => addToCart(p)} className="p-2 bg-[#1a2a4a] group-hover:bg-amber-400 group-hover:text-black rounded-lg transition-colors">
// // //                         <Plus size={20} />
// // //                       </button>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </section>

// // //               {/* Custom Orders Section */}
// // //               <section>
// // //                 <div className="flex items-center gap-2 mb-4">
// // //                    <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
// // //                    <h2 className="font-bold text-lg text-slate-200">Ready Custom Orders</h2>
// // //                 </div>
// // //                 <div className="bg-[#0d1b3e] rounded-xl border border-slate-800 overflow-hidden divide-y divide-slate-800">
// // //                   {readyCustomOrders.length === 0 ? <p className="p-10 text-center text-slate-500 text-sm">No custom orders found</p> : 
// // //                     readyCustomOrders.map(co => (
// // //                       <div key={co.id} className="p-4 flex justify-between items-center hover:bg-[#11224d] transition-colors">
// // //                         <div className="flex items-center gap-4 flex-1">
// // //                           <div className="w-10 h-10 bg-amber-400/10 text-amber-400 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border border-amber-400/20">C</div>
// // //                           <div className="flex-1">
// // //                             <p className="font-semibold text-sm text-slate-100">{co.name}</p>
// // //                             <p className="text-xs text-slate-500">{co.description}</p>
// // //                           </div>
// // //                         </div>
// // //                         <div className="flex items-center gap-4">
// // //                           <p className="font-bold text-amber-400">${co.price.toFixed(2)}</p>
// // //                           <button onClick={() => addToCart(co)} className="flex items-center gap-1 text-xs font-bold bg-amber-400 text-black px-3 py-2 rounded-lg hover:bg-amber-500 transition-all">
// // //                             ADD <Plus size={14} />
// // //                           </button>
// // //                         </div>
// // //                       </div>
// // //                     ))
// // //                   }
// // //                 </div>
// // //               </section>
// // //             </>
// // //           )}
// // //         </div>

// // //         {/* RIGHT: Cart Summary */}
// // //         <div className="lg:col-span-4">
// // //           <div className="bg-[#0d1b3e] rounded-2xl shadow-xl border border-slate-800 p-6 sticky top-6">
// // //             <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-amber-400"><ShoppingCart /> Order Summary</h2>
            
// // //             <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto custom-scrollbar">
// // //               {cart.length === 0 ? (
// // //                 <p className="text-slate-500 text-center py-10 text-sm italic">Your cart is empty</p>
// // //               ) : (
// // //                 cart.map(item => (
// // //                   <div key={item.id} className="bg-[#1a2a4a] p-3 rounded-xl border border-slate-700/50 flex justify-between items-center">
// // //                     <div className="min-w-0 flex-1">
// // //                       <p className="text-xs font-bold truncate text-slate-100">{item.name}</p>
// // //                       <p className="text-amber-400 text-xs font-semibold">${item.price.toFixed(2)}</p>
// // //                     </div>
// // //                     <div className="flex items-center gap-2 bg-[#0d1b3e] p-1 rounded-lg border border-slate-700">
// // //                       <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-rose-500"><Minus size={14} /></button>
// // //                       <span className="w-6 text-center text-xs font-bold text-amber-400">{item.quantity}</span>
// // //                       <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-green-500"><Plus size={14} /></button>
// // //                       <button onClick={() => removeFromCart(item.id)} className="ml-2 text-slate-500 hover:text-rose-500 border-l border-slate-700 pl-2"><Trash2 size={14} /></button>
// // //                     </div>
// // //                   </div>
// // //                 ))
// // //               )}
// // //             </div>

// // //             <div className="border-t border-slate-800 pt-4">
// // //               <div className="flex justify-between font-bold text-xl text-slate-100">
// // //                   <span>Total</span>
// // //                   <span className="text-amber-400">${subtotal.toFixed(2)}</span>
// // //               </div>
// // //             </div>

// // //             <button 
// // //               disabled={cart.length === 0}
// // //               onClick={() => setIsGuestModalOpen(true)}
// // //               className="w-full bg-amber-400 text-black font-black py-4 rounded-xl mt-6 shadow-lg shadow-amber-400/10 flex items-center justify-center gap-2 hover:bg-amber-500 transition-all disabled:opacity-50 disabled:grayscale"
// // //             >
// // //               CONFIRM ORDER <ArrowRight size={18} />
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* --- CHECKOUT MODAL --- */}
// // //       {isGuestModalOpen && (
// // //         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
// // //           <div className="bg-[#0d1b3e] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-800">
// // //             <div className="bg-[#1a2a4a] p-6 border-b border-slate-800 flex justify-between items-center">
// // //               <h2 className="text-xl font-bold text-amber-400">Secure Checkout</h2>
// // //               <button onClick={() => setIsGuestModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-full"><X size={20} /></button>
// // //             </div>

// // //             <div className="p-8">
// // //               {checkoutStep === 1 ? (
// // //                 <div className="space-y-6">
// // //                   {/* Guest Info Section */}
// // //                   <div className="space-y-3">
// // //                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
// // //                         {cart.some(i => i.type === 'CUSTOM') ? 'Customer Name (Required)' : 'Customer Name (Optional for Guest)'}
// // //                     </label>
// // //                     <div className="relative">
// // //                       <User className="absolute left-3 top-3.5 text-slate-500" size={18} />
// // //                       <input 
// // //                         type="text" placeholder="Enter Name" 
// // //                         className="w-full pl-10 pr-4 py-3 bg-[#1a2a4a] border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 text-white" 
// // //                         value={guestInfo.name}
// // //                         onChange={e => setGuestInfo({...guestInfo, name: e.target.value})} 
// // //                       />
// // //                     </div>
// // //                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guest Email (Required)</label>
// // //                     <div className="relative">
// // //                       <Mail className="absolute left-3 top-3.5 text-slate-500" size={18} />
// // //                       <input 
// // //                         type="email" placeholder="Enter Email" 
// // //                         className="w-full pl-10 pr-4 py-3 bg-[#1a2a4a] border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 text-white" 
// // //                         value={guestInfo.email}
// // //                         onChange={e => setGuestInfo({...guestInfo, email: e.target.value})} 
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* Provider & Method Selection */}
// // //                   <div className="grid grid-cols-2 gap-4">
// // //                     <div className="space-y-2">
// // //                       <label className="text-[10px] font-bold text-slate-400 uppercase">Provider</label>
// // //                       <div className="flex bg-[#1a2a4a] p-1 rounded-xl border border-slate-700">
// // //                         <button 
// // //                             className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${selectedGateway === 'STRIPE' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'}`}
// // //                             onClick={() => setSelectedGateway('STRIPE')}
// // //                         >STRIPE</button>
// // //                         <button 
// // //                             className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${selectedGateway === 'PAYPAL' ? 'bg-yellow-500 text-black shadow-lg' : 'text-slate-500'}`}
// // //                             onClick={() => setSelectedGateway('PAYPAL')}
// // //                         >PAYPAL</button>
// // //                       </div>
// // //                     </div>
// // //                     <div className="space-y-2">
// // //                       <label className="text-[10px] font-bold text-slate-400 uppercase">Method</label>
// // //                       <div className="flex flex-col gap-2">
// // //                         <button 
// // //                             onClick={() => setSelectedMethod('NOW')}
// // //                             className={`w-full py-2 rounded-lg border font-bold text-[10px] flex items-center justify-center gap-1 transition-all ${selectedMethod === 'NOW' ? 'border-green-500 bg-green-500/10 text-green-500' : 'border-slate-700 text-slate-500'}`}
// // //                         >
// // //                             <CreditCard size={12} /> PAY NOW
// // //                         </button>
// // //                         <button 
// // //                             onClick={() => setSelectedMethod('EMAIL')}
// // //                             className={`w-full py-2 rounded-lg border font-bold text-[10px] flex items-center justify-center gap-1 transition-all ${selectedMethod === 'EMAIL' ? 'border-blue-400 bg-blue-400/10 text-blue-400' : 'border-slate-700 text-slate-500'}`}
// // //                         >
// // //                             <Mail size={12} /> SEND LINK
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   <button 
// // //                     disabled={!selectedMethod || !guestInfo.email || isProcessing}
// // //                     onClick={handleFinalCheckout}
// // //                     className="w-full bg-amber-400 text-black font-black py-4 rounded-2xl hover:bg-amber-500 disabled:opacity-30 flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-400/10 mt-4"
// // //                   >
// // //                     {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <><CheckCircle size={20} /> PROCESS ORDER</>}
// // //                   </button>
// // //                 </div>
// // //               ) : (
// // //                 <div className="text-center py-6">
// // //                   <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
// // //                     <CheckCircle size={40} />
// // //                   </div>
// // //                   <h3 className="text-2xl font-bold text-slate-100">Success!</h3>
// // //                   <p className="text-slate-400 mt-2 px-4 text-sm">Payment link has been emailed to:<br/><b className="text-amber-400">{guestInfo.email}</b></p>
// // //                   <button onClick={resetAll} className="mt-8 bg-amber-400 text-black px-10 py-3 rounded-xl font-bold hover:bg-amber-500 transition-all">START NEW ORDER</button>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default OrderCatalog;



// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { 
// //   ShoppingCart, Plus, Minus, Trash2, CreditCard, ArrowRight, 
// //   Search, Loader2, X, Mail, User, CheckCircle, Tag
// // } from 'lucide-react';

// // const BASE_URL = import.meta.env.VITE_SERVER_URL;

// // // --- Types ---
// // interface Product {
// //   id: string;
// //   name: string;
// //   description?: string; // 👈 Description field
// //   price: number;
// //   stock: number;
// //   type: 'STOCK' | 'CUSTOM';
// //   customerName?: string;
// //   customerEmail?: string;
// //   orderNumber?: string;
// // }

// // interface CartItem extends Product {
// //   quantity: number;
// // }

// // const OrderCatalog: React.FC = () => {
// //   const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
// //   const [readyCustomOrders, setReadyCustomOrders] = useState<Product[]>([]);
// //   const [cart, setCart] = useState<CartItem[]>([]);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [loading, setLoading] = useState(true);

// //   // --- Checkout UI States ---
// //   const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
// //   const [checkoutStep, setCheckoutStep] = useState(1); 
// //   const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '' });
  
// //   const [selectedGateway, setSelectedGateway] = useState<'STRIPE' | 'PAYPAL'>('STRIPE');
// //   const [selectedMethod, setSelectedMethod] = useState<'NOW' | 'EMAIL' | ''>('');
// //   const [isProcessing, setIsProcessing] = useState(false);

// //   // --- API: Fetch Catalog Data ---
// //   const fetchCatalogData = async (query: string = '') => {
// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem('auth_token'); 

// //       const response = await axios.get(
// //         `${BASE_URL}/api/admin/get-order-catelog-data?searchQuery=${query}`, 
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       const { catalogProducts, readyCustomOrders, settings } = response.data.data;

// //       setCatalogProducts(catalogProducts.map((p: any) => ({
// //         id: p.id, name: p.name, description: p.description, price: parseFloat(p.price), stock: 10, type: 'STOCK',
// //         customerName: p.customerName, customerEmail: p.customerEmail
// //       })));

// //       setReadyCustomOrders(readyCustomOrders.map((co: any) => ({
// //         id: co.id, name: `Order: ${co.orderNumber}`, description: `Custom order for ${co.customerName}`,
// //         price: parseFloat(co.totalCost), stock: 1, customerName: co.customerName, customerEmail: co.customerEmail, type: 'CUSTOM'
// //       })));

// //       if (settings?.activeGateway) {
// //         setSelectedGateway(settings.activeGateway);
// //       }

// //     } catch (err: any) {
// //       console.error("Fetch error", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => { fetchCatalogData(); }, []);

// //   // --- Cart Actions with Auto-fill ---
// //   const addToCart = (product: Product) => {
// //     if (product.customerName || product.customerEmail) {
// //         setGuestInfo(prev => ({
// //             ...prev,
// //             name: product.customerName || prev.name,
// //             email: product.customerEmail || prev.email
// //         }));
// //     }

// //     setCart((prev) => {
// //       const existing = prev.find((item) => item.id === product.id);
// //       if (existing) {
// //         return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
// //       }
// //       return [...prev, { ...product, quantity: 1 }];
// //     });
// //   };

// //   const updateQuantity = (id: string, delta: number) => {
// //     setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
// //   };

// //   const removeFromCart = (id: string) => {
// //     setCart(prev => prev.filter(item => item.id !== id));
// //   };

// //   const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

// //   // --- Final Checkout ---
// //   const handleFinalCheckout = async () => {
// //     const hasCustomOrder = cart.some(item => item.type === 'CUSTOM');

// //     if (hasCustomOrder && !guestInfo.name.trim()) {
// //         alert("Customer Name is REQUIRED for Custom Orders.");
// //         return;
// //     }

// //     if (!guestInfo.email) {
// //       alert("Guest email is required.");
// //       return;
// //     }

// //     try {
// //       setIsProcessing(true);
// //       const token = localStorage.getItem('auth_token'); 

// //       const payload = {
// //         items: cart,
// //         customerDetails: {
// //             name: guestInfo.name || "Guest Customer",
// //             email: guestInfo.email,
// //             phone: guestInfo.phone
// //         },
// //         method: selectedMethod,    
// //         gateway: selectedGateway  
// //       };

// //       const response = await axios.post(`${BASE_URL}/api/admin/create-payment`, payload, { headers: { Authorization: `Bearer ${token}` } });

// //       if (response.data.success) {
// //         if (selectedMethod === 'NOW') {
// //           window.location.href = response.data.url;
// //         } else {
// //           setCheckoutStep(2);
// //         }
// //       }
// //     } catch (err: any) {
// //       alert("Checkout Failed: " + (err.response?.data?.message || "Error"));
// //     } finally {
// //       setIsProcessing(false);
// //     }
// //   };

// //   const resetAll = () => {
// //     setCart([]);
// //     setGuestInfo({ name: '', email: '', phone: '' });
// //     setSelectedMethod('');
// //     setIsGuestModalOpen(false);
// //     setCheckoutStep(1);
// //   };

// //   return (
// //     <div className="min-h-screen bg-slate-50 text-slate-900 p-4 lg:p-10 font-sans">
// //       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">        
        
// //         {/* LEFT: Products Area */}
// //         <div className="lg:col-span-8 space-y-6">
// //           <header className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
// //             <div>
// //               <h1 className="text-2xl font-bold">Order Management</h1>
// //               <p className="text-slate-500 text-sm">Select items and process guest payments</p>
// //             </div>
// //             <div className="relative w-full md:w-72">
// //               <input 
// //                 type="text" placeholder="Search..." 
// //                 className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 onKeyDown={(e) => e.key === 'Enter' && fetchCatalogData(searchQuery)}
// //               />
// //               <Search className="absolute left-3 top-3 text-slate-400" size={18} />
// //             </div>
// //           </header>

// //           {loading ? (
// //             <div className="text-center py-20 text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" /> Loading...</div>
// //           ) : (
// //             <>
// //               <section>
// //                 <div className="flex items-center gap-2 mb-4">
// //                   <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
// //                   <h2 className="font-bold text-lg">Product Catalog</h2>
// //                 </div>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   {catalogProducts.map(p => (
// //                     <div key={p.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow flex justify-between items-center group">
// //                       <div className="flex-1 pr-4">
// //                         <p className="font-semibold text-slate-800">{p.name}</p>
// //                         <p className="text-xs text-slate-500 line-clamp-1 mb-1">{p.description || 'No description'}</p>
// //                         <p className="text-indigo-600 font-bold text-sm">${p.price.toFixed(2)}</p>
// //                         <p className="text-[10px] text-slate-400">For: {p.customerName}</p>
// //                       </div>
// //                       <button onClick={() => addToCart(p)} className="p-2 bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white rounded-lg transition-colors">
// //                         <Plus size={20} />
// //                       </button>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </section>

// //               <section>
// //                 <div className="flex items-center gap-2 mb-4">
// //                   <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
// //                   <h2 className="font-bold text-lg">Custom Orders Ready</h2>
// //                 </div>
// //                 <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y">
// //                   {readyCustomOrders.length === 0 ? <p className="p-10 text-center text-slate-400 text-sm">No custom orders found</p> : 
// //                     readyCustomOrders.map(co => (
// //                       <div key={co.id} className="p-4 flex justify-between items-center hover:bg-slate-50">
// //                         <div className="flex items-center gap-4 flex-1">
// //                           <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center font-bold text-xs shrink-0">C</div>
// //                           <div className="flex-1">
// //                             <p className="font-semibold text-sm text-slate-800">{co.name}</p>
// //                             <p className="text-xs text-slate-500">{co.description}</p>
// //                           </div>
// //                         </div>
// //                         <div className="flex items-center gap-4">
// //                           <p className="font-bold text-slate-700">${co.price.toFixed(2)}</p>
// //                           <button onClick={() => addToCart(co)} className="flex items-center gap-1 text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
// //                             ADD <Plus size={14} />
// //                           </button>
// //                         </div>
// //                       </div>
// //                     ))
// //                   }
// //                 </div>
// //               </section>
// //             </>
// //           )}
// //         </div>

// //         {/* RIGHT: Cart Summary */}
// //         <div className="lg:col-span-4">
// //           <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-6">
// //             <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><ShoppingCart className="text-indigo-600" /> Cart</h2>
            
// //             <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
// //               {cart.length === 0 ? (
// //                 <p className="text-slate-400 text-center py-10 text-sm">Your cart is empty</p>
// //               ) : (
// //                 cart.map(item => (
// //                   <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center">
// //                     <div className="min-w-0 flex-1">
// //                       <p className="text-xs font-bold truncate text-slate-800">{item.name}</p>
// //                       <p className="text-xs text-indigo-600 font-semibold">${item.price.toFixed(2)}</p>
// //                     </div>
// //                     <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-sm">
// //                       <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-rose-500"><Minus size={14} /></button>
// //                       <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
// //                       <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-indigo-600"><Plus size={14} /></button>
// //                       <button onClick={() => removeFromCart(item.id)} className="ml-2 text-slate-300 hover:text-rose-500 border-l pl-2"><Trash2 size={14} /></button>
// //                     </div>
// //                   </div>
// //                 ))
// //               )}
// //             </div>

// //             <div className="border-t pt-4 space-y-3">
// //               <div className="flex justify-between font-bold text-xl text-slate-800"><span>Total Amount</span><span>${subtotal.toFixed(2)}</span></div>
// //             </div>

// //             <button 
// //               disabled={cart.length === 0}
// //               onClick={() => setIsGuestModalOpen(true)}
// //               className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl mt-6 shadow-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:bg-slate-200"
// //             >
// //               Checkout <ArrowRight size={18} />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* --- CHECKOUT MODAL --- */}
// //       {isGuestModalOpen && (
// //         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
// //           <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
// //             <div className="bg-slate-50 p-6 border-b flex justify-between items-center">
// //               <h2 className="text-xl font-bold">Secure Checkout</h2>
// //               <button onClick={() => setIsGuestModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full"><X size={20} /></button>
// //             </div>

// //             <div className="p-8">
// //               {checkoutStep === 1 ? (
// //                 <div className="space-y-6">
// //                   {/* Guest Info Section */}
// //                   <div className="space-y-3">
// //                     <label className="text-[10px] font-bold text-slate-400 uppercase">
// //                         {cart.some(i => i.type === 'CUSTOM') ? 'Customer Name (Required)' : 'Customer Name (Optional for Guest)'}
// //                     </label>
// //                     <div className="relative">
// //                       <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
// //                       <input 
// //                         type="text" placeholder="Enter Guest Name" 
// //                         className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
// //                         value={guestInfo.name}
// //                         onChange={e => setGuestInfo({...guestInfo, name: e.target.value})} 
// //                       />
// //                     </div>
                    
// //                     <label className="text-[10px] font-bold text-slate-400 uppercase">Guest Email (Required for Payment)</label>
// //                     <div className="relative">
// //                       <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
// //                       <input 
// //                         type="email" placeholder="Enter Guest Email" 
// //                         className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
// //                         value={guestInfo.email}
// //                         onChange={e => setGuestInfo({...guestInfo, email: e.target.value})} 
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Gateway & Method */}
// //                   <div className="grid grid-cols-2 gap-4">
// //                     <div className="space-y-2">
// //                       <label className="text-[10px] font-bold text-slate-400 uppercase">Gateway</label>
// //                       <div className="flex bg-slate-100 p-1 rounded-xl">
// //                         <button 
// //                             className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${selectedGateway === 'STRIPE' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
// //                             onClick={() => setSelectedGateway('STRIPE')}
// //                         >STRIPE</button>
// //                         <button 
// //                             className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${selectedGateway === 'PAYPAL' ? 'bg-white shadow-sm text-yellow-600' : 'text-slate-400'}`}
// //                             onClick={() => setSelectedGateway('PAYPAL')}
// //                         >PAYPAL</button>
// //                       </div>
// //                     </div>
// //                     <div className="space-y-2">
// //                       <label className="text-[10px] font-bold text-slate-400 uppercase">Method</label>
// //                       <button 
// //                         onClick={() => setSelectedMethod('NOW')}
// //                         className={`w-full py-2 rounded-lg border-2 font-bold text-[10px] flex items-center justify-center gap-1 transition-all ${selectedMethod === 'NOW' ? 'border-green-600 bg-green-50 text-green-600' : 'border-slate-100 text-slate-400'}`}
// //                       >
// //                         <CreditCard size={12} /> PAY NOW
// //                       </button>
// //                       <button 
// //                         onClick={() => setSelectedMethod('EMAIL')}
// //                         className={`w-full py-2 rounded-lg border-2 font-bold text-[10px] flex items-center justify-center gap-1 transition-all ${selectedMethod === 'EMAIL' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400'}`}
// //                       >
// //                         <Mail size={12} /> SEND LINK
// //                       </button>
// //                     </div>
// //                   </div>

// //                   <button 
// //                     disabled={!selectedMethod || !guestInfo.email || isProcessing}
// //                     onClick={handleFinalCheckout}
// //                     className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-all shadow-lg"
// //                   >
// //                     {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <><CheckCircle size={20} /> Complete Order</>}
// //                   </button>
// //                 </div>
// //               ) : (
// //                 <div className="text-center py-6">
// //                   <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={40} /></div>
// //                   <h3 className="text-2xl font-bold">Link Emailed!</h3>
// //                   <p className="text-slate-500 mt-2 px-4 text-sm">Payment link has been sent to <b>{guestInfo.email}</b> via {selectedGateway}.</p>
// //                   <button onClick={resetAll} className="mt-8 bg-indigo-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-indigo-700">Finished</button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default OrderCatalog;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { 
//   ShoppingCart, Plus, Minus, Trash2, CreditCard, ArrowRight, 
//   Search, Loader2, X, Mail, User, CheckCircle, Tag, Package 
// } from 'lucide-react';

// // --- Configuration ---
// const BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080';

// // --- Types ---
// interface Product {
//   id: string;
//   name: string;
//   description?: string;
//   price: number;
//   stock: number;
//   type: 'STOCK' | 'CUSTOM';
//   customerName?: string;
//   customerEmail?: string;
//   orderNumber?: string;
// }

// interface CartItem extends Product {
//   quantity: number;
// }

// const OrderCatalog: React.FC = () => {
//   // --- States ---
//   const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
//   const [readyCustomOrders, setReadyCustomOrders] = useState<Product[]>([]);
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);

//   // --- Checkout UI States ---
//   const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
//   const [checkoutStep, setCheckoutStep] = useState(1); // 1: Form, 2: Success
//   const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '' });
  
//   const [selectedGateway, setSelectedGateway] = useState<'STRIPE' | 'PAYPAL'>('STRIPE');
//   const [selectedMethod, setSelectedMethod] = useState<'NOW' | 'EMAIL' | ''>('');
//   const [isProcessing, setIsProcessing] = useState(false);

//   // --- API: Fetch Data ---
//   const fetchCatalogData = async (query: string = '') => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('auth_token'); 

//       const response = await axios.get(
//         `${BASE_URL}/api/admin/get-order-catelog-data?searchQuery=${query}`, 
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const { catalogProducts, readyCustomOrders, settings } = response.data.data;

//       setCatalogProducts(catalogProducts.map((p: any) => ({
//         id: p.id, name: p.name, description: p.description, price: parseFloat(p.price), stock: p.stock || 0, type: 'STOCK'
//       })));

//       setReadyCustomOrders(readyCustomOrders.map((co: any) => ({
//         id: co.id, 
//         name: `Order: ${co.orderNumber}`, 
//         description: `Custom order for ${co.customerName}`,
//         price: parseFloat(co.totalCost), 
//         stock: 1, 
//         customerName: co.customerName, 
//         customerEmail: co.customerEmail, 
//         type: 'CUSTOM'
//       })));

//       if (settings?.activeGateway) setSelectedGateway(settings.activeGateway);

//     } catch (err: any) {
//       console.error("Fetch error", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchCatalogData(); }, []);

//   // --- Cart Management ---
//   const addToCart = (product: Product) => {
//     // Auto-fill customer info if the item (like a custom order) already has it
//     if (product.customerName || product.customerEmail) {
//         setGuestInfo(prev => ({
//             ...prev,
//             name: product.customerName || prev.name,
//             email: product.customerEmail || prev.email
//         }));
//     }

//     setCart((prev) => {
//       const existing = prev.find((item) => item.id === product.id);
//       if (existing) {
//         return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };

//   const updateQuantity = (id: string, delta: number) => {
//     setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
//   };

//   const removeFromCart = (id: string) => {
//     setCart(prev => prev.filter(item => item.id !== id));
//   };

//   const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   // --- FINAL CHECKOUT LOGIC (With Dummy Info Fallback) ---
//   const handleFinalCheckout = async () => {
//     // 1. DUMMY FALLBACK: If fields are empty, use dummy data
//     const finalCustomerDetails = {
//         name: guestInfo.name.trim() || "Guest Customer",
//         email: guestInfo.email.trim() || `guest_${Date.now()}@bhives.com`, // Unique dummy email
//         phone: guestInfo.phone.trim() || "0000000000"
//     };

//     // 2. Logic Check: "Send Link" method physically requires a real email.
//     if (selectedMethod === 'EMAIL' && !guestInfo.email.trim()) {
//         alert("Please provide a valid email address to send the payment link.");
//         return;
//     }

//     if (!selectedMethod) {
//         alert("Please select a payment method (Pay Now or Send Link).");
//         return;
//     }

//     try {
//       setIsProcessing(true);
//       const token = localStorage.getItem('auth_token'); 

//       const payload = {
//         items: cart,
//         customerDetails: finalCustomerDetails,
//         method: selectedMethod,    
//         gateway: selectedGateway  
//       };

//       const response = await axios.post(
//         `${BASE_URL}/api/admin/create-payment`, 
//         payload, 
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         if (selectedMethod === 'NOW') {
//           // Redirect to Stripe/PayPal Checkout
//           window.location.href = response.data.url;
//         } else {
//           // Success screen for "Send Link"
//           setCheckoutStep(2);
//         }
//       }
//     } catch (err: any) {
//       alert("Checkout Failed: " + (err.response?.data?.message || "Server Error"));
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const resetAll = () => {
//     setCart([]);
//     setGuestInfo({ name: '', email: '', phone: '' });
//     setSelectedMethod('');
//     setIsGuestModalOpen(false);
//     setCheckoutStep(1);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 p-4 lg:p-10 font-sans">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">        
        
//         {/* LEFT: Product Selection */}
//         <div className="lg:col-span-8 space-y-6">
//           <header className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
//             <div>
//               <h1 className="text-2xl font-bold">Order Management</h1>
//               <p className="text-slate-500 text-sm">Select items and process payments</p>
//             </div>
//             <div className="relative w-full md:w-72">
//               <input 
//                 type="text" placeholder="Search..." 
//                 className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && fetchCatalogData(searchQuery)}
//               />
//               <Search className="absolute left-3 top-3 text-slate-400" size={18} />
//             </div>
//           </header>

//           {loading ? (
//             <div className="text-center py-20 text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" /> Loading Catalog...</div>
//           ) : (
//             <>
//               <section>
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
//                   <h2 className="font-bold text-lg">Product Catalog</h2>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {catalogProducts.map(p => (
//                     <div key={p.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow flex justify-between items-center group">
//                       <div className="flex-1 pr-4">
//                         <p className="font-semibold text-slate-800">{p.name}</p>
//                         <p className="text-xs text-slate-500 line-clamp-1 mb-1">{p.description || 'No description'}</p>
//                         <p className="text-indigo-600 font-bold text-sm">${p.price.toFixed(2)}</p>
//                       </div>
//                       <button onClick={() => addToCart(p)} className="p-2 bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white rounded-lg transition-colors">
//                         <Plus size={20} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </section>

//               <section>
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
//                   <h2 className="font-bold text-lg">Custom Orders Ready</h2>
//                 </div>
//                 <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y">
//                   {readyCustomOrders.length === 0 ? <p className="p-10 text-center text-slate-400 text-sm">No custom orders found</p> : 
//                     readyCustomOrders.map(co => (
//                       <div key={co.id} className="p-4 flex justify-between items-center hover:bg-slate-50">
//                         <div className="flex items-center gap-4 flex-1">
//                           <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center font-bold text-xs shrink-0">C</div>
//                           <div className="flex-1">
//                             <p className="font-semibold text-sm text-slate-800">{co.name}</p>
//                             <p className="text-xs text-slate-500">{co.description}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-4">
//                           <p className="font-bold text-slate-700">${co.price.toFixed(2)}</p>
//                           <button onClick={() => addToCart(co)} className="flex items-center gap-1 text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
//                             ADD <Plus size={14} />
//                           </button>
//                         </div>
//                       </div>
//                     ))
//                   }
//                 </div>
//               </section>
//             </>
//           )}
//         </div>

//         {/* RIGHT: Cart Summary */}
//         <div className="lg:col-span-4">
//           <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-6">
//             <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><ShoppingCart className="text-indigo-600" /> Cart</h2>
            
//             <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
//               {cart.length === 0 ? (
//                 <p className="text-slate-400 text-center py-10 text-sm">Your cart is empty</p>
//               ) : (
//                 cart.map(item => (
//                   <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center">
//                     <div className="min-w-0 flex-1">
//                       <p className="text-xs font-bold truncate text-slate-800">{item.name}</p>
//                       <p className="text-xs text-indigo-600 font-semibold">${item.price.toFixed(2)}</p>
//                     </div>
//                     <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-sm">
//                       <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-rose-500"><Minus size={14} /></button>
//                       <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
//                       <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-indigo-600"><Plus size={14} /></button>
//                       <button onClick={() => removeFromCart(item.id)} className="ml-2 text-slate-300 hover:text-rose-500 border-l pl-2"><Trash2 size={14} /></button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             <div className="border-t pt-4 space-y-3">
//               <div className="flex justify-between font-bold text-xl text-slate-800">
//                   <span>Total Amount</span>
//                   <span className="text-indigo-600">${subtotal.toFixed(2)}</span>
//               </div>
//             </div>

//             <button 
//               disabled={cart.length === 0}
//               onClick={() => setIsGuestModalOpen(true)}
//               className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl mt-6 shadow-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:bg-slate-200"
//             >
//               Confirm Checkout <ArrowRight size={18} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* --- CHECKOUT MODAL --- */}
//       {isGuestModalOpen && (
//         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
//             <div className="bg-slate-50 p-6 border-b flex justify-between items-center">
//               <h2 className="text-xl font-bold">Secure Checkout</h2>
//               <button onClick={() => setIsGuestModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full"><X size={20} /></button>
//             </div>

//             <div className="p-8">
//               {checkoutStep === 1 ? (
//                 <div className="space-y-6">
//                   {/* Customer Info (Optional) */}
//                   <div className="space-y-3">
//                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
//                         Customer Name (Optional)
//                     </label>
//                     <div className="relative">
//                       <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
//                       <input 
//                         type="text" placeholder="Enter Guest Name" 
//                         className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
//                         value={guestInfo.name}
//                         onChange={e => setGuestInfo({...guestInfo, name: e.target.value})} 
//                       />
//                     </div>
                    
//                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
//                         Guest Email (Optional for Pay Now)
//                     </label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
//                       <input 
//                         type="email" placeholder="Enter Guest Email" 
//                         className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
//                         value={guestInfo.email}
//                         onChange={e => setGuestInfo({...guestInfo, email: e.target.value})} 
//                       />
//                     </div>
//                   </div>

//                   {/* Gateway & Method */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <label className="text-[10px] font-bold text-slate-400 uppercase">Gateway</label>
//                       <div className="flex bg-slate-100 p-1 rounded-xl border">
//                         <button 
//                             className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${selectedGateway === 'STRIPE' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
//                             onClick={() => setSelectedGateway('STRIPE')}
//                         >STRIPE</button>
//                         <button 
//                             className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${selectedGateway === 'PAYPAL' ? 'bg-white shadow-sm text-yellow-600' : 'text-slate-400'}`}
//                             onClick={() => setSelectedGateway('PAYPAL')}
//                         >PAYPAL</button>
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-[10px] font-bold text-slate-400 uppercase">Method</label>
//                       <button 
//                         onClick={() => setSelectedMethod('NOW')}
//                         className={`w-full py-2 rounded-lg border-2 font-bold text-[10px] flex items-center justify-center gap-1 transition-all ${selectedMethod === 'NOW' ? 'border-green-600 bg-green-50 text-green-600' : 'border-slate-100 text-slate-400'}`}
//                       >
//                         <CreditCard size={12} /> PAY NOW
//                       </button>
//                       <button 
//                         onClick={() => setSelectedMethod('EMAIL')}
//                         className={`w-full py-2 rounded-lg border-2 font-bold text-[10px] flex items-center justify-center gap-1 transition-all ${selectedMethod === 'EMAIL' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400'}`}
//                       >
//                         <Mail size={12} /> SEND LINK
//                       </button>
//                     </div>
//                   </div>

//                   <button 
//                     disabled={!selectedMethod || isProcessing}
//                     onClick={handleFinalCheckout}
//                     className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-all shadow-lg"
//                   >
//                     {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <><CheckCircle size={20} /> Complete Order</>}
//                   </button>
//                 </div>
//               ) : (
//                 <div className="text-center py-6">
//                   <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={40} /></div>
//                   <h3 className="text-2xl font-bold">Success!</h3>
//                   <p className="text-slate-500 mt-2 px-4 text-sm">
//                     The payment link has been sent to <b>{guestInfo.email || "the guest email"}</b>.
//                   </p>
//                   <button onClick={resetAll} className="mt-8 bg-indigo-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">Finished</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderCatalog;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  ShoppingCart, Plus, Minus, Trash2, CreditCard, ArrowRight, 
  Search, Loader2, X, Mail, User, CheckCircle, Tag, Package, Hash 
} from 'lucide-react';

// --- Configuration ---
const BASE_URL = import.meta.env.VITE_SERVER_URL || 'https://api.bhives.co';

// --- Types ---
interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  type: 'STOCK' | 'CUSTOM';
  customerName?: string;
  customerEmail?: string;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // --- Checkout UI States ---
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); 
  const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '' });
  
  const [selectedGateway, setSelectedGateway] = useState<'STRIPE' | 'PAYPAL'>('STRIPE');
  const [selectedMethod, setSelectedMethod] = useState<'NOW' | 'EMAIL' | ''>('');
  const [isProcessing, setIsProcessing] = useState(false);

  // --- API: Fetch Data ---
  const fetchCatalogData = async (query: string = '') => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token'); 

      const response = await axios.get(
        `${BASE_URL}/api/admin/get-order-catelog-data?searchQuery=${query}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { catalogProducts, readyCustomOrders, settings } = response.data.data;

      // Mapping Catalog Products
      setCatalogProducts(catalogProducts.map((p: any) => ({
        id: p.id, 
        name: p.name, 
        description: p.description, 
        price: parseFloat(p.price), 
        stock: p.stock || 0, 
        type: 'STOCK'
      })));

      // Mapping Custom Orders (FIXED: price logic and full info)
      setReadyCustomOrders(readyCustomOrders.map((co: any) => ({
        id: co.id, 
        name: co.orderNumber, // Storing number as name for consistency
        orderNumber: co.orderNumber,
        customerName: co.customerName,
        customerEmail: co.customerEmail,
        price: parseFloat(co.totalAmount), // Corrected field name from co.totalCost to co.totalAmount
        stock: 1, 
        type: 'CUSTOM'
      })));

      if (settings?.activeGateway) setSelectedGateway(settings.activeGateway);

    } catch (err: any) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCatalogData(); }, []);

  // --- Cart Management ---
  const addToCart = (product: Product) => {
    if (product.customerName || product.customerEmail) {
        setGuestInfo(prev => ({
            ...prev,
            name: product.customerName || prev.name,
            email: product.customerEmail || prev.email
        }));
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // --- Final Checkout ---
  // const handleFinalCheckout = async () => {
  //   const finalCustomerDetails = {
  //       name: guestInfo.name.trim() || "Guest Customer",
  //       email: guestInfo.email.trim() || `guest_${Date.now()}@bhives.com`,
  //       phone: guestInfo.phone.trim() || "0000000000"
  //   };

  //   if (selectedMethod === 'EMAIL' && !guestInfo.email.trim()) {
  //       alert("Please provide a valid email address to send the payment link.");
  //       return;
  //   }

  //   // try {
  //   //   setIsProcessing(true);
  //   //   const token = localStorage.getItem('auth_token'); 
  //   //   const payload = { items: cart, customerDetails: finalCustomerDetails, method: selectedMethod, gateway: selectedGateway };

  //   //   const response = await axios.post(`${BASE_URL}/api/admin/create-payment`, payload, { headers: { Authorization: `Bearer ${token}` } });

  //   //   if (response.data.success) {
  //   //     if (selectedMethod === 'NOW') {
  //   //       window.location.href = response.data.url;
  //   //     } else {
  //   //       setCheckoutStep(2);
  //   //     }
  //   //   }
  //   // } catch (err: any) {
  //   //   alert("Checkout Failed: " + (err.response?.data?.message || "Server Error"));
  //   // } finally {
  //   //   setIsProcessing(false);
  //   // }

  //    try {
  //       setIsProcessing(true);
  //       const token = localStorage.getItem('auth_token'); 
  //       const payload = { 
  //           items: cart, 
  //           customerDetails: finalCustomerDetails, 
  //           method: selectedMethod, 
  //           gateway: selectedGateway // Make sure this is 'PAYPAL'
  //       };

  //       const response = await axios.post(`${BASE_URL}/api/admin/create-payment`, payload, { 
  //           headers: { Authorization: `Bearer ${token}` } 
  //       });

  //       if (response.data.success) {
  //           if (selectedMethod === 'NOW') {
  //               if (response.data.url) {
  //                   console.log("Navigating to:", response.data.url);
  //                   window.location.href = response.data.url; // 👈 Redirection
  //               } else {
  //                   alert("Payment URL was not provided by the server.");
  //               }
  //           } else {
  //               setCheckoutStep(2);
  //           }
  //       }
  //   } catch (err: any) {
  //       alert("Checkout Failed: " + (err.response?.data?.message || "Error"));
  //   } finally {
  //       setIsProcessing(false);
  //   }
  // };
  const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const handleFinalCheckout = async () => {
   const trimmedEmail = guestInfo.email.trim();

    // 1. Check agar email empty hai (Sirf jab 'EMAIL' method ho)
    if (selectedMethod === 'EMAIL' && !trimmedEmail) {
        alert("Please provide an email address to send the payment link.");
        return;
    }

    // 2. Check agar email ka format sahi hai (Zaroori check)
    if (trimmedEmail && !validateEmail(trimmedEmail)) {
        alert("Kripya sahi format mein email enter karein (e.g. name@example.com)");
        return;
    }
    const finalCustomerDetails = {
        name: guestInfo.name.trim() || "Guest Customer",
        email: trimmedEmail || `guest_${Date.now()}@bhives.com`,
        phone: guestInfo.phone.trim() || "0000000000"
    };

    if (selectedMethod === 'EMAIL' && !guestInfo.email.trim()) {
        alert("Please provide a valid email address to send the payment link.");
        return;
    }

    try {
        setIsProcessing(true);
        const token = localStorage.getItem('auth_token'); 

        // 👈 FIX: Items ko map karein aur CUSTOM type ko hamesha Index 0 par rakhein
        // Isse Backend ko hamesha pata chalega ki ye Custom Order hai
        const sortedItems = [...cart].sort((a, b) => (a.type === 'CUSTOM' ? -1 : 1))
            .map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                type: item.type // 'CUSTOM' or 'STOCK'
            }));

        const payload = { 
            items: sortedItems, // Sorted list bhejein
            customerDetails: finalCustomerDetails, 
            method: selectedMethod, 
            gateway: selectedGateway 
        };

        const response = await axios.post(`${BASE_URL}/api/admin/create-payment`, payload, { 
            headers: { Authorization: `Bearer ${token}` } 
        });

        if (response.data.success) {
            if (selectedMethod === 'NOW') {
                if (response.data.url) {
                    window.location.href = response.data.url;
                } else {
                    alert("Payment URL was not provided.");
                }
            } else {
                setCheckoutStep(2);
            }
        }
    } catch (err) {
        console.error("Checkout Error:", err);
        alert("Checkout Failed.");
    } finally {
        setIsProcessing(false);
    }
  };
  const resetAll = () => {
    setCart([]);
    setGuestInfo({ name: '', email: '', phone: '' });
    setSelectedMethod('');
    setIsGuestModalOpen(false);
    setCheckoutStep(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">        
        
        <div className="lg:col-span-8 space-y-6">
          <header className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Order Management</h1>
              <p className="text-slate-500 text-sm">Manage BOM and Custom orders</p>
            </div>
            <div className="relative w-full md:w-72">
              <input 
                type="text" placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchCatalogData(searchQuery)}
              />
              <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            </div>
          </header>

          {loading ? (
            <div className="text-center py-20 text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" /> Loading...</div>
          ) : (
            <>
              {/* Product Catalog Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                  <h2 className="font-bold text-lg">Product Catalog</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {catalogProducts.map(p => (
                    <div key={p.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow flex justify-between items-center group">
                      <div className="flex-1 pr-4">
                        <p className="font-semibold text-slate-800">{p.name}</p>
                        <p className="text-xs text-slate-500 line-clamp-1 mb-1">{p.description || 'No description'}</p>
                        <p className="text-indigo-600 font-bold text-sm">${p.price.toFixed(2)}</p>
                      </div>
                      <button onClick={() => addToCart(p)} className="p-2 bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white rounded-lg transition-colors">
                        <Plus size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Ready Custom Orders Section - Full Info UI */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                  <h2 className="font-bold text-lg">Ready Custom Orders</h2>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y">
                  {readyCustomOrders.length === 0 ? <p className="p-10 text-center text-slate-400 text-sm">No custom orders found</p> : 
                    readyCustomOrders.map(co => (
                      <div key={co.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 border border-amber-100">C</div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Hash size={10}/> {co.orderNumber}
                                </span>
                                <h3 className="font-bold text-sm text-slate-800 uppercase">{co.customerName}</h3>
                            </div>
                            <p className="text-xs text-slate-500 flex items-center gap-1"><Mail size={12}/> {co.customerEmail}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0">
                          <p className="font-black text-slate-900 text-lg">${co.price.toFixed(2)}</p>
                          <button onClick={() => addToCart(co)} className="flex items-center gap-2 text-xs font-bold bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all">
                            ADD TO CART <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </section>
            </>
          )}
        </div>

        {/* RIGHT: Cart Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><ShoppingCart className="text-indigo-600" /> Cart Summary</h2>
            
            <div className="space-y-3 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <p className="text-slate-400 text-center py-10 text-sm italic">Your cart is empty</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold truncate text-slate-800">{item.type === 'CUSTOM' ? `Order: ${item.name}` : item.name}</p>
                      <p className="text-xs text-indigo-600 font-semibold">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-sm">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-rose-500"><Minus size={14} /></button>
                      <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-indigo-600"><Plus size={14} /></button>
                      <button onClick={() => removeFromCart(item.id)} className="ml-2 text-slate-300 hover:text-rose-500 border-l pl-2"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between font-bold text-xl text-slate-800">
                  <span>Total</span>
                  <span className="text-indigo-600">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              disabled={cart.length === 0}
              onClick={() => setIsGuestModalOpen(true)}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl mt-6 shadow-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:bg-slate-200"
            >
              Confirm & Pay <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* --- CHECKOUT MODAL --- */}
      {isGuestModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-slate-50 p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Secure Checkout</h2>
              <button onClick={() => setIsGuestModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full"><X size={20} /></button>
            </div>

            <div className="p-8">
              {checkoutStep === 1 ? (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer Name (Optional)</label>
                    <div className="relative"><User className="absolute left-3 top-3.5 text-slate-400" size={18} />
                      <input type="text" placeholder="Enter Name" className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={guestInfo.name} onChange={e => setGuestInfo({...guestInfo, name: e.target.value})} />
                    </div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guest Email (Required for Link)</label>
                    <div className="relative"><Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
                      <input type="email" placeholder="Enter Email" className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={guestInfo.email} onChange={e => setGuestInfo({...guestInfo, email: e.target.value})} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Gateway</label>
                      <div className="flex bg-slate-100 p-1 rounded-xl border">
                        <button className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${selectedGateway === 'STRIPE' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`} onClick={() => setSelectedGateway('STRIPE')}>STRIPE</button>
                        <button className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${selectedGateway === 'PAYPAL' ? 'bg-white shadow-sm text-yellow-600' : 'text-slate-400'}`} onClick={() => setSelectedGateway('PAYPAL')}>PAYPAL</button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Method</label>
                      <button onClick={() => setSelectedMethod('NOW')} className={`w-full py-2 rounded-lg border-2 font-bold text-[10px] flex items-center justify-center gap-1 transition-all ${selectedMethod === 'NOW' ? 'border-green-600 bg-green-50 text-green-600' : 'border-slate-100 text-slate-400'}`}><CreditCard size={12} /> PAY NOW</button>
                      <button onClick={() => setSelectedMethod('EMAIL')} className={`w-full py-2 rounded-lg border-2 font-bold text-[10px] flex items-center justify-center gap-1 transition-all ${selectedMethod === 'EMAIL' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400'}`}><Mail size={12} /> SEND LINK</button>
                    </div>
                  </div>

                  <button disabled={!selectedMethod || isProcessing} onClick={handleFinalCheckout} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-all shadow-lg">{isProcessing ? <Loader2 className="animate-spin" size={20} /> : <><CheckCircle size={20} /> Complete Order</>}</button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={40} /></div>
                  <h3 className="text-2xl font-bold text-slate-800">Link Emailed!</h3>
                  <p className="text-slate-500 mt-2 px-4 text-sm">Payment link for <b className="text-slate-900">${subtotal.toFixed(2)}</b> has been sent to <b>{guestInfo.email}</b>.</p>
                  <button onClick={resetAll} className="mt-8 bg-indigo-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">Start New Order</button>
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