import React, { useState } from 'react';
import { X, CheckCircle2, Shield, ArrowRight, ArrowLeft } from 'lucide-react';

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
    company: '',
    netWorth: '$500,000 – $2,000,000',
    primaryGoal: 'Portfolio Diversification & Private Equity Alpha',
    biggestBottleneck: '',
    timeCommitment: 'Yes, 4-6 hours per month committed'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1000);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetAndClose = () => {
    setStep(1);
    setIsSubmitted(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 md:p-8 text-neutral-100 my-8">
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-neutral-800"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
                <Shield className="w-3.5 h-3.5" />
                <span>Executive Admissions · Vetted Admissions Only</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
                Apply for {tierTitle}
              </h3>
              <p className="text-sm text-neutral-400 mt-1">
                We maintain an intimate roster to ensure direct advisory depth and institutional confidentiality.
              </p>

              {/* Progress dots */}
              <div className="flex items-center gap-2 mt-4">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step >= s ? 'w-10 bg-gradient-to-r from-emerald-500 to-amber-500' : 'w-6 bg-neutral-800'
                    }`}
                  />
                ))}
                <span className="text-xs text-neutral-400 ml-2">Step {step} of 3</span>
              </div>
            </div>

            <form onSubmit={handleNext} className="space-y-4">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Liquid Investable Capital / Net Worth Bracket
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        '$100,000 – $500,000 (Emerging Capital Allocator)',
                        '$500,000 – $2,000,000 (Accredited High Earner)',
                        '$2,000,000 – $5,000,000 (High-Net-Worth Founder)',
                        '$5,000,000+ (Family Office / Enterprise Operator)'
                      ].map((bracket) => (
                        <button
                          key={bracket}
                          type="button"
                          onClick={() => setFormData({ ...formData, netWorth: bracket })}
                          className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                            formData.netWorth === bracket
                              ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-sm'
                              : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                          }`}
                        >
                          {bracket}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Time & Execution Commitment
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        'Yes, 4-6 hours per month committed',
                        'I have 8+ hours/month and desire accelerated transformation',
                        'Representing family office / business leadership team'
                      ].map((tc) => (
                        <button
                          key={tc}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeCommitment: tc })}
                          className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                            formData.timeCommitment === tc
                              ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-sm'
                              : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                          }`}
                        >
                          {tc}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Primary Strategic Objective
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        'Portfolio Diversification & Private Equity Alpha',
                        'Corporate Restructuring, Holding Entities & Tax Protection',
                        'AI Enterprise Systems & Revenue Automation for My Company',
                        'Pre-Exit Wealth Blueprint & Capital Preservation'
                      ].map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => setFormData({ ...formData, primaryGoal: goal })}
                          className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                            formData.primaryGoal === goal
                              ? 'border-amber-500 bg-amber-500/10 text-white shadow-sm'
                              : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                          }`}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                      What is your single biggest bottleneck or risk concern today?
                    </label>
                    <textarea
                      rows={3}
                      value={formData.biggestBottleneck}
                      onChange={(e) => setFormData({ ...formData, biggestBottleneck: e.target.value })}
                      placeholder="e.g., Too much cash in low-yield accounts, high tax drag, need AI automation to scale business without burning out..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Full Name (e.g. Executive Candidate)"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">Corporate or Personal Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="executive@company.com"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">Direct Phone / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">Current Company, Firm, or Role</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Founder / Senior Executive / Real Estate Investor"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-400 text-xs">
                    <p>
                      <strong>Strict Non-Disclosure Guarantee:</strong> All financial and personal disclosures provided during mentorship evaluation are protected under institutional NDA standards.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-3 py-2 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                ) : <div />}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2.5 px-5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : step < 3 ? (
                    <>
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>Submit Confidential Application</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Confirmed */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Application Received</h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto mb-6">
              Thank you, <strong className="text-white">{formData.name || 'Candidate'}</strong>. Your application for <strong className="text-emerald-400">{tierTitle}</strong> has entered our admissions queue.
            </p>

            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl text-left text-xs space-y-2 mb-6 text-neutral-400">
              <div className="flex justify-between">
                <span>Application Reference:</span>
                <span className="font-mono text-neutral-200">EB-MNT-{Math.floor(10000 + Math.random() * 90000)}</span>
              </div>
              <div className="flex justify-between">
                <span>Target Review Window:</span>
                <span className="text-white font-medium">Within 24–48 Business Hours</span>
              </div>
              <div className="flex justify-between">
                <span>Admissions Next Step:</span>
                <span className="text-emerald-400 font-medium">Private 20-Minute Fit Calibration Call</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="py-2.5 px-6 bg-white text-black font-semibold text-xs rounded-xl hover:bg-neutral-200 transition-colors shadow-sm"
            >
              Return to EB Wealth
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
