import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Shield, CheckCircle2, Mail, Phone, MessageSquare, Copy, Check } from 'lucide-react';
import { MentorshipTier } from '../types';
import { notificationService, DispatchResult } from '../services/notificationService';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier?: MentorshipTier;
  tierTitle?: string;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  tier,
  tierTitle: propTierTitle
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [dispatchResult, setDispatchResult] = useState<DispatchResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experienceLevel: 'Complete Beginner (Building first portfolio)',
    primaryGoal: 'Learn UK ISAs, index funds and disciplined compounding',
    biggestBottleneck: '',
    timeCommitment: 'Yes, committed to 2-4 hours per month'
  });

  if (!isOpen) return null;

  const tierTitle = propTierTitle || tier?.title || 'EB Wealth Investment Mentorship';

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await notificationService.dispatchMentorshipApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        experienceLevel: formData.experienceLevel,
        primaryGoal: formData.primaryGoal,
        tierTitle: tierTitle,
        biggestBottleneck: formData.biggestBottleneck,
        timeCommitment: formData.timeCommitment
      });

      setDispatchResult(result);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to dispatch mentorship application', err);
      alert('An error occurred while submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setIsSubmitted(false);
    setDispatchResult(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      experienceLevel: 'Complete Beginner (Building first portfolio)',
      primaryGoal: 'Learn UK ISAs, index funds and disciplined compounding',
      biggestBottleneck: '',
      timeCommitment: 'Yes, committed to 2-4 hours per month'
    });
    onClose();
  };

  const handleCopySummary = () => {
    if (!dispatchResult) return;
    navigator.clipboard.writeText(dispatchResult.summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08231B]/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white border border-stone-200 rounded-xs shadow-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 transition-colors p-1 rounded-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6 pr-8">
              <span className="text-[10px] font-mono font-bold text-[#C5A869] uppercase tracking-widest">
                Admissions Protocol
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2E] mt-1">
                Apply for {tierTitle}
              </h3>
              <p className="text-xs text-stone-600 mt-1.5 font-sans">
                Stage {step} of 3 — Candidate profile and capital objectives. Dossier is dispatched immediately to admissions leadership.
              </p>
            </div>

            <form onSubmit={handleNext} className="space-y-4">
              {step === 1 && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#0D3B2E] mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. David Mitchell"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xs text-xs sm:text-sm text-[#0D3B2E] focus:outline-none focus:border-[#C5A869]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#0D3B2E] mb-1">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="david@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xs text-xs sm:text-sm text-[#0D3B2E] focus:outline-none focus:border-[#C5A869]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#0D3B2E] mb-1">
                      Mobile Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+44 7911 123456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xs text-xs sm:text-sm text-[#0D3B2E] focus:outline-none focus:border-[#C5A869]"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#0D3B2E] mb-1">
                      Current Investing Experience *
                    </label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xs text-xs sm:text-sm text-[#0D3B2E] focus:outline-none focus:border-[#C5A869]"
                    >
                      <option value="Complete Beginner (Building first portfolio)">Complete Beginner (Building first portfolio)</option>
                      <option value="Early-Stage Investor (Own 1-2 funds/stocks, want structure)">Early-Stage Investor (Own 1-2 funds/stocks, want structure)</option>
                      <option value="Active Investor (Seeking deep company analysis & asset allocation)">Active Investor (Seeking deep company analysis & asset allocation)</option>
                      <option value="Business Owner / High-Earner (Optimizing corporate cash & personal wealth)">Business Owner / High-Earner (Optimizing corporate cash & personal wealth)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#0D3B2E] mb-1">
                      Primary Strategic Objective *
                    </label>
                    <select
                      value={formData.primaryGoal}
                      onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xs text-xs sm:text-sm text-[#0D3B2E] focus:outline-none focus:border-[#C5A869]"
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
                    <label className="block text-xs font-mono font-semibold text-[#0D3B2E] mb-1">
                      What is your foremost investment obstacle?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Overwhelmed by jargon, fee ambiguity, panic during market drawdowns..."
                      value={formData.biggestBottleneck}
                      onChange={(e) => setFormData({ ...formData, biggestBottleneck: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xs text-xs text-[#0D3B2E] focus:outline-none focus:border-[#C5A869]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#0D3B2E] mb-1">
                      Can you commit 2–4 hours per month to study and cohorts? *
                    </label>
                    <select
                      value={formData.timeCommitment}
                      onChange={(e) => setFormData({ ...formData, timeCommitment: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xs text-xs sm:text-sm text-[#0D3B2E] focus:outline-none focus:border-[#C5A869]"
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
                    className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-[#0D3B2E] font-medium text-xs rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-[#0D3B2E] hover:bg-[#124E3F] text-[#FAF9F5] font-medium text-xs sm:text-sm rounded-xs border border-[#C5A869]/50 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Dispatching Application...'
                  ) : step < 3 ? (
                    <>
                      <span>Continue to Next Step</span>
                      <ArrowRight className="w-4 h-4 text-[#C5A869]" />
                    </>
                  ) : (
                    'Submit Application & Dispatch Dossier'
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1 font-mono">
                <Shield className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Admissions dossier dispatched immediately to executive email & phone.</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-2 text-center space-y-4">
            <div className="w-14 h-14 bg-[#FAF5E8] border border-[#C5A869]/50 rounded-xs flex items-center justify-center mx-auto text-[#0D3B2E]">
              <CheckCircle2 className="w-8 h-8 text-[#0D3B2E]" />
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-[#C5A869] uppercase tracking-widest">
                Application Successfully Dispatched
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2E] mt-1">
                Dossier Received & Dispatched
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed font-sans">
                Thank you, <strong className="text-[#0D3B2E]">{formData.name}</strong>. Your intake application for <strong className="text-[#0D3B2E]">{tierTitle}</strong> has been transmitted to admissions leadership.
              </p>
            </div>

            {/* Direct Dispatch Proof Card */}
            {dispatchResult && (
              <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xs text-left text-xs space-y-2.5 font-mono">
                <div className="flex items-center justify-between text-[11px] text-stone-500 pb-2 border-b border-stone-200">
                  <span className="font-semibold text-[#0D3B2E]">Lead ID: {dispatchResult.leadId}</span>
                  <span>{dispatchResult.timestamp}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <Mail className="w-4 h-4 text-[#C5A869] shrink-0" />
                  <span className="truncate">Sent to Company Email: <strong className="text-[#0D3B2E]">{dispatchResult.dispatchedToEmail}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <Phone className="w-4 h-4 text-[#0D3B2E] shrink-0" />
                  <span>Sent to Company Phone: <strong className="text-[#0D3B2E]">{dispatchResult.dispatchedToPhone}</strong></span>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href={dispatchResult.whatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-[130px] py-2 px-3 bg-[#0D3B2E] hover:bg-[#124E3F] text-white font-medium text-xs rounded-xs flex items-center justify-center gap-1.5 transition-colors border border-[#C5A869]/40"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span>WhatsApp Direct</span>
                  </a>
                  <a
                    href={dispatchResult.mailtoUrl}
                    className="flex-1 min-w-[130px] py-2 px-3 bg-white border border-stone-300 hover:bg-stone-50 text-[#0D3B2E] font-medium text-xs rounded-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span>Open Email Client</span>
                  </a>
                  <button
                    onClick={handleCopySummary}
                    className="py-2 px-3 bg-white border border-stone-300 hover:bg-stone-50 text-[#0D3B2E] font-medium text-xs rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
                className="w-full py-2.5 bg-[#0D3B2E] hover:bg-[#124E3F] text-white font-medium text-xs rounded-xs transition-colors cursor-pointer border border-[#C5A869]/50"
              >
                Close & Return to Overview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
