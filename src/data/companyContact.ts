export interface CompanyContactConfig {
  companyName: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  jurisdiction: string;
  address: string;
}

export const DEFAULT_COMPANY_CONTACT: CompanyContactConfig = {
  companyName: 'EB Wealth (Empowerment Body)',
  email: 'calvincharlotte513@gmail.com',
  phone: '+447911123456',
  phoneDisplay: '+44 (0) 7911 123456',
  whatsappNumber: '447911123456',
  jurisdiction: 'United Kingdom',
  address: 'London, United Kingdom'
};

const STORAGE_KEY = 'eb_wealth_company_contact';

export const getCompanyContact = (): CompanyContactConfig => {
  if (typeof window === 'undefined') return DEFAULT_COMPANY_CONTACT;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_COMPANY_CONTACT, ...JSON.parse(saved) };
    }
  } catch {
    // fallback to default
  }
  return DEFAULT_COMPANY_CONTACT;
};

export const saveCompanyContact = (config: Partial<CompanyContactConfig>): CompanyContactConfig => {
  const current = getCompanyContact();
  const updated = { ...current, ...config };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage error
  }
  return updated;
};
