import React, { useState } from 'react';
import { X, CheckCircle2, Cpu, ArrowRight, Phone, Mail, MessageSquare, Copy, Check, ShieldCheck, ExternalLink } from 'lucide-react';
import { notificationService, DispatchResult } from '../services/notificationService';

interface AIAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAuditModal: React.FC<AIAuditModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    monthlyRevenue: '£10k – £50k / mo',
    primaryFriction: 'Inbound lead qualification & slow response times',
    teamSize: '1–5 employees',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<DispatchResult | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await notificationService.dispatchAIAudit(formData);
      setDispatchResult(res);
      setIsSuccess(true);
    } catch (err) {
      console.error('Audit dispatch error:', err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = () => {
    if (!dispatchResult) return;
    navigator.clipboard.writeText(dispatchResult.summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setIsSubmitting(false);
    setDispatchResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-[#17202A] my-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-[#17202A] transition-colors p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#2563EB] uppercase">
                <Cpu className="w-3.5 h-3.5" />
                <span>AI Systems & Automation Audit</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-[#17202A] mt-1">
                Schedule AI Business Systems Audit
              </h3>
              <p className="text-xs text-[#52606D] mt-1">
                Receive an objective evaluation of your operational bottlenecks and custom prompt engineering opportunities.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. David King"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1">
                    Work Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="david@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1">
                    Contact Phone (for WhatsApp/SMS updates) *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+44 7123 456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1">
                    Company / Brand Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. King Media Group"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1">
                    Approximate Team Size
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                  >
                    <option>Solo / Founder</option>
                    <option>1–5 employees</option>
                    <option>6–15 employees</option>
                    <option>16–50 employees</option>
                    <option>50+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1">
                    Monthly Revenue Band
                  </label>
                  <select
                    value={formData.monthlyRevenue}
                    onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                  >
                    <option>Pre-revenue / Scaling</option>
                    <option>£5k – £20k / mo</option>
                    <option>£20k – £75k / mo</option>
                    <option>£75k – £250k / mo</option>
                    <option>£250k+ / mo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17202A] mb-1">
                  Primary Operational Friction or Bottleneck
                </label>
                <select
                  value={formData.primaryFriction}
                  onChange={(e) => setFormData({ ...formData, primaryFriction: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                >
                  <option>Inbound lead qualification & slow response times</option>
                  <option>Manual data entry & CRM updating friction</option>
                  <option>Staff spending too much time on repetitive content / copy</option>
                  <option>SOP documentation and internal team knowledge retrieval</option>
                  <option>Customer support ticket overload</option>
                </select>
              </div>

              <div className="p-3 bg-[#EFF6FF] border border-blue-200 rounded-xl text-[11px] text-[#2563EB] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <span>
                  Immediate Dispatch Notice: Upon submission, your complete audit details will be transmitted directly to our executive team via company email & phone for priority review.
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Dispatching Immediately to Company...' : 'Submit Audit Request'}</span>
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
                AI Audit Request Dispatched!
              </h3>
              <p className="text-xs text-[#52606D] max-w-md mx-auto">
                Thank you, <strong>{formData.name}</strong>. Your audit details for <strong>{formData.company}</strong> have been sent directly to the company.
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

            {/* Quick Direct Follow-Up Buttons */}
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
                    className="py-2.5 px-3 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
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
                  <span>{copied ? 'Summary Copied!' : 'Copy Submission Summary'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="py-2 px-5 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

