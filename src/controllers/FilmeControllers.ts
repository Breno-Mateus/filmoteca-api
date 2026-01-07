import { Request, Response } from 'express';
import { FilmeModel } from '../models/FilmeModel';

export class FilmeController {

    async create(req: Request, res: Response) {
        try {
            const { titulo, diretor, nota } = req.body;

            const filmeModel = new FilmeModel();

            const filme = await filmeModel.create(titulo, diretor, nota);

            return res.status(201).json(filme);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}