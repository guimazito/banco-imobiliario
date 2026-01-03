import type { Metadata } from "next";
import { WebSocketProvider } from "./contexts/WebSocketContext";
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
            {children}
          </ReactQueryClientProvider>
        </WebSocketProvider>
      </body>
    </html>
  );
}
