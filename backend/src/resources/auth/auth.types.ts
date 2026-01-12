import { Player } from "@prisma/client";

export type SignUpDto = Pick<
    Player,
    | 'username'
    | 'password'
    | 'profileId'
>;

export type LoginDto = Pick<
    Player,
    | 'username'
    | 'password'
>;

export type ForgotPasswordDto = {
    username: string
};

export type ResetPasswordDto = {
    token: string;
    newPassword: string;
};