"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  ShieldCheck, Car, Settings, CheckCircle2, ChevronRight, Info, ShieldAlert, X, Filter, Loader2, Check, QrCode
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { loadRazorpay } from "@/lib/utils/razorpay";

// --- DUMMY DATA GENERATION ---
const ADDONS_POOL = ["Zero Depreciation", "24x7 Roadside Assistance", "Engine Protect", "Consumables Cover", "Key Replacement"];
const INSURERS = ["LMB Premium Partner A", "LMB Premium Partner B", "LMB Premium Partner C", "LMB Premium Partner D"];

const allQuotes = Array.from({ length: 30 }, (_, i) => {
  const baseIdv = 300000 + (Math.random() * 500000);
  const basePremium = 2000 + (baseIdv * 0.005) + (Math.random() * 1000);

  // Randomly assign 1 to 4 add-ons
  const numAddons = Math.floor(Math.random() * 4) + 1;
  const shuffledAddons = [...ADDONS_POOL].sort(() => 0.5 - Math.random());
  const features = shuffledAddons.slice(0, numAddons);

  return {
    id: i + 1,
    insurer: INSURERS[Math.floor(Math.random() * INSURERS.length)],
    idvNumeric: Math.round(baseIdv),
    idv: `₹ ${Math.round(baseIdv).toLocaleString('en-IN')}`,
    premiumNumeric: Math.round(basePremium),
    premium: Math.round(basePremium).toLocaleString('en-IN'),
    features,
    recommended: i === 0 || i === 4,
  };
});

function ViewPricesContent() {
  const searchParams = useSearchParams();
  const [regNumber, setRegNumber] = useState(searchParams.get("reg") || "KA04DK8337");
  const [mobileNumber, setMobileNumber] = useState(searchParams.get("mobile") || "");

  // States
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("comprehensive");

  // Filter States
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [minIdv, setMinIdv] = useState<number>(300000);

  // Modal States
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState<any | null>(null);
  const [buyModalOpen, setBuyModalOpen] = useState<any | null>(null);
  const [buyLoading, setBuyLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'confirm' | 'qr' | 'processing' | 'success'>('confirm');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock loading sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Filtering Logic
  const filteredQuotes = useMemo(() => {
    let result = allQuotes.filter(quote => {
      // 1. Filter by IDV
      if (quote.idvNumeric < minIdv) return false;

      // 2. Filter by Add-ons (quote must have ALL selected add-ons)
      if (selectedAddons.length > 0) {
        const hasAllAddons = selectedAddons.every(addon => quote.features.includes(addon));
        if (!hasAllAddons) return false;
      }

      return true;
    }).sort((a, b) => a.premiumNumeric - b.premiumNumeric); // Sort by premium low to high

    // Dummy logic to alter the prices based on the tab selected
    if (activeTab === "sod") {
      result = result.map(q => ({
        ...q,
        premiumNumeric: Math.round(q.premiumNumeric * 0.7),
        premium: Math.round(q.premiumNumeric * 0.7).toLocaleString('en-IN'),
      }));
    } else if (activeTab === "tp") {
      result = result.map(q => ({
        ...q,
        premiumNumeric: Math.round(q.premiumNumeric * 0.3),
        premium: Math.round(q.premiumNumeric * 0.3).toLocaleString('en-IN'),
      }));
    }

    return result;
  }, [minIdv, selectedAddons, activeTab]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);
  const currentQuotes = filteredQuotes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [minIdv, selectedAddons, activeTab]);

  const toggleAddon = (addon: string) => {
    setSelectedAddons(prev =>
      prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
    );
  };

  const handleBuyNow = (quote: any) => {
    setBuyModalOpen(quote);
    setPaymentStep('confirm');
    setBuyLoading(true);
    setTimeout(() => {
      setBuyLoading(false);
    }, 2000);
  };

  const handleRazorpayCheckout = async () => {
    setPaymentStep('processing'); // Show spinner while contacting backend

    try {
      // 1. Create order on backend
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(buyModalOpen.premium.replace(/,/g, '')) })
      });
      
      if (!res.ok) throw new Error("Backend failed");

      const data = await res.json();
      
      // 2. Load Razorpay script
      const isLoaded = await loadRazorpay();
      
      if (!isLoaded) {
        alert("Razorpay SDK failed to load. Please check your connection.");
        setPaymentStep('confirm');
        return;
      }

      // If no real key is found in ENV, simulate the Razorpay modal for demo purposes
      if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        setTimeout(() => {
          setPaymentStep('success');
        }, 3000);
        return;
      }

      // 3. Initialize real Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "LMB Insurance Brokers",
        description: `Premium for ${buyModalOpen.insurer}`,
        order_id: data.order.id,
        handler: function (response: any) {
          console.log("Success:", response);
          setPaymentStep('success');
        },
        prefill: {
          name: "LMB User",
          email: "user@example.com",
          contact: searchParams.get("mobile") || "9999999999"
        },
        theme: { color: "#0F172A" }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        alert("Payment Failed: " + response.error.description);
      });
      rzp.open();
      
      // Let the user wait at the confirm screen while Razorpay is open
      setPaymentStep('confirm'); 

    } catch (err) {
      console.error(err);
      alert("Failed to initialize payment gateway.");
      setPaymentStep('confirm');
    }
  };

  const handleEditDetailsUpdate = () => {
    setEditModalOpen(false);
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-12 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-[#ffb800] rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-bold text-slate-800">Fetching the best quotes for {regNumber}...</h2>
        <p className="text-slate-500 mt-2">Comparing 15+ top insurers instantly.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-20">

      {/* Top Banner (Redesigned - No Black) */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-[72px] z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center shrink-0 border border-orange-100">
              <Car className="w-6 h-6 text-[#ffb800]" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-wider uppercase">{regNumber}</h1>
              <p className="text-sm font-medium text-slate-500">Hyundai i20 Magna (1.2L Petrol) • 2021</p>
            </div>
          </div>
          <Button
            onClick={() => setEditModalOpen(true)}
            variant="outline"
            className="border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:text-[#ffb800] hover:border-[#ffb800] transition-colors h-10 px-6 rounded-lg shadow-sm"
          >
            Edit Details
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8 relative">

        {/* Left Sidebar (Filters) - Hidden on Mobile */}
        <div className="w-full lg:w-72 shrink-0 hidden lg:block">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-40">
            <h3 className="font-extrabold text-slate-900 mb-6 flex items-center gap-2 text-lg">
              <Settings size={20} className="text-[#ffb800]" /> Modify Quotes
            </h3>

            {/* IDV Slider */}
            <div className="mb-8">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-4">Minimum IDV (Cover Value)</label>
              <div className="flex justify-between text-sm font-bold text-slate-800 mb-3">
                <span>₹ 3 L</span>
                <span className="text-[#ffb800]">₹ {(minIdv / 100000).toFixed(1)} L</span>
              </div>
              <input
                type="range"
                min="300000"
                max="800000"
                step="10000"
                value={minIdv}
                onChange={(e) => setMinIdv(Number(e.target.value))}
                className="w-full accent-[#ffb800]"
              />
            </div>

            {/* Add-ons Checkboxes */}
            <div className="mb-2 border-t border-slate-100 pt-6">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-4">Popular Add-ons</label>
              <div className="space-y-3.5">
                {ADDONS_POOL.map(addon => (
                  <label key={addon} className="flex items-center gap-3 cursor-pointer group p-1" onClick={(e) => { e.preventDefault(); toggleAddon(addon); }}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedAddons.includes(addon) ? 'bg-[#ffb800] border-[#ffb800]' : 'bg-white border-slate-300 group-hover:border-[#ffb800]'}`}>
                      {selectedAddons.includes(addon) && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>
                    <span className={`text-[14px] font-medium transition-colors ${selectedAddons.includes(addon) ? 'text-slate-900 font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}>
                      {addon}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content (Quotes) */}
        <div className="flex-1 min-w-0">

          {/* Tabs (Redesigned - Yellow Active State) */}
          <div className="flex bg-white rounded-xl shadow-sm border border-slate-200 p-1.5 mb-6 overflow-x-auto no-scrollbar">
            {["comprehensive", "sod", "tp"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[140px] text-[14px] font-bold py-3.5 px-4 rounded-lg transition-all ${activeTab === tab
                    ? 'bg-[#ffb800] text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                {tab === "comprehensive" ? "Comprehensive" : tab === "sod" ? "Standalone OD" : "Third Party"}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4 px-1">
            <p className="text-sm font-bold text-slate-600">Showing {filteredQuotes.length} matching quotes</p>
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="text-sm font-bold text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm lg:hidden flex items-center gap-2 hover:border-[#ffb800] hover:text-[#ffb800] transition-colors"
            >
              <Filter size={16} /> Filters
              {selectedAddons.length > 0 && (
                <span className="bg-[#ffb800] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                  {selectedAddons.length}
                </span>
              )}
            </button>
          </div>

          {/* Quote List with AnimatePresence */}
          <div className="space-y-5">
            <AnimatePresence mode="popLayout">
              {currentQuotes.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                    <ShieldAlert className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">No quotes found</h3>
                  <p className="text-slate-500">Try adjusting your filters or reducing the requested add-ons.</p>
                  <Button
                    onClick={() => { setSelectedAddons([]); setMinIdv(300000); }}
                    className="mt-6 bg-[#ffb800] hover:bg-[#F39C12] text-slate-900 font-bold"
                  >
                    Clear All Filters
                  </Button>
                </motion.div>
              ) : (
                currentQuotes.map((quote) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={quote.id}
                    className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-200 overflow-hidden relative hover:border-[#ffb800] hover:shadow-lg transition-all duration-300"
                  >
                    {quote.recommended && (
                      <div className="absolute top-0 left-0 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-br-xl z-10 shadow-sm">
                        Recommended
                      </div>
                    )}

                    <div className="p-5 md:p-8 flex flex-col md:flex-row gap-5 md:gap-8 relative z-0">

                      {/* Top/Left: Insurer & IDV */}
                      <div className="flex-[1.2] border-b md:border-b-0 md:border-r border-slate-100 pb-5 md:pb-0 md:pr-8 flex flex-row items-center md:items-start gap-4">
                        <div className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
                          <ShieldCheck className="w-7 h-7 md:w-10 md:h-10 text-[#ffb800]" strokeWidth={1.5} />
                        </div>
                        <div className="text-left flex flex-col justify-center h-full">
                          <h3 className="font-extrabold text-[15px] sm:text-[16px] md:text-[18px] text-slate-900 leading-tight mb-1 md:mb-2">{quote.insurer}</h3>
                          <div className="flex flex-col">
                            <span className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest">IDV (Cover Value)</span>
                            <span className="font-extrabold text-slate-700 text-[14px] md:text-[15px]">{quote.idv}</span>
                          </div>
                        </div>
                      </div>

                      {/* Middle: Features */}
                      <div className="flex-[1.5] flex flex-col justify-center px-0 md:px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-3 md:mb-4">
                          {quote.features.map(f => (
                            <span key={f} className="flex items-center gap-2 text-[12px] md:text-[13px] font-semibold text-slate-600">
                              <CheckCircle2 size={14} className="text-emerald-500 shrink-0 md:w-4 md:h-4" /> {f}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => setDetailsModalOpen(quote)}
                          className="text-[12px] md:text-[13px] font-bold text-blue-600 hover:text-blue-700 text-left flex items-center justify-start gap-1 transition-colors w-fit"
                        >
                          View full coverage details <ChevronRight size={14} className="md:w-4 md:h-4" />
                        </button>
                      </div>

                      {/* Bottom/Right: Price & CTA */}
                      <div className="flex-1 flex flex-row md:flex-col items-center justify-between md:items-end md:justify-center pt-5 md:pt-0 border-t md:border-t-0 border-slate-100">
                        <div className="flex flex-col items-start md:items-end">
                          <div className="text-[22px] md:text-[32px] font-extrabold text-slate-900 mb-0 md:mb-1 leading-none tracking-tight">
                            ₹{quote.premium}
                          </div>
                          <span className="text-[9px] md:text-[11px] text-slate-500 font-bold uppercase tracking-widest">1 Year (Inc. GST)</span>
                        </div>
                        <Button
                          onClick={() => handleBuyNow(quote)}
                          className="w-auto bg-[#ffb800] hover:bg-[#F39C12] text-slate-900 font-extrabold uppercase tracking-widest px-6 py-5 md:px-8 md:py-6 rounded-xl shadow-sm hover:shadow-md transition-all border-none text-[12px] md:text-[13px]"
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>

                    {/* Banner at bottom */}
                    <div className="bg-slate-50/80 px-5 md:px-8 py-3 md:py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                      <div className="flex items-center gap-1.5 md:gap-2 text-[11px] md:text-[13px] font-bold text-slate-600">
                        <ShieldAlert size={14} className="text-emerald-500 md:w-4 md:h-4 shrink-0" /> <span className="truncate max-w-[200px] sm:max-w-none">Cashless Garages: 250+ in city</span>
                      </div>
                      <div className="flex items-center gap-3 md:gap-6">
                        <span className="text-[11px] md:text-[12px] font-semibold text-slate-500 shrink-0">Claim Settlement: 98%</span>
                        <button
                          onClick={() => setDetailsModalOpen(quote)}
                          className="text-[11px] md:text-[12px] font-bold text-slate-400 flex items-center gap-1 hover:text-[#ffb800] transition-colors shrink-0"
                        >
                          T&C Apply <Info size={12} className="md:w-3 md:h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-200 gap-4">
              <p className="text-[13px] font-bold text-slate-500 uppercase tracking-widest">
                Showing <span className="text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="text-slate-900">{Math.min(currentPage * itemsPerPage, filteredQuotes.length)}</span> of <span className="text-slate-900">{filteredQuotes.length}</span>
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex-1 sm:flex-none border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:text-[#ffb800] hover:border-[#ffb800] transition-all disabled:opacity-50"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex-1 sm:flex-none border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:text-[#ffb800] hover:border-[#ffb800] transition-all disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {/* 1. Mobile Filters Bottom Sheet */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative bg-white rounded-t-3xl p-6 flex flex-col max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-extrabold text-slate-900 text-xl">Filters</h3>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 bg-slate-50 rounded-full text-slate-500">
                  <X size={20} />
                </button>
              </div>

              <div className="mb-8">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-4">Minimum IDV (Cover Value)</label>
                <div className="flex justify-between text-sm font-bold text-slate-800 mb-3">
                  <span>₹ 3 L</span>
                  <span className="text-[#ffb800]">₹ {(minIdv / 100000).toFixed(1)} L</span>
                </div>
                <input
                  type="range"
                  min="300000" max="800000" step="10000"
                  value={minIdv}
                  onChange={(e) => setMinIdv(Number(e.target.value))}
                  className="w-full accent-[#ffb800]"
                />
              </div>

              <div className="mb-8 border-t border-slate-100 pt-6">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-4">Popular Add-ons</label>
                <div className="space-y-4">
                  {ADDONS_POOL.map(addon => (
                    <label key={addon} className="flex items-center gap-4 cursor-pointer p-1" onClick={(e) => { e.preventDefault(); toggleAddon(addon); }}>
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${selectedAddons.includes(addon) ? 'bg-[#ffb800] border-[#ffb800]' : 'bg-white border-slate-300'}`}>
                        {selectedAddons.includes(addon) && <Check size={16} className="text-white" strokeWidth={3} />}
                      </div>
                      <span className={`text-[15px] font-medium transition-colors ${selectedAddons.includes(addon) ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>
                        {addon}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-extrabold py-5 rounded-xl uppercase tracking-widest text-[13px]"
              >
                Apply {filteredQuotes.length} Quotes
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Edit Details Modal */}
      <AnimatePresence>
        {editModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-extrabold text-slate-900">Edit Details</h3>
                <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Registration Number</label>
                  <input type="text" value={regNumber} onChange={(e) => setRegNumber(e.target.value.toUpperCase())} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 uppercase focus:border-[#ffb800] focus:ring-1 focus:ring-[#ffb800] outline-none transition-all" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Mobile Number</label>
                  <input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:border-[#ffb800] focus:ring-1 focus:ring-[#ffb800] outline-none transition-all" />
                </div>
                <Button onClick={handleEditDetailsUpdate} className="w-full bg-[#ffb800] hover:bg-[#F39C12] text-slate-900 font-extrabold uppercase tracking-widest py-4 rounded-xl mt-2">Update Quotes</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Coverage Details Modal */}
      <AnimatePresence>
        {detailsModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDetailsModalOpen(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">{detailsModalOpen.insurer}</h3>
                  <p className="text-sm font-bold text-slate-500 mt-1">Coverage Breakdown</p>
                </div>
                <button onClick={() => setDetailsModalOpen(null)} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 shadow-sm border border-slate-100"><X size={20} /></button>
              </div>
              <div className="p-6 overflow-y-auto">
                <div className="mb-6 flex justify-between items-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <span className="font-bold text-slate-700">Insured Declared Value (IDV)</span>
                  <span className="font-extrabold text-xl text-slate-900">{detailsModalOpen.idv}</span>
                </div>
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">Included Add-ons</h4>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {detailsModalOpen.features.map((f: string) => (
                    <div key={f} className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg bg-white shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={16} className="text-blue-500" />
                      </div>
                      <span className="font-bold text-slate-700 text-sm">{f}</span>
                    </div>
                  ))}
                  {detailsModalOpen.features.length === 0 && <p className="text-slate-400 text-sm italic">No add-ons selected for this quote.</p>}
                </div>
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">What's Covered</h4>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm font-medium text-slate-600"><CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> Accidents, Fire & Explosion</li>
                  <li className="flex gap-3 text-sm font-medium text-slate-600"><CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> Theft & Malicious Acts</li>
                  <li className="flex gap-3 text-sm font-medium text-slate-600"><CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> Natural & Man-made Calamities</li>
                  <li className="flex gap-3 text-sm font-medium text-slate-600"><CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> Third Party Liability</li>
                </ul>
              </div>
              <div className="p-6 border-t border-slate-100 bg-white flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest block">Total Premium</span>
                  <span className="text-3xl font-extrabold text-slate-900">₹{detailsModalOpen.premium}</span>
                </div>
                <Button onClick={() => { setDetailsModalOpen(null); handleBuyNow(detailsModalOpen); }} className="bg-[#ffb800] hover:bg-[#F39C12] text-slate-900 font-extrabold px-8 py-6 rounded-xl text-[13px] uppercase tracking-widest shadow-sm">
                  Proceed to Buy
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Buy Now Success / Payment Modal */}
      <AnimatePresence>
        {buyModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !buyLoading && paymentStep !== 'processing' && setBuyModalOpen(null)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white rounded-3xl w-full max-w-md p-10 text-center shadow-2xl overflow-hidden">
              {buyLoading ? (
                <div className="flex flex-col items-center py-10">
                  <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-[#ffb800] rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">Connecting to {buyModalOpen.insurer}...</h3>
                  <p className="text-slate-500 font-medium">Please wait while we set up your secure payment gateway.</p>
                </div>
              ) : paymentStep === 'confirm' ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-emerald-100">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                      <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Ready for Checkout!</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-8">
                    Your policy with <strong>{buyModalOpen.insurer}</strong> has been locked in at <strong>₹{buyModalOpen.premium}</strong>.
                  </p>
                  <Button onClick={handleRazorpayCheckout} className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-extrabold uppercase tracking-widest py-4 rounded-xl">
                    Proceed to Payment
                  </Button>
                  <button onClick={() => setBuyModalOpen(null)} className="mt-4 text-sm font-bold text-slate-400 hover:text-slate-600">
                    Cancel
                  </button>
                </motion.div>
              ) : paymentStep === 'processing' ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-10">
                  <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">Processing Payment...</h3>
                  <p className="text-slate-500 font-medium">Please do not close this window.</p>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                  <div className="w-28 h-28 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Payment Successful!</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-6">
                    Transaction ID: TXN{Math.floor(Math.random() * 100000000)}<br/>
                    Your policy documents will be emailed to you shortly.
                  </p>
                  <Button onClick={() => setBuyModalOpen(null)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold uppercase tracking-widest py-4 rounded-xl">
                    Return to Dashboard
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function ViewPricesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <ViewPricesContent />
    </Suspense>
  );
}
