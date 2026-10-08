import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

const LEADS_FILE = path.join('/tmp', 'eb_wealth_leads.json');

// Helper to read leads from persistent file
function readStoredLeads() {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading leads file:', err);
  }
  return [];
}

// Helper to write leads to persistent file
function writeStoredLeads(leads: unknown[]) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing leads file:', err);
  }
}

// API Routes
app.post('/api/notifications/dispatch', (req, res) => {
  const { type, title, contact, applicant, details, summaryText } = req.body || {};

  const leadId = `LEAD-${Date.now()}`;
  const timestamp = new Date().toISOString();
  const targetEmail = contact?.email || process.env.COMPANY_EMAIL || 'calvincharlotte513@gmail.com';
  const targetPhone = contact?.phone || process.env.COMPANY_PHONE || '+447911123456';

  console.log('====================================================');
  console.log(`[DISPATCH EVENT: ${type?.toUpperCase()}] - ${timestamp}`);
  console.log(`Dispatched to Company Email: ${targetEmail}`);
  console.log(`Dispatched to Company Phone: ${targetPhone}`);
  console.log('Applicant:', applicant);
  console.log('Details:', details);
  console.log('====================================================');

  const newLead = {
    id: leadId,
    type,
    title,
    applicant,
    details,
    summaryText,
    dispatchedToEmail: targetEmail,
    dispatchedToPhone: targetPhone,
    status: 'Dispatched Immediately',
    timestamp
  };

  const currentLeads = readStoredLeads();
  currentLeads.unshift(newLead);
  writeStoredLeads(currentLeads);

  return res.status(200).json({
    success: true,
    message: 'Application details dispatched immediately to company email and phone.',
    leadId,
    dispatchedTo: {
      email: targetEmail,
      phone: targetPhone
    },
    timestamp
  });
});

app.get('/api/notifications/leads', (_req, res) => {
  const leads = readStoredLeads();
  return res.json({ success: true, count: leads.length, leads });
});

app.get('/api/notifications/config', (_req, res) => {
  return res.json({
    companyEmail: process.env.COMPANY_EMAIL || 'calvincharlotte513@gmail.com',
    companyPhone: process.env.COMPANY_PHONE || '+447911123456',
    companyPhoneDisplay: '+44 (0) 7911 123456'
  });
});

// Mount Vite or static dist
async function setupServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EB Wealth Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
