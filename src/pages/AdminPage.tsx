import React, { useState, useEffect } from 'react';
import { PageId } from '../types/navigation';
import {
  Lock,
  ShieldCheck,
  LogOut,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Filter,
  Trash2,
  Edit3,
  ExternalLink,
  Save,
  AlertCircle,
  Database,
  TrendingUp,
  Sliders,
  Send,
  Copy,
  Check
} from 'lucide-react';

interface LeadApplicant {
  fullName: string;
  email: string;
  phone: string;
  experienceLevel?: string;
  monthlyContribution?: string;
  timeHorizon?: string;
  notes?: string;
}

interface AdminLead {
  id: string;
  type: string;
  title: string;
  applicant: LeadApplicant;
  details: Record<string, any>;
  summaryText: string;
  dispatchedToEmail: string;
  dispatchedToPhone: string;
  status: 'New' | 'Contacted' | 'Consultation Scheduled' | 'Enrolled' | 'Archived' | string;
  adminNotes?: string;
  timestamp: string;
}

interface AdminStats {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  scheduledConsultations: number;
  totalEnrolled: number;
  activeStudentAccounts: number;
  marketFeedStatus: string;
  lastMarketUpdate: string;
  serverUptimeSeconds: number;
  dbStorageLocation: string;
}

interface AdminPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!sessionStorage.getItem('eb_admin_token');
  });
  const [username, setUsername] = useState<string>('Ebwealth');
  const [password, setPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<'leads' | 'settings' | 'diagnostics'>('leads');
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoadingLeads, setIsLoadingLeads] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Lead Editing State
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Settings State
  const [companyEmail, setCompanyEmail] = useState<string>('calvincharlotte513@gmail.com');
  const [companyPhone, setCompanyPhone] = useState<string>('+447911123456');
  const [isSavingSettings, setIsSavingSettings] = useState<boolean>(false);
  const [settingsSaved, setSettingsSaved] = useState<boolean>(false);
  const [testDispatchSuccess, setTestDispatchSuccess] = useState<boolean>(false);

  const getAuthToken = () => sessionStorage.getItem('eb_admin_token') || 'Bettertimenow2026';

  const loadDashboardData = async () => {
    setIsLoadingLeads(true);
    const token = getAuthToken();

    try {
      const [leadsRes, statsRes, settingsRes] = await Promise.all([
        fetch('/api/admin/leads', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('/api/admin/settings', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (leadsRes.ok) {
        const data = await leadsRes.json();
        if (data.success && Array.isArray(data.leads)) {
          setLeads(data.leads);
        }
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        if (statsData.success) {
          setStats(statsData.metrics);
        }
      }

      if (settingsRes.ok) {
        const settData = await settingsRes.json();
        if (settData.success && settData.settings) {
          setCompanyEmail(settData.settings.companyEmail || 'calvincharlotte513@gmail.com');
          setCompanyPhone(settData.settings.companyPhone || '+447911123456');
        }
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim()
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem('eb_admin_token', data.token || 'Bettertimenow2026');
        sessionStorage.setItem('eb_admin_user', data.username || 'Ebwealth');
        setIsAuthenticated(true);
      } else {
        setAuthError(data.message || 'Invalid username or password');
      }
    } catch {
      setAuthError('Connection failure to authentication server');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('eb_admin_token');
    sessionStorage.removeItem('eb_admin_user');
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleUpdateLeadStatus = async (id: string, newStatus: string) => {
    const token = getAuthToken();
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
        );
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    }
  };

  const handleSaveNotes = async (id: string) => {
    const token = getAuthToken();
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ adminNotes: tempNotes })
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === id ? { ...lead, adminNotes: tempNotes } : lead))
        );
        setEditingNotesId(null);
      }
    } catch (err) {
      console.error('Failed to save notes:', err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Delete this applicant lead record permanently?')) return;
    const token = getAuthToken();

    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  const handleSaveSettings = async () => {
    setIsSavingSettings(true);
    const token = getAuthToken();

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          companyEmail,
          companyPhone
        })
      });

      if (res.ok) {
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 3000);
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleSendTestDispatch = async () => {
    try {
      const res = await fetch('/api/notifications/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'mentorship',
          title: 'Admin Diagnostics Test Intake',
          applicant: {
            fullName: 'Test Candidate',
            email: companyEmail,
            phone: companyPhone,
            experienceLevel: 'Intermediate',
            monthlyContribution: '£2,000/mo'
          },
          details: { tier: 'Executive Mentorship Diagnostic' },
          summaryText: 'Automated test dispatch from EB Wealth administrative console.'
        })
      });

      if (res.ok) {
        setTestDispatchSuccess(true);
        loadDashboardData();
        setTimeout(() => setTestDispatchSuccess(false), 3500);
      }
    } catch (err) {
      console.error('Test dispatch failed:', err);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    if (filterType !== 'all' && l.type !== filterType) return false;
    if (filterStatus !== 'all' && l.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = l.applicant?.fullName?.toLowerCase().includes(q);
      const matchEmail = l.applicant?.email?.toLowerCase().includes(q);
      const matchPhone = l.applicant?.phone?.toLowerCase().includes(q);
      const matchTitle = l.title?.toLowerCase().includes(q);
      const matchId = l.id?.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchPhone && !matchTitle && !matchId) return false;
    }
    return true;
  });

  // ==========================================
  // VIEW: 1. UNPROTECTED / LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07251C] text-white flex flex-col justify-center items-center px-4 py-20">
        <div className="max-w-md w-full bg-[#0D3B2E] border-2 border-[#C5A869]/50 rounded-xs p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-xs bg-gradient-to-br from-[#165342] to-[#07251C] border border-[#C5A869] flex items-center justify-center font-serif font-bold text-white tracking-widest text-lg shadow-sm">
              EB
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#DFCA96]">
              EB Wealth Management
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Administrative Portal
            </h1>
            <p className="text-xs text-stone-300 font-sans">
              Authorized access required for client consultation records and admissions.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xs text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#DFCA96] mb-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ebwealth"
                className="w-full text-sm p-3 bg-[#08231B] border border-[#C5A869]/40 rounded-xs text-white focus:outline-none focus:border-[#DFCA96]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#DFCA96] mb-1">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full text-sm p-3 bg-[#08231B] border border-[#C5A869]/40 rounded-xs text-white focus:outline-none focus:border-[#DFCA96]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-gradient-to-r from-[#C5A869] to-[#DFCA96] hover:from-[#B89748] hover:to-[#C5A869] text-[#07251C] font-semibold text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm font-sans"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#07251C]" />
                  <span>Verifying Authorization...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#07251C]" />
                  <span>Authenticate Portal Access</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center">
            <p className="text-[11px] text-stone-400 font-sans">
              Authorized credentials: Username <strong className="text-white">Ebwealth</strong> · Password <strong className="text-[#DFCA96]">Bettertimenow2026</strong>
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="mt-3 text-xs text-stone-400 hover:text-white underline transition-colors cursor-pointer"
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: 2. AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#141E18]">
      {/* Top Administrative Header Bar */}
      <header className="bg-[#0D3B2E] text-white border-b border-[#C5A869]/30 pt-28 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xs bg-[#165342] border border-[#C5A869] flex items-center justify-center font-serif font-bold text-white text-base shadow-xs">
              EB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-white">
                  Executive Administrative Operations
                </h1>
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/40 rounded-xs text-[10px] font-mono font-bold uppercase tracking-wider">
                  SuperAdmin Active
                </span>
              </div>
              <p className="text-xs text-stone-300 font-sans">
                Company Inbound Admissions, Mentorship Leads & Notification Dispatch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadDashboardData}
              className="py-2 px-3 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xs border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#C5A869] ${isLoadingLeads ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="py-2 px-3 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xs border border-white/20 transition-colors cursor-pointer"
            >
              Public Site
            </button>
            <button
              onClick={handleLogout}
              className="py-2 px-3 bg-red-900/60 hover:bg-red-800 text-red-200 text-xs font-semibold rounded-xs border border-red-500/40 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="max-w-7xl mx-auto flex gap-4 mt-6 border-b border-white/10 text-xs font-mono uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 font-semibold transition-colors cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'leads'
                ? 'border-[#DFCA96] text-[#DFCA96]'
                : 'border-transparent text-stone-300 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Inbound Leads ({leads.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 font-semibold transition-colors cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'settings'
                ? 'border-[#DFCA96] text-[#DFCA96]'
                : 'border-transparent text-stone-300 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Notification Dispatch Config</span>
          </button>
          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`pb-3 font-semibold transition-colors cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'diagnostics'
                ? 'border-[#DFCA96] text-[#DFCA96]'
                : 'border-transparent text-stone-300 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Database & Live Feeds</span>
          </button>
        </div>
      </header>

      {/* Main Operational Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#C5A869]/30 rounded-xs p-5 shadow-xs">
            <div className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
              Total Inbound Applications
            </div>
            <div className="font-serif text-3xl font-bold text-[#0D3B2E] mt-1">
              {stats?.totalLeads ?? leads.length}
            </div>
            <p className="text-xs text-stone-500 mt-1">All mentorship & coaching requests</p>
          </div>

          <div className="bg-white border border-[#C5A869]/30 rounded-xs p-5 shadow-xs">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#9E8040]">
              Pending / New Leads
            </div>
            <div className="font-serif text-3xl font-bold text-amber-600 mt-1">
              {stats?.newLeads ?? leads.filter((l) => l.status === 'New').length}
            </div>
            <p className="text-xs text-stone-500 mt-1">Require initial contact</p>
          </div>

          <div className="bg-white border border-[#C5A869]/30 rounded-xs p-5 shadow-xs">
            <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-700">
              Scheduled Consultations
            </div>
            <div className="font-serif text-3xl font-bold text-emerald-700 mt-1">
              {stats?.scheduledConsultations ?? leads.filter((l) => l.status === 'Consultation Scheduled').length}
            </div>
            <p className="text-xs text-stone-500 mt-1">Confirmed diagnostic calls</p>
          </div>

          <div className="bg-white border border-[#C5A869]/30 rounded-xs p-5 shadow-xs">
            <div className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
              Market Feed Status
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-serif text-xl font-bold text-[#0D3B2E]">
                {stats?.marketFeedStatus?.toUpperCase() || 'LIVE / DELAYED'}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">FTSE 100, S&P 500, Gold sync active</p>
          </div>
        </div>

        {/* TAB 1: INBOUND LEADS TABLE */}
        {activeTab === 'leads' && (
          <div className="bg-white border border-[#C5A869]/30 rounded-xs p-6 shadow-xs space-y-6">
            
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or goal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-[#0D3B2E]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-1.5 text-xs text-stone-600">
                  <Filter className="w-3.5 h-3.5" />
                  <span className="font-mono uppercase text-[10px]">Type:</span>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="text-xs py-1.5 px-2 border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none"
                  >
                    <option value="all">All Types</option>
                    <option value="mentorship">Mentorship</option>
                    <option value="coaching">Coaching</option>
                    <option value="app">App Portal</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-stone-600">
                  <span className="font-mono uppercase text-[10px]">Status:</span>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="text-xs py-1.5 px-2 border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Consultation Scheduled">Consultation Scheduled</option>
                    <option value="Enrolled">Enrolled</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Leads List */}
            {filteredLeads.length === 0 ? (
              <div className="text-center py-12 text-stone-500 text-xs">
                No matching leads found. Submit an application form on the website to see instant real-time dispatch.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLeads.map((lead) => {
                  const isEditingNotes = editingNotesId === lead.id;

                  return (
                    <div
                      key={lead.id}
                      className="border border-stone-200 rounded-xs p-5 bg-white hover:border-[#C5A869]/50 transition-all space-y-4"
                    >
                      {/* Top Lead Row */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-stone-100 gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-mono uppercase font-bold rounded-xs ${
                              lead.type === 'mentorship'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {lead.type}
                          </span>
                          <h3 className="font-serif text-lg font-bold text-[#0D3B2E]">
                            {lead.applicant?.fullName || 'Anonymous Applicant'}
                          </h3>
                          <span className="text-[11px] font-mono text-stone-400">
                            ID: {lead.id}
                          </span>
                        </div>

                        {/* Status Change Dropdown */}
                        <div className="flex items-center gap-3">
                          <label className="text-[10px] font-mono uppercase text-stone-500">
                            Status:
                          </label>
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                            className="text-xs font-semibold py-1 px-2.5 border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-[#0D3B2E]"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Consultation Scheduled">Consultation Scheduled</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Archived">Archived</option>
                          </select>

                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 text-stone-400 hover:text-red-700 rounded-xs cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Lead Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-stone-400 block">
                            Direct Contact
                          </span>
                          <div className="mt-1 space-y-1">
                            <a
                              href={`mailto:${lead.applicant?.email}`}
                              className="text-stone-800 hover:text-[#0D3B2E] font-medium flex items-center gap-1.5 truncate"
                            >
                              <Mail className="w-3.5 h-3.5 text-[#C5A869]" />
                              <span>{lead.applicant?.email || 'N/A'}</span>
                            </a>
                            <a
                              href={`tel:${lead.applicant?.phone}`}
                              className="text-stone-800 hover:text-[#0D3B2E] font-medium flex items-center gap-1.5"
                            >
                              <Phone className="w-3.5 h-3.5 text-[#C5A869]" />
                              <span>{lead.applicant?.phone || 'N/A'}</span>
                            </a>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono uppercase text-stone-400 block">
                            Program / Service
                          </span>
                          <div className="font-semibold text-stone-800 mt-1">
                            {lead.title}
                          </div>
                          {lead.applicant?.monthlyContribution && (
                            <span className="text-stone-500 block text-[11px]">
                              Contrib: {lead.applicant.monthlyContribution}
                            </span>
                          )}
                        </div>

                        <div>
                          <span className="text-[10px] font-mono uppercase text-stone-400 block">
                            Submission Timestamp
                          </span>
                          <div className="text-stone-700 mt-1 font-mono text-[11px]">
                            {new Date(lead.timestamp).toLocaleString('en-GB')}
                          </div>
                          <span className="text-stone-400 text-[10px] block truncate">
                            Dispatched to: {lead.dispatchedToEmail}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono uppercase text-stone-400 block">
                            Quick Actions
                          </span>
                          <div className="mt-1 flex items-center gap-2">
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  `Applicant: ${lead.applicant?.fullName}\nEmail: ${lead.applicant?.email}\nPhone: ${lead.applicant?.phone}\nGoal: ${lead.title}`,
                                  lead.id
                                )
                              }
                              className="py-1 px-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xs text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                            >
                              {copiedId === lead.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Info</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Notes / Questions From Applicant */}
                      {lead.applicant?.notes && (
                        <div className="p-3 bg-[#FAF9F5] border-l-2 border-[#C5A869] text-xs text-stone-700 rounded-xs">
                          <strong className="font-semibold text-stone-900">Applicant Notes:</strong>{' '}
                          {lead.applicant.notes}
                        </div>
                      )}

                      {/* Internal Admin Notes */}
                      <div className="pt-2 border-t border-stone-100 flex items-start gap-2">
                        <div className="flex-1">
                          {isEditingNotes ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={tempNotes}
                                onChange={(e) => setTempNotes(e.target.value)}
                                placeholder="Add private consultation notes, portfolio size, call time..."
                                className="w-full text-xs p-2 border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-[#0D3B2E]"
                              />
                              <button
                                onClick={() => handleSaveNotes(lead.id)}
                                className="py-1.5 px-3 bg-[#0D3B2E] text-white text-xs rounded-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Save className="w-3 h-3" /> Save
                              </button>
                              <button
                                onClick={() => setEditingNotesId(null)}
                                className="py-1.5 px-2 bg-stone-200 text-stone-700 text-xs rounded-xs cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between text-xs text-stone-500">
                              <span>
                                <strong className="text-stone-700">Internal Notes:</strong>{' '}
                                {lead.adminNotes || 'No notes added yet.'}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingNotesId(lead.id);
                                  setTempNotes(lead.adminNotes || '');
                                }}
                                className="text-stone-400 hover:text-[#0D3B2E] text-[11px] flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="w-3 h-3" /> Edit Note
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DISPATCH SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white border border-[#C5A869]/30 rounded-xs p-8 shadow-xs max-w-3xl space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0D3B2E]">
                Inbound Lead Notification Dispatch Destinations
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Configure the primary corporate email and SMS notification destination where applicant records are sent immediately.
              </p>
            </div>

            {settingsSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xs text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dispatch destinations updated and saved to persistent database.</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-700 mb-1">
                  Primary Company Notification Email
                </label>
                <input
                  type="email"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  className="w-full text-xs p-3 border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-[#0D3B2E]"
                />
                <span className="text-[10px] text-stone-400">
                  All admissions submissions are routed instantly to this address.
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-700 mb-1">
                  Primary Company Notification Phone / SMS
                </label>
                <input
                  type="text"
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                  className="w-full text-xs p-3 border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-[#0D3B2E]"
                />
                <span className="text-[10px] text-stone-400">
                  Target UK phone number for urgent admissions dispatch alerts.
                </span>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleSaveSettings}
                  disabled={isSavingSettings}
                  className="py-2.5 px-5 bg-[#0D3B2E] hover:bg-[#07251C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>{isSavingSettings ? 'Saving...' : 'Save Settings to Database'}</span>
                </button>

                <button
                  onClick={handleSendTestDispatch}
                  className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider rounded-xs border border-stone-300 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Test Dispatch Alert</span>
                </button>
              </div>

              {testDispatchSuccess && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xs text-blue-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Test dispatch completed successfully. A test record has been inserted into the leads database.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: DIAGNOSTICS & SYSTEM HEALTH */}
        {activeTab === 'diagnostics' && (
          <div className="bg-white border border-[#C5A869]/30 rounded-xs p-8 shadow-xs space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0D3B2E]">
                System Architecture & Database Health
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Persistent storage, live financial exchange feeds, and process monitoring.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-stone-200 rounded-xs p-5 bg-[#FAF9F5] space-y-3">
                <h3 className="font-serif text-base font-bold text-[#0D3B2E] flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#C5A869]" />
                  <span>Database Persistence</span>
                </h3>
                <div className="space-y-1.5 text-xs text-stone-600 font-mono">
                  <p><strong>Storage Path:</strong> {stats?.dbStorageLocation || './data/database.json'}</p>
                  <p><strong>Total Leads in Store:</strong> {leads.length}</p>
                  <p><strong>Admin Username:</strong> Ebwealth</p>
                  <p><strong>Status:</strong> Active / Persisted across sessions</p>
                </div>
              </div>

              <div className="border border-stone-200 rounded-xs p-5 bg-[#FAF9F5] space-y-3">
                <h3 className="font-serif text-base font-bold text-[#0D3B2E] flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#C5A869]" />
                  <span>Market Data Feed Health</span>
                </h3>
                <div className="space-y-1.5 text-xs text-stone-600 font-mono">
                  <p><strong>Feed Status:</strong> {stats?.marketFeedStatus || 'Live Exchange Feed'}</p>
                  <p><strong>Instruments:</strong> FTSE 100, S&P 500, Gold (GBP), UK 10Y Gilt</p>
                  <p><strong>Server Uptime:</strong> {stats?.serverUptimeSeconds ? `${Math.floor(stats.serverUptimeSeconds / 60)} minutes` : 'Active'}</p>
                  <p><strong>Server Cache TTL:</strong> 60 Seconds</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
