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
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";
import React, { useState, JSX } from "react";
import PixIcon from "@mui/icons-material/Pix";
import { Navbar } from "../components/Navbar";
import { PlayerIcon } from "../types/playerIcon";
import IconButton from "@mui/material/IconButton";
import { useCreateGame } from "../hooks/useGames";
import DialogTitle from "@mui/material/DialogTitle";
import { PlayerStatus } from "../types/playerStatus";
import SavingsIcon from "@mui/icons-material/Savings";
import { useGameId } from "@/app/contexts/GameContext";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useGetGameByInvite } from "@/app/hooks/useGames";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useCreateGamePlayer } from "../hooks/useGamePlayers";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "@/app/components/AuthProvider/AuthContext";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useGetGamePlayerByPlayerId } from "@/app/hooks/useGamePlayers";

const iconArray: PlayerIcon[] = [
  "PIX",
  "SAVINGS",
  "CREDIT_CARD",
  "POINT_OF_SALE",
  "MONETIZATION",
  "SHOPPING_BAG",
  "ACCOUNT_CIRCLE",
];

export default function HomePage() {
  const router = useRouter();
  const { player } = useAuth();
  const { setGameId } = useGameId();
  const playerId = player?.playerId;
  const playerStatus: PlayerStatus = "IDLE";
  const [inviteCode, setInviteCode] = useState("");
  const { mutateAsync: createGame } = useCreateGame();
  const [iconModalOpen, setIconModalOpen] = useState(false);
  const { mutateAsync: createGamePlayer } = useCreateGamePlayer();
  const { data: getGameByInvite } = useGetGameByInvite(inviteCode);
  const { data: recentGames } = useGetGamePlayerByPlayerId(
    typeof playerId === "string" ? playerId : "",
  );
  const [createMode, setCreateMode] = useState<"new" | "join" | null>(null);
  // Avatar
  const [playerIcon, setPlayerIcon] = useState<PlayerIcon>();
  const [usedAvatars, setUsedAvatars] = useState<PlayerIcon[]>([]);
  const iconMap: Record<PlayerIcon, JSX.Element> = {
    PIX: <PixIcon fontSize="large" color="primary" />,
    ACCOUNT_CIRCLE: <AccountCircleIcon fontSize="large" />,
    SAVINGS: <SavingsIcon fontSize="large" color="primary" />,
    CREDIT_CARD: <CreditCardIcon fontSize="large" color="primary" />,
    SHOPPING_BAG: <ShoppingBagIcon fontSize="large" color="primary" />,
    POINT_OF_SALE: <PointOfSaleIcon fontSize="large" color="primary" />,
    MONETIZATION: <MonetizationOnIcon fontSize="large" color="primary" />,
  };

  const handleCreateGame = () => {
    if (!playerId) {
      toast.error("Você precisa estar logado para criar uma partida.");
      return;
    }
    setCreateMode("new");
    setIconModalOpen(true);
    setPlayerIcon(undefined);
  };

  const handleJoinGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlayerIcon(undefined);
    if (!getGameByInvite?.id) {
      toast.error("Código de convite inválido ou partida não encontrada.");
      return;
    }
    if (getGameByInvite.status !== "IN_PROGRESS") {
      toast.error("A partida não está em andamento.");
      return;
    }
    try {
      const { getGamePlayerId } = await import("@/app/services/gamePlayers");
      const existing = await getGamePlayerId(
        getGameByInvite.id,
        typeof playerId === "string" ? playerId : "",
      );
      if (existing) {
        router.push(`/game/${getGameByInvite.id}/transaction`);
      } else {
        const { getGamePlayerTotalCountByGameId } =
          await import("@/app/services/gamePlayers");
        const totalPlayers = await getGamePlayerTotalCountByGameId(
          getGameByInvite.id,
        );
        if (totalPlayers >= 6) {
          toast.error("A partida já atingiu o número máximo de jogadores.");
          return;
        }
        const { getGamePlayerUsedAvatarByGameId } =
          await import("@/app/services/gamePlayers");
        const avatars = await getGamePlayerUsedAvatarByGameId(
          getGameByInvite.id,
        );
        setUsedAvatars(avatars as PlayerIcon[]);
        setIconModalOpen(true);
      }
    } catch {
      toast.error("Erro ao verificar jogador na partida.");
    }
  };

  const handleConfirmIcon = async () => {
    setIconModalOpen(false);
    if (!playerIcon) {
      toast.error("Selecione um avatar antes de confirmar.");
      setCreateMode(null);
      return;
    }
    if (createMode === "new") {
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
        setCreateMode(null);
        router.push(`/game/${game.id}/transaction`);
      } catch {
        toast.error("Erro ao criar partida.");
        setCreateMode(null);
      }
      return;
    }
    if (!getGameByInvite?.id) {
      toast.error("Partida não encontrada.");
      setCreateMode(null);
      return;
    }
    const { getGamePlayerUsedAvatarByGameId } =
      await import("@/app/services/gamePlayers");
    const avatars = await getGamePlayerUsedAvatarByGameId(getGameByInvite.id);
    if ((avatars as PlayerIcon[]).includes(playerIcon)) {
      toast.error("Este ícone já está sendo usado por outro jogador.");
      return;
    }
    try {
      await createGamePlayer({
        gameId: getGameByInvite.id,
        playerId: typeof playerId === "string" ? playerId : "",
        playerMoney: 25000,
        playerStatus: playerStatus,
        playerIcon: playerIcon,
      });
      setGameId(getGameByInvite.id);
      setCreateMode(null);
      router.push(`/game/${getGameByInvite.id}/transaction`);
    } catch {
      toast.error("Erro ao entrar na partida.");
      setCreateMode(null);
    }
  };

  return (
    <main>
      <Navbar inviteCode={undefined} gameId={undefined} />
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
                    onChange={(e) =>
                      setInviteCode(e.target.value.toUpperCase())
                    }
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
              {recentGames &&
              recentGames.filter((gp) => gp.game?.status === "IN_PROGRESS")
                .length > 0 ? (
                <Box component="ul" sx={{ pl: 0, listStyle: "none", m: 2 }}>
                  {recentGames
                    .filter(
                      (gamePlayer) => gamePlayer.game?.status === "IN_PROGRESS",
                    )
                    .map((gamePlayer) => (
                      <Box
                        component="li"
                        key={gamePlayer.gameId}
                        sx={{ mb: 2 }}
                      >
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
                                `/game/${gamePlayer.gameId}/transaction`,
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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ m: 2 }}
                >
                  Nenhuma partida encontrada.
                </Typography>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={iconModalOpen} onClose={() => setIconModalOpen(false)}>
        <DialogTitle sx={{ textAlign: "center" }}>
          Escolha seu Avatar
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {iconArray.map((iconName) => {
              const isUsed = usedAvatars.includes(iconName);
              return (
                <Box
                  key={iconName}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title={isUsed ? "Em uso" : iconName} arrow>
                    <span>
                      <IconButton
                        color={playerIcon === iconName ? "primary" : "default"}
                        onClick={() => !isUsed && setPlayerIcon(iconName)}
                        disabled={isUsed}
                        sx={{
                          cursor: isUsed ? "not-allowed" : "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {React.cloneElement(iconMap[iconName], {
                          color:
                            playerIcon === iconName ? "primary" : "disabled",
                        })}
                      </IconButton>
                    </span>
                  </Tooltip>
                  {isUsed && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5 }}
                    >
                      Em uso
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIconModalOpen(false)}
            variant="contained"
            color="inherit"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmIcon}
            variant="contained"
            color="primary"
            disabled={!playerIcon}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
