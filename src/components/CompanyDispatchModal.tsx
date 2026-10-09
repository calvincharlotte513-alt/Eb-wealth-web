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
      await notificationService.dispatchMentorshipApplication({
        name: 'Alexander Wright',
        email: 'alexander.wright@investor-example.co.uk',
        phone: '+44 7911 889900',
        experienceLevel: 'Complete Beginner (Building first portfolio)',
        primaryGoal: 'Learn UK ISAs, index funds and disciplined compounding',
        biggestBottleneck: 'Need clear guidance on low-cost global ETFs and avoiding unnecessary platform fees',
        timeCommitment: 'Yes, committed to 2-4 hours per month',
        tierTitle: 'Growth Mentorship'
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs p-3 sm:p-6 flex items-start justify-center pt-8 sm:pt-14 pb-12">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#0F172A] my-auto animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[calc(100vh-6rem)]">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
              <span>Company Notification Center & Inbound Leads</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
              Immediate Application & Booking Dispatch
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              All bookings, consultations, and mentorship applications are transmitted directly to the company email and phone below.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
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
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[#52606D]">Company Phone:</span>
              <span className="font-semibold text-[#17202A] font-mono">{contact.phoneDisplay}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSendTestDispatch}
              disabled={isTesting}
              className="px-3 py-1.5 bg-[#2563EB] hover:bg-blue-700 text-white text-[11px] font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
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
            <span>Configure Company Endpoints</span>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-xs flex items-center gap-1 cursor-pointer"
              title="Refresh leads list"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {leads.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                title="Clear local dispatch history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto mt-4 pr-1 min-h-[260px]">
          {activeTab === 'leads' && (
            <div className="space-y-3">
              {leads.length === 0 ? (
                <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-[#17202A]">No Dispatched Submissions Yet</h4>
                  <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
                    When visitors submit an investment coaching booking or mentorship intake application on the site, their complete details will appear here immediately and are transmitted directly to your email and phone.
                  </p>
                  <button
                    onClick={handleSendTestDispatch}
                    disabled={isTesting}
                    className="mt-4 px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl inline-flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send a Verification Test Submission</span>
                  </button>
                </div>
              ) : (
                leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] hover:bg-white transition-all text-xs space-y-3 shadow-2xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/70 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#2563EB]">{lead.id}</span>
                        <span className="text-slate-300">·</span>
                        <span className="font-semibold text-[#17202A]">{lead.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{lead.submittedAt}</span>
                      </div>
                    </div>

                    {/* Applicant & Dispatch Targets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-3 rounded-lg border border-slate-200/80">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Applicant</span>
                        <div className="font-semibold text-[#17202A]">{lead.applicantName}</div>
                        <div className="text-slate-600 truncate">{lead.applicantEmail}</div>
                        <div className="text-slate-600">{lead.applicantPhone}</div>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Immediate Dispatch Targets</span>
                        <div className="text-emerald-700 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">Email: {lead.dispatchedToEmail}</span>
                        </div>
                        <div className="text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>Phone: {lead.dispatchedToPhone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Form Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 pt-1 text-[11px]">
                      {Object.entries(lead.details).map(([key, val]) => (
                        <div key={key} className="flex items-baseline justify-between gap-2 border-b border-slate-100 py-1">
                          <span className="text-slate-500 font-medium">{key}:</span>
                          <span className="text-[#17202A] font-semibold text-right truncate max-w-[200px]" title={val}>{val}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60">
                      <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{lead.status}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(lead)}
                          className="py-1 px-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-[11px] rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          {copiedId === lead.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === lead.id ? 'Copied' : 'Copy Payload'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <form onSubmit={handleSaveContact} className="space-y-4 max-w-xl">
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  These destination coordinates receive instant alerts immediately upon any booking or mentorship application submission across the site.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17202A] mb-1">
                  Brand / Organization Name
                </label>
                <input
                  type="text"
                  value={editingContact.companyName}
                  onChange={(e) => setEditingContact({ ...editingContact, companyName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17202A] mb-1">
                  Company Dispatch Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={editingContact.email}
                  onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">Default: calvincharlotte513@gmail.com</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1">
                    Company Phone (E.164 International) *
                  </label>
                  <input
                    required
                    type="text"
                    value={editingContact.phone}
                    onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">e.g. +447911123456</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1">
                    Display Phone Format
                  </label>
                  <input
                    type="text"
                    value={editingContact.phoneDisplay}
                    onChange={(e) => setEditingContact({ ...editingContact, phoneDisplay: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">e.g. +44 (0) 7911 123456</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17202A] mb-1">
                  WhatsApp Direct Number (Country code without +)
                </label>
                <input
                  type="text"
                  value={editingContact.whatsappNumber}
                  onChange={(e) => setEditingContact({ ...editingContact, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">e.g. 447911123456</span>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Save Dispatch Settings
                </button>
                {isSaved && (
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Saved successfully!</span>
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
