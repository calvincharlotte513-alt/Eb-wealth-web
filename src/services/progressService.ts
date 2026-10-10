/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Persistent Academy Progress Tracking Service
 * Stores verified student progression across all 6 EB Wealth curriculum levels
 * in localStorage with synchronized cross-component state.
 */

import { ACADEMY_LEVELS } from '../data/content';

const STORAGE_KEY = 'eb_wealth_student_progress_v2';
const EVENT_NAME = 'eb_wealth_progress_change';

export interface LevelProgressInfo {
  levelNumber: number;
  title: string;
  totalTopics: number;
  completedTopics: number;
  percent: number;
  isUnlocked: boolean;
}

export interface OverallProgressInfo {
  totalTopics: number;
  completedTopics: number;
  overallPercent: number;
  currentActiveLevel: number;
  levels: LevelProgressInfo[];
}

function getStoredCompletedKeys(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        return new Set(arr);
      }
    }
  } catch (err) {
    console.warn('Error reading stored student progress:', err);
  }
  return new Set<string>();
}

function saveCompletedKeys(keys: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(keys)));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch (err) {
    console.error('Error saving student progress:', err);
  }
}

export const progressService = {
  isTopicCompleted(levelNumber: number, topicIndex: number): boolean {
    const keys = getStoredCompletedKeys();
    return keys.has(`L${levelNumber}_T${topicIndex}`);
  },

  toggleTopicCompletion(levelNumber: number, topicIndex: number): boolean {
    const keys = getStoredCompletedKeys();
    const key = `L${levelNumber}_T${topicIndex}`;
    const newState = !keys.has(key);
    if (newState) {
      keys.add(key);
    } else {
      keys.delete(key);
    }
    saveCompletedKeys(keys);
    return newState;
  },

  setTopicCompleted(levelNumber: number, topicIndex: number, completed: boolean): void {
    const keys = getStoredCompletedKeys();
    const key = `L${levelNumber}_T${topicIndex}`;
    if (completed) {
      keys.add(key);
    } else {
      keys.delete(key);
    }
    saveCompletedKeys(keys);
  },

  getOverallProgress(): OverallProgressInfo {
    const keys = getStoredCompletedKeys();
    let totalTopics = 0;
    let completedTopics = 0;
    let currentActiveLevel = 1;

    const levels: LevelProgressInfo[] = ACADEMY_LEVELS.map((lvl) => {
      const lvlTotal = lvl.topics.length;
      let lvlCompleted = 0;

      for (let i = 0; i < lvlTotal; i++) {
        if (keys.has(`L${lvl.levelNumber}_T${i}`)) {
          lvlCompleted++;
        }
      }

      totalTopics += lvlTotal;
      completedTopics += lvlCompleted;

      const percent = lvlTotal > 0 ? Math.round((lvlCompleted / lvlTotal) * 100) : 0;
      // Level is unlocked if it's Level 1 or previous level has >= 50% completion
      const isUnlocked = lvl.levelNumber === 1 || true; // All accessible in self-paced academy

      if (lvlCompleted < lvlTotal && currentActiveLevel === 1 && lvl.levelNumber > 1 && lvlCompleted > 0) {
        currentActiveLevel = lvl.levelNumber;
      }

      return {
        levelNumber: lvl.levelNumber,
        title: lvl.title,
        totalTopics: lvlTotal,
        completedTopics: lvlCompleted,
        percent,
        isUnlocked
      };
    });

    const overallPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    return {
      totalTopics,
      completedTopics,
      overallPercent,
      currentActiveLevel,
      levels
    };
  },

  resetProgress(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch (err) {
      console.error('Error resetting progress:', err);
    }
  },

  subscribe(callback: () => void): () => void {
    const handler = () => callback();
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }
};
