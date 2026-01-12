import { api } from "./api";
import { setAuthToken } from "./api";
import {
    LoginDto,
    LoginResponse,
    ResetPasswordDto,
    ResetPasswordResponse,
} from "../types/auth";

export async function signup(payload: LoginDto): Promise<void> {
  try {
    await api.post('/auth/signup', payload);
  } catch (err) {
    console.error('Signup failed', err);
    throw new Error('Não foi possível registrar o usuário');
  }
}

export async function login(payload: LoginDto): Promise<string> {
  try {
    const { data } = await api.post<LoginResponse>('/auth/login', payload);
    const token = data?.token;
    setAuthToken(token);
    return token;
  } catch (err) {
    console.error('Login failed', err);
    throw new Error('Credenciais inválidas');
  }
}

export function logout() {
  setAuthToken(null);
}

export async function resetPassword(payload: ResetPasswordDto): Promise<ResetPasswordResponse> {
  const { data } = await api.post<ResetPasswordResponse>('/auth/reset-password', payload);
  return data;
}