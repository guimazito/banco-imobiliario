import { PrismaClient, Player } from "@prisma/client";
import {
  LoginDto,
  SignUpDto,
  ResetPasswordDto,
  ForgotPasswordDto,
} from "./auth.types";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function signUp(data: SignUpDto): Promise<Player> {
  const hashedPassword = await hash(
    data.password,
    process.env.ROUNDS_BCRYPT ? parseInt(process.env.ROUNDS_BCRYPT) : 10
  );

  const newPlayer = await prisma.player.create({
    data: {
      username: data.username,
      password: hashedPassword,
    },
  });

  return newPlayer;
}

export async function logIn(data: LoginDto): Promise<string> {
  const player = await prisma.player.findUnique({
    where: { username: data.username },
  });

  if (!player) {
    throw new Error("Invalid username or password");
  }

  const isPasswordValid = await compare(data.password, player.password);

  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign(
    { playerId: player.id, username: player.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  return token;
}

export async function forgotPassword(
  data: ForgotPasswordDto
): Promise<string | null> {
  const player = await prisma.player.findUnique({
    where: { username: data.username },
  });

  if (player) {
    const resetPayload = {
      id: player.id,
      username: player.username,
      purpose: "reset-password",
    };

    const resetToken = jwt.sign(
      resetPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return resetToken;
  }

  return null;
}

export async function resetPassword(data: ResetPasswordDto): Promise<boolean> {
  try {
    const decodedToken = jwt.verify(
      data.token,
      process.env.JWT_SECRET as string
    ) as any;

    if (decodedToken.purpose !== "password-reset") {
      return false;
    }

    const player = await prisma.player.findUnique({
      where: { id: decodedToken.id },
    });

    if (!player || player.username !== decodedToken.username) {
      return false;
    }

    const hashedPassword = await hash(
      data.newPassword,
      process.env.ROUNDS_BCRYPT ? parseInt(process.env.ROUNDS_BCRYPT) : 10
    );

    await prisma.player.update({
      where: { id: decodedToken.id },
      data: { password: hashedPassword },
    });

    return true;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
