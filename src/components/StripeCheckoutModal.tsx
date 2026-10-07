import React, { useState } from 'react';
import { X, Lock, CheckCircle2, CreditCard, ShieldCheck, Tag, ArrowRight } from 'lucide-react';

interface StripeCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    title: string;
    subtitle?: string;
    accessTier?: string;
    type: 'Course' | 'Coaching' | 'Mentorship';
  } | null;
}

export const StripeCheckoutModal: React.FC<StripeCheckoutModalProps> = ({ isOpen, onClose, item }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !item) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'EBVIP2026' || promoCode.trim().toUpperCase() === 'WEALTH') {
      setPromoMessage('VIP Invitation Verified: Priority Admission Granted');
    } else {
      setPromoMessage('Access code verified for executive enrollment');
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    setCardNumber('');
    setExpiry('');
    setCvc('');
    setName('');
    setEmail('');
    setPromoCode('');
    setPromoMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 md:p-8 text-neutral-100 my-8">
        {/* Header Close */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-neutral-800"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Title */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase">
                <Lock className="w-3.5 h-3.5" />
                <span>Executive Enrollment · Encrypted Portal</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mt-1">Complete Enrollment</h3>
              <p className="text-sm text-neutral-400 mt-1">
                Instant access to EB Wealth curriculum & resources upon verification.
              </p>
            </div>

            {/* Order Summary Box */}
            <div className="p-4 bg-neutral-950/80 border border-neutral-800/80 rounded-xl mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-medium">
                    {item.type}
                  </span>
                  <h4 className="text-base font-semibold text-white">{item.title}</h4>
                  {item.subtitle && (
                    <p className="text-xs text-neutral-400 mt-0.5">{item.subtitle}</p>
                  )}
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium text-xs rounded-lg">
                    {item.accessTier || 'Executive Member Pass'}
                  </span>
                </div>
              </div>

              {/* Invitation / Access Code Input */}
              <form onSubmit={handleApplyPromo} className="mt-4 pt-3 border-t border-neutral-800/80 flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="VIP Access Code (e.g. EBVIP2026)"
                    className="w-full bg-neutral-900 border border-neutral-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-medium text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors shrink-0"
                >
                  Verify
                </button>
              </form>
              {promoMessage && (
                <p className="text-xs mt-1.5 text-emerald-400">
                  {promoMessage}
                </p>
              )}
            </div>

            {/* Express Verification Alternative */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handlePay}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white text-black font-semibold text-xs rounded-xl hover:bg-neutral-200 transition-colors shadow-sm"
                >
                  <span className="font-bold">Apple Pay</span>
                </button>
                <button
                  type="button"
                  onClick={handlePay}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 bg-neutral-800 text-white font-semibold text-xs rounded-xl hover:bg-neutral-700 transition-colors border border-neutral-700/80"
                >
                  <span className="font-bold">Google Pay</span>
                </button>
              </div>
              <div className="relative my-4 text-center">
                <hr className="border-neutral-800" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-neutral-900 px-3 text-[11px] text-neutral-500">
                  Or register with corporate card
                </span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handlePay} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name (e.g. Executive Applicant)"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="applicant@example.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <p className="text-[11px] text-neutral-500 mt-1">Portal login credentials and curriculum access pass will be sent here.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Card Details</label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 •••• •••• 4242"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Expiration</label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM / YY"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">CVC</label>
                  <input
                    type="text"
                    required
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="123"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-2 py-3 px-5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Processing Registration Securely...</span>
                ) : (
                  <>
                    <span>Complete Enrollment Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-neutral-500 text-[11px] pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>256-bit TLS Encryption · Executive Discretion · Instant Portal Pass</span>
              </div>
            </form>
          </div>
        ) : (
          /* Payment Success View */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Enrollment Confirmed</h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto mb-6">
              Welcome to EB Wealth. Your membership registration has been securely approved. An onboarding invite and course repository pass have been dispatched.
            </p>

            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between text-neutral-400">
                <span>Confirmation ID:</span>
                <span className="font-mono text-neutral-200">EBW-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Program Enrolled:</span>
                <span className="font-medium text-white">{item.title}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Membership Status:</span>
                <span className="text-emerald-400 font-semibold">Active & Verified</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="py-2.5 px-6 bg-white text-black font-semibold text-xs rounded-xl hover:bg-neutral-200 transition-colors shadow-sm"
            >
              Access Member Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
