import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); 

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});


pool.on('connect', () => {
  console.log('📦 Base de Dados conectada com sucesso!');
});


export default pool;