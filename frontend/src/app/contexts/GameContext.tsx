"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type GameContextType = {
  gameId: string | undefined;
  setGameId: (id: string | undefined) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

type GameProviderProps = {
  children: ReactNode;
};

export function GameProvider({ children }: GameProviderProps) {
  const [gameId, setGameIdState] = useState<string | undefined>(undefined);

  // Carrega o gameId do localStorage ao iniciar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("gameId");
      if (stored) {
        Promise.resolve().then(() => setGameIdState(stored));
      }
    }
  }, []);

  // Sempre que mudar, salva no localStorage
  const setGameId = (id: string | undefined) => {
    setGameIdState(id);
    if (typeof window !== "undefined") {
      if (id) {
        localStorage.setItem("gameId", id);
      } else {
        localStorage.removeItem("gameId");
      }
    }
  };

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
