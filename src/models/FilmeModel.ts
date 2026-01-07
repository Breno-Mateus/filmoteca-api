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
}