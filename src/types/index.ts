// ── Tax Calendar ──────────────────────────────────────────────

export type TaxEventType = 'vat' | 'income' | 'withholding' | 'other';

export interface TaxEvent {
  id: string;
  month: number;
  startDay: number;
  endDay?: number;
  title: string;
  description: string;
  targetAudience: string[];
  preparations: string[];
  /** "all" 또는 업종 ID 배열 */
  industries: string[];
  type: TaxEventType;
  urgent: boolean;
}

export interface TaxCalendarData {
  lastUpdated: string;
  sourceName: string;
  sourceUrl: string;
  notice: string;
  events: TaxEvent[];
}

// ── Industries ────────────────────────────────────────────────

export interface Industry {
  id: string;
  name: string;
  description: string;
  iconId: string;
  highlights: string[];
  checklistIds: string[];
}

export interface IndustriesData {
  lastUpdated: string;
  sourceName: string;
  sourceUrl: string;
  industries: Industry[];
}

// ── Checklist ─────────────────────────────────────────────────

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  /** "all" 또는 업종 ID 배열 */
  industries: string[];
  weight: number;
}

export interface ChecklistData {
  lastUpdated: string;
  sourceName: string;
  sourceUrl: string;
  notice: string;
  items: ChecklistItem[];
}

/** localStorage에 저장되는 체크 상태 맵 */
export type CheckedItems = Record<string, boolean>;

// ── Official Links ────────────────────────────────────────────

export interface OfficialLink {
  id: string;
  name: string;
  description: string;
  url: string;
  iconId: string;
  category: string;
}

export interface OfficialLinksData {
  lastUpdated: string;
  links: OfficialLink[];
}

// ── Theme ─────────────────────────────────────────────────────

export type Theme = 'light' | 'dark';
