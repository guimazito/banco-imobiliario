import {
  Container,
  Paper,
  Typography,
  Box
} from "@mui/material";
import { Navbar } from "../components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar inviteCode={undefined} gameId={undefined} />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sua Experiência, Nossa Solução
          </Typography>
          <Box mt={2}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify" }}
            >
              Este sistema web foi desenvolvido para facilitar o gerenciamento
              das transações e do andamento de partidas de Banco Imobiliário.
              Com ele, é possível registrar, acompanhar e visualizar todas as
              movimentações financeiras dos jogadores, tornando a experiência do
              jogo mais organizada, transparente e divertida. Ideal para grupos
              que desejam focar na estratégia e diversão, sem se preocupar com o
              controle manual do dinheiro.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
