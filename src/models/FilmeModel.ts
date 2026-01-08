import pool from '../database/db';

interface Filme {
    id: number;
    titulo: string;
    diretor: string;
    nota: number;
}

export class FilmeModel {

    async create(titulo: string, diretor: string, nota: number): Promise<Filme> {
        const query = `
            INSERT INTO filmes (titulo, diretor, nota)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [titulo, diretor, nota];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async list(): Promise<Filme[]> {
        const query = `SELECT * FROM filmes`;
        const { rows } = await pool.query(query);
        return rows;
    }

    async delete(id: number): Promise<void> {
        const query = `DELETE FROM filmes WHERE id = $1`;
        const values = [id];
        await pool.query(query, values);
    }
}