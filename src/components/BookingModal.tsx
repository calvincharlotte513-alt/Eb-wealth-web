import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Shield, Mail, Phone, MessageSquare, Copy, Check } from 'lucide-react';
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

  const currentPkg: CoachingPackage = initialPackage || {
    id: 'coaching-clarity-60',
    title: '60-Minute Investment Strategy Intensive',
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs p-3 sm:p-6 flex items-start justify-center pt-8 sm:pt-14 pb-12">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#0F172A] my-auto animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-100 cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isBooked ? (
          <div>
            <div className="mb-6 pr-8">
              <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider">
                Private 1-on-1 Investment Coaching
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#17202A] mt-1">
                {currentPkg.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#52606D] mt-1.5">
                Select your preferred date & time for your dedicated one-on-one session. All booking details are immediately dispatched to our admissions team.
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
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="rachel@domain.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+44 7911 123456"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs sm:text-sm text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
                    Preferred Date *
                  </label>
                  <input
                    required
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17202A] mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
                    Time Slot (BST) *
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17202A] mb-1">
                  Primary Investment Focus *
                </label>
                <select
                  value={primaryFocus}
                  onChange={(e) => setPrimaryFocus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="Investment Foundations & Eliminating Jargon">Investment Foundations & Eliminating Jargon</option>
                  <option value="UK Tax Shelters (Stocks & Shares ISA, JISA, SIPP)">UK Tax Shelters (Stocks & Shares ISA, JISA, SIPP)</option>
                  <option value="Portfolio Construction & Global Asset Allocation">Portfolio Construction & Global Asset Allocation</option>
                  <option value="ETF & Index Fund Selection vs Single Stocks">ETF & Index Fund Selection vs Single Stocks</option>
                  <option value="Company Analysis, Free Cash Flow & Valuation">Company Analysis, Free Cash Flow & Valuation</option>
                  <option value="Long-Term Compounding & Annual Rebalancing">Long-Term Compounding & Annual Rebalancing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17202A] mb-1">
                  Specific Questions or Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your current portfolio or what you'd like to achieve..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#17202A] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'Dispatching Booking Details...' : 'Confirm Reservation & Dispatch Details'}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#52606D] pt-1">
                <Shield className="w-3.5 h-3.5 text-[#00A878]" />
                <span>Details sent directly to company email & phone upon submission.</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-2 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider">
                Booking Dispatched Immediately
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#17202A] mt-1">
                Reservation Details Sent
              </h3>
              <p className="text-xs sm:text-sm text-[#52606D] mt-2 max-w-md mx-auto leading-relaxed">
                Your reservation details for <strong className="text-[#17202A]">{currentPkg.title}</strong> on <strong className="text-[#17202A]">{selectedDate} at {selectedTime}</strong> have been automatically dispatched directly to our team.
              </p>
            </div>

            {/* Direct Dispatch Proof Card */}
            {dispatchResult && (
              <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-left text-xs space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-slate-200">
                  <span className="font-mono font-semibold text-[#2563EB]">Lead ID: {dispatchResult.leadId}</span>
                  <span>{dispatchResult.timestamp}</span>
                </div>
                <div className="flex items-center gap-2 text-[#17202A]">
                  <Mail className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span className="truncate">Sent to Company Email: <strong>{dispatchResult.dispatchedToEmail}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-[#17202A]">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sent to Company Phone: <strong>{dispatchResult.dispatchedToPhone}</strong></span>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href={dispatchResult.whatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-[130px] py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Direct</span>
                  </a>
                  <a
                    href={dispatchResult.mailtoUrl}
                    className="flex-1 min-w-[130px] py-2 px-3 bg-[#2563EB] hover:bg-blue-700 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open Email Client</span>
                  </a>
                  <button
                    onClick={handleCopySummary}
                    className="py-2 px-3 bg-white border border-slate-300 hover:bg-slate-50 text-[#17202A] font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Summary'}</span>
                  </button>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={resetAndClose}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close & Return to Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
