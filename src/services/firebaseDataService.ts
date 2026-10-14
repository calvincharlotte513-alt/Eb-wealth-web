import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

export interface FirestoreLead {
  id: string;
  type: string;
  title: string;
  applicant: {
    fullName: string;
    email: string;
    phone: string;
    experienceLevel?: string;
    monthlyContribution?: string;
    timeHorizon?: string;
    notes?: string;
  };
  details: Record<string, any>;
  summaryText: string;
  dispatchedToEmail: string;
  dispatchedToPhone: string;
  status: 'New' | 'Contacted' | 'Consultation Scheduled' | 'Enrolled' | 'Archived' | string;
  adminNotes?: string;
  timestamp: string;
}

export interface FirestoreUserProgress {
  userId: string;
  studentName: string;
  studentEmail: string;
  completedTopics: string[];
  currentLevel: number;
  lastActive: string;
  notes: string;
  portfolioPlan?: {
    monthlyDca?: number;
    isaAllocation?: number;
    sippAllocation?: number;
  } | null;
  isSignedUp?: boolean;
  authProvider?: string;
  photoURL?: string;
  createdAt?: string;
  updatedAt: string;
}

export interface FirestoreCompanySettings {
  companyEmail: string;
  companyPhone: string;
  companyPhoneDisplay: string;
  adminUsername: string;
  updatedAt: string;
}

const LEADS_COLLECTION = 'leads';
const USERS_COLLECTION = 'userProgress';
const SETTINGS_COLLECTION = 'settings';

export const firebaseDataService = {
  /**
   * Save a newly dispatched lead into Firestore
   */
  async saveLead(lead: FirestoreLead): Promise<void> {
    try {
      const docRef = doc(db, LEADS_COLLECTION, lead.id);
      await setDoc(docRef, {
        ...lead,
        createdAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn('Firestore saveLead fallback:', err);
      // Attempt error logging conforming to guidelines
      try {
        handleFirestoreError(err, OperationType.WRITE, `${LEADS_COLLECTION}/${lead.id}`);
      } catch {}
    }
  },

  /**
   * Real-time subscription to leads collection
   */
  subscribeToLeads(
    onUpdate: (leads: FirestoreLead[]) => void,
    onError?: (err: any) => void
  ): () => void {
    const colRef = collection(db, LEADS_COLLECTION);
    return onSnapshot(
      colRef,
      (snapshot) => {
        const leads: FirestoreLead[] = [];
        snapshot.forEach((docSnap) => {
          leads.push(docSnap.data() as FirestoreLead);
        });
        // Sort descending by timestamp
        leads.sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime());
        onUpdate(leads);
      },
      (error) => {
        console.warn('Leads snapshot listener note:', error.message);
        if (onError) onError(error);
        try {
          handleFirestoreError(error, OperationType.LIST, LEADS_COLLECTION);
        } catch {}
      }
    );
  },

  /**
   * Update lead status and admin notes in Firestore
   */
  async updateLead(id: string, updates: Partial<FirestoreLead>): Promise<void> {
    try {
      const docRef = doc(db, LEADS_COLLECTION, id);
      await updateDoc(docRef, updates);
    } catch (err) {
      console.error('Failed to update lead in Firestore:', err);
      handleFirestoreError(err, OperationType.UPDATE, `${LEADS_COLLECTION}/${id}`);
    }
  },

  /**
   * Delete lead from Firestore
   */
  async deleteLead(id: string): Promise<void> {
    try {
      const docRef = doc(db, LEADS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error('Failed to delete lead in Firestore:', err);
      handleFirestoreError(err, OperationType.DELETE, `${LEADS_COLLECTION}/${id}`);
    }
  },

  /**
   * Save student progress to Firestore
   */
  async saveUserProgress(progress: FirestoreUserProgress): Promise<void> {
    try {
      const docRef = doc(db, USERS_COLLECTION, progress.userId);
      await setDoc(docRef, {
        ...progress,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn('Firestore saveUserProgress notice:', err);
      try {
        handleFirestoreError(err, OperationType.WRITE, `${USERS_COLLECTION}/${progress.userId}`);
      } catch {}
    }
  },

  /**
   * Fetch student progress from Firestore
   */
  async getUserProgress(userId: string): Promise<FirestoreUserProgress | null> {
    try {
      const docRef = doc(db, USERS_COLLECTION, userId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return snap.data() as FirestoreUserProgress;
      }
      return null;
    } catch (err) {
      console.warn('Firestore getUserProgress notice:', err);
      try {
        handleFirestoreError(err, OperationType.GET, `${USERS_COLLECTION}/${userId}`);
      } catch {}
      return null;
    }
  },

  /**
   * Real-time subscription to all student progress records for Admin
   */
  subscribeToAllUsers(
    onUpdate: (users: FirestoreUserProgress[]) => void,
    onError?: (err: any) => void
  ): () => void {
    const colRef = collection(db, USERS_COLLECTION);
    return onSnapshot(
      colRef,
      (snapshot) => {
        const users: FirestoreUserProgress[] = [];
        snapshot.forEach((docSnap) => {
          users.push(docSnap.data() as FirestoreUserProgress);
        });
        users.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
        onUpdate(users);
      },
      (error) => {
        console.warn('Users snapshot listener note:', error.message);
        if (onError) onError(error);
        try {
          handleFirestoreError(error, OperationType.LIST, USERS_COLLECTION);
        } catch {}
      }
    );
  },

  /**
   * Get application settings from Firestore
   */
  async getSettings(): Promise<FirestoreCompanySettings | null> {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, 'general');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return snap.data() as FirestoreCompanySettings;
      }
      return null;
    } catch (err) {
      console.warn('Firestore getSettings notice:', err);
      return null;
    }
  },

  /**
   * Save application settings to Firestore
   */
  async saveSettings(settings: Partial<FirestoreCompanySettings>): Promise<void> {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, 'general');
      await setDoc(docRef, {
        ...settings,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.error('Failed to save settings to Firestore:', err);
      handleFirestoreError(err, OperationType.WRITE, `${SETTINGS_COLLECTION}/general`);
    }
  }
};
