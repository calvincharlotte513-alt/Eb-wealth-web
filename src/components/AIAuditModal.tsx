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
    monthlyRevenue: '$50k – $150k / mo',
    primaryFriction: 'Inbound lead qualification & slow response times',
    teamSize: '5–15 employees'
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
    }, 1000);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
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

        {!isSuccess ? (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">
                <Cpu className="w-3.5 h-3.5" />
                <span>Enterprise Systems Architecture</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
                Schedule AI Systems Audit
              </h3>
              <p className="text-sm text-neutral-400 mt-1">
                Receive a forensic evaluation of your operational friction and custom prompt engineering opportunities.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name (e.g. Executive Applicant)"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Business Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="executive@enterprise.com"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Company Name & Industry</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Apex Holdings / Family Office / Enterprise"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Current Monthly Revenue</label>
                  <select
                    value={formData.monthlyRevenue}
                    onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Under $30k / mo">Under $30k / mo</option>
                    <option value="$30k – $100k / mo">$30k – $100k / mo</option>
                    <option value="$100k – $300k / mo">$100k – $300k / mo</option>
                    <option value="$300k+ / mo">$300k+ / mo (Enterprise)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Team Headcount</label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="1–4 operators">1–4 operators</option>
                    <option value="5–15 employees">5–15 employees</option>
                    <option value="16–50 employees">16–50 employees</option>
                    <option value="50+ employees">50+ employees</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Primary Operational Friction or Bottleneck
                </label>
                <textarea
                  rows={3}
                  value={formData.primaryFriction}
                  onChange={(e) => setFormData({ ...formData, primaryFriction: e.target.value })}
                  placeholder="e.g. Inbound leads wait hours for responses, staff spends 15 hours/week drafting proposals manually..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-5 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Analyzing Systems Profile...</span>
                ) : (
                  <>
                    <span>Submit for Engineering Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Systems Audit Queued</h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto mb-6">
              Thank you, <strong className="text-white">{formData.name}</strong>. Our applied AI systems team has received your operational brief for <strong className="text-blue-400">{formData.company}</strong>.
            </p>

            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl text-left text-xs space-y-2 mb-6 text-neutral-400">
              <div className="flex justify-between">
                <span>Diagnostic Report:</span>
                <span className="text-white">Preliminary analysis dispatched to {formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Architecture Session:</span>
                <span className="text-emerald-400 font-medium">Invitation link dispatched within 24 hours</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="py-2.5 px-6 bg-white text-black font-semibold text-xs rounded-xl hover:bg-neutral-200 transition-colors shadow-sm"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
