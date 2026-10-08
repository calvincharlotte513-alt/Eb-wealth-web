import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, Clock, ShieldCheck, CheckCircle2, MessageSquare, RefreshCw, Send, AlertCircle, Copy, Check, Settings, Trash2 } from 'lucide-react';
import { getCompanyContact, saveCompanyContact, CompanyContactConfig } from '../data/companyContact';
import { getDispatchedLeads, DispatchedLead, notificationService } from '../services/notificationService';

interface CompanyDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyDispatchModal: React.FC<CompanyDispatchModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'settings'>('leads');
  const [leads, setLeads] = useState<DispatchedLead[]>([]);
  const [contact, setContact] = useState<CompanyContactConfig>(getCompanyContact());
  const [editingContact, setEditingContact] = useState<CompanyContactConfig>(getCompanyContact());
  const [isSaved, setIsSaved] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLeads(getDispatchedLeads());
      const current = getCompanyContact();
      setContact(current);
      setEditingContact(current);
      setTestSent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRefresh = () => {
    setLeads(getDispatchedLeads());
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveCompanyContact(editingContact);
    setContact(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleSendTestDispatch = async () => {
    setIsTesting(true);
    try {
      await notificationService.dispatchAIAudit({
        name: 'System Test Applicant',
        email: 'test-lead@empowermentbody.com',
        phone: '+44 7911 000111',
        company: 'Empowerment Body Live Test Corp',
        teamSize: '5–10 employees',
        monthlyRevenue: '£50k – £100k / mo',
        primaryFriction: 'Automated instant dispatch verification',
        notes: 'Verification test verifying immediate delivery to company email and phone.'
      });
      setLeads(getDispatchedLeads());
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    } catch (err) {
      console.error('Test dispatch error:', err);
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopy = (lead: DispatchedLead) => {
    navigator.clipboard.writeText(lead.summaryText);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (window.confirm('Clear stored dispatch history on this browser?')) {
      localStorage.removeItem('eb_wealth_dispatched_leads');
      setLeads([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-[#17202A] my-8 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00A878] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-[#00A878]" />
              <span>Company Notification Center & Inbound Leads</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#17202A]">
              Immediate Application & Booking Dispatch
            </h3>
            <p className="text-xs text-[#52606D] mt-0.5">
              All bookings, mentorship applications, and AI audits are transmitted directly to the company email and phone below.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-[#17202A] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Destinations Pill Bar */}
        <div className="mt-4 p-3.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[#52606D]">Company Email:</span>
              <span className="font-semibold text-[#17202A] font-mono">{contact.email}</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#00A878]" />
              <span className="text-[#52606D]">Company Phone:</span>
              <span className="font-semibold text-[#17202A] font-mono">{contact.phoneDisplay}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSendTestDispatch}
              disabled={isTesting}
              className="px-3 py-1.5 bg-[#00A878] hover:bg-[#009267] text-white text-[11px] font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3 h-3" />
              <span>{isTesting ? 'Sending Test...' : testSent ? 'Test Sent!' : 'Send Test Alert'}</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mt-4 border-b border-slate-200 pb-2 shrink-0">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-[#17202A] text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>Dispatched Submissions ({leads.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-[#17202A] text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Company Notification Settings</span>
          </button>

          <div className="ml-auto flex items-center gap-2">
            {activeTab === 'leads' && (
              <>
                <button
                  onClick={handleRefresh}
                  className="p-1.5 text-slate-500 hover:text-[#17202A] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Refresh leads"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                {leads.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Clear history"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto flex-1 mt-4 pr-1">
          {activeTab === 'leads' ? (
            <div className="space-y-3">
              {leads.length === 0 ? (
                <div className="text-center py-12 px-4 bg-[#F8FAFC] rounded-2xl border border-dashed border-slate-200">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-[#17202A]">No Submissions Dispatched Yet</h4>
                  <p className="text-xs text-[#52606D] max-w-sm mx-auto mt-1">
                    When visitors submit the Coaching Booking, AI Systems Audit, or Mentorship form, they will instantly appear here with full dispatch timestamps.
                  </p>
                  <button
                    onClick={handleSendTestDispatch}
                    disabled={isTesting}
                    className="mt-4 px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Generate Instant Test Submission</span>
                  </button>
                </div>
              ) : (
                leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 bg-white border border-slate-200 hover:border-slate-300 rounded-2xl shadow-xs transition-all text-xs space-y-2.5"
                  >
                    {/* Top Row: Type & Dispatched Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            lead.type === 'booking'
                              ? 'bg-blue-50 text-[#2563EB] border border-blue-200'
                              : lead.type === 'ai_audit'
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                              : 'bg-emerald-50 text-[#00A878] border border-emerald-200'
                          }`}
                        >
                          {lead.type.replace('_', ' ')}
                        </span>
                        <strong className="text-[#17202A] text-sm">{lead.title}</strong>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-[#52606D]">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{lead.submittedAt}</span>
                      </div>
                    </div>

                    {/* Applicant Primary Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#F8FAFC] p-2.5 rounded-xl border border-slate-200/70">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Applicant</span>
                        <strong className="text-[#17202A]">{lead.applicantName}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Email</span>
                        <a href={`mailto:${lead.applicantEmail}`} className="text-[#2563EB] hover:underline font-mono">
                          {lead.applicantEmail}
                        </a>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone</span>
                        <a href={`tel:${lead.applicantPhone}`} className="text-[#00A878] hover:underline font-mono font-medium">
                          {lead.applicantPhone}
                        </a>
                      </div>
                    </div>

                    {/* Specific Details Key-Values */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px]">
                      {Object.entries(lead.details).map(([k, v]) => (
                        <div key={k} className="text-slate-600">
                          <span className="font-semibold text-[#17202A]">{k}:</span> {v}
                        </div>
                      ))}
                    </div>

                    {/* Transmission Proof Bar */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <div className="flex items-center gap-2 text-[#00A878] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Dispatched to {lead.dispatchedToEmail} & {lead.dispatchedToPhone}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(lead)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-[#17202A] rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                        >
                          {copiedId === lead.id ? (
                            <>
                              <Check className="w-3 h-3 text-[#00A878]" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-slate-500" />
                              <span>Copy Summary</span>
                            </>
                          )}
                        </button>

                        <a
                          href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(lead.summaryText)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-lg transition-colors flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp Alert</span>
                        </a>

                        <a
                          href={`mailto:${contact.email}?subject=${encodeURIComponent(`[DISPATCH] ${lead.title}`)}&body=${encodeURIComponent(lead.summaryText)}`}
                          className="px-2.5 py-1 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Email Alert</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Settings Tab */
            <form onSubmit={handleSaveContact} className="space-y-4 p-1">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-[#2563EB] space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Company Notification Routing Configuration</span>
                </div>
                <p className="text-slate-600">
                  Whenever any user submits a coaching booking, AI systems audit, or mentorship intake on the website, notifications are immediately dispatched to the email and phone number configured below.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17202A] mb-1">
                  Primary Company Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={editingContact.email}
                  onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
                  placeholder="calvincharlotte513@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#00A878] font-mono"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  All booking calendar invites and audit dossiers are sent directly here.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1">
                    Company Phone Number (SMS/Calls) *
                  </label>
                  <input
                    required
                    type="text"
                    value={editingContact.phone}
                    onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
                    placeholder="+447911123456"
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#00A878] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1">
                    Display Phone Format *
                  </label>
                  <input
                    required
                    type="text"
                    value={editingContact.phoneDisplay}
                    onChange={(e) => setEditingContact({ ...editingContact, phoneDisplay: e.target.value })}
                    placeholder="+44 (0) 7911 123456"
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#00A878]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17202A] mb-1">
                  WhatsApp Direct Number (Digits only, including country code) *
                </label>
                <input
                  required
                  type="text"
                  value={editingContact.whatsappNumber}
                  onChange={(e) => setEditingContact({ ...editingContact, whatsappNumber: e.target.value })}
                  placeholder="447911123456"
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#00A878] font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-[#00A878] hover:bg-[#009267] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Notification Settings</span>
                </button>

                {isSaved && (
                  <span className="text-xs text-[#00A878] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Notification settings saved successfully!</span>
                  </span>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00A878] animate-pulse"></span>
            <span>Real-time dispatch system active</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#17202A] font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
