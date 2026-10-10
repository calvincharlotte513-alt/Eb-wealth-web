import React, { useState, useEffect } from 'react';
import {
  X,
  Smartphone,
  Download,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
  Info
} from 'lucide-react';
import {
  ApkConfig,
  getApkConfig,
  getApkBlob
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
  contextFeature
}) => {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [apkConfig, setApkConfig] = useState<ApkConfig>(getApkConfig());

  useEffect(() => {
    if (isOpen) {
      const cfg = getApkConfig();
      setApkConfig(cfg);
    }
  }, [isOpen]);

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

    // Default bundled download fallback
    const link = document.createElement('a');
    link.href = '/downloads/eb-wealth-app.apk';
    link.download = apkConfig.fileName || 'EB-Wealth-v2.4.0.apk';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#08231B]/75 backdrop-blur-xs p-3 sm:p-6 flex items-start justify-center pt-8 sm:pt-14 pb-12">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-xs shadow-2xl p-6 sm:p-8 text-[#141E18] my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-stone-400 hover:text-stone-800 transition-colors p-2 rounded-xs hover:bg-stone-100 cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          {/* Modal Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-[#C5A869] uppercase mb-1">
              <Smartphone className="w-4 h-4 text-[#C5A869]" />
              <span>EB Wealth Mobile Architecture</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0D3B2E]">
              Access EB Wealth Mobile App
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed font-sans">
              {contextFeature ? (
                <span>
                  To access <strong className="text-[#0D3B2E]">{contextFeature}</strong>, install the official EB Wealth mobile application. All masterclasses, interactive walkthroughs, and quantitative tools are synced directly in the app.
                </span>
              ) : (
                <span>
                  All educational curricula, live strategy sessions, coaching bookings, and calculators are accessible directly through the EB Wealth mobile application.
                </span>
              )}
            </p>
          </div>

          {/* Primary Download Card */}
          <div className="p-5 bg-[#FAF9F5] border border-stone-200 rounded-xs mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xs bg-[#0D3B2E] border border-[#C5A869]/40 flex items-center justify-center text-[#C5A869]">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#0D3B2E]">EB Wealth for Android</h4>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5 font-mono">
                    <span className="text-[#C5A869] font-semibold">{apkConfig.version} (Official Release)</span>
                    <span>·</span>
                    <span>{apkConfig.fileSizeFormatted}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-1 bg-[#FAF5E8] border border-[#C5A869]/40 text-[#0D3B2E] text-[10px] font-mono font-semibold rounded-xs">
                  PACKAGE READY
                </span>
              </div>
            </div>

            {/* Download Action Button */}
            <button
              onClick={handleDownloadClick}
              className="w-full py-3.5 px-6 bg-[#0D3B2E] hover:bg-[#124E3F] text-[#FAF9F5] font-medium text-xs sm:text-sm rounded-xs border border-[#C5A869]/50 transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#C5A869]" />
              <span>Download EB Wealth APK ({apkConfig.fileName})</span>
            </button>

            {downloadStarted && (
              <div className="p-3 bg-[#FAF5E8] border border-[#C5A869]/40 rounded-xs flex items-center gap-2 text-xs text-[#0D3B2E] font-mono">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#C5A869]" />
                <span>Download initiated. Please check your browser downloads to complete installation.</span>
              </div>
            )}

            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 font-mono">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Verified Binary · Malware Free · UK Compliance</span>
              </div>
              <button
                onClick={() => setShowGuide(!showGuide)}
                className="text-[#0D3B2E] hover:underline font-semibold cursor-pointer"
              >
                {showGuide ? 'Hide Guide' : 'How to install APK?'}
              </button>
            </div>
          </div>

          {/* 3-Step APK Installation Guide */}
          {showGuide && (
            <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xs mb-6 space-y-3 text-xs text-stone-600">
              <h5 className="font-serif font-bold text-[#0D3B2E] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Android Installation Protocol</span>
              </h5>
              <div className="space-y-2 font-sans">
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-xs bg-[#0D3B2E] text-white text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5 font-bold">1</span>
                  <span>Click <strong>Download EB Wealth APK</strong> to save the installer package to your mobile storage.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-xs bg-[#0D3B2E] text-white text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5 font-bold">2</span>
                  <span>Open your notification drawer or Downloads folder, tap the APK file, and confirm <strong>Install</strong>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-xs bg-[#0D3B2E] text-white text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5 font-bold">3</span>
                  <span>Launch the EB Wealth application and immediately explore all interactive simulation tiers.</span>
                </div>
              </div>
            </div>
          )}

          {/* Feature Highlights Inside the App */}
          <div className="space-y-2.5 mb-6 text-xs text-stone-600">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
              Core Capabilities in EB Wealth Mobile:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 bg-[#FAF9F5] rounded-xs border border-stone-200 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869] shrink-0" />
                <span>All 6 Academy Progression Levels</span>
              </div>
              <div className="p-2.5 bg-[#FAF9F5] rounded-xs border border-stone-200 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869] shrink-0" />
                <span>Interactive Broker Walkthrough Simulator</span>
              </div>
              <div className="p-2.5 bg-[#FAF9F5] rounded-xs border border-stone-200 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869] shrink-0" />
                <span>1-on-1 Investment Consultation Scheduling</span>
              </div>
              <div className="p-2.5 bg-[#FAF9F5] rounded-xs border border-stone-200 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869] shrink-0" />
                <span>Compound Interest & ISA Quantitative Simulators</span>
              </div>
            </div>
          </div>

          {/* Footer info & close */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-stone-500 font-mono text-[11px]">
              <Info className="w-3.5 h-3.5 text-stone-400" />
              <span>Web portal progress is synchronized with your mobile profile.</span>
            </div>
            <button
              onClick={resetAndClose}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-[#0D3B2E] text-xs font-medium rounded-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
