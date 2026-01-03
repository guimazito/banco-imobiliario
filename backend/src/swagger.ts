import dotenv from "dotenv";
import swaggerAutogen from "swagger-autogen";
import { GameStatus } from "./resources/game/game.constants";
import { PlayerStatus, PlayerIcon } from "./resources/player/player.constants";
import { TransactionType } from "./resources/transaction/transaction.constants";

dotenv.config();

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "3000";

const docSwagger = {
  info: {
    title: "Banco Imobiliário API",
    description: "Documentação da API Banco Imobiliário",
    version: "1.0.0",
  },
  host: `${HOST}:${PORT}`,
  definitions: {
    Player: {
      id: '8a2053de-5d92-4c43-97c0-c9b2b0d56703',
      name: "João Silva",
      money: 1500,
      status: PlayerStatus.IDLE,
      icon: PlayerIcon.ACCOUNT_CIRCLE,
      gameId: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
      createdAt: '2025-09-16T19:27:15.645Z',
      updatedAt: '2025-09-16T19:27:15.645Z',
      deletedAt: null,
    },
    CreatePlayerDto: {
      name: 'João Silva',
      email: 'joao_silva@gmail.com',
      money: "1500",
      status: PlayerStatus.IDLE,
      icon: PlayerIcon.ACCOUNT_CIRCLE,
      gameId: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
    },
    UpdatePlayerDto: {
      money: 2000,
      status: PlayerStatus.IDLE,
    },
    Transaction: {
      id: 'd4f7e8c2-3b6a-4f1e-9f3b-2c8e4f5a6b7c',
      amount: 200,
      description: 'João fez pagamento de R$200 para Maria',
      type: TransactionType.BETWEEN_PLAYERS,
      playerIdPay: '8a2053de-5d92-4c43-97c0-c9b2b0d56703',
      playerIdReceive: '9a2053de-5d92-4c43-97c0-c9b2b0d56704',
      gameId: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
      createdAt: '2025-09-16T19:27:15.645Z',
      updatedAt: '2025-09-16T19:27:15.645Z',
      deletedAt: null,
    },
    CreateTransactionDto: {
      amount: 200,
      description: 'João fez pagamento de R$200 para Maria',
      type: TransactionType.BETWEEN_PLAYERS,
      playerIdPay: '8a2053de-5d92-4c43-97c0-c9b2b0d56703',
      playerIdReceive: '9a2053de-5d92-4c43-97c0-c9b2b0d56704',
      gameId: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
    },
    Game: {
      id: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
      status: GameStatus.IN_PROGRESS,
      players: [
        {
          id: '8a2053de-5d92-4c43-97c0-c9b2b0d56703',
          name: "João Silva",
          money: 1500,
          status: PlayerStatus.IDLE,
          icon: PlayerIcon.ACCOUNT_CIRCLE,
          createdAt: '2025-09-16T19:27:15.645Z',
          updatedAt: '2025-09-16T19:27:15.645Z',
          deletedAt: null,
        }
      ],
      createdAt: '2025-09-16T19:27:15.645Z',
      updatedAt: '2025-09-16T19:27:15.645Z',
      deletedAt: null,
    },
    CreateGameDto: {
      status: GameStatus.IN_PROGRESS,
    },
    UpdateGameDto: {
      status: GameStatus.FINISHED,
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

const outputSwagger = './output-swagger.json';
const router = ['./router/index.ts'];

swaggerAutogen(outputSwagger, router, docSwagger);