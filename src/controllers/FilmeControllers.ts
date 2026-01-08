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

    async list(req: Request, res: Response) {
        try {
            const filmeModel = new FilmeModel();
            const filmes = await filmeModel.list();
            return res.status(200).json(filmes);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const filmeModel = new FilmeModel();
            await filmeModel.delete(Number(id));
            return res.status(204).send();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}