import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { GameProvider } from "./contexts/GameContext";
import { WebSocketProvider } from "./contexts/WebSocketContext";
import { AuthProvider } from "./components/AuthProvider/AuthContext";
import { ReactQueryClientProvider } from "./components/ReactQueryClient";

export const metadata: Metadata = {
  title: "Banco Imobiliário",
  description: "Sistema para gerenciar partidas de Banco Imobiliário",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <WebSocketProvider>
          <ReactQueryClientProvider>
            <AuthProvider>
              <GameProvider>
                {children}
              </GameProvider>
              <ToastContainer position="bottom-right" autoClose={3000} />
            </AuthProvider>
          </ReactQueryClientProvider>
        </WebSocketProvider>
      </body>
    </html>
  );
}
