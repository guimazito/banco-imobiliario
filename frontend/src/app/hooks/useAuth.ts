"use client";

import { useMutation } from "@tanstack/react-query";
import { signup, login, logout, resetPassword } from "@/app/services/auth";
import { useAuth } from "@/app/components/AuthProvider/AuthContext";

export function useSignup() {
  return useMutation({
    mutationFn: (payload: { username: string; password: string }) =>
      signup(payload),
  });
}

export function useLogin() {
  const { setPlayerFromToken } = useAuth();
  return useMutation({
    mutationFn: (payload: { username: string; password: string }) =>
      login(payload),
    onSuccess: (token) => {
      setPlayerFromToken(token);
    },
  });
}

export function useLogout() {
  const { clearAuth } = useAuth();
  return useMutation({
    mutationFn: async () => {
      await Promise.resolve(logout());
    },
    onSuccess: () => clearAuth(),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: { token: string; newPassword: string }) =>
      resetPassword(payload),
  });
}
