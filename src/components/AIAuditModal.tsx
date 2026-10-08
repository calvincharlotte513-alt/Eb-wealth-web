import React, { useState } from 'react';
import { X, CheckCircle2, Cpu, ArrowRight } from 'lucide-react';

interface AIAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAuditModal: React.FC<AIAuditModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    monthlyRevenue: '£10k – £50k / mo',
    primaryFriction: 'Inbound lead qualification & slow response times',
    teamSize: '1–5 employees'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setIsSubmitting(false);
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
              <div className="grid grid-cols-2 gap-3">
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

              <div className="grid grid-cols-2 gap-3">
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

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Evaluating Submission...' : 'Submit Audit Request'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] text-[#00A878] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-[#17202A]">
              Audit Request Received
            </h3>
            <p className="text-xs text-[#52606D] max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Our systems architecture team will analyze <strong>{formData.company}</strong>'s friction points and prepare a tailored AI automation roadmap. Expect an audit summary at <strong>{formData.email}</strong> within 48 hours.
            </p>

            <button
              onClick={resetAndClose}
              className="mt-4 py-2.5 px-6 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
