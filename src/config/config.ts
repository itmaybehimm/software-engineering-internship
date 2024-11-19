import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,

  db: {
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },

  email: {
    gmailUsername: process.env.GMAIL_USERNAME,
    gmailPassword: process.env.GMAIL_PASSWORD,
  },
};
