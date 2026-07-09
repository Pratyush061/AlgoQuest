
export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export enum TopicStatus {
  LOCKED = 'LOCKED',
  AVAILABLE = 'AVAILABLE',
  COMPLETED = 'COMPLETED'
}

export type TreeType = 'Mango' | 'Orange' | 'Banana' | 'Apple';

export interface Question {
  id: string;
  title: string;
  difficulty: Difficulty;
  topic: string;
  platform: 'LeetCode' | 'HackerRank' | 'Codeforces' | 'CodeChef';
  link: string;
  description?: string;
}

export interface User {
  email: string;
  id: string;
}

export interface QuestionSolutions {
  brute?: string;
  better?: string;
  optimal?: string;
}

export interface UserProgress {
  userId: string;
  role?: 'user' | 'admin';
  solvedQuestionIds: string[];
  totalXP: number;
  spentXP?: number;
  level: number;
  streak: number;
  bonusGrowth?: number; // Total virtual days accumulated
  fertilizerInventory?: Record<string, number>; // Map of itemID to count
  lastLoginDate: string;
  preferredLanguage: string;
  badges: Badge[];
  topicScores: Record<string, number>; 
  reviewList: string[]; 
  dailyXP: Record<string, number>; 
  treeType?: TreeType;
  solutions?: Record<string, QuestionSolutions>;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
