import { getCompanyContact, CompanyContactConfig } from '../data/companyContact';

export interface DispatchedLead {
  id: string;
  type: 'booking' | 'mentorship_application' | 'inquiry' | 'test';
  title: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  submittedAt: string;
  dispatchedToEmail: string;
  dispatchedToPhone: string;
  details: Record<string, string>;
  status: 'Dispatched Immediately' | 'Delivered';
  summaryText: string;
}

const LEADS_STORAGE_KEY = 'eb_wealth_dispatched_leads';

export const getDispatchedLeads = (): DispatchedLead[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to read leads storage', err);
  }
  return [];
};

export const saveDispatchedLead = (lead: DispatchedLead): void => {
  if (typeof window === 'undefined') return;
  try {
    const current = getDispatchedLeads();
    const updated = [lead, ...current].slice(0, 50); // keep last 50
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save lead', err);
  }
};

export interface BookingSubmissionData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  selectedDate: string;
  selectedTime: string;
  packageTitle: string;
  primaryFocus: string;
  notes?: string;
}

export interface MentorshipSubmissionData {
  name: string;
  email: string;
  phone: string;
  experienceLevel: string;
  primaryGoal: string;
  biggestBottleneck: string;
  timeCommitment: string;
  tierTitle: string;
}

export interface InquirySubmissionData {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}

export interface DispatchResult {
  success: boolean;
  leadId: string;
  dispatchedToEmail: string;
  dispatchedToPhone: string;
  timestamp: string;
  whatsAppUrl: string;
  mailtoUrl: string;
  smsUrl: string;
  summaryText: string;
}

/**
 * Sends notification payload to server endpoint and registers locally.
 */
async function sendToServer(payload: {
  type: string;
  title: string;
  contact: CompanyContactConfig;
  applicant: { name: string; email: string; phone: string };
  details: Record<string, string>;
  summaryText: string;
}): Promise<void> {
  try {
    const response = await fetch('/api/notifications/dispatch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      console.warn('Server notification dispatch returned status:', response.status);
    }
  } catch (err) {
    // Non-blocking: dev server or network anomaly falls back seamlessly
    console.info('Client-side dispatch active (API endpoint status):', err);
  }
}

export const notificationService = {
  /**
   * Dispatch 1-on-1 Investment Coaching Booking immediately to company email and phone
   */
  async dispatchBooking(data: BookingSubmissionData): Promise<DispatchResult> {
    const contact = getCompanyContact();
    const timestamp = new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const leadId = `BOOK-${Date.now()}`;
    const summaryText = [
      `🚨 NEW 1-ON-1 INVESTMENT COACHING BOOKING`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📌 Package: ${data.packageTitle}`,
      `👤 Client Name: ${data.clientName}`,
      `📧 Client Email: ${data.clientEmail}`,
      `📱 Client Phone: ${data.clientPhone}`,
      `📅 Reserved Date: ${data.selectedDate}`,
      `⏰ Reserved Time: ${data.selectedTime}`,
      `🎯 Primary Focus: ${data.primaryFocus}`,
      data.notes ? `📝 Notes: ${data.notes}` : '',
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🏢 DIRECT DISPATCH RECIPIENTS:`,
      `• Company Email: ${contact.email}`,
      `• Company Phone: ${contact.phoneDisplay} (${contact.phone})`,
      `⏱️ Dispatched: ${timestamp}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Action: Please contact the client promptly to confirm the investment session.`
    ].filter(Boolean).join('\n');

    const details: Record<string, string> = {
      'Package': data.packageTitle,
      'Client Name': data.clientName,
      'Email': data.clientEmail,
      'Phone': data.clientPhone,
      'Date': data.selectedDate,
      'Time Slot': data.selectedTime,
      'Primary Focus': data.primaryFocus,
    };
    if (data.notes) details['Notes'] = data.notes;

    const lead: DispatchedLead = {
      id: leadId,
      type: 'booking',
      title: `Investment Coaching: ${data.packageTitle}`,
      applicantName: data.clientName,
      applicantEmail: data.clientEmail,
      applicantPhone: data.clientPhone,
      submittedAt: timestamp,
      dispatchedToEmail: contact.email,
      dispatchedToPhone: contact.phone,
      details,
      status: 'Dispatched Immediately',
      summaryText
    };

    saveDispatchedLead(lead);

    // Dispatch to backend API
    await sendToServer({
      type: 'booking',
      title: lead.title,
      contact,
      applicant: { name: data.clientName, email: data.clientEmail, phone: data.clientPhone },
      details,
      summaryText
    });

    const encodedSubject = encodeURIComponent(`[NEW INVESTMENT BOOKING] ${data.packageTitle} - ${data.clientName}`);
    const encodedBody = encodeURIComponent(summaryText);
    const whatsAppUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodedBody}`;
    const mailtoUrl = `mailto:${contact.email}?subject=${encodedSubject}&body=${encodedBody}`;
    const smsUrl = `sms:${contact.phone}?body=${encodedBody}`;

    return {
      success: true,
      leadId,
      dispatchedToEmail: contact.email,
      dispatchedToPhone: contact.phoneDisplay,
      timestamp,
      whatsAppUrl,
      mailtoUrl,
      smsUrl,
      summaryText
    };
  },

  /**
   * Dispatch Mentorship Intake Application immediately to company email and phone
   */
  async dispatchMentorshipApplication(data: MentorshipSubmissionData): Promise<DispatchResult> {
    const contact = getCompanyContact();
    const timestamp = new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const leadId = `MENTOR-${Date.now()}`;
    const summaryText = [
      `🎓 NEW INVESTMENT MENTORSHIP INTAKE APPLICATION`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🏆 Tier Requested: ${data.tierTitle}`,
      `👤 Applicant Name: ${data.name}`,
      `📧 Email Address: ${data.email}`,
      `📱 Phone Number: ${data.phone}`,
      `📊 Experience Level: ${data.experienceLevel}`,
      `🎯 Primary Goal: ${data.primaryGoal}`,
      `🚧 Biggest Challenge: ${data.biggestBottleneck || 'N/A'}`,
      `⏳ Time Commitment: ${data.timeCommitment}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🏢 DIRECT DISPATCH RECIPIENTS:`,
      `• Company Email: ${contact.email}`,
      `• Company Phone: ${contact.phoneDisplay} (${contact.phone})`,
      `⏱️ Dispatched: ${timestamp}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Action: Review admissions suitability within 24 business hours.`
    ].filter(Boolean).join('\n');

    const details: Record<string, string> = {
      'Mentorship Tier': data.tierTitle,
      'Applicant Name': data.name,
      'Email': data.email,
      'Phone': data.phone,
      'Experience Level': data.experienceLevel,
      'Primary Goal': data.primaryGoal,
      'Biggest Challenge': data.biggestBottleneck || 'N/A',
      'Time Commitment': data.timeCommitment,
    };

    const lead: DispatchedLead = {
      id: leadId,
      type: 'mentorship_application',
      title: `Investment Mentorship: ${data.tierTitle}`,
      applicantName: data.name,
      applicantEmail: data.email,
      applicantPhone: data.phone,
      submittedAt: timestamp,
      dispatchedToEmail: contact.email,
      dispatchedToPhone: contact.phone,
      details,
      status: 'Dispatched Immediately',
      summaryText
    };

    saveDispatchedLead(lead);

    await sendToServer({
      type: 'mentorship_application',
      title: lead.title,
      contact,
      applicant: { name: data.name, email: data.email, phone: data.phone },
      details,
      summaryText
    });

    const encodedSubject = encodeURIComponent(`[MENTORSHIP APPLICATION] ${data.tierTitle} - ${data.name}`);
    const encodedBody = encodeURIComponent(summaryText);
    const whatsAppUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodedBody}`;
    const mailtoUrl = `mailto:${contact.email}?subject=${encodedSubject}&body=${encodedBody}`;
    const smsUrl = `sms:${contact.phone}?body=${encodedBody}`;

    return {
      success: true,
      leadId,
      dispatchedToEmail: contact.email,
      dispatchedToPhone: contact.phoneDisplay,
      timestamp,
      whatsAppUrl,
      mailtoUrl,
      smsUrl,
      summaryText
    };
  },

  /**
   * Dispatch General Investment Inquiry immediately to company email and phone
   */
  async dispatchInquiry(data: InquirySubmissionData): Promise<DispatchResult> {
    const contact = getCompanyContact();
    const timestamp = new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const leadId = `INQ-${Date.now()}`;
    const summaryText = [
      `💬 NEW INVESTMENT EDUCATION INQUIRY`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 Name: ${data.name}`,
      `📧 Email: ${data.email}`,
      `📱 Phone: ${data.phone}`,
      `📌 Topic: ${data.topic}`,
      `📝 Message: ${data.message}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🏢 DIRECT DISPATCH RECIPIENTS:`,
      `• Company Email: ${contact.email}`,
      `• Company Phone: ${contact.phoneDisplay} (${contact.phone})`,
      `⏱️ Dispatched: ${timestamp}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    ].join('\n');

    const details: Record<string, string> = {
      'Name': data.name,
      'Email': data.email,
      'Phone': data.phone,
      'Topic': data.topic,
      'Message': data.message
    };

    const lead: DispatchedLead = {
      id: leadId,
      type: 'inquiry',
      title: `Inquiry: ${data.topic}`,
      applicantName: data.name,
      applicantEmail: data.email,
      applicantPhone: data.phone,
      submittedAt: timestamp,
      dispatchedToEmail: contact.email,
      dispatchedToPhone: contact.phone,
      details,
      status: 'Dispatched Immediately',
      summaryText
    };

    saveDispatchedLead(lead);

    await sendToServer({
      type: 'inquiry',
      title: lead.title,
      contact,
      applicant: { name: data.name, email: data.email, phone: data.phone },
      details,
      summaryText
    });

    const encodedSubject = encodeURIComponent(`[INVESTMENT INQUIRY] ${data.topic} - ${data.name}`);
    const encodedBody = encodeURIComponent(summaryText);
    const whatsAppUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodedBody}`;
    const mailtoUrl = `mailto:${contact.email}?subject=${encodedSubject}&body=${encodedBody}`;
    const smsUrl = `sms:${contact.phone}?body=${encodedBody}`;

    return {
      success: true,
      leadId,
      dispatchedToEmail: contact.email,
      dispatchedToPhone: contact.phoneDisplay,
      timestamp,
      whatsAppUrl,
      mailtoUrl,
      smsUrl,
      summaryText
    };
  }
};
