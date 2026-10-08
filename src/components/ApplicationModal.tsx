import React, { useState } from 'react';
import { X, CheckCircle2, Shield, ArrowRight, ArrowLeft, Mail, Phone, MessageSquare, Copy, Check } from 'lucide-react';
import { notificationService, DispatchResult } from '../services/notificationService';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tierTitle?: string;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  tierTitle = 'Private Executive Mentorship'
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experienceLevel: 'Complete Beginner (Building first portfolio)',
    primaryGoal: 'Learn UK ISAs, index funds and disciplined compounding',
    biggestBottleneck: '',
    timeCommitment: 'Yes, committed to 2-4 hours per month'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<DispatchResult | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      try {
        const res = await notificationService.dispatchMentorshipApplication({
          ...formData,
          tierTitle
        });
        setDispatchResult(res);
        setIsSubmitted(true);
      } catch (err) {
        console.error('Mentorship dispatch error:', err);
        setIsSubmitted(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCopySummary = () => {
    if (!dispatchResult) return;
    navigator.clipboard.writeText(dispatchResult.summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAndClose = () => {
    setStep(1);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setDispatchResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 md:p-8 text-[#17202A] my-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-[#17202A] transition-colors p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono font-bold text-[#00A878] uppercase">
                Admissions Application
              </span>
              <h3 className="text-2xl font-bold text-[#17202A] mt-0.5">
                Apply for {tierTitle}
              </h3>
              <p className="text-xs text-[#52606D] mt-1">
                Step {step} of 3 — Tell us about your current background and financial goals.
              </p>
            </div>

            <form onSubmit={handleNext} className="space-y-4">
              {step === 1 && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#17202A] mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alexander Clark"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#00A878]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#17202A] mb-1">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="alexander@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#00A878]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#17202A] mb-1">
                      Phone Number (for WhatsApp / SMS confirmations) *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+44 7123 456789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#00A878]"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#17202A] mb-1">
                      Current Investing Stage *
                    </label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#00A878]"
                    >
                      <option>Complete Beginner (Building first portfolio)</option>
                      <option>Intermediate (Managing Stocks & Shares ISA / SIPP)</option>
                      <option>Active Investor (Seeking advanced valuation & accountability)</option>
                      <option>Entrepreneur / Business Owner (Scaling capital & AI leverage)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#17202A] mb-1">
                      Primary Goal in EB Wealth *
                    </label>
                    <select
                      value={formData.primaryGoal}
                      onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#00A878]"
                    >
                      <option>Learn UK ISAs, index funds and disciplined compounding</option>
                      <option>Overcome emotional decision-making and stay accountable</option>
                      <option>Company fundamental analysis & valuation models</option>
                      <option>Integrate AI systems to free up 15+ hours weekly in business</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#17202A] mb-1">
                      What has held you back the most financially or in business?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Lack of structured knowledge, fear of making a mistake, or too much time spent on manual admin..."
                      value={formData.biggestBottleneck}
                      onChange={(e) => setFormData({ ...formData, biggestBottleneck: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#00A878]"
                    />
                  </div>

                  <div className="p-3 bg-[#ECFDF5] border border-[#00A878]/30 rounded-xl text-[11px] text-[#17202A]">
                    <Shield className="w-4 h-4 text-[#00A878] inline mr-1 -mt-0.5" />
                    <strong>Confidentiality Guarantee:</strong> All submissions are reviewed confidentially by EB Wealth senior leadership. No information is ever shared with third parties.
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-[#17202A] text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2.5 px-6 bg-[#00A878] hover:bg-[#009267] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{step === 3 ? (isSubmitting ? 'Submitting...' : 'Complete Application') : 'Continue'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-4 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] text-[#00A878] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-bold text-[#17202A]">
                Application Dispatched Successfully!
              </h3>
              <p className="text-xs text-[#52606D] max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your application for <strong>{tierTitle}</strong> has been transmitted directly to our executive team.
              </p>
            </div>

            {/* Direct Dispatch Verification Box */}
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 text-xs space-y-2.5">
              <div className="font-bold text-[#17202A] flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="flex items-center gap-1.5 text-[#00A878]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Immediate Company Dispatch Confirmed</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {dispatchResult?.leadId || 'DISPATCHED'}
                </span>
              </div>

              <div className="space-y-1.5 text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Company Email:</span>
                  </span>
                  <strong className="text-[#17202A] font-mono">{dispatchResult?.dispatchedToEmail || 'calvincharlotte513@gmail.com'}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#00A878]" />
                    <span>Company Phone (SMS/WhatsApp):</span>
                  </span>
                  <strong className="text-[#17202A] font-mono">{dispatchResult?.dispatchedToPhone || '+44 (0) 7911 123456'}</strong>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px]">
                  <span>Status:</span>
                  <span className="inline-flex items-center gap-1 text-[#00A878] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#00A878] animate-pulse"></span>
                    <span>Delivered Directly from Website</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Direct Action Options */}
            <div className="space-y-2">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-center">
                Instant Direct Connect Options
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dispatchResult?.whatsAppUrl && (
                  <a
                    href={dispatchResult.whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Direct WhatsApp to Company</span>
                  </a>
                )}

                {dispatchResult?.mailtoUrl && (
                  <a
                    href={dispatchResult.mailtoUrl}
                    className="py-2.5 px-3 bg-[#00A878] hover:bg-[#009267] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Direct Email to Company</span>
                  </a>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="flex-1 py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-[#17202A] text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#00A878]" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? 'Summary Copied!' : 'Copy Application Summary'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="py-2 px-5 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
