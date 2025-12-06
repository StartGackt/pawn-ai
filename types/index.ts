// TypeScript types for Pawn System

export interface Pawn {
  id: string;
  customerId: string;
  pawnDate: Date;
  pawnAmount: number;
  goldWeight: number;
  goldPurity: string;
  interestRate: number;
  dueDate: Date;
  status: 'active' | 'redeemed' | 'forfeited';
  branchId: string;
  createdAt: Date;
}

export interface GoldPrice {
  id: string;
  date: Date;
  buyPrice: number;
  sellPrice: number;
  source: string;
  updatedAt: Date;
}

export interface ForfeitedAsset {
  id: string;
  pawnId: string;
  forfeitureDate: Date;
  estimatedValue: number;
  saleDate?: Date;
  saleAmount?: number;
  status: 'pending' | 'sold' | 'processing';
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  idCard: string;
  phone: string;
  address: string;
  riskScore: number;
  totalPawns: number;
  createdAt: Date;
}

export interface Branch {
  id: string;
  name: string;
  province: string;
  region: string;
  address: string;
  phone: string;
}

export interface Statistics {
  todayPawns: number;
  todayAmount: number;
  totalPawns: number;
  totalAmount: number;
  avgAmount: number;
  forfeitureRate: number;
  redemptionRate: number;
  goldPriceLatest: number;
  goldPriceChange: number;
}

export interface Prediction {
  id: string;
  predictionType: 'gold_price' | 'forfeited_assets' | 'redemption';
  predictionDate: Date;
  targetDate: Date;
  predictedValue: number;
  confidence: number;
  modelVersion: string;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  llmModel?: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  userId?: string;
  startedAt: Date;
  endedAt?: Date;
  messageCount: number;
}
