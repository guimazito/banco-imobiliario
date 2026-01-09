export type AuthPlayer = {
  id: string;
  username: string;
  password: string;
  sub?: string;
  [k: string]: unknown;
};

export type LoginDto = {
    username: string;
    password: string
};

export type LoginResponse = {
    token: string
};

export type ForgotPasswordDto = {
    username: string
};
export type ForgotPasswordResponse = {
    message: string;
    resetToken?: string
};

export type ResetPasswordDto = {
    token: string;
    newPassword: string
};

export type ResetPasswordResponse = {
    message: string
};
