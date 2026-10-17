import React from 'react';
import { MessageCircle, Phone, Mail, Clock, HelpCircle, ShieldCheck } from 'lucide-react';
import { TASTYPICKLE_WHATSAPP_NUMBER } from '../context/CartContext';

export const Contact: React.FC = () => {
  return (
    <div className="py-8 sm:py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-spicered font-accent">
          We are here to help
        </span>
        <h1 className="font-serif text-3xl sm:text-4.5xl font-bold text-stone-900 tracking-tight">
          Contact TastyPickle
        </h1>
        <p className="text-stone-600 text-sm">
          Have a question about our pickle recipes, custom gift boxes, or bulk orders? Reach out to us directly.
        </p>
      </div>

      {/* Main WhatsApp Contact Card */}
      <div className="bg-white rounded-3xl border border-[#E7E2DA] p-8 sm:p-12 shadow-sm text-center max-w-2xl mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-[#25D366]">
          <MessageCircle className="w-8 h-8 fill-emerald-500 stroke-white" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Chat With Us on WhatsApp
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto">
            The quickest way to enquire about prices, place customized orders, or track your shipment.
          </p>
          <p className="text-lg font-bold text-stone-900 tracking-wide pt-1">
            +91 91213 82438
          </p>
        </div>

        <div>
          <a
            href={`https://wa.me/${TASTYPICKLE_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello TastyPickle, I have an enquiry regarding your products.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#25D366] text-white text-sm font-semibold shadow-lg hover:bg-[#1EBE5D] transition-transform active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>

        <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-pickle-700" />
            <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-pickle-700" />
            <span>orders@tastypickle.in</span>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-2xl mx-auto pt-6 space-y-4">
        <div className="flex items-center gap-2 text-stone-900 font-serif text-xl font-bold">
          <HelpCircle className="w-5 h-5 text-pickle-800" />
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-white border border-[#E7E2DA] space-y-1">
            <p className="font-semibold text-stone-900">How do I order TastyPickle?</p>
            <p className="text-stone-600">
              You can explore our pickles, click "Order on WhatsApp" or add items to your basket and click "Order on WhatsApp" to message our dispatch team directly.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E7E2DA] space-y-1">
            <p className="font-semibold text-stone-900">Do you ship across India?</p>
            <p className="text-stone-600">
              Yes, all our pickles are securely sealed in leak-proof food-grade containers and dispatched with express courier partners across India.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E7E2DA] space-y-1">
            <p className="font-semibold text-stone-900">Are there any artificial preservatives or acidity regulators?</p>
            <p className="text-stone-600">
              No. We prepare our pickles using traditional curing methods with pure cold-pressed groundnut oil, salt, and spices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
