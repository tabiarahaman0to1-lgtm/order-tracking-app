import React, { useState } from 'react';
import { 
  FiPackage, FiClock, FiTruck, FiCheckCircle, FiMapPin, 
  FiPhone, FiSearch, FiChevronRight, FiAlertCircle, 
  FiShield, FiStar, FiAlertTriangle, FiHelpCircle 
} from 'react-icons/fi';

// বিভিন্ন অবস্থার ডামি অর্ডার ডেটা
const mockOrders = {
  normal: {
    orderId: "ORD-98234",
    status: "out_for_delivery",
    title: "স্বাভাবিক ট্র্যাকিং অবস্থা (Normal / In-Progress)",
    estimatedDelivery: "আজ, বিকেল ০৪:৩০ মিনিট - ০৫:৩০ মিনিট",
    placedDate: "২৪ সেপ্টেম্বর, ২০২৬",
    totalAmount: "৳ ১,৪৫০",
    paymentMethod: "ক্যাশ অন ডেলিভারি (COD)",
    shippingAddress: "বাসা # ১২, রোড # ৪, ধানমন্ডি, ঢাকা - ১২০৯",
    items: [
      { id: 1, name: "প্রিমিয়াম কটন ক্যাজুয়াল শার্ট", quantity: 1, price: "৳ ১,২০০", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=150&q=80" },
      { id: 2, name: "কটন মাস্ক (কম্বো প্যাক)", quantity: 1, price: "৳ ২৫০", image: "https://images.unsplash.com/photo-1584467735811-628d08359b7d?auto=format&fit=crop&w=150&q=80" }
    ],
    deliveryPartner: { name: "রহিম উদ্দিন", phone: "+৮৮০ ১৭০০-১১২২৩৪", vehicle: "মোটরসাইকেল", rating: "৪.৮" },
    timeline: [
      { title: "অর্ডার কনফার্ম হয়েছে", time: "সকাল ১০:১৫", desc: "গ্রহণ করা হয়েছে।", completed: true },
      { title: "প্যাকেজিং সম্পন্ন", time: "দুপুর ০১:০০", desc: "প্যাকেজ প্রস্তুত।", completed: true },
      { title: "ডেলিভারি ম্যানের কাছে", time: "দুপুর ০৩:১৫", desc: "রাইডার রওয়ানা হয়েছেন।", completed: true, active: true },
      { title: "ডেলিভারি সম্পন্ন", time: "আসছে...", desc: "পণ্য পৌঁছাবে।", completed: false }
    ]
  },
  delayed: {
    orderId: "ORD-55410",
    status: "delayed",
    title: "ডিলয়েড অর্ডার (Delayed Order)",
    estimatedDelivery: "বিলম্বিত (পূর্বনির্ধারিত সময় পার হয়েছে)",
    placedDate: "২২ সেপ্টেম্বর, ২০২৬",
    totalAmount: "৳ ২,৮০০",
    paymentMethod: "অনলাইন পেমেন্ট",
    shippingAddress: "হাউস # ৪৫, সেক্টর # ৩, উত্তরা, ঢাকা",
    items: [
      { id: 1, name: "লেদার ওয়ালেট ও বেল্ট কম্বো", quantity: 1, price: "৳ ২,৮০০", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=150&q=80" }
    ],
    deliveryPartner: { name: "জাকির হোসেন", phone: "+৮৮০ ১৬০০-৩৩৪৪৫৬", vehicle: "ডেলিভারি ভ্যান", rating: "৪.২" },
    timeline: [
      { title: "অর্ডার কনফার্ম", time: "২২ সেপ্টেম্বর", desc: "সম্পন্ন।", completed: true },
      { title: "কুরিয়ারে হস্তান্তর", time: "২৩ সেপ্টেম্বর", desc: "হাবে রয়েছে।", completed: true },
      { title: "অতিরিক্ত বিলম্ব (Delayed)", time: "জরুরী নোটিশ", desc: "অতিরিক্ত ট্রাফিকের কারণে ডেলিভারি দিতে একটু দেরি হচ্ছে। আমরা আন্তরিকভাবে দুঃখিত।", completed: false, isError: true }
    ]
  },
  delivered_dispute: {
    orderId: "ORD-33219",
    status: "delivered_dispute",
    title: "ডেলিভারি দেখানো হয়েছে কিন্তু পাওয়া যায়নি (Delivered but Not Received)",
    estimatedDelivery: "ডেলিভারি সম্পন্ন দেখানো হয়েছে",
    placedDate: "২০ সেপ্টেম্বর, ২০২৬",
    totalAmount: "৳ ৯৫০",
    paymentMethod: "বিকাশ",
    shippingAddress: "রোড # ৭, বনানী, ঢাকা",
    items: [
      { id: 1, name: "স্মার্ট ফিটনেস ব্যান্ড", quantity: 1, price: "৳ ৯৫০", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=150&q=80" }
    ],
    deliveryPartner: { name: "বলরাম দাস", phone: "+৮৮০ ১৯০০-১১২২৩৩", vehicle: "বাইলক", rating: "৪.৫" },
    timeline: [
      { title: "ডেলিভারি সম্পন্ন", time: "গতকাল দুপুর ২:০০ টা", desc: "সিস্টেম অনুযায়ী ডেলিভারি সফল দেখানো হয়েছে।", completed: true }
    ]
  },
  no_tracking: {
    orderId: "ORD-11092",
    status: "no_tracking",
    title: "ট্র্যাকিং তথ্য এখনো নেই (Tracking Not Available Yet)",
    estimatedDelivery: "খুব শীঘ্রই আপডেট করা হবে",
    placedDate: "আজ, মাত্রই অর্ডারকৃত",
    totalAmount: "৳ ৫,২০০",
    paymentMethod: "ক্যাশ অন ডেলিভারি",
    shippingAddress: "ধানমন্ডি ২৭, ঢাকা",
    items: [
      { id: 1, name: "প্রিমিয়াম উইন্টার হুডি", quantity: 1, price: "৳ ৫,২০০", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=150&q=80" }
    ],
    deliveryPartner: { name: "নির্ধারণ করা হয়নি", phone: "প্রযোজ্য নয়", vehicle: "প্রক্রিয়াধীন", rating: "N/A" },
    timeline: [
      { title: "অর্ডার রিসিভড", time: "এইমাত্র", desc: "আপনার অর্ডারটি সফলভাবে আমাদের সিস্টেমে এন্ট্রি হয়েছে। ভেন্ডর প্যাকেজিং শুরু করলে ট্র্যাকিং লাইভ হবে।", completed: true, active: true }
    ]
  }
};

export default function OrderTrackingScreen() {
  const [selectedState, setSelectedState] = useState("normal");
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [disputeReported, setDisputeReported] = useState(false);
  const currentOrder = mockOrders[selectedState];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-12">
      {/* টপ হেডার */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-indigo-600 text-white p-2 rounded-xl shadow">
              <FiPackage className="text-lg" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900">অর্ডার ট্র্যাকিং স্ক্রিন</h1>
              <p className="text-[11px] text-slate-500">রেসপন্সিভ মোবাইল ভিউ (360px - 430px)</p>
            </div>
          </div>
          <button 
            onClick={() => setShowSupportModal(true)}
            className="text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-medium px-3 py-1.5 rounded-lg transition flex items-center gap-1"
          >
            <FiHelpCircle /> সাপোর্ট
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 mt-4 space-y-4">
        
        {/* অ্যাসাইনমেন্টের ৩টি স্পেশাল স্টেট টেস্ট করার জন্য সুইচিং ট্যাব */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <label className="text-xs font-bold text-indigo-600 uppercase tracking-wide block mb-2">
            ⭐ অ্যাসাইনমেন্ট সিনারিও সিলেক্ট করুন:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setSelectedState("normal")}
              className={`text-xs py-2 px-3 rounded-xl font-medium transition text-left ${selectedState === 'normal' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              1. নরমাল / রানিং
            </button>
            <button 
              onClick={() => setSelectedState("delayed")}
              className={`text-xs py-2 px-3 rounded-xl font-medium transition text-left ${selectedState === 'delayed' ? 'bg-amber-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              2. ডিলয়েড অর্ডার
            </button>
            <button 
              onClick={() => setSelectedState("delivered_dispute")}
              className={`text-xs py-2 px-3 rounded-xl font-medium transition text-left ${selectedState === 'delivered_dispute' ? 'bg-rose-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              3. পাইনি (Dispute)
            </button>
            <button 
              onClick={() => setSelectedState("no_tracking")}
              className={`text-xs py-2 px-3 rounded-xl font-medium transition text-left ${selectedState === 'no_tracking' ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              4. ট্র্যাকিং নেই
            </button>
          </div>
        </div>

        {/* স্পেশাল স্ট্যাটাস ব্যানার (Delayed / Dispute / No Tracking Alert) */}
        {selectedState === 'delayed' && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-900 shadow-sm flex items-start gap-3">
            <FiAlertTriangle className="text-amber-600 text-xl flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide text-amber-800">ডেলিভারিতে বিলম্ব হয়েছে</h4>
              <p className="text-xs mt-1 text-amber-700">অতিরিক্ত ট্রাফিক বা আবহাওয়া সমস্যার কারণে আপনার পণ্যটি পৌঁছাতে একটু বেশি সময় লাগছে। রাইডার বা সাপোর্টের সাথে কথা বলুন।</p>
            </div>
          </div>
        )}

        {selectedState === 'delivered_dispute' && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-900 shadow-sm">
            <div className="flex items-start gap-3">
              <FiAlertCircle className="text-rose-600 text-xl flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-xs font-bold uppercase tracking-wide text-rose-800">পণ্য পাননি অথচ ডেলিভারি দেখাচ্ছে?</h4>
                <p className="text-xs mt-1 text-rose-700">যদি আপনি পণ্য হাতে না পেয়ে থাকেন, তবে নিচের বাটনে ক্লিক করে আমাদের জানান। আমরা দ্রুত তদন্ত করব।</p>
                {disputeReported ? (
                  <span className="inline-block mt-3 bg-emerald-100 text-emerald-800 text-xs font-medium px-3 py-1 rounded-lg">
                    ✓ আপনার অভিযোগ সফলভাবে রেজিস্টার্ড হয়েছে।
                  </span>
                ) : (
                  <button 
                    onClick={() => setDisputeReported(true)}
                    className="mt-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium px-4 py-2 rounded-xl transition shadow"
                  >
                    রিপোর্ট করুন (পণ্য পাইনি)
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedState === 'no_tracking' && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-blue-900 shadow-sm flex items-start gap-3">
            <FiClock className="text-blue-600 text-xl flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide text-blue-800">ট্র্যাকিং তথ্য প্রস্তুত হচ্ছে</h4>
              <p className="text-xs mt-1 text-blue-700">আপনার অর্ডার সফলভাবে প্লেস হয়েছে। ভেন্ডর প্যাকেজ হ্যান্ডওভার করলেই রিয়েল-টাইম লাইভ ম্যাপ ও লোকেশন দেখতে পাবেন।</p>
            </div>
          </div>
        )}

        {/* মূল অর্ডার সামারি কার্ড */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-indigo-600">{currentOrder.orderId}</span>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">{currentOrder.title}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">তারিখ: {currentOrder.placedDate}</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-400">মূল্য</span>
              <p className="text-sm font-bold text-slate-900">{currentOrder.totalAmount}</p>
            </div>
          </div>

          {/* ডেলিভারি টাইম */}
          <div className="mt-3 bg-slate-50 rounded-xl p-3 flex items-center justify-between border border-slate-100">
            <div>
              <p className="text-[11px] text-slate-500 font-medium">ডেলিভারির সময়সীমা</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{currentOrder.estimatedDelivery}</p>
            </div>
            <FiClock className="text-indigo-600 text-lg" />
          </div>

          {/* পণ্যের তালিকা */}
          <div className="mt-4">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">অর্ডারকৃত পণ্য</h4>
            <div className="space-y-2">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-100">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg border border-slate-200" />
                  <div className="flex-1">
                    <h5 className="text-xs font-bold text-slate-800">{item.name}</h5>
                    <p className="text-[11px] text-slate-500">পরিমাণ: {item.quantity}টি</p>
                  </div>
                  <span className="text-xs font-bold text-slate-900">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* টাইমলাইন বা প্রোগ্রেস সেকশন */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-4 flex items-center gap-1.5">
            <FiTruck className="text-indigo-600" /> ডেলিভারি প্রোগ্রেস ও টাইমলাইন
          </h3>
          
          <div className="relative pl-5 border-l-2 border-indigo-100 space-y-6 ml-2">
            {currentOrder.timeline.map((step, idx) => (
              <div key={idx} className="relative">
                <div className={`absolute -left-[27px] top-0 w-3.5 h-3.5 rounded-full border-2 ${step.isError ? 'bg-amber-500 border-amber-500' : step.completed ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300'}`}></div>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs font-bold ${step.completed || step.isError ? 'text-slate-900' : 'text-slate-400'}`}>{step.title}</h4>
                    <span className="text-[10px] text-slate-400 font-medium">{step.time}</span>
                  </div>
                  <p className={`text-[11px] mt-0.5 ${step.isError ? 'text-amber-700 font-medium' : 'text-slate-500'}`}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ডেলিভারি পার্টনার ও ঠিকানা */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
          <div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">ডেলিভারি রাইডার</h4>
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-900">{currentOrder.deliveryPartner.name}</p>
                <p className="text-[11px] text-slate-500">গাড়ি: {currentOrder.deliveryPartner.vehicle}</p>
              </div>
              {currentOrder.deliveryPartner.phone !== "প্রযোজ্য নয়" && (
                <a 
                  href={`tel:${currentOrder.deliveryPartner.phone}`} 
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 p-2 rounded-lg text-xs font-medium transition flex items-center gap-1"
                >
                  <FiPhone /> কল
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">শিপিং ঠিকানা</h4>
            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2">
              <FiMapPin className="text-indigo-600 flex-shrink-0" /> {currentOrder.shippingAddress}
            </p>
          </div>
        </div>

      </main>

      {/* সাপোর্ট মডাল */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-1">সাপোর্ট ও সহায়তা</h3>
            <p className="text-xs text-slate-500 mb-4">যেকোনো প্রয়োজনে আমাদের হটলাইনে যোগাযোগ করুন:</p>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
              <p className="text-[11px] text-slate-400">হটলাইন নম্বর</p>
              <p className="text-xs font-bold text-slate-800">০৯৬১২-৩৪৪৫৬৭ (সকাল ৯টা - রাত ১০টা)</p>
            </div>
            <button 
              onClick={() => setShowSupportModal(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-xl text-xs font-medium transition"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}