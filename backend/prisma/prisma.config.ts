import { defineConfig } from '@prisma/cli';

export default defineConfig({
  datasource: {
    db: {
      adapter: 'mysql',
      url: process.env.DATABASE_URL,
    },
  },
});