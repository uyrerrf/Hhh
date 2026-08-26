import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'wuzen-secret-2026';
export const WS_PATH = '/ws';
export const DB_PATH = process.env.DB_PATH || './wuzen.db';
