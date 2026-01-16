"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import { useLogin } from '@/app/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { mutateAsync, isPending } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await mutateAsync({ username: form.username, password: form.password });
      router.push("/home");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.message || "Usuário ou senha inválidos.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Card sx={{ minWidth: 350, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Nome de usuário"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              autoFocus
              fullWidth
            />
            <TextField
              label="Senha"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              fullWidth
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isPending}
              fullWidth
            >
              {isPending ? "Entrando..." : "Entrar"}
            </Button>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Typography variant="body2">
            Não tem uma conta?{" "}
            <Button 
              variant="text"
              underline="hover"
              onClick={() => router.push("/signup")}
            >
              Cadastre-se
            </Button>
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
}
