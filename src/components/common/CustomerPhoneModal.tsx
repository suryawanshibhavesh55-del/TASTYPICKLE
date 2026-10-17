import React, { useState } from 'react';
import { X, Phone, Lock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface CustomerPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (phone: string, marketingConsent: boolean) => Promise<boolean>;
  onOpenPrivacyPolicy: () => void;
}

export const CustomerPhoneModal: React.FC<CustomerPhoneModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onOpenPrivacyPolicy,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and limit to 10 digits
    const clean = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(clean);
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate 10-digit Indian mobile starting with 6, 7, 8, or 9
    if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit Indian mobile number (starts with 6-9)');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const success = await onSubmit(phoneNumber, marketingConsent);
      if (!success) {
        setError('Unable to save your number. Please try again.');
      }
    } catch (err: any) {
      setError(err?.message || 'Unable to save your number. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="phone-modal-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10 cursor-pointer"
          aria-label="Close"
          disabled={isSubmitting}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Decorative Banner */}
        <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <h3
            id="phone-modal-title"
            className="text-xl sm:text-2xl font-black tracking-tight leading-tight"
          >
            Enter your mobile number to continue
          </h3>
          <p className="text-red-100 text-xs sm:text-sm mt-1.5 leading-relaxed font-medium">
            Your number helps us save your cart and assist with your orders.
          </p>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
          {/* Phone Input with +91 Prefix */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Mobile Number
            </label>
            <div className="relative flex items-center">
              {/* Country Flag & Code */}
              <div className="absolute left-3.5 flex items-center gap-1.5 pointer-events-none text-slate-700 font-bold text-sm sm:text-base border-r border-slate-200 pr-2.5">
                <span className="text-base" role="img" aria-label="India flag">🇮🇳</span>
                <span>+91</span>
              </div>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                autoFocus
                disabled={isSubmitting}
                placeholder="98765 43210"
                value={phoneNumber}
                onChange={handleInputChange}
                className={`w-full pl-24 pr-4 py-3 rounded-2xl border text-base font-semibold tracking-wide transition-all focus:outline-none focus:ring-2 ${
                  error
                    ? 'border-red-400 bg-red-50/30 focus:border-red-600 focus:ring-red-100'
                    : 'border-slate-300 bg-slate-50/50 hover:border-slate-400 focus:border-red-600 focus:ring-red-100 focus:bg-white'
                }`}
              />
            </div>
            {error && (
              <p className="text-xs text-red-600 mt-2 font-semibold flex items-center gap-1">
                <span>⚠️</span> {error}
              </p>
            )}
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1 font-medium">
              <Lock className="w-3 h-3 text-slate-400 shrink-0" />
              <span>We never share your number or spam you. No password required.</span>
            </p>
          </div>

          {/* Marketing Consent Optional Checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              disabled={isSubmitting}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer accent-red-600"
            />
            <span className="text-xs text-slate-600 group-hover:text-slate-900 leading-snug">
              Receive special offers, festive discounts, and order updates on WhatsApp & SMS (optional)
            </span>
          </label>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={isSubmitting || phoneNumber.length < 10}
            className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm tracking-wide text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              phoneNumber.length === 10 && !isSubmitting
                ? 'bg-red-600 hover:bg-red-700 active:scale-[0.99] shadow-red-600/25'
                : 'bg-slate-300 cursor-not-allowed shadow-none'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </span>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Privacy Policy Link */}
          <div className="text-center pt-1 border-t border-slate-100">
            <button
              type="button"
              onClick={onOpenPrivacyPolicy}
              className="text-xs text-slate-500 hover:text-red-700 underline font-medium cursor-pointer transition-colors"
            >
              TastyPickle Privacy Policy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
