import React from 'react';
import { X, ShieldCheck, Lock, BellRing, PhoneCall } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-policy-title"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 id="privacy-policy-title" className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                TastyPickle Privacy Policy
              </h3>
              <p className="text-xs text-slate-500">Your privacy and data security are our top priority</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close Privacy Policy"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-red-600" />
              1. Information We Collect
            </h4>
            <p>
              When you add items to your cart or place an order on TastyPickle, we collect your 10-digit mobile number and shipping address details. We do not require account passwords or unnecessary personal information.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-red-600" />
              2. How We Use Your Number
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Save and recover your shopping cart across browsing sessions.</li>
              <li>Provide real-time order updates, shipping tracking, and delivery notifications via SMS or WhatsApp.</li>
              <li>Provide customer care and resolve address confirmation queries.</li>
            </ul>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <BellRing className="w-4 h-4 text-red-600" />
              3. Marketing & Communication
            </h4>
            <p>
              We only send promotional alerts, seasonal offers, and new pickle launch announcements if you have opted in to receive promotional updates. You can opt out at any time by contacting our support team.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              4. Data Protection & Sharing
            </h4>
            <p>
              TastyPickle does not sell, rent, or trade your contact information with any third-party advertisers. Your information is strictly used for order processing and delivery fulfillment with trusted logistics partners.
            </p>
          </section>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500">
            For any privacy concerns or inquiries, you can reach out directly to TastyPickle support via WhatsApp at <span className="font-bold text-slate-700">+91 91213 82438</span>.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-colors shadow-xs cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
