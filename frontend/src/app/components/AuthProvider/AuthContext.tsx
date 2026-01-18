"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getAuthToken, setAuthToken } from "@/app/services/api";
import type { AuthPlayer } from "@/app/types/auth";

type Player = AuthPlayer;

type AuthContextType = {
  isReady: boolean;
  isAuthenticated: boolean;
  player: Player | null;
  setPlayerFromToken: (token: string) => void;
  clearAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function base64UrlDecode(str: string) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  const decoded = typeof atob === 'function'
    ? atob(str)
    : Buffer.from(str, 'base64').toString('binary');
  try {
    return decodeURIComponent(
      decoded
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    return decoded;
  }
}

function decodeJwt(token: string): Player | null {
  try {
    const payload = token.split(".")[1];
    const json = JSON.parse(base64UrlDecode(payload));
    return json as Player;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
        const u = decodeJwt(token);
        setTimeout(() => setPlayer(u), 0);
    }
    setTimeout(() => setIsReady(true), 0);
  }, []);

  const setPlayerFromToken = useCallback((token: string) => {
    setAuthToken(token);
    const u = decodeJwt(token);
    setPlayer(u);
  }, []);

  const clearAuth = useCallback(() => {
    setAuthToken(null);
    setPlayer(null);
  }, []);

  const value = useMemo(
    () => ({
      isReady,
      isAuthenticated: !!player,
      player,
      setPlayerFromToken,
      clearAuth,
    }),
    [isReady, player, setPlayerFromToken, clearAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
