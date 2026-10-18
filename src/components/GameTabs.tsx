import type { CSSProperties } from 'react';
import type { GameId } from '../types/game';
import { GAMES } from '../data/games';

interface GameTabsProps {
  activeGame: GameId;
  onSelect: (gameId: GameId) => void;
}

export default function GameTabs({ activeGame, onSelect }: GameTabsProps) {
  return (
    <div className="game-tabs" role="tablist" aria-label="Pilih game">
      {GAMES.map((game) => {
        const selected = game.id === activeGame;
        return (
          <button
            key={game.id}
            type="button"
            role="tab"
            id={`tab-${game.id}`}
            aria-selected={selected}
            aria-controls="game-panel"
            className={`game-tabs__tab${selected ? ' game-tabs__tab--active' : ''}`}
            style={selected ? ({ '--game-accent': game.accent } as CSSProperties) : undefined}
            onClick={() => onSelect(game.id)}
          >
            <span className="game-tabs__name">{game.name}</span>
            <span className="game-tabs__desc">{game.description}</span>
          </button>
        );
      })}
    </div>
  );
}