import React, { useState } from 'react';
import { X, Smartphone, Download, CheckCircle2, ShieldCheck, ArrowRight, ExternalLink, HelpCircle, QrCode } from 'lucide-react';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextFeature?: string;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  isOpen,
  onClose,
  contextFeature
}) => {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  if (!isOpen) return null;

  const handleDownloadClick = () => {
    setDownloadStarted(true);
    // Create an anchor and trigger actual download
    const link = document.createElement('a');
    link.href = '/downloads/eb-wealth-app.apk';
    link.download = 'EB-Wealth-v2.4.0.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAndClose = () => {
    setDownloadStarted(false);
    setShowGuide(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-neutral-100 my-8">
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-neutral-800 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

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
                  <span className="text-emerald-400 font-mono">v2.4.0 (Latest Release)</span>
                  <span>·</span>
                  <span>42.8 MB</span>
                  <span>·</span>
                  <span>Direct APK</span>
                </div>
              </div>
            </div>

            <span className="hidden sm:inline-block px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold rounded-md">
              APK READY
            </span>
          </div>

          {/* Download Action Button */}
          <button
            onClick={handleDownloadClick}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download EB Wealth APK</span>
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
              <span>Verified Package · Virus & Malware Free</span>
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
                <span>Open your notification bar or downloads folder, tap the APK file, and select <strong>Install</strong>. If prompted, toggle on "Allow from this source".</span>
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
          <span className="text-neutral-500">
            iOS version releasing on TestFlight shortly
          </span>
          <button
            onClick={resetAndClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
