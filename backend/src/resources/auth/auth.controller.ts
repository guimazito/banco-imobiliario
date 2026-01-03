import { authError } from "./auth.errors";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  signUp,
  logIn,
  forgotPassword,
  resetPassword
} from "./auth.service";
import {
  SignUpDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from "./auth.types";

const signup = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Register a new player'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/SignUpDto' }
    }
    #swagger.responses[201] = {
        description: 'Player registered successfully',
        schema: { $ref: '#/definitions/Player' }
    }
    #swagger.responses[400] = {
        description: 'Bad Request',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const data: SignUpDto = req.body;
    const newPlayer = await signUp(data);
    res.status(StatusCodes.CREATED).json(newPlayer);
  } catch (err) {
    authError(res, err);
  }
};

const login = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Log in a player'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/LoginDto' }
    }
    #swagger.responses[200] = {
        description: 'Player logged in successfully',
        schema: {
            type: 'object',
            properties: {
                token: {
                    type: 'string'
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Bad Request',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const data: LoginDto = req.body;
    const token = await logIn(data);
    res.status(StatusCodes.OK).json({ token });
  } catch (err) {
    authError(res, err);
  }
};

// const logout = async (req: Request, res: Response) => {
//   /*
//     #swagger.summary = 'Log out a player'
//     #swagger.responses[200] = {
//         description: 'Player logged out successfully.',
//         schema: { $ref: '#/definitions/SuccessMessage' }
//     }
//     #swagger.responses[401] = {
//         description: 'Unauthorized.',
//         schema: { $ref: '#/definitions/Unauthorized' }
//     }
//     #swagger.responses[500] = {
//         description: 'Internal server error.',
//         schema: { $ref: '#/definitions/Error' }
//     }
//     */
//   // Since JWT is stateless, logout can be handled on the client side by deleting the token.
//   try {
//     req.session.destroy((err) => {
//       if (err) {
//         res
//           .status(StatusCodes.INTERNAL_SERVER_ERROR)
//           .json({ message: "Erro ao encerrar a sessão" });
//       } else {
//         res.clearCookie("connect.sid");
//         res
//           .status(StatusCodes.OK)
//           .json({ message: "Sessão encerrada com sucesso" });
//       }
//     });
//   } catch (error) {
//     authError(res, error);
//     return;
//   }
// };

const resetpassword = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Reset player password'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/ResetPasswordDto' }
    }
    #swagger.responses[200] = {
        description: 'Password reset successfully',
        schema: { $ref: '#/definitions/SuccessMessage' }
    }
    #swagger.responses[400] = {
        description: 'Bad Request',
        schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: '#/definitions/Error' }
    }
    */
  try {
    const data: ResetPasswordDto = req.body;
    await resetPassword(data);
    res
      .status(StatusCodes.OK)
      .json({ message: "Password reset successfully" });
  } catch (err) {
    authError(res, err);
  }
};

export default {
  signup,
  login,
  resetpassword 
}