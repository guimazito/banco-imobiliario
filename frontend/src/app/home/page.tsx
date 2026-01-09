"use client";

import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCreateGame } from "../hooks/useGames";
import { useCreateGamePlayer } from "../hooks/useGamePlayers";

export default function HomePage() {
  const router = useRouter();
  const { mutateAsync: createGame } = useCreateGame();
  const { mutateAsync: createGamePlayer } = useCreateGamePlayer();
  const handleCreateGame = async () => {
    try {
      const game = await createGame({ status: "IN_PROGRESS" });
      await createGamePlayer({
        gameId: game.id,
        playerId: "Host",
        playerMoney: 0,
        playerStatus: "IDLE",
        playerIcon: "PIX"
      });
      if (game?.id) {
        router.push(`/game/${game.id}/transaction`);
        // router.push(`/transaction/${game.id}`);
      }
    } catch (err) {
    }
  };

  return (
    <main>
      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f5f5",
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          <Grid>
            <Card sx={{ minWidth: 275, boxShadow: 3 }}>
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
                <Button variant="contained" color="primary" onClick={handleCreateGame}>
                  Novo Jogo
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid>
            <Card sx={{ minWidth: 275, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Entrar em Partida
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Entre em uma partida existente usando um código de convite.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" color="primary" href="/join-game">
                  Entrar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
