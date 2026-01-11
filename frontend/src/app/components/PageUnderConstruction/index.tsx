"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface IPageEmConstrucao {
  title?: string;
  description?: string;
}

export const PageUnderConstruction: React.FC<IPageEmConstrucao> = ({
  title = "Página em construção",
  description = "Estamos trabalhando para entregar esta funcionalidade em breve.",
}) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh" px={2}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <Typography variant="h2" component="div" mb={2} aria-hidden>
          🚧
        </Typography>
        <Typography variant="h4" component="h1" mb={2} fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          {description}
        </Typography>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Link href="/home" passHref legacyBehavior>
            <Button variant="contained" color="primary" component="a">
              Voltar ao início
            </Button>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};
