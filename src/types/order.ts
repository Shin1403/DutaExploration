import type { GameId } from './game';

export interface OrderSelection {
  gameId: GameId;
  categoryId: string | null;
  serviceId: string | null;
}

export interface OrderDraft extends OrderSelection {
  notes: string;
}