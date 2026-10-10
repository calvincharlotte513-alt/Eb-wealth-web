import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, Clock, ShieldCheck, CheckCircle2, RefreshCw, Send, AlertCircle, Copy, Check, Lock, LogOut } from 'lucide-react';
import { getCompanyContact, saveCompanyContact, CompanyContactConfig } from '../data/companyContact';
import { DispatchedLead, notificationService } from '../services/notificationService';

interface CompanyDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyDispatchModal: React.FC<CompanyDispatchModalProps> = ({
  isOpen,
  onClose
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<'leads' | 'settings'>('leads');
  const [leads, setLeads] = useState<DispatchedLead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState<boolean>(false);
  const [contact, setContact] = useState<CompanyContactConfig>(getCompanyContact());
  const [editingContact, setEditingContact] = useState<CompanyContactConfig>(getCompanyContact());
  const [isSaved, setIsSaved] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchLeads = async (token: string) => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch('/api/notifications/leads', {
        headers: {
          'x-admin-passcode': token
        }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.leads)) {
          setLeads(json.leads);
        }
      }
    } catch (err) {
      console.error('Failed to load server leads:', err);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setAuthError('Please enter administrative passcode');
      return;
    }

    setIsVerifying(true);
    setAuthError(null);

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcode.trim() })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('eb_admin_pass', passcode.trim());
        fetchLeads(passcode.trim());
      } else {
        setAuthError(data.message || 'Invalid administrative passcode');
      }
    } catch {
      setAuthError('Connection error verifying credentials');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
    sessionStorage.removeItem('eb_admin_pass');
    setLeads([]);
  };

  useEffect(() => {
    if (isOpen) {
      const savedPass = sessionStorage.getItem('eb_admin_pass');
      if (savedPass) {
        setPasscode(savedPass);
        setIsAuthenticated(true);
        fetchLeads(savedPass);
      }
      const current = getCompanyContact();
      setContact(current);
      setEditingContact(current);
      setTestSent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
      fetchLeads(passcode);
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07251C]/80 backdrop-blur-xs p-3 sm:p-6 flex items-start justify-center pt-8 sm:pt-14 pb-12">
      <div className="relative w-full max-w-3xl bg-[#FAF9F5] border border-[#C5A869]/50 rounded-sm shadow-2xl p-6 sm:p-8 text-[#111816] my-auto animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[calc(100vh-6rem)]">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#C5A869]/30 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#9E8040] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-[#0D3B2E]" />
              <span>Administrative Portal · Company Inbound Leads</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2E]">
              Inbound Leads & Dispatch Operations
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Secure administrative access for client consultation bookings and mentorship applications.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="p-1.5 text-stone-500 hover:text-red-700 rounded-xs transition-colors cursor-pointer"
                title="Log out of Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-[#0D3B2E] rounded-xs transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* AUTHENTICATION GATE (PROTECTS CONFIDENTIAL LEAD DATA) */}
        {/* ---------------------------------------------------- */}
        {!isAuthenticated ? (
          <div className="py-12 px-4 max-w-md mx-auto text-center space-y-6">
            <div className="w-12 h-12 rounded-sm bg-[#FAF5E8] border border-[#C5A869]/40 text-[#0D3B2E] flex items-center justify-center mx-auto shadow-2xs">
              <Lock className="w-6 h-6 text-[#9E8040]" />
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-[#0D3B2E]">
                Administrative Authorization Required
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                Access to company inbound leads and applicant contact records requires authorized administrative authentication.
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter admin passcode (e.g. EB-Admin-2026!)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-sm text-xs font-mono text-[#0D3B2E] focus:outline-none focus:border-[#C5A869]"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-sm border border-red-200 flex items-center justify-center gap-1.5 font-mono">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-2.5 bg-[#0D3B2E] hover:bg-[#07251C] text-[#C5A869] border border-[#C5A869]/40 font-semibold text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isVerifying ? 'Verifying Credentials...' : 'Unlock Inbound Leads'}
              </button>
            </form>

            <div className="text-[11px] font-mono text-stone-400">
              Default authorized credential: <code className="text-[#0D3B2E] font-bold">EB-Admin-2026!</code>
            </div>
          </div>
        ) : (
          /* ---------------------------------------------------- */
          /* AUTHENTICATED LEADS DASHBOARD */
          /* ---------------------------------------------------- */
          <div className="flex-1 overflow-y-auto space-y-6 pt-4">
            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
              <button
                onClick={() => setActiveTab('leads')}
                className={`py-1.5 px-4 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer font-mono ${
                  activeTab === 'leads'
                    ? 'bg-[#0D3B2E] text-[#C5A869]'
                    : 'text-stone-600 hover:text-[#0D3B2E]'
                }`}
              >
                Inbound Leads ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-1.5 px-4 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer font-mono ${
                  activeTab === 'settings'
                    ? 'bg-[#0D3B2E] text-[#C5A869]'
                    : 'text-stone-600 hover:text-[#0D3B2E]'
                }`}
              >
                Notification Endpoints
              </button>

              <button
                onClick={() => fetchLeads(passcode)}
                disabled={isLoadingLeads}
                className="ml-auto p-1.5 text-stone-500 hover:text-[#0D3B2E] rounded-xs cursor-pointer"
                title="Refresh leads from server"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLeads ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {activeTab === 'leads' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                  <span>Authorized Lead Records: {leads.length}</span>
                  <button
                    onClick={handleSendTestDispatch}
                    disabled={isTesting}
                    className="text-[#0D3B2E] hover:text-[#9E8040] font-semibold underline cursor-pointer disabled:opacity-50"
                  >
                    {isTesting ? 'Dispatching test...' : '+ Generate Sample Lead'}
                  </button>
                </div>

                {testSent && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-sm text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Sample application generated and dispatched to company records!</span>
                  </div>
                )}

                {leads.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-sm border border-stone-200 p-6">
                    <Mail className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                    <p className="text-xs text-stone-600 font-mono">
                      No inbound leads recorded yet. Submissions from coaching bookings and mentorship applications will appear here in real time.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {leads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-4 bg-white rounded-sm border border-stone-200 hover:border-[#C5A869] transition-colors space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[#0D3B2E]">{lead.id}</span>
                          <span className="text-[10px] font-mono text-stone-400">
                            {new Date(lead.submittedAt || Date.now()).toLocaleString('en-GB')}
                          </span>
                        </div>
                        <div className="font-serif font-bold text-sm text-[#0D3B2E]">
                          {lead.applicantName} ({lead.title})
                        </div>
                        <div className="text-stone-600 font-mono text-[11px]">
                          Email: {lead.applicantEmail} · Phone: {lead.applicantPhone}
                        </div>
                        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                            Dispatched to: {lead.dispatchedToEmail}
                          </span>
                          <button
                            onClick={() => handleCopy(lead)}
                            className="text-[11px] font-mono text-[#0D3B2E] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            {copiedId === lead.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === lead.id ? 'Copied' : 'Copy Dossier'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <form onSubmit={handleSaveContact} className="space-y-4 bg-white p-6 rounded-sm border border-stone-200">
                <h4 className="font-serif font-bold text-sm text-[#0D3B2E]">
                  Company Notification Routing
                </h4>
                <div>
                  <label className="text-[11px] font-mono text-stone-500 block mb-1">Company Inbox Email:</label>
                  <input
                    type="email"
                    value={editingContact.email}
                    onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-stone-300 rounded-sm text-xs font-mono focus:outline-none focus:border-[#0D3B2E]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-stone-500 block mb-1">Company Phone / WhatsApp:</label>
                  <input
                    type="text"
                    value={editingContact.phone}
                    onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-stone-300 rounded-sm text-xs font-mono focus:outline-none focus:border-[#0D3B2E]"
                  />
                </div>

                {isSaved && (
                  <div className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-sm border border-emerald-200 font-mono">
                    Routing configuration saved successfully.
                  </div>
                )}

                <button
                  type="submit"
                  className="py-2.5 px-4 bg-[#0D3B2E] hover:bg-[#07251C] text-[#C5A869] text-xs font-semibold uppercase tracking-wider rounded-sm cursor-pointer border border-[#C5A869]/40"
                >
                  Save Notification Routing
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
