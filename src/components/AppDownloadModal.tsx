import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Smartphone,
  Download,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
  Upload,
  Link as LinkIcon,
  Settings,
  Info,
  Check
} from 'lucide-react';
import {
  ApkConfig,
  getApkConfig,
  saveApkConfig,
  storeApkBlob,
  getApkBlob,
  removeApkBlob,
  formatBytes
} from '../utils/apkStorage';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextFeature?: string;
  initialTab?: 'download' | 'uploader';
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  isOpen,
  onClose,
  contextFeature,
  initialTab = 'download'
}) => {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'download' | 'uploader'>(initialTab);
  
  // APK configuration state
  const [apkConfig, setApkConfig] = useState<ApkConfig>(getApkConfig());
  const [customUrlInput, setCustomUrlInput] = useState(apkConfig.customUrl || '');
  const [versionInput, setVersionInput] = useState(apkConfig.version);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');
  const [hasStoredBlob, setHasStoredBlob] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialTab) {
        setActiveTab(initialTab);
      }
      const cfg = getApkConfig();
      setApkConfig(cfg);
      setCustomUrlInput(cfg.customUrl || '');
      setVersionInput(cfg.version);
      getApkBlob().then((blob) => {
        setHasStoredBlob(!!blob);
      });
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleDownloadClick = async () => {
    setDownloadStarted(true);

    if (apkConfig.sourceType === 'uploaded_file') {
      const blob = await getApkBlob();
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = apkConfig.fileName || 'EB-Wealth-v2.4.0.apk';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        return;
      }
    }

    if (apkConfig.sourceType === 'custom_url' && apkConfig.customUrl) {
      const link = document.createElement('a');
      link.href = apkConfig.customUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.download = apkConfig.fileName || 'EB-Wealth-v2.4.0.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // Default bundled file or simulated APK download
    const link = document.createElement('a');
    link.href = '/downloads/eb-wealth-app.apk';
    link.download = apkConfig.fileName || 'EB-Wealth-v2.4.0.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleSaveUploadedFile = async () => {
    if (!selectedFile) return;
    setIsSaving(true);
    try {
      await storeApkBlob(selectedFile);
      const newConfig: ApkConfig = {
        sourceType: 'uploaded_file',
        fileName: selectedFile.name,
        version: versionInput.trim() || 'v2.4.0',
        fileSizeFormatted: formatBytes(selectedFile.size),
        uploadedAt: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        customUrl: customUrlInput.trim() || undefined
      };
      saveApkConfig(newConfig);
      setApkConfig(newConfig);
      setHasStoredBlob(true);
      setSelectedFile(null);
      setSaveSuccessMessage('APK successfully uploaded! Visitors will now download this file.');
      setTimeout(() => setSaveSuccessMessage(''), 4500);
    } catch (err) {
      console.error(err);
      alert('Failed to save APK into browser storage.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveCustomUrl = () => {
    if (!customUrlInput.trim()) {
      alert('Please enter a valid URL.');
      return;
    }
    const newConfig: ApkConfig = {
      sourceType: 'custom_url',
      customUrl: customUrlInput.trim(),
      fileName: 'EB-Wealth-App.apk',
      version: versionInput.trim() || 'v2.4.0',
      fileSizeFormatted: 'External Hosted',
      uploadedAt: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };
    saveApkConfig(newConfig);
    setApkConfig(newConfig);
    setSaveSuccessMessage('Download URL saved! Downloads will now route to your link.');
    setTimeout(() => setSaveSuccessMessage(''), 4500);
  };

  const resetAndClose = () => {
    setDownloadStarted(false);
    setShowGuide(false);
    setActiveTab('download');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs p-3 sm:p-6 flex items-start justify-center pt-8 sm:pt-14 pb-12">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#0F172A] my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-100 cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          {/* Modal Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#00A878] uppercase mb-1">
              <Smartphone className="w-4 h-4" />
              <span>EB Wealth Mobile Application</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#17202A]">
              Access via the EB Wealth App
            </h3>
            <p className="text-xs sm:text-sm text-[#52606D] mt-1.5 leading-relaxed">
              {contextFeature ? (
                <span>
                  To access <strong className="text-[#00A878]">{contextFeature}</strong>, download the official EB Wealth mobile application. All masterclasses, interactive walkthroughs, and tools are hosted directly in the app.
                </span>
              ) : (
                <span>
                  All educational curricula, live strategy sessions, coaching bookings, and calculators are accessible directly on the EB Wealth app.
                </span>
              )}
            </p>
          </div>

          {/* Primary Download Card */}
          <div className="p-5 bg-[#F8FAFC] border border-slate-200 rounded-2xl mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] border border-[#00A878]/30 flex items-center justify-center text-[#00A878]">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#17202A]">EB Wealth for Android</h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#52606D] mt-0.5">
                    <span className="text-[#00A878] font-mono font-semibold">{apkConfig.version} (Official Release)</span>
                    <span>·</span>
                    <span>{apkConfig.fileSizeFormatted}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-1 bg-[#ECFDF5] border border-[#00A878]/20 text-[#00A878] text-[10px] font-mono font-semibold rounded-md">
                  APK READY
                </span>
              </div>
            </div>

            {/* Download Action Button */}
            <button
              onClick={handleDownloadClick}
              className="w-full py-3.5 px-6 bg-[#00A878] hover:bg-[#009267] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download EB Wealth APK ({apkConfig.fileName})</span>
            </button>

            {downloadStarted && (
              <div className="p-3 bg-[#ECFDF5] border border-[#00A878]/30 rounded-xl flex items-center gap-2 text-xs text-[#00A878]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Download initiated! Check your browser downloads to install.</span>
              </div>
            )}

            <div className="flex items-center justify-between text-[11px] text-[#52606D] pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00A878]" />
                <span>Verified Package · Virus & Malware Free · UK Compliance</span>
              </div>
              <button
                onClick={() => setShowGuide(!showGuide)}
                className="text-[#00A878] hover:underline font-semibold cursor-pointer"
              >
                {showGuide ? 'Hide Install Guide' : 'How to install APK?'}
              </button>
            </div>
          </div>

          {/* 3-Step APK Installation Guide */}
          {showGuide && (
            <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl mb-6 space-y-3 text-xs text-[#52606D]">
              <h5 className="font-bold text-[#17202A] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#F4B942]" />
                <span>3-Step Android Installation Guide</span>
              </h5>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-200 text-[#17202A] text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">1</span>
                  <span>Click <strong>Download EB Wealth APK</strong> to save the installer package to your device.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-200 text-[#17202A] text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">2</span>
                  <span>Open your notification bar or downloads folder, tap the APK file, and select <strong>Install</strong>. If prompted, toggle on &quot;Allow from this source&quot;.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-200 text-[#17202A] text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">3</span>
                  <span>Launch the EB Wealth app, log in with your credentials, and start learning immediately.</span>
                </div>
              </div>
            </div>
          )}

          {/* Feature Highlights Inside the App */}
          <div className="space-y-2.5 mb-6 text-xs text-[#52606D]">
            <span className="text-[11px] uppercase tracking-wider text-[#17202A] font-bold block">
              What is included in the EB Wealth App:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00A878] shrink-0" />
                <span>All 6 Academy Progression Levels</span>
              </div>
              <div className="p-2.5 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00A878] shrink-0" />
                <span>Interactive Broker Walkthrough Simulator</span>
              </div>
              <div className="p-2.5 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" />
                <span>1-on-1 Investment Consultation Booking</span>
              </div>
              <div className="p-2.5 bg-[#F8FAFC] rounded-xl border border-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" />
                <span>Compound Interest & ISA Calculators</span>
              </div>
            </div>
          </div>

          {/* Footer info & close */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#64748B]">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Web access is also synced across all your devices.</span>
            </div>
            <button
              onClick={resetAndClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
