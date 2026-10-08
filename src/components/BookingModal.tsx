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
  initialPackage
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-15');
  const [selectedTime, setSelectedTime] = useState('10:00 AM BST (London)');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [primaryFocus, setPrimaryFocus] = useState('Investment Knowledge & UK Tax Shelters');
  const [isBooked, setIsBooked] = useState(false);

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

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  const resetAndClose = () => {
    setIsBooked(false);
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

              <div className="p-3 bg-[#EFF6FF] border border-blue-200 rounded-xl text-[11px] text-[#2563EB]">
                <Shield className="w-4 h-4 text-[#2563EB] inline mr-1 -mt-0.5" />
                Includes pre-call questionnaire analysis and an annotated action plan PDF delivered within 24 hours.
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Confirm Coaching Reservation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] text-[#00A878] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-[#17202A]">
              Coaching Session Reserved!
            </h3>
            <p className="text-xs text-[#52606D] max-w-sm mx-auto leading-relaxed">
              We have reserved <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong> for <strong>{clientName}</strong>. A calendar invite, meeting link, and your pre-session audit questionnaire have been dispatched to <strong>{clientEmail}</strong>.
            </p>

            <button
              onClick={resetAndClose}
              className="mt-4 py-2.5 px-6 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
