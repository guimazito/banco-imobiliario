"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type GameContextType = {
  gameId: string | undefined;
  setGameId: (id: string | undefined) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameId, setGameId] = useState<string | undefined>(undefined);

  return (
    <GameContext.Provider value={{ gameId, setGameId }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameId() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameId must be used within a GameProvider");
  }
  return context;
}
