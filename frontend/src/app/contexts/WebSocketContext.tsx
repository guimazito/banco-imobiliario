"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";

interface WebSocketContextType {
  ws: WebSocket | null;
}

const WebSocketContext = createContext<WebSocketContextType>({ ws: null });

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!wsRef.current) {
      wsRef.current = new WebSocket(process.env.NEXT_PUBLIC_WS_BASE_URL!);
      wsRef.current.onopen = () => {
        console.log("WebSocket connection established (context)");
        wsRef.current?.send(
          JSON.stringify({ event: "greeting", message: "Hello server!" })
        );
      };
      wsRef.current.onclose = () => {
        console.log("WebSocket connection closed (context)");
      };
      wsRef.current.onerror = (error) => {
        console.error("WebSocket error (context):", error);
      };
      setWs(wsRef.current);
    }
    return () => {
      wsRef.current?.close();
      wsRef.current = null;
      setWs(null);
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ ws }}>
      {children}
    </WebSocketContext.Provider>
  );
};
