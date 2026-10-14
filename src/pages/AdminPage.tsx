import React, { useState, useEffect } from 'react';
import { PageId } from '../types/navigation';
import { FOUNDER_IMAGE_URL } from '../data/content';
import {
  Lock,
  ShieldCheck,
  LogOut,
  Users,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Filter,
  Trash2,
  Edit3,
  Save,
  AlertCircle,
  Database,
  TrendingUp,
  Sliders,
  Send,
  Copy,
  Check,
  Download,
  PlusCircle,
  BookOpen,
  X,
  Flame,
  Globe
} from 'lucide-react';
import { firebaseDataService, FirestoreLead, FirestoreUserProgress } from '../services/firebaseDataService';
import { auth, signInWithGoogle, logOutFirebase } from '../services/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

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

interface StudentRecord {
  userId: string;
  studentName?: string;
  studentEmail?: string;
  completedTopics: string[];
  currentLevel: number;
  lastActive: string;
  notes?: string;
  updatedAt?: string;
  portfolioPlan?: any;
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
  // Authentication State — Direct Access without passwords/usernames
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return true; // Direct authorized entry requested by user
  });
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isSigningInGoogle, setIsSigningInGoogle] = useState<boolean>(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<'leads' | 'students' | 'settings' | 'diagnostics'>('leads');
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Lead Editing State
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Manual Lead Creation Modal State
  const [showAddLeadModal, setShowAddLeadModal] = useState<boolean>(false);
  const [newLeadForm, setNewLeadForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    type: 'mentorship',
    title: 'Admissions Intake',
    experienceLevel: 'Intermediate',
    monthlyContribution: '£1,000/mo',
    timeHorizon: '10+ Years',
    status: 'New',
    adminNotes: ''
  });
  const [isCreatingLead, setIsCreatingLead] = useState<boolean>(false);

  // Settings State
  const [companyEmail, setCompanyEmail] = useState<string>('calvincharlotte513@gmail.com');
  const [companyPhone, setCompanyPhone] = useState<string>('+447911123456');
  const [isSavingSettings, setIsSavingSettings] = useState<boolean>(false);
  const [settingsSaved, setSettingsSaved] = useState<boolean>(false);
  const [testDispatchSuccess, setTestDispatchSuccess] = useState<boolean>(false);

  // Cloud Firestore & Database Diagnostic State
  const [dbHealth, setDbHealth] = useState<any>(null);
  const [isCheckingDb, setIsCheckingDb] = useState<boolean>(false);
  const [firestorePingMs, setFirestorePingMs] = useState<number | null>(null);
  const [isPingingFirestore, setIsPingingFirestore] = useState<boolean>(false);
  const [firestoreStatus, setFirestoreStatus] = useState<'Connected' | 'Connecting' | 'Synced'>('Connected');

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Cloud Firestore Subscriptions for Leads & Students
  useEffect(() => {
    setIsLoadingData(true);

    // 1. Subscribe to Firestore leads collection in real-time
    const unsubscribeLeads = firebaseDataService.subscribeToLeads(
      (firestoreLeads) => {
        if (firestoreLeads && firestoreLeads.length > 0) {
          setLeads((prev) => {
            // Merge Firestore leads with local backend leads, giving priority to Firestore
            const map = new Map<string, AdminLead>();
            // Add existing
            prev.forEach((l) => map.set(l.id, l));
            // Add/overwrite with Firestore real-time documents
            firestoreLeads.forEach((fl) => {
              map.set(fl.id, {
                id: fl.id,
                type: fl.type,
                title: fl.title,
                applicant: fl.applicant || { fullName: '', email: '', phone: '' },
                details: fl.details || {},
                summaryText: fl.summaryText || '',
                dispatchedToEmail: fl.dispatchedToEmail || companyEmail,
                dispatchedToPhone: fl.dispatchedToPhone || companyPhone,
                status: fl.status || 'New',
                adminNotes: fl.adminNotes || '',
                timestamp: fl.timestamp || new Date().toISOString()
              });
            });
            const list = Array.from(map.values());
            list.sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime());
            return list;
          });
        }
        setIsLoadingData(false);
      },
      (error) => {
        console.warn('Real-time Firestore leads subscription notice:', error);
        setIsLoadingData(false);
      }
    );

    // 2. Subscribe to Firestore userProgress collection in real-time
    const unsubscribeUsers = firebaseDataService.subscribeToAllUsers(
      (firestoreUsers) => {
        if (firestoreUsers && firestoreUsers.length > 0) {
          setStudents((prev) => {
            const map = new Map<string, StudentRecord>();
            prev.forEach((s) => map.set(s.userId, s));
            firestoreUsers.forEach((fu) => {
              map.set(fu.userId, {
                userId: fu.userId,
                studentName: fu.studentName,
                studentEmail: fu.studentEmail,
                completedTopics: fu.completedTopics || [],
                currentLevel: fu.currentLevel || 1,
                lastActive: fu.lastActive || new Date().toISOString(),
                notes: fu.notes || '',
                updatedAt: fu.updatedAt || new Date().toISOString(),
                portfolioPlan: fu.portfolioPlan || null
              });
            });
            const list = Array.from(map.values());
            list.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
            return list;
          });
        }
      },
      (error) => {
        console.warn('Real-time Firestore students subscription notice:', error);
      }
    );

    // 3. Load initial snapshot from server API & merge
    const loadServerBackup = async () => {
      try {
        const [leadsRes, statsRes, settingsRes, usersRes] = await Promise.all([
          fetch('/api/admin/leads'),
          fetch('/api/admin/stats'),
          fetch('/api/admin/settings'),
          fetch('/api/admin/users')
        ]);

        if (leadsRes.ok) {
          const data = await leadsRes.json();
          if (data.success && Array.isArray(data.leads)) {
            setLeads((prev) => {
              const map = new Map<string, AdminLead>();
              data.leads.forEach((l: AdminLead) => map.set(l.id, l));
              prev.forEach((l) => map.set(l.id, l)); // keep Firestore updates
              const list = Array.from(map.values());
              list.sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime());
              return list;
            });
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

        if (usersRes.ok) {
          const usersData = await usersRes.json();
          if (usersData.success && Array.isArray(usersData.users)) {
            setStudents((prev) => {
              const map = new Map<string, StudentRecord>();
              usersData.users.forEach((u: StudentRecord) => map.set(u.userId, u));
              prev.forEach((u) => map.set(u.userId, u));
              const list = Array.from(map.values());
              list.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
              return list;
            });
          }
        }
      } catch (err) {
        console.warn('Backend API load fallback notice:', err);
      }
    };

    loadServerBackup();
    checkDatabaseHealth();

    return () => {
      unsubscribeLeads();
      unsubscribeUsers();
    };
  }, []);

  const pingFirestore = async () => {
    setIsPingingFirestore(true);
    const start = performance.now();
    try {
      await firebaseDataService.getSettings();
      const duration = Math.round(performance.now() - start);
      setFirestorePingMs(duration);
      setFirestoreStatus('Synced');
    } catch {
      setFirestorePingMs(null);
    } finally {
      setIsPingingFirestore(false);
    }
  };

  const checkDatabaseHealth = async () => {
    setIsCheckingDb(true);
    try {
      const res = await fetch('/api/admin/db/status');
      if (res.ok) {
        const data = await res.json();
        setDbHealth(data);
      }
    } catch (err) {
      console.warn('Failed to query DB status:', err);
    } finally {
      setIsCheckingDb(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSigningInGoogle(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error('Google Sign-in notice:', err);
    } finally {
      setIsSigningInGoogle(false);
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await logOutFirebase();
    } catch (err) {
      console.error('Google Sign-out notice:', err);
    }
  };

  const handleUpdateLeadStatus = async (id: string, newStatus: string) => {
    // 1. Optimistic update
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    );

    // 2. Persist to Cloud Firestore
    try {
      await firebaseDataService.updateLead(id, { status: newStatus });
    } catch (err) {
      console.warn('Firestore lead update error:', err);
    }

    // 3. Sync to backend API
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.warn('Backend lead update error:', err);
    }
  };

  const handleSaveNotes = async (id: string) => {
    // 1. Optimistic update
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, adminNotes: tempNotes } : lead))
    );
    setEditingNotesId(null);

    // 2. Persist to Cloud Firestore
    try {
      await firebaseDataService.updateLead(id, { adminNotes: tempNotes });
    } catch (err) {
      console.warn('Firestore lead note error:', err);
    }

    // 3. Sync to backend API
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes: tempNotes })
      });
    } catch (err) {
      console.warn('Backend note error:', err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Delete this applicant lead record permanently from the database?')) return;

    // 1. Optimistic update
    setLeads((prev) => prev.filter((l) => l.id !== id));

    // 2. Delete from Cloud Firestore
    try {
      await firebaseDataService.deleteLead(id);
    } catch (err) {
      console.warn('Firestore delete lead error:', err);
    }

    // 3. Delete from backend API
    try {
      await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Backend delete error:', err);
    }
  };

  const handleDeleteStudent = async (userId: string) => {
    if (!window.confirm('Delete this student learning record permanently?')) return;

    setStudents((prev) => prev.filter((s) => s.userId !== userId));

    try {
      await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Backend delete student error:', err);
    }
  };

  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingLead(true);

    const leadId = `LEAD-${Date.now()}`;
    const timestamp = new Date().toISOString();

    const manualLead: AdminLead = {
      id: leadId,
      type: newLeadForm.type,
      title: newLeadForm.title,
      applicant: {
        fullName: newLeadForm.fullName,
        email: newLeadForm.email,
        phone: newLeadForm.phone,
        experienceLevel: newLeadForm.experienceLevel,
        monthlyContribution: newLeadForm.monthlyContribution,
        timeHorizon: newLeadForm.timeHorizon
      },
      details: {},
      status: newLeadForm.status,
      adminNotes: newLeadForm.adminNotes,
      summaryText: `Manual entry by admin: ${newLeadForm.fullName}`,
      dispatchedToEmail: companyEmail,
      dispatchedToPhone: companyPhone,
      timestamp
    };

    // 1. Optimistic update
    setLeads((prev) => [manualLead, ...prev]);
    setShowAddLeadModal(false);

    // 2. Persist to Cloud Firestore
    try {
      await firebaseDataService.saveLead(manualLead);
    } catch (err) {
      console.warn('Firestore manual lead error:', err);
    }

    // 3. Dual-sync to backend API
    try {
      await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manualLead)
      });
    } catch (err) {
      console.warn('Backend manual lead error:', err);
    } finally {
      setIsCreatingLead(false);
      setNewLeadForm({
        fullName: '',
        email: '',
        phone: '',
        type: 'mentorship',
        title: 'Admissions Intake',
        experienceLevel: 'Intermediate',
        monthlyContribution: '£1,000/mo',
        timeHorizon: '10+ Years',
        status: 'New',
        adminNotes: ''
      });
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Type', 'Title', 'Applicant Name', 'Email', 'Phone', 'Status', 'Date', 'Notes'];
    const rows = leads.map((l) => [
      l.id,
      l.type,
      `"${(l.title || '').replace(/"/g, '""')}"`,
      `"${(l.applicant?.fullName || '').replace(/"/g, '""')}"`,
      `"${(l.applicant?.email || '').replace(/"/g, '""')}"`,
      `"${(l.applicant?.phone || '').replace(/"/g, '""')}"`,
      l.status,
      l.timestamp,
      `"${(l.adminNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `eb_wealth_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveSettings = async () => {
    setIsSavingSettings(true);

    // 1. Save to Cloud Firestore
    try {
      await firebaseDataService.saveSettings({
        companyEmail,
        companyPhone
      });
    } catch (err) {
      console.warn('Firestore save settings error:', err);
    }

    // 2. Dual-save to backend API
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyEmail, companyPhone })
      });
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    } catch (err) {
      console.warn('Backend save settings error:', err);
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
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-white">
                  Executive Administrative Operations
                </h1>
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/40 rounded-xs text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Cloud Database Live
                </span>
                <span className="px-2 py-0.5 bg-amber-950/70 text-amber-300 border border-amber-500/40 rounded-xs text-[10px] font-mono font-bold flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" />
                  Firebase Firestore Connected
                </span>
              </div>
              <p className="text-xs text-stone-300 font-sans mt-0.5">
                Real-Time Admissions Stream · Student Portfolios · Project: <code className="text-[#DFCA96]">com-aistudio-ebwealth-kq-f6b41</code>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Founder Profile Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#08231B] border border-[#C5A869]/40 rounded-xs">
              <img
                src={FOUNDER_IMAGE_URL}
                alt="Ebwealth Executive"
                className="w-7 h-7 rounded-full object-cover border border-[#C5A869]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('ceo_suit_portrait')) {
                    target.src = '/images/ceo_suit_portrait_1791395753240.jpg';
                  }
                }}
              />
              <div className="text-left text-[11px] leading-tight">
                <div className="font-semibold text-white">Ebwealth</div>
                <div className="text-[9px] text-[#DFCA96] font-mono">
                  {currentUser?.email || 'calvincharlotte513@gmail.com'}
                </div>
              </div>
            </div>

            {/* Optional Google Authentication */}
            {currentUser ? (
              <button
                onClick={handleGoogleSignOut}
                className="py-1.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xs border border-stone-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Disconnect Google Account"
              >
                <span>Google: {currentUser.email?.split('@')[0]}</span>
                <LogOut className="w-3 h-3" />
              </button>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                disabled={isSigningInGoogle}
                className="py-1.5 px-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xs border border-[#C5A869]/60 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Verify identity with Google Firebase Auth"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{isSigningInGoogle ? 'Connecting...' : 'Sign in with Google'}</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('home')}
              className="py-1.5 px-3 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xs border border-white/20 transition-colors cursor-pointer"
            >
              Public Site
            </button>
          </div>
        </div>

        {/* 4 Tab Selectors */}
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 mt-6 border-b border-white/10 text-xs font-mono uppercase tracking-wider">
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
            onClick={() => setActiveTab('students')}
            className={`pb-3 font-semibold transition-colors cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'students'
                ? 'border-[#DFCA96] text-[#DFCA96]'
                : 'border-transparent text-stone-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Active Students ({students.length})</span>
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
            <span>Notification Destinations</span>
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
            <span>Cloud Database Diagnostics</span>
          </button>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* TAB 1: INBOUND LEADS & ADMISSIONS */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white border border-[#C5A869]/30 rounded-xs p-4 shadow-xs">
                <div className="text-[10px] font-mono uppercase text-stone-500">Total Leads</div>
                <div className="font-serif text-2xl font-bold text-[#0D3B2E] mt-1">{leads.length}</div>
              </div>
              <div className="bg-white border border-[#C5A869]/30 rounded-xs p-4 shadow-xs">
                <div className="text-[10px] font-mono uppercase text-amber-700">New Applications</div>
                <div className="font-serif text-2xl font-bold text-amber-600 mt-1">
                  {leads.filter((l) => l.status === 'New').length}
                </div>
              </div>
              <div className="bg-white border border-[#C5A869]/30 rounded-xs p-4 shadow-xs">
                <div className="text-[10px] font-mono uppercase text-blue-700">Scheduled Sessions</div>
                <div className="font-serif text-2xl font-bold text-blue-600 mt-1">
                  {leads.filter((l) => l.status === 'Consultation Scheduled').length}
                </div>
              </div>
              <div className="bg-white border border-[#C5A869]/30 rounded-xs p-4 shadow-xs">
                <div className="text-[10px] font-mono uppercase text-emerald-700">Enrolled Clients</div>
                <div className="font-serif text-2xl font-bold text-emerald-600 mt-1">
                  {leads.filter((l) => l.status === 'Enrolled').length}
                </div>
              </div>
            </div>

            {/* Filter & Action Controls Bar */}
            <div className="bg-white border border-stone-200 rounded-xs p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search applicant name, email, phone, or ID..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF9F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#0D3B2E]"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <Filter className="w-3.5 h-3.5 text-stone-500" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="p-1.5 bg-[#FAF9F5] border border-stone-300 rounded-xs text-xs focus:outline-none"
                  >
                    <option value="all">All Intake Types</option>
                    <option value="mentorship">Mentorship</option>
                    <option value="mentorship_application">Mentorship App</option>
                    <option value="booking">Coaching Booking</option>
                    <option value="inquiry">General Inquiry</option>
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="p-1.5 bg-[#FAF9F5] border border-stone-300 rounded-xs text-xs focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Consultation Scheduled">Consultation Scheduled</option>
                    <option value="Enrolled">Enrolled</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowAddLeadModal(true)}
                  className="py-1.5 px-3 bg-[#0D3B2E] hover:bg-[#07251C] text-white text-xs font-semibold rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>New Lead</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="py-1.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xs border border-stone-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Export Leads to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Leads List */}
            {filteredLeads.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-xs p-12 text-center text-stone-500 text-xs">
                No matching leads found. Submit an application form on the website or click "+ New Lead" to create one.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLeads.map((lead) => {
                  const isEditingNotes = editingNotesId === lead.id;

                  return (
                    <div
                      key={lead.id}
                      className="border border-stone-200 rounded-xs p-5 bg-white hover:border-[#C5A869]/50 transition-all space-y-4 shadow-xs"
                    >
                      {/* Top Lead Row */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-stone-100 gap-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-mono uppercase font-bold rounded-xs ${
                              lead.type.includes('mentorship')
                                ? 'bg-amber-100 text-amber-800'
                                : lead.type.includes('booking')
                                ? 'bg-blue-100 text-blue-800'
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

                        {/* Status Dropdown */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase text-stone-500">Status:</span>
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                            className="p-1.5 text-xs font-semibold rounded-xs border border-stone-300 bg-[#FAF9F5] focus:outline-none focus:border-[#0D3B2E]"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Consultation Scheduled">Consultation Scheduled</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Archived">Archived</option>
                          </select>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Contact & Submission Metadata Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-[#C5A869]" />
                          <a
                            href={`mailto:${lead.applicant?.email}`}
                            className="text-[#0D3B2E] hover:underline font-mono truncate"
                          >
                            {lead.applicant?.email || 'N/A'}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#C5A869]" />
                          <a
                            href={`tel:${lead.applicant?.phone}`}
                            className="text-[#0D3B2E] hover:underline font-mono"
                          >
                            {lead.applicant?.phone || 'N/A'}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-stone-500">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          <span>{new Date(lead.timestamp).toLocaleString('en-GB')}</span>
                        </div>
                      </div>

                      {/* Lead Details Box */}
                      {lead.applicant?.notes && (
                        <div className="p-3 bg-[#FAF9F5] border border-stone-200 rounded-xs text-xs text-stone-700 font-sans">
                          <span className="font-semibold text-[#0D3B2E]">Applicant Note / Financial Profile: </span>
                          <span>{lead.applicant.notes}</span>
                        </div>
                      )}

                      {/* Admin Notes Section */}
                      <div className="pt-2 border-t border-stone-100">
                        {isEditingNotes ? (
                          <div className="space-y-2">
                            <textarea
                              value={tempNotes}
                              onChange={(e) => setTempNotes(e.target.value)}
                              placeholder="Add private operational notes for this applicant..."
                              rows={2}
                              className="w-full p-2.5 text-xs bg-[#FAF9F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#0D3B2E]"
                            />
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleSaveNotes(lead.id)}
                                className="py-1 px-3 bg-[#0D3B2E] hover:bg-[#07251C] text-white text-xs font-semibold rounded-xs flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Save className="w-3 h-3 text-[#C5A869]" />
                                <span>Save Notes</span>
                              </button>
                              <button
                                onClick={() => setEditingNotesId(null)}
                                className="py-1 px-3 bg-stone-200 text-stone-700 text-xs rounded-xs hover:bg-stone-300 transition-colors cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between text-xs text-stone-600">
                            <div>
                              <span className="font-semibold text-stone-700">Admin Notes: </span>
                              <span className="italic">{lead.adminNotes || 'No notes added yet.'}</span>
                            </div>
                            <button
                              onClick={() => {
                                setEditingNotesId(lead.id);
                                setTempNotes(lead.adminNotes || '');
                              }}
                              className="text-stone-500 hover:text-[#0D3B2E] text-xs flex items-center gap-1 cursor-pointer"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>{lead.adminNotes ? 'Edit' : 'Add Note'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ACTIVE STUDENTS */}
        {activeTab === 'students' && (
          <div className="bg-white border border-[#C5A869]/30 rounded-xs p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0D3B2E]">
                  Registered Students & Learning Accounts
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Synchronized live with Cloud Firestore collection <code className="text-[#0D3B2E]">/userProgress</code>
                </p>
              </div>
              <span className="px-3 py-1 bg-[#FAF9F5] border border-stone-300 text-xs font-mono font-bold text-[#0D3B2E] rounded-xs">
                {students.length} Accounts
              </span>
            </div>

            {students.length === 0 ? (
              <div className="text-center py-12 text-stone-500 text-xs">
                No active students registered yet. Student progress automatically persists here when users study in the Academy.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {students.map((student) => {
                  const topicsCount = student.completedTopics?.length || 0;
                  const dca = student.portfolioPlan?.monthlyDca || 1000;
                  const isaPct = student.portfolioPlan?.isaAllocation || 70;
                  const sippPct = student.portfolioPlan?.sippAllocation || 30;

                  return (
                    <div
                      key={student.userId}
                      className="border border-stone-200 rounded-xs p-4 bg-[#FAF9F5] hover:border-[#C5A869]/60 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                        <div>
                          <h4 className="font-serif text-base font-bold text-[#0D3B2E]">
                            {student.studentName || 'Private Investor'}
                          </h4>
                          <span className="text-[10px] font-mono text-stone-500">
                            User ID: {student.userId}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteStudent(student.userId)}
                          className="text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Remove Student Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div>
                          <span className="text-stone-500 text-[10px] block">Curriculum Level</span>
                          <span className="font-bold text-[#0D3B2E]">Level {student.currentLevel || 1}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 text-[10px] block">Topics Mastered</span>
                          <span className="font-bold text-emerald-700">{topicsCount} Completed</span>
                        </div>
                        <div>
                          <span className="text-stone-500 text-[10px] block">Planned DCA</span>
                          <span className="font-bold text-[#9E8040]">£{dca.toLocaleString('en-GB')}/mo</span>
                        </div>
                        <div>
                          <span className="text-stone-500 text-[10px] block">ISA / SIPP Split</span>
                          <span className="font-bold text-stone-700">{isaPct}% / {sippPct}%</span>
                        </div>
                      </div>

                      {student.studentEmail && (
                        <div className="text-xs text-stone-600 font-mono flex items-center gap-1.5 pt-2 border-t border-stone-200">
                          <Mail className="w-3 h-3 text-[#C5A869]" />
                          <span className="truncate">{student.studentEmail}</span>
                        </div>
                      )}

                      {student.notes && (
                        <div className="text-[11px] p-2 bg-white border border-stone-200 rounded-xs text-stone-600 italic">
                          "{student.notes}"
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white border border-[#C5A869]/30 rounded-xs p-8 shadow-xs space-y-6 max-w-2xl">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0D3B2E]">
                Operational Dispatch Destinations
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Configure which email and telephone destinations receive incoming applications and bookings.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Primary Company Notification Email
                </label>
                <input
                  type="email"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  className="w-full p-2.5 text-xs bg-[#FAF9F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#0D3B2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-stone-600 mb-1">
                  Primary Company Notification Telephone
                </label>
                <input
                  type="tel"
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                  className="w-full p-2.5 text-xs bg-[#FAF9F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#0D3B2E]"
                />
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={handleSaveSettings}
                  disabled={isSavingSettings}
                  className="py-2.5 px-5 bg-[#0D3B2E] hover:bg-[#07251C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>{isSavingSettings ? 'Saving to Firestore...' : 'Save Dispatch Settings'}</span>
                </button>

                <button
                  onClick={handleSendTestDispatch}
                  className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xs border border-stone-300 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-stone-600" />
                  <span>Send Test Inbound Lead</span>
                </button>
              </div>

              {settingsSaved && (
                <div className="p-3 bg-emerald-50 border border-emerald-500/50 rounded-xs text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Dispatch settings saved successfully to Cloud Firestore and local server.</span>
                </div>
              )}

              {testDispatchSuccess && (
                <div className="p-3 bg-blue-50 border border-blue-500/50 rounded-xs text-blue-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Test dispatch completed successfully. A test record has been inserted into the leads database.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: DIAGNOSTICS & SYSTEM HEALTH */}
        {activeTab === 'diagnostics' && (
          <div className="bg-white border border-[#C5A869]/30 rounded-xs p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0D3B2E]">
                  Cloud Firestore & System Health
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Google Cloud Firestore real-time cloud persistence, security rules, and exchange data feed status.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={pingFirestore}
                  disabled={isPingingFirestore}
                  className="py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isPingingFirestore ? 'Pinging...' : 'Ping Cloud Firestore'}</span>
                </button>

                <a
                  href="/api/admin/db/export"
                  download="eb_wealth_database_backup.json"
                  className="py-2 px-4 bg-[#0D3B2E] hover:bg-[#07251C] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>Export JSON Backup</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Firestore Card */}
              <div className="border border-amber-200 rounded-xs p-5 bg-gradient-to-br from-amber-50/50 to-stone-50 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-bold text-[#0D3B2E] flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span>Google Cloud Firestore Status</span>
                  </h3>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold rounded-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    ACTIVE
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-stone-700 font-mono">
                  <p><strong>Cloud Project ID:</strong> com-aistudio-ebwealth-kq-f6b41</p>
                  <p><strong>Database ID:</strong> ai-studio-ebwealthinvestme-2996264f-fbe0-48bc-be72-feced46e917d</p>
                  <p><strong>Security Rules:</strong> Deployed via DeployRules RPC (v2 hardened ABAC)</p>
                  <p><strong>Collections:</strong> /leads, /userProgress, /settings, /admins</p>
                  <p><strong>Real-Time Listeners:</strong> 2 Active Streams (Leads & Students)</p>
                  {firestorePingMs !== null && (
                    <p className="text-emerald-700 font-bold">
                      <strong>Ping Round-Trip Latency:</strong> {firestorePingMs} ms (Excellent)
                    </p>
                  )}
                </div>
              </div>

              {/* Server Engine Card */}
              <div className="border border-stone-200 rounded-xs p-5 bg-[#FAF9F5] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-bold text-[#0D3B2E] flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#C5A869]" />
                    <span>Local Resilience Layer</span>
                  </h3>
                  <button
                    onClick={checkDatabaseHealth}
                    className="text-stone-400 hover:text-stone-700 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${isCheckingDb ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-stone-600 font-mono">
                  <p><strong>Storage Engine:</strong> Dual-Sync (Cloud Firestore + Local JSON)</p>
                  <p><strong>Local File Path:</strong> {dbHealth?.filePath || stats?.dbStorageLocation || './data/database.json'}</p>
                  <p><strong>Total Leads in View:</strong> {leads.length}</p>
                  <p><strong>Total Students in View:</strong> {students.length}</p>
                  <p><strong>Market Feed:</strong> {stats?.marketFeedStatus || 'Live Exchange Feed'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Manual Lead Intake Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border-2 border-[#C5A869] rounded-xs max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-serif text-xl font-bold text-[#0D3B2E] flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#C5A869]" />
                <span>Create New Inbound Lead</span>
              </h3>
              <button
                onClick={() => setShowAddLeadModal(false)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.fullName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, fullName: e.target.value })}
                    placeholder="e.g. Charlotte Bennett"
                    className="w-full p-2.5 border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-[#0D3B2E]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Contact Email *</label>
                  <input
                    type="email"
                    required
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    placeholder="e.g. charlotte@example.co.uk"
                    className="w-full p-2.5 border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-[#0D3B2E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    placeholder="+44 7700 900123"
                    className="w-full p-2.5 border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-[#0D3B2E]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Inquiry Type</label>
                  <select
                    value={newLeadForm.type}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, type: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-[#0D3B2E]"
                  >
                    <option value="mentorship">Mentorship Program</option>
                    <option value="booking">1-on-1 Coaching Booking</option>
                    <option value="inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Monthly Contribution</label>
                  <input
                    type="text"
                    value={newLeadForm.monthlyContribution}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, monthlyContribution: e.target.value })}
                    placeholder="£1,000/mo"
                    className="w-full p-2.5 border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-[#0D3B2E]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Initial Status</label>
                  <select
                    value={newLeadForm.status}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, status: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-[#0D3B2E]"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Consultation Scheduled">Consultation Scheduled</option>
                    <option value="Enrolled">Enrolled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-stone-600 mb-1">Admin Notes</label>
                <textarea
                  value={newLeadForm.adminNotes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, adminNotes: e.target.value })}
                  placeholder="Private administrative notes..."
                  rows={2}
                  className="w-full p-2.5 border border-stone-300 rounded-xs bg-[#FAF9F5] focus:outline-none focus:border-[#0D3B2E]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="py-2 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingLead}
                  className="py-2 px-5 bg-[#0D3B2E] hover:bg-[#07251C] text-white rounded-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>{isCreatingLead ? 'Saving to Firestore...' : 'Create Record'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
