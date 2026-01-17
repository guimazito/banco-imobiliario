"use client";

import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import {
  useGetGamePlayerByPlayerId,
} from "@/app/hooks/useGamePlayers";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { PlayerIcon } from "../types/playerIcon";
import { useCreateGame } from "../hooks/useGames";
import { PlayerStatus } from "../types/playerStatus";
import { useGameId } from "@/app/contexts/GameContext";
import { useGetGameByInvite } from "@/app/hooks/useGames";
import { useCreateGamePlayer } from "../hooks/useGamePlayers";
import { useAuth } from "@/app/components/AuthProvider/AuthContext";

export default function HomePage() {
  const router = useRouter();
  const { player } = useAuth();
  const { setGameId } = useGameId();
  const playerId = player?.playerId;
  const playerStatus: PlayerStatus = "IDLE";
  const playerIcon: PlayerIcon = "ACCOUNT_CIRCLE";
  const [inviteCode, setInviteCode] = useState("");
  const { mutateAsync: createGame } = useCreateGame();
  const { mutateAsync: createGamePlayer } = useCreateGamePlayer();
  const { data: getGameByInvite } = useGetGameByInvite(inviteCode);
  const { data: recentGames } = useGetGamePlayerByPlayerId(
    typeof playerId === "string" ? playerId : ""
  );

  const handleCreateGame = async () => {
    if (!playerId) {
      alert("Você precisa estar logado para criar uma partida.");
      return;
    }
    try {
      const game = await createGame({ status: "IN_PROGRESS" });
      await createGamePlayer({
        gameId: game.id,
        playerId: typeof playerId === "string" ? playerId : "",
        playerMoney: 25000,
        playerStatus: playerStatus,
        playerIcon: playerIcon,
      });
      setGameId(game.id);
      router.push(`/game/${game.id}/transaction`);
    } catch {}
  };

  const handleJoinGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!getGameByInvite?.id) {
      alert("Código de convite inválido ou partida não encontrada.");
      return;
    }

    try {
      const { getGamePlayerId } = await import("@/app/services/gamePlayers");
      const existing = await getGamePlayerId(
        getGameByInvite.id,
        typeof playerId === "string" ? playerId : ""
      );
      if (existing) {
        router.push(`/game/${getGameByInvite.id}/transaction`);
        return;
      }
      await createGamePlayer({
        gameId: getGameByInvite.id,
        playerId: typeof playerId === "string" ? playerId : "",
        playerMoney: 25000,
        playerStatus: playerStatus,
        playerIcon: playerIcon,
      });
      setGameId(getGameByInvite.id);
      router.push(`/game/${getGameByInvite.id}/transaction`);
    } catch {
      alert("Erro ao entrar na partida.");
    }
  };

  return (
    <main>
      <Navbar 
        inviteCode={undefined}
        gameId={undefined} 
      />
      <Box
        sx={{
          flexGrow: 1,
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f5f5",
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid display="flex" justifyContent="center">
            <Card sx={{ width: 350, maxWidth: "100%", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Criar Nova Partida
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Crie uma nova partida de Banco Imobiliário para jogar com seus
                  amigos.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateGame}
                  fullWidth
                >
                  Novo Jogo
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid display="flex" justifyContent="center">
            <Card sx={{ width: 350, maxWidth: "100%", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Entrar em Partida
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Entre em uma partida existente usando um código de convite.
                </Typography>
              </CardContent>
              <form onSubmit={handleJoinGame} style={{ width: "100%" }}>
                <CardActions
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <TextField
                    label="Código de Convite"
                    variant="outlined"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    required
                    fullWidth
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Entrar
                  </Button>
                </CardActions>
              </form>
            </Card>
          </Grid>
          <Grid display="flex" justifyContent="center">
            <Card sx={{ width: 350, maxWidth: "100%", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Partidas Recentes
                </Typography>
              </CardContent>
              {recentGames && recentGames.length > 0 ? (
                <Box component="ul" sx={{ pl: 0, listStyle: "none", m: 2 }}>
                  {recentGames.map((gamePlayer) => (
                    <Box component="li" key={gamePlayer.gameId} sx={{ mb: 2 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Sessão: {gamePlayer.game?.invite ?? "-"}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setGameId(gamePlayer.gameId);
                            router.push(
                              `/game/${gamePlayer.gameId}/transaction`
                            );
                          }}
                        >
                          ENTRAR
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ m: 2 }}>
                  Nenhuma partida encontrada.
                </Typography>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
