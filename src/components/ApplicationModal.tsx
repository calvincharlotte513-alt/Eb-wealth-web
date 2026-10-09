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
  tierTitle = 'Growth Mentorship'
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs p-3 sm:p-6 flex items-start justify-center pt-8 sm:pt-14 pb-12">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 md:p-8 text-[#0F172A] my-auto animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-100 cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6 pr-8">
              <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider">
                Investment Mentorship Admissions
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#17202A] mt-1">
                Apply for {tierTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#52606D] mt-1.5">
                Step {step} of 3 — Tell us about your investment background and targets. Details are immediately dispatched to our admissions team.
              </p>
            </div>

            <form onSubmit={handleNext} className="space-y-4">
              {step === 1 && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-semibold text-[#17202A] mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. David Mitchell"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#17202A] mb-1">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="david@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#17202A] mb-1">
                      Mobile Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+44 7911 123456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-semibold text-[#17202A] mb-1">
                      Current Investing Experience *
                    </label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                    >
                      <option value="Complete Beginner (Building first portfolio)">Complete Beginner (Building first portfolio)</option>
                      <option value="Early-Stage Investor (Own 1-2 funds/stocks, want structure)">Early-Stage Investor (Own 1-2 funds/stocks, want structure)</option>
                      <option value="Active Investor (Seeking deep company analysis & asset allocation)">Active Investor (Seeking deep company analysis & asset allocation)</option>
                      <option value="Business Owner / High-Earner (Optimizing corporate cash & personal wealth)">Business Owner / High-Earner (Optimizing corporate cash & personal wealth)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#17202A] mb-1">
                      Primary Goal for Mentorship *
                    </label>
                    <select
                      value={formData.primaryGoal}
                      onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                    >
                      <option value="Learn UK ISAs, index funds and disciplined compounding">Learn UK ISAs, index funds and disciplined compounding</option>
                      <option value="Build a resilient, diversified multi-asset portfolio">Build a resilient, diversified multi-asset portfolio</option>
                      <option value="Learn fundamental analysis (evaluating stocks and balance sheets)">Learn fundamental analysis (evaluating stocks and balance sheets)</option>
                      <option value="Develop accountability, consistency, and eliminate speculation">Develop accountability, consistency, and eliminate speculation</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-semibold text-[#17202A] mb-1">
                      What is your biggest current investing challenge?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Overwhelmed by financial jargon, unsure which platform to choose, afraid of market drops..."
                      value={formData.biggestBottleneck}
                      onChange={(e) => setFormData({ ...formData, biggestBottleneck: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#17202A] mb-1">
                      Can you commit 2–4 hours per month to education and strategy calls? *
                    </label>
                    <select
                      value={formData.timeCommitment}
                      onChange={(e) => setFormData({ ...formData, timeCommitment: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                    >
                      <option value="Yes, committed to 2-4 hours per month">Yes, fully committed</option>
                      <option value="Yes, flexible schedule">Yes, flexible schedule</option>
                      <option value="Unsure, need part-time schedule">Unsure, need part-time schedule</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-[#17202A] font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Dispatching Application...'
                  ) : step < 3 ? (
                    <>
                      <span>Continue to Next Step</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    'Submit Application & Dispatch Details'
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#52606D] pt-1">
                <Shield className="w-3.5 h-3.5 text-[#00A878]" />
                <span>Admissions details sent immediately to company email & phone upon submission.</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-2 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider">
                Application Dispatched Immediately
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#17202A] mt-1">
                Application Submitted & Dispatched
              </h3>
              <p className="text-xs sm:text-sm text-[#52606D] mt-2 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#17202A]">{formData.name}</strong>. Your intake application for <strong className="text-[#17202A]">{tierTitle}</strong> has been automatically dispatched directly to our admissions office.
              </p>
            </div>

            {/* Direct Dispatch Proof Card */}
            {dispatchResult && (
              <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-left text-xs space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-slate-200">
                  <span className="font-mono font-semibold text-[#2563EB]">Lead ID: {dispatchResult.leadId}</span>
                  <span>{dispatchResult.timestamp}</span>
                </div>
                <div className="flex items-center gap-2 text-[#17202A]">
                  <Mail className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span className="truncate">Sent to Company Email: <strong>{dispatchResult.dispatchedToEmail}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-[#17202A]">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sent to Company Phone: <strong>{dispatchResult.dispatchedToPhone}</strong></span>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href={dispatchResult.whatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-[130px] py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Direct</span>
                  </a>
                  <a
                    href={dispatchResult.mailtoUrl}
                    className="flex-1 min-w-[130px] py-2 px-3 bg-[#2563EB] hover:bg-blue-700 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open Email Client</span>
                  </a>
                  <button
                    onClick={handleCopySummary}
                    className="py-2 px-3 bg-white border border-slate-300 hover:bg-slate-50 text-[#17202A] font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Summary'}</span>
                  </button>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={resetAndClose}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close & Return to Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
