import path from 'node:path';
import dotenv from 'dotenv';

const envPath = path.resolve(process.cwd(), '.env');
const parentEnvPath = path.resolve(process.cwd(), '..', '.env');

dotenv.config({ path: envPath });
dotenv.config({ path: parentEnvPath });

export const env = {
  port: Number(process.env.PORT ?? 3001),
  jwtSecret: process.env.JWT_SECRET ?? 'portfolio-demo-secret',
  openAIApiKey: process.env.OPENAI_API_KEY ?? '',
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
};
