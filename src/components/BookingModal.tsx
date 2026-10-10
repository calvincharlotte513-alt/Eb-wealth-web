import React, { useState } from 'react';
import { X, Calendar, Clock, Shield, CheckCircle2, Mail, Phone, MessageSquare, Copy, Check } from 'lucide-react';
import { CoachingPackage } from '../types';
import { notificationService, DispatchResult } from '../services/notificationService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: CoachingPackage | null;
  initialPackage?: CoachingPackage | null;
  onProceedToStripe?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
  initialPackage,
  onProceedToStripe: _onProceedToStripe
}) => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [primaryFocus, setPrimaryFocus] = useState('Investment Foundations & Eliminating Jargon');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<DispatchResult | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentPkg = selectedPackage || initialPackage || {
    id: 'coaching-single',
    title: '1-to-1 Investment Strategy Consultation',
    duration: '60 minutes',
    price: '£150',
    description: 'Personalized private consultation session focused on your specific investment queries and roadmap.',
    features: ['60-Minute Focused Consultation', 'Comprehensive Pre-Call Review', 'Written Action Roadmap'],
    recommendedFor: 'Investors seeking direct personalized feedback'
  };

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
    '06:00 PM'
  ];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await notificationService.dispatchBooking({
        clientName,
        clientEmail,
        clientPhone,
        selectedDate,
        selectedTime,
        packageTitle: currentPkg.title,
        primaryFocus,
        notes
      });

      setDispatchResult(result);
      setIsBooked(true);
    } catch (err) {
      console.error('Failed to dispatch booking lead', err);
      alert('An error occurred while submitting your reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setIsBooked(false);
    setDispatchResult(null);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setSelectedDate('');
    setSelectedTime('10:00 AM');
    setPrimaryFocus('Investment Foundations & Eliminating Jargon');
    setNotes('');
    onClose();
  };

  const handleCopySummary = () => {
    if (!dispatchResult) return;
    navigator.clipboard.writeText(dispatchResult.summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08231B]/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white border border-stone-200 rounded-xs shadow-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 transition-colors p-1 rounded-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isBooked ? (
          <div>
            <div className="mb-6 pr-8">
              <span className="text-[10px] font-mono font-bold text-[#C5A869] uppercase tracking-widest">
                Private Consultation Scheduling
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2E] mt-1">
                {currentPkg.title}
              </h3>
              <p className="text-xs text-stone-600 mt-1.5 font-sans">
                Select your preferred date & time for your dedicated one-on-one session. All reservation details are immediately dispatched to our team.
              </p>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-semibold text-[#0D3B2E] mb-1">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rachel Adams"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xs text-xs sm:text-sm text-[#0D3B2E] focus:outline-none focus:border-[#C5A869]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold text-[#0D3B2E] mb-1">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="rachel@domain.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xs text-xs sm:text-sm text-[#0D3B2E] focus:outline-none focus:border-[#C5A869]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-semibold text-[#0D3B2E] mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+44 7911 123456"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xs text-xs sm:text-sm text-[#0D3B2E] focus:outline-none focus:border-[#C5A869]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold text-[#0D3B2E] mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A869]" />
                    Preferred Date *
                  </label>
                  <input
                    required
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xs text-xs text-[#0D3B2E] focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-[#0D3B2E] mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C5A869]" />
                    Time Slot (London BST) *
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xs text-xs text-[#0D3B2E] focus:outline-none focus:border-[#C5A869]"
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
                <label className="block text-xs font-mono font-semibold text-[#0D3B2E] mb-1">
                  Primary Strategic Focus *
                </label>
                <select
                  value={primaryFocus}
                  onChange={(e) => setPrimaryFocus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xs text-xs text-[#0D3B2E] focus:outline-none focus:border-[#C5A869]"
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
                <label className="block text-xs font-mono font-semibold text-[#0D3B2E] mb-1">
                  Specific Questions or Briefing Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Outline key questions or specific topics for this consultation..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xs text-xs text-[#0D3B2E] focus:outline-none focus:border-[#C5A869]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#0D3B2E] hover:bg-[#124E3F] text-[#FAF9F5] font-medium text-xs sm:text-sm rounded-xs border border-[#C5A869]/50 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isSubmitting ? 'Dispatching Reservation Dossier...' : 'Confirm Reservation & Dispatch Details'}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1 font-mono">
                <Shield className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Reservation details dispatched directly to executive email & phone.</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-2 text-center space-y-4">
            <div className="w-14 h-14 bg-[#FAF5E8] border border-[#C5A869]/50 rounded-xs flex items-center justify-center mx-auto text-[#0D3B2E]">
              <CheckCircle2 className="w-8 h-8 text-[#0D3B2E]" />
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-[#C5A869] uppercase tracking-widest">
                Booking Dispatched Successfully
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2E] mt-1">
                Reservation Confirmed & Dispatched
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed font-sans">
                Your reservation details for <strong className="text-[#0D3B2E]">{currentPkg.title}</strong> on <strong className="text-[#0D3B2E]">{selectedDate} at {selectedTime}</strong> have been automatically dispatched to our scheduling desk.
              </p>
            </div>

            {/* Direct Dispatch Proof Card */}
            {dispatchResult && (
              <div className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xs text-left text-xs space-y-2.5 font-mono">
                <div className="flex items-center justify-between text-[11px] text-stone-500 pb-2 border-b border-stone-200">
                  <span className="font-semibold text-[#0D3B2E]">Lead ID: {dispatchResult.leadId}</span>
                  <span>{dispatchResult.timestamp}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <Mail className="w-4 h-4 text-[#C5A869] shrink-0" />
                  <span className="truncate">Sent to Company Email: <strong className="text-[#0D3B2E]">{dispatchResult.dispatchedToEmail}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <Phone className="w-4 h-4 text-[#0D3B2E] shrink-0" />
                  <span>Sent to Company Phone: <strong className="text-[#0D3B2E]">{dispatchResult.dispatchedToPhone}</strong></span>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href={dispatchResult.whatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-[130px] py-2 px-3 bg-[#0D3B2E] hover:bg-[#124E3F] text-white font-medium text-xs rounded-xs flex items-center justify-center gap-1.5 transition-colors border border-[#C5A869]/40"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span>WhatsApp Direct</span>
                  </a>
                  <a
                    href={dispatchResult.mailtoUrl}
                    className="flex-1 min-w-[130px] py-2 px-3 bg-white border border-stone-300 hover:bg-stone-50 text-[#0D3B2E] font-medium text-xs rounded-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span>Open Email Client</span>
                  </a>
                  <button
                    onClick={handleCopySummary}
                    className="py-2 px-3 bg-white border border-stone-300 hover:bg-stone-50 text-[#0D3B2E] font-medium text-xs rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
                className="w-full py-2.5 bg-[#0D3B2E] hover:bg-[#124E3F] text-white font-medium text-xs rounded-xs transition-colors cursor-pointer border border-[#C5A869]/50"
              >
                Close & Return to Overview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
