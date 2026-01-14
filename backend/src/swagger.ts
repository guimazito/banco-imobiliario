import dotenv from "dotenv";
import swaggerAutogen from "swagger-autogen";
import { GameStatus } from "./resources/game/game.constants";
import { PlayerStatus, PlayerIcon } from "./resources/player/player.constants";
import { TransactionType } from "./resources/transaction/transaction.constants";
import { PlayerProfileConstants } from './resources/playerProfile/playerProfile.constants';

dotenv.config();

const HOST =
  process.env.NODE_ENV === "production"
    ? "http://inovax.cloud"
    : process.env.HOST || "localhost";
const PORT = process.env.PORT || "3000";

const docSwagger = {
  info: {
    title: "Banco Imobiliário API",
    description: "Documentação da API Banco Imobiliário",
    version: "1.0.0",
  },
  host: `${HOST}:${PORT}`,
  definitions: {
    SignUpDto: {
      username: "joao.silva",
      password: "senha123",
    },
    LoginDto: {
      username: "joao.silva",
      password: "senha123",
    },
    ChangePasswordDto: {
      oldPassword: "senha123",
      newPassword: "novaSenha456",
    },
    ResetPasswordDto: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhhMjA1M2RlLTVkOTItNGM0My05N2MwLWM5YjJiMGQ1NjcwMyIsIm5hbWUiOiJBbmEgUGVyZWlyYSIsImVtYWlsIjoiYW5hX3BlcmlyYUBoZW1vdHJhY2suY29tIiwicHJvZmlsZUlkIjoiQURNSU4iLCJibG9vZENlbnRlcklkIjoiMDBjNmZiMmMtYTI4MC00MzFjLWIxMmYtNmU2YTc4ZjdhN2YwIiwiaWF0IjoxNjkyNTI0NzI1fQ.sJt9H3z8n5X1mX0F6vE3K1Zl5H3z8n5X1mX0F6vE3K1Zl5",
      newPassword: "novaSenha456",
    },
    AuthToken: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhhMjA1M2RlLTVkOTItNGM0My05N2MwLWM5YjJiMGQ1NjcwMyIsIm5hbWUiOiJBbmEgUGVyZWlyYSIsImVtYWlsIjoiYW5hX3BlcmlyYUBoZW1vdHJhY2suY29tIiwicHJvZmlsZUlkIjoiQURNSU4iLCJibG9vZENlbnRlcklkIjoiMDBjNmZiMmMtYTI4MC00MzFjLWIxMmYtNmU2YTc4ZjdhN2YwIiwiaWF0IjoxNjkyNTI0NzI1fQ.sJt9H3z8n5X1mX0F6vE3K1Zl5H3z8n5X1mX0F6vE3K1Zl5",
    },
    Player: {
      id: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
      username: "João Silva",
      profileId: PlayerProfileConstants.USER,
      createdAt: "2025-09-16T19:27:15.645Z",
      updatedAt: "2025-09-16T19:27:15.645Z",
      deletedAt: null,
    },
    CreatePlayerDto: {
      username: "João Silva",
      password: "senha123",
      profileId: PlayerProfileConstants.USER,
    },
    UpdatePlayerDto: {
      username: "João Silva",
      profileId: PlayerProfileConstants.USER,
    },
    Transaction: {
      id: "d4f7e8c2-3b6a-4f1e-9f3b-2c8e4f5a6b7c",
      amount: "200",
      description: "João fez pagamento de R$200 para Maria",
      type: TransactionType.BETWEEN_PLAYERS,
      playerIdPay: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
      playerIdReceive: "9a2053de-5d92-4c43-97c0-c9b2b0d56704",
      gameId: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
      createdAt: "2025-09-16T19:27:15.645Z",
      updatedAt: "2025-09-16T19:27:15.645Z",
      deletedAt: null,
    },
    CreateTransactionDto: {
      amount: "200",
      description: "João fez pagamento de R$200 para Maria",
      type: TransactionType.BETWEEN_PLAYERS,
      playerIdPay: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
      playerIdReceive: "9a2053de-5d92-4c43-97c0-c9b2b0d56704",
      gameId: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
    },
    Game: {
      id: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
      invite: "ABCD12345",
      status: GameStatus.IN_PROGRESS,
      players: [
        {
          id: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
          username: "João Silva",
          money: 1500,
          status: PlayerStatus.IDLE,
          icon: PlayerIcon.ACCOUNT_CIRCLE,
          createdAt: "2025-09-16T19:27:15.645Z",
          updatedAt: "2025-09-16T19:27:15.645Z",
          deletedAt: null,
        }
      ],
      createdAt: "2025-09-16T19:27:15.645Z",
      updatedAt: "2025-09-16T19:27:15.645Z",
      deletedAt: null,
    },
    CreateGameDto: {
      invite: "ABCD12345",
      status: GameStatus.IN_PROGRESS,
    },
    UpdateGameDto: {
      invite: "ABCD12345",
      status: GameStatus.FINISHED,
    },
    GamePlayer: {
      gameId: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
      playerId: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
      playerMoney: 1500,
      playerStatus: PlayerStatus.IDLE,
      playerIcon: PlayerIcon.ACCOUNT_CIRCLE,
    },
    CreateGamePlayerDto: {
      gameId: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
      playerId: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
      playerMoney: 1500,
      playerStatus: PlayerStatus.PAY,
      playerIcon: PlayerIcon.ACCOUNT_CIRCLE,
    },
    UpdateGamePlayerDto: {
      playerMoney: 2000,
      playerStatus: PlayerStatus.IDLE,
      playerIcon: PlayerIcon.ACCOUNT_CIRCLE,
    },
    PlayerProfile: {
      id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
      profileName: "Perfil Padrão",
      description: "Este é o perfil padrão do jogador.",
      createdAt: "2025-09-16T19:27:15.645Z",
      updatedAt: "2025-09-16T19:27:15.645Z",
      deletedAt: null,
    },
    CreatePlayerProfileDto: {
      profileName: "Perfil Padrão",
      description: "Este é o perfil padrão do jogador.",
    },
    UpdatePlayerProfileDto: {
      profileName: "Perfil Avançado",
      description: "Este é o perfil avançado do jogador.",
    },
    SuccessMessage: {
      message: "Operation completed successfully.",
    },
    BadRequest: {
      error: "Error details",
      message: "Bad request message",
    },
    Unauthorized: {
      error: "Error details",
      message: "Unauthorized message",
    },
    NotFound: {
      error: "Error details",
      message: "Not found message",
    },
    Error: {
      error: "Error details",
      message: "Error message",
    },
  },
};

const outputSwagger = 
  process.env.NODE_ENV === "production"
    ? "./dist/src/output-swagger.json"
    : "./output-swagger.json";
const router = [
  process.env.NODE_ENV === "production"
    ? "./dist/src/router/index.js"
    : "./router/index.ts",
];

swaggerAutogen(outputSwagger, router, docSwagger);