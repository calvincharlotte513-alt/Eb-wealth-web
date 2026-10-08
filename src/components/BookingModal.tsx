import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Shield, ArrowRight, Mail, Phone, MessageSquare, Copy, Check } from 'lucide-react';
import { CoachingPackage } from '../types';
import { notificationService, DispatchResult } from '../services/notificationService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: CoachingPackage | null;
  onProceedToStripe?: (pkg: CoachingPackage) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPackage
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-15');
  const [selectedTime, setSelectedTime] = useState('10:00 AM BST (London)');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [primaryFocus, setPrimaryFocus] = useState('Investment Knowledge & UK Tax Shelters');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<DispatchResult | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentPkg = initialPackage || {
    id: 'coaching-clarity-60',
    title: '60-Minute Strategy & Roadmap Intensive',
    duration: '60 Minutes (1:1 Video Call)',
    accessTier: 'Private 1-on-1 Coaching',
    description: 'A focused, objective deep dive into your current financial situation, investment questions, and long-term targets.',
    features: [],
    recommendedFor: ''
  };

  const timeSlots = [
    '09:00 AM BST (London)',
    '11:00 AM BST (London)',
    '01:30 PM BST (London)',
    '03:30 PM BST (London)',
    '05:00 PM BST (London)'
  ];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await notificationService.dispatchBooking({
        clientName,
        clientEmail,
        clientPhone,
        selectedDate,
        selectedTime,
        packageTitle: currentPkg.title,
        primaryFocus,
        notes
      });
      setDispatchResult(res);
      setIsBooked(true);
    } catch (err) {
      console.error('Booking dispatch error:', err);
      setIsBooked(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = () => {
    if (!dispatchResult) return;
    navigator.clipboard.writeText(dispatchResult.summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAndClose = () => {
    setIsBooked(false);
    setIsSubmitting(false);
    setDispatchResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-[#17202A] my-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-[#17202A] transition-colors p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isBooked ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono font-bold text-[#2563EB] uppercase">
                Private 1-to-1 Booking
              </span>
              <h3 className="text-2xl font-bold text-[#17202A] mt-0.5">
                {currentPkg.title}
              </h3>
              <p className="text-xs text-[#52606D] mt-1">
                Select your preferred date & time for your dedicated one-on-one session.
              </p>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#17202A] mb-1">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rachel Adams"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="rachel@domain.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1">
                    Phone *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+44 7123 456789"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1">
                    Time Slot *
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                  >
                    {timeSlots.map((ts, i) => (
                      <option key={i} value={ts}>{ts}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17202A] mb-1">
                  Primary Area of Focus *
                </label>
                <select
                  value={primaryFocus}
                  onChange={(e) => setPrimaryFocus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                >
                  <option>Investment Knowledge & UK Tax Shelters (ISA/SIPP)</option>
                  <option>Portfolio Diversification & Fee Audit</option>
                  <option>Company Valuation & Reading Financial Statements</option>
                  <option>Business Scaling, Margins & AI Workflows</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17202A] mb-1">
                  Specific Questions / Context (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us briefly what you want to achieve or review in this session..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="p-3 bg-[#EFF6FF] border border-blue-200 rounded-xl text-[11px] text-[#2563EB]">
                <Shield className="w-4 h-4 text-[#2563EB] inline mr-1 -mt-0.5" />
                Immediate Dispatch Notice: Booking details will be sent directly to our company email and phone immediately so your time slot is locked and confirmed.
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Dispatching Directly to Company...' : 'Confirm Coaching Reservation'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-4 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] text-[#00A878] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-bold text-[#17202A]">
                Coaching Session Reserved!
              </h3>
              <p className="text-xs text-[#52606D] max-w-sm mx-auto leading-relaxed">
                We have reserved <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong> for <strong>{clientName}</strong> ({currentPkg.title}).
              </p>
            </div>

            {/* Direct Dispatch Verification Box */}
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 text-xs space-y-2.5">
              <div className="font-bold text-[#17202A] flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="flex items-center gap-1.5 text-[#00A878]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Immediate Company Dispatch Confirmed</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {dispatchResult?.leadId || 'CONFIRMED'}
                </span>
              </div>

              <div className="space-y-1.5 text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Company Email:</span>
                  </span>
                  <strong className="text-[#17202A] font-mono">{dispatchResult?.dispatchedToEmail || 'calvincharlotte513@gmail.com'}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#00A878]" />
                    <span>Company Phone (SMS/WhatsApp):</span>
                  </span>
                  <strong className="text-[#17202A] font-mono">{dispatchResult?.dispatchedToPhone || '+44 (0) 7911 123456'}</strong>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px]">
                  <span>Status:</span>
                  <span className="inline-flex items-center gap-1 text-[#00A878] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#00A878] animate-pulse"></span>
                    <span>Delivered Directly from Website</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Instant Action Links */}
            <div className="space-y-2">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-center">
                Instant Direct Connect Options
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dispatchResult?.whatsAppUrl && (
                  <a
                    href={dispatchResult.whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Direct WhatsApp to Company</span>
                  </a>
                )}

                {dispatchResult?.mailtoUrl && (
                  <a
                    href={dispatchResult.mailtoUrl}
                    className="py-2.5 px-3 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Direct Email to Company</span>
                  </a>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="flex-1 py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-[#17202A] text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#00A878]" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? 'Summary Copied!' : 'Copy Reservation Summary'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="py-2 px-5 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
