import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { CoachingPackage } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: CoachingPackage | null;
  onProceedToStripe?: (pkg: CoachingPackage) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPackage,
  onProceedToStripe
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-14');
  const [selectedTime, setSelectedTime] = useState('10:00 AM EDT');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [primaryFocus, setPrimaryFocus] = useState('Comprehensive Asset Re-balancing & Fee Audit');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const currentPkg = initialPackage || {
    id: 'coaching-clarity',
    title: '90-Minute Strategic Wealth Blueprint',
    duration: '90 Minutes (Intensive 1:1)',
    accessTier: 'Private Consultation',
    description: 'A forensic 1-on-1 deep dive into your existing asset allocation, cash flow bottlenecks, and risk vulnerabilities.',
    features: [],
    recommendedFor: ''
  };

  const timeSlots = [
    '09:00 AM EDT',
    '10:30 AM EDT',
    '01:00 PM EDT',
    '03:30 PM EDT',
    '05:00 PM EDT'
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (onProceedToStripe) {
      onClose();
      onProceedToStripe(currentPkg);
    } else {
      setIsBooked(true);
    }
  };

  const resetAndClose = () => {
    setIsBooked(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 md:p-8 text-neutral-100 my-8">
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-neutral-800"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isBooked ? (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase">
                <Calendar className="w-3.5 h-3.5" />
                <span>Private 1-on-1 Executive Calendar</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
                Book Coaching Session
              </h3>
              <p className="text-sm text-neutral-400 mt-1">
                Direct advisory with investment clarity, balance sheet auditing, and tactical business accountability.
              </p>
            </div>

            {/* Selected Package Card */}
            <div className="p-4 bg-neutral-950/80 border border-neutral-800 rounded-xl mb-5 flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-400 font-medium">Selected Service</span>
                <h4 className="text-base font-semibold text-white">{currentPkg.title}</h4>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{currentPkg.duration}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 font-medium text-xs rounded-lg">
                  {currentPkg.accessTier || 'Executive Advisory'}
                </span>
                <span className="block text-[11px] text-neutral-500 mt-1">All materials included</span>
              </div>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Select Target Date
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min="2026-10-08"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot} className="bg-neutral-900 text-white">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Focus Area */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Primary Session Focus
                </label>
                <select
                  value={primaryFocus}
                  onChange={(e) => setPrimaryFocus(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="Comprehensive Asset Re-balancing & Fee Audit">Comprehensive Asset Re-balancing & Fee Audit</option>
                  <option value="Private Credit & Real Estate Syndication Vetting">Private Credit & Real Estate Syndication Vetting</option>
                  <option value="Corporate Entity & Tax-Efficient Compounding">Corporate Entity & Tax-Efficient Compounding</option>
                  <option value="AI Business Scaling & Revenue Automation">AI Business Scaling & Revenue Automation</option>
                  <option value="Executive Capital Accountability & Cashflow Sprints">Executive Capital Accountability & Cashflow Sprints</option>
                </select>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Full Name (e.g. Executive Client)"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="client@example.com"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Specific questions or context for the session (Optional)
                </label>
                <textarea
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g. Currently reviewing capital allocation, considering entering private credit..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex items-start gap-2 text-[11px] text-neutral-400">
                <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Rescheduling permitted up to 24 hours prior. All coaching discussions are strictly confidential under mutual NDA guidelines.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm & Schedule Private Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Session Scheduled</h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto mb-6">
              Thank you, <strong className="text-white">{clientName || 'Client'}</strong>. Your strategic coaching session has been reserved for <strong className="text-emerald-400">{selectedDate}</strong> at <strong className="text-emerald-400">{selectedTime}</strong>.
            </p>

            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl text-left text-xs space-y-2 mb-6 text-neutral-400">
              <div className="flex justify-between">
                <span>Calendar Invite:</span>
                <span className="text-white">Sent to {clientEmail || 'your email'}</span>
              </div>
              <div className="flex justify-between">
                <span>Meeting Platform:</span>
                <span className="text-white">Encrypted HD Video Room</span>
              </div>
              <div className="flex justify-between">
                <span>Pre-Call Diagnostic:</span>
                <span className="text-emerald-400">Intake questionnaire dispatched</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="py-2.5 px-6 bg-white text-black font-semibold text-xs rounded-xl hover:bg-neutral-200 transition-colors shadow-sm"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
