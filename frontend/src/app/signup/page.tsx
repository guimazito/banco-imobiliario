"use client";

import React, { useState } from "react";
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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSignup } from "@/app/hooks/useAuth";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { mutateAsync: signup, isPending } = useSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (form.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("As senhas não coincidem.");
      return;
    }
    try {
      await signup({ username: form.username, password: form.password });
      toast.success("Cadastro realizado com sucesso!");
      setForm({ username: "", password: "", confirm: "" });
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.message || "Erro ao cadastrar usuário.");
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
            Cadastro
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
            <TextField
              label="Confirmar senha"
              name="confirm"
              type="password"
              value={form.confirm}
              onChange={handleChange}
              required
              fullWidth
            />
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isPending}
              fullWidth
            >
              {isPending ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Typography variant="body2">
            Já tem uma conta?{" "}
            <Link href="/" underline="hover">
              Entrar
            </Link>
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
}
