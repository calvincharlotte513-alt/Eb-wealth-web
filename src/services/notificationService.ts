import { getCompanyContact, CompanyContactConfig } from '../data/companyContact';

export interface DispatchedLead {
  id: string;
  type: 'booking' | 'ai_audit' | 'mentorship_application' | 'test';
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

export interface AIAuditSubmissionData {
  name: string;
  email: string;
  phone: string;
  company: string;
  teamSize: string;
  monthlyRevenue: string;
  primaryFriction: string;
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
    // Non-blocking: network or dev server without route still allows frontend direct dispatch
    console.info('Client-side dispatch active (API endpoint background status):', err);
  }
}

export const notificationService = {
  /**
   * Dispatch 1-on-1 Coaching Booking immediately to company email and phone
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
      `🚨 NEW 1-ON-1 COACHING BOOKING RESERVATION`,
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
      `Please contact the client promptly to confirm the appointment.`
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
      title: `Coaching: ${data.packageTitle}`,
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

    const encodedSubject = encodeURIComponent(`[NEW BOOKING] ${data.packageTitle} - ${data.clientName}`);
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
   * Dispatch AI Systems Audit immediately to company email and phone
   */
  async dispatchAIAudit(data: AIAuditSubmissionData): Promise<DispatchResult> {
    const contact = getCompanyContact();
    const timestamp = new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const leadId = `AUDIT-${Date.now()}`;
    const summaryText = [
      `⚡ NEW AI BUSINESS SYSTEMS AUDIT REQUEST`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 Contact Name: ${data.name}`,
      `🏢 Company / Brand: ${data.company}`,
      `📧 Work Email: ${data.email}`,
      `📱 Contact Phone: ${data.phone}`,
      `👥 Approximate Team Size: ${data.teamSize}`,
      `💷 Monthly Revenue Band: ${data.monthlyRevenue}`,
      `⚠️ Primary Bottleneck / Friction: ${data.primaryFriction}`,
      data.notes ? `📝 Context: ${data.notes}` : '',
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🏢 DIRECT DISPATCH RECIPIENTS:`,
      `• Company Email: ${contact.email}`,
      `• Company Phone: ${contact.phoneDisplay} (${contact.phone})`,
      `⏱️ Dispatched: ${timestamp}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Action: Audit review scheduled within 24–48 hours.`
    ].filter(Boolean).join('\n');

    const details: Record<string, string> = {
      'Contact Name': data.name,
      'Company': data.company,
      'Work Email': data.email,
      'Phone': data.phone,
      'Team Size': data.teamSize,
      'Revenue Band': data.monthlyRevenue,
      'Primary Friction': data.primaryFriction,
    };
    if (data.notes) details['Notes'] = data.notes;

    const lead: DispatchedLead = {
      id: leadId,
      type: 'ai_audit',
      title: `AI Audit: ${data.company}`,
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
      type: 'ai_audit',
      title: lead.title,
      contact,
      applicant: { name: data.name, email: data.email, phone: data.phone },
      details,
      summaryText
    });

    const encodedSubject = encodeURIComponent(`[AI AUDIT REQUEST] ${data.company} - ${data.name}`);
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
      `🎓 NEW EXECUTIVE MENTORSHIP INTAKE APPLICATION`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🏆 Tier Requested: ${data.tierTitle}`,
      `👤 Applicant Name: ${data.name}`,
      `📧 Email Address: ${data.email}`,
      `📱 Phone Number: ${data.phone}`,
      `📊 Experience Level: ${data.experienceLevel}`,
      `🎯 Primary Goal: ${data.primaryGoal}`,
      `🚧 Biggest Bottleneck: ${data.biggestBottleneck || 'N/A'}`,
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
      'Biggest Bottleneck': data.biggestBottleneck || 'N/A',
      'Time Commitment': data.timeCommitment,
    };

    const lead: DispatchedLead = {
      id: leadId,
      type: 'mentorship_application',
      title: `Mentorship: ${data.tierTitle}`,
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
  }
};
