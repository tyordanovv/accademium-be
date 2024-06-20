import dotenv from "dotenv";

dotenv.config();

export const profile = process.env.PROFILE;

export const devDBConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET,
};

export const passwordConfig = {
  saltRounds: 12,
};

export const openaiConfig = {
  openai_url: process.env.VITE_OPENAI_API_URL, 
  openai_key: process.env.VITE_OPENAI_API_KEY,
};