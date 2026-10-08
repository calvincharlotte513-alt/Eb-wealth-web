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
  FileCheck,
  RefreshCw,
  FolderArchive,
  Info,
  Check,
  ExternalLink,
  ChevronRight
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

    // Default bundled file
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

  const handleResetToDefault = async () => {
    await removeApkBlob();
    const defaultConfig: ApkConfig = {
      sourceType: 'default',
      fileName: 'EB-Wealth-v2.4.0.apk',
      version: 'v2.4.0',
      fileSizeFormatted: '42.8 MB',
      releaseNotes: 'Official Release with UK Compliance & Sovereign Wealth Modules'
    };
    saveApkConfig(defaultConfig);
    setApkConfig(defaultConfig);
    setCustomUrlInput('');
    setVersionInput('v2.4.0');
    setHasStoredBlob(false);
    setSelectedFile(null);
    setSaveSuccessMessage('Reset to bundled default repository package.');
    setTimeout(() => setSaveSuccessMessage(''), 3000);
  };

  const resetAndClose = () => {
    setDownloadStarted(false);
    setShowGuide(false);
    setActiveTab('download');
    onClose();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-neutral-100 my-8">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-neutral-800 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Switcher (Commented out for now)
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-neutral-950 border border-neutral-800 rounded-2xl mb-6">
          <button
            onClick={() => setActiveTab('download')}
            className={`py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'download'
                ? 'bg-neutral-800 text-white shadow-md border border-neutral-700'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>Download APK</span>
          </button>
          <button
            onClick={() => setActiveTab('uploader')}
            className={`py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'uploader'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-neutral-950 shadow-lg shadow-emerald-950/50'
                : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 border border-dashed border-emerald-500/40'
            }`}
          >
            <Upload className={`w-4 h-4 ${activeTab === 'uploader' ? 'text-neutral-950' : 'text-emerald-400'}`} />
            <span>Upload / Manage APK</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono uppercase font-black ${
              activeTab === 'uploader' ? 'bg-neutral-950 text-emerald-300' : 'bg-emerald-500/20 text-emerald-300'
            }`}>
              Admin
            </span>
          </button>
        </div>
        */}

        {activeTab === 'download' ? (
          <div>
            {/* Quick Owner Switch Banner (Commented out for now)
            <div className="p-3.5 bg-neutral-950/80 border border-emerald-500/30 rounded-2xl mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Looking to upload your own APK?</span>
                    <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] rounded font-mono font-semibold">
                      Owner Tool
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Switch to the uploader tab to upload a file or connect Google Drive.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('uploader')}
                className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Go to Upload / Manage APK &rarr;
              </button>
            </div>
            */}

            {/* Modal Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-1">
                <Smartphone className="w-4 h-4" />
                <span>EB Wealth Mobile Application</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
                Access via the EB Wealth App
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 leading-relaxed">
                {contextFeature ? (
                  <span>
                    To access <strong className="text-emerald-400">{contextFeature}</strong>, download the official EB Wealth mobile application. All masterclasses, mentorship deal rooms, and AI tools are hosted directly in the app.
                  </span>
                ) : (
                  <span>
                    All educational curricula, live private deal rooms, executive coaching sessions, and proprietary AI tools are exclusively available on the EB Wealth app.
                  </span>
                )}
              </p>
            </div>

            {/* Primary Download Card */}
            <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-2xl mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500/20 via-teal-500/20 to-blue-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">EB Wealth for Android</h4>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                      <span className="text-emerald-400 font-mono">{apkConfig.version} (Release)</span>
                      <span>·</span>
                      <span>{apkConfig.fileSizeFormatted}</span>
                      <span>·</span>
                      <span className="capitalize">{apkConfig.sourceType.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold rounded-md">
                    APK READY
                  </span>
                </div>
              </div>

              {/* Download Action Button */}
              <button
                onClick={handleDownloadClick}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download EB Wealth APK ({apkConfig.fileName})</span>
              </button>

              {downloadStarted && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Download initiated! Check your browser downloads to install.</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Package · Virus & Malware Free · UK Compliance</span>
                </div>
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className="text-emerald-400 hover:text-emerald-300 underline font-medium cursor-pointer"
                >
                  {showGuide ? 'Hide Install Guide' : 'How to install APK?'}
                </button>
              </div>
            </div>

            {/* 3-Step APK Installation Guide */}
            {showGuide && (
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl mb-6 space-y-3 text-xs text-neutral-300">
                <h5 className="font-semibold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>3-Step Android Installation Guide</span>
                </h5>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-neutral-800 text-neutral-200 text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">1</span>
                    <span>Click <strong>Download EB Wealth APK</strong> to save the installer package to your device.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-neutral-800 text-neutral-200 text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">2</span>
                    <span>Open your notification bar or downloads folder, tap the APK file, and select <strong>Install</strong>. If prompted, toggle on &quot;Allow from this source&quot;.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-neutral-800 text-neutral-200 text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">3</span>
                    <span>Launch the EB Wealth app, log in with your credentials, and start learning and accessing private deal rooms immediately.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Feature Highlights Inside the App */}
            <div className="space-y-2.5 mb-6 text-xs text-neutral-300">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                What is included in the EB Wealth App:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800/80 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>All 4 Academy Masterclasses</span>
                </div>
                <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800/80 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Private Deal Room & Syndicates</span>
                </div>
                <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800/80 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>1-on-1 Advisory Booking & Video</span>
                </div>
                <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800/80 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>AI Prompt Engineering Studio</span>
                </div>
              </div>
            </div>

            {/* Footer info & close */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-neutral-400">
                <Info className="w-3.5 h-3.5 text-neutral-500" />
                <span>Owner? Switch to <strong>Upload / Manage APK</strong> tab above to upload your latest release.</span>
              </div>
              <button
                onClick={resetAndClose}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* APK Release & Upload Manager Tab */
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-1">
                <Settings className="w-4 h-4" />
                <span>APK Release & File Manager</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                How to Upload & Connect Your APK
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                You can upload your APK directly into the browser storage, configure a direct download link (e.g., Google Drive, GitHub Releases, Cloudflare, S3), or place it in the project files.
              </p>
            </div>

            {saveSuccessMessage && (
              <div className="p-3 bg-emerald-950/70 border border-emerald-500/50 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{saveSuccessMessage}</span>
              </div>
            )}

            {/* Method 1: Direct File Upload into Browser Storage */}
            <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-mono">1</span>
                    Direct APK File Upload (Instant)
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Upload your <code>.apk</code> file right here. Once uploaded, any visitor clicking &quot;Download App (APK)&quot; receives your official file immediately!
                  </p>
                </div>
                {hasStoredBlob && (
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono rounded">
                    Active File Stored
                  </span>
                )}
              </div>

              {/* Drag & Drop Upload Container */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-emerald-400 bg-emerald-950/40 scale-[1.01]'
                    : selectedFile
                    ? 'border-emerald-500/50 bg-neutral-900/90'
                    : 'border-neutral-700 hover:border-emerald-500/50 bg-neutral-900/40 hover:bg-neutral-900/80'
                }`}
              >
                <input
                  type="file"
                  accept=".apk,.zip,.xapk,.bin,application/vnd.android.package-archive,application/zip"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {selectedFile ? 'Selected File Ready:' : 'Click to select APK or drag & drop here'}
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Accepts Android <code>.apk</code> or renamed <code>.zip</code> packages
                    </p>
                  </div>

                  {selectedFile ? (
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-mono">
                      <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate max-w-[240px] sm:max-w-md">{selectedFile.name}</span>
                      <span className="text-emerald-400/70">({formatBytes(selectedFile.size)})</span>
                    </div>
                  ) : (
                    <span className="mt-2 px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl border border-neutral-700 inline-block">
                      Browse Files
                    </span>
                  )}
                </div>
              </div>

              {selectedFile && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <div className="flex-1">
                    <label className="text-[11px] text-neutral-400 block mb-1">Release Version Label</label>
                    <input
                      type="text"
                      value={versionInput}
                      onChange={(e) => setVersionInput(e.target.value)}
                      placeholder="e.g. v2.4.0 (Official)"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={handleSaveUploadedFile}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 text-xs font-bold rounded-xl transition-all cursor-pointer sm:self-end flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/40"
                  >
                    {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    <span>Save & Set as Active Download</span>
                  </button>
                </div>
              )}
            </div>

            {/* Method 2: External Hosted Download URL */}
            <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-mono">2</span>
                  Cloud Hosted Direct Download URL
                </h4>
                <p className="text-xs text-neutral-400 mt-1">
                  If your APK is hosted on Google Drive, GitHub Releases, Firebase Storage, Dropbox, MediaFire, or your custom server/CDN, paste the direct link here:
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <LinkIcon className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                      <input
                        type="url"
                        value={customUrlInput}
                        onChange={(e) => setCustomUrlInput(e.target.value)}
                        placeholder="https://drive.google.com/uc?export=download&id=... or https://yourdomain.com/app.apk"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveCustomUrl}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      Use URL
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-500 leading-relaxed space-y-1">
                  <p>• <strong>Google Drive Tip:</strong> Ensure sharing is &quot;Anyone with the link can view&quot;, and convert the URL format to <code>https://drive.google.com/uc?export=download&id=FILE_ID</code>.</p>
                  <p>• <strong>GitHub Releases / Cloud CDN:</strong> Paste the direct <code>.apk</code> asset download link.</p>
                </div>
              </div>
            </div>

            {/* Method 3: Upload via Chat or Project File */}
            <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-2xl space-y-3 text-xs text-neutral-300">
              <h5 className="font-semibold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-mono">3</span>
                <span>Want to upload here in the chat instead?</span>
              </h5>
              <div className="space-y-2 text-[11px] text-neutral-400 leading-relaxed">
                <p>
                  If you saw <strong className="text-amber-400">&quot;file types are not supported&quot;</strong> when trying to upload your <code>.apk</code> in the chat window, you have two quick tricks:
                </p>
                <div className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg space-y-1 text-neutral-300">
                  <p>• <strong>Rename Trick:</strong> Rename your file on your computer from <code className="text-emerald-400">myapp.apk</code> to <code className="text-emerald-400">myapp.zip</code>. The chat will accept the <code>.zip</code> file! Once you send it, I will immediately extract/place it as your official app APK.</p>
                  <p>• <strong>Cloud Link:</strong> Upload your APK to Google Drive, Dropbox, or WeTransfer, make it public, and paste the link in the chat. I will fetch it and bundle it into the app server!</p>
                </div>
              </div>
            </div>

            {/* Current Active Source & Controls */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-neutral-800">
              <div className="text-xs text-neutral-400">
                <span>Current Active Source: </span>
                <span className="text-white font-mono font-medium">
                  {apkConfig.sourceType === 'uploaded_file'
                    ? `Uploaded File (${apkConfig.fileName})`
                    : apkConfig.sourceType === 'custom_url'
                    ? `External URL (${apkConfig.customUrl?.substring(0, 30)}...)`
                    : 'Default Repository File (/downloads/eb-wealth-app.apk)'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Reset to Default
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('download')}
                  className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Test Download</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
