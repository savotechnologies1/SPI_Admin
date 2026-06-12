import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ShoppingCart, Plus, Minus, Trash2, CreditCard, ArrowRight,
  Search, Loader2, X, Mail, User, CheckCircle, Tag, Package, Hash
} from 'lucide-react';

const BASE_URL = import.meta.env.VITE_SERVER_URL || 'https://api.bhives.co';

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
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const [readyCustomOrders, setReadyCustomOrders] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '' });
  const [selectedGateway, setSelectedGateway] = useState<'STRIPE' | 'PAYPAL'>('STRIPE');
  const [selectedMethod, setSelectedMethod] = useState<'NOW' | 'EMAIL' | ''>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchCatalogData = async (query: string = '') => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');

      const response = await axios.get(
        `${BASE_URL}/api/admin/get-order-catelog-data?searchQuery=${query}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { catalogProducts, readyCustomOrders, settings } = response.data.data;

      setCatalogProducts(catalogProducts.map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: parseFloat(p.price),
        stock: p.stock || 0,
        type: 'STOCK'
      })));

      setReadyCustomOrders(readyCustomOrders.map((co: any) => ({
        id: co.id,
        name: co.orderNumber,
        orderNumber: co.orderNumber,
        customerName: co.customerName,
        customerEmail: co.customerEmail,
        price: parseFloat(co.totalAmount),
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

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleFinalCheckout = async () => {
    const trimmedEmail = guestInfo.email.trim();

    if (selectedMethod === 'EMAIL' && !trimmedEmail) {
      alert("Please provide an email address to send the payment link.");
      return;
    }

    if (trimmedEmail && !validateEmail(trimmedEmail)) {
      alert("Please provide a valid email address.");
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
      const sortedItems = [...cart].sort((a, b) => (a.type === 'CUSTOM' ? -1 : 1))
        .map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          type: item.type
        }));

      const payload = {
        items: sortedItems,
        customerDetails: finalCustomerDetails,
        method: selectedMethod,
        gateway: selectedGateway,
        frontendUrl: window.location.origin 

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
                                <Hash size={10} /> {co.orderNumber}
                              </span>
                              <h3 className="font-bold text-sm text-slate-800 uppercase">{co.customerName}</h3>
                            </div>
                            <p className="text-xs text-slate-500 flex items-center gap-1"><Mail size={12} /> {co.customerEmail}</p>
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
                      <input type="text" placeholder="Enter Name" className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={guestInfo.name} onChange={e => setGuestInfo({ ...guestInfo, name: e.target.value })} />
                    </div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guest Email (Required for Link)</label>
                    <div className="relative"><Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
                      <input type="email" placeholder="Enter Email" className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={guestInfo.email} onChange={e => setGuestInfo({ ...guestInfo, email: e.target.value })} />
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