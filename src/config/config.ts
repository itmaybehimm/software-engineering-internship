import dotenv from 'dotenv';

class Config {
  private static _instance: Config | null = null;

  public readonly port: number;
  public readonly nodeEnv: string;

  public readonly db: {
    type: 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };

  public readonly jwt: {
    accessSecret: string;
    accessExpiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
  };

  public readonly email: {
    gmailUsername: string;
    gmailPassword: string;
  };

  private constructor() {
    dotenv.config();

    this.port = parseInt(process.env.PORT || '3000', 10);
    this.nodeEnv = process.env.NODE_ENV || 'development';

    this.db = {
      type: process.env.DB_TYPE as 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || '',
    };

    this.jwt = {
      accessSecret: process.env.JWT_ACCESS_SECRET || '',
      accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '',
      refreshSecret: process.env.JWT_REFRESH_SECRET || '',
      refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '',
    };

    this.email = {
      gmailUsername: process.env.GMAIL_USERNAME || '',
      gmailPassword: process.env.GMAIL_PASSWORD || '',
    };
  }

  public static getInstance(): Config {
    if (!Config._instance) {
      Config._instance = new Config();
    }
    return Config._instance;
  }
}

export const config = Config.getInstance();
