import { Request, Response } from 'express';
import { FilmeModel } from '../models/FilmeModel';
import { filmeSchema } from '../schemas/FilmeSchema';
import { ZodError } from 'zod';

export class FilmeController {

    async create(req: Request, res: Response) {
        try {
            const validatedData = filmeSchema.parse(req.body);
            const filmeModel = new FilmeModel();
            const filme = await filmeModel.create(validatedData.titulo, validatedData.diretor, validatedData.nota);
            return res.status(201).json(filme);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ 
                    message: "Erro nos dados fornecidos",
                    issues: error.issues 
                });
            }
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

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const validatedData = filmeSchema.parse(req.body);
            const filmeModel = new FilmeModel();
            const filme = await filmeModel.update(Number(id), validatedData.titulo, validatedData.diretor, validatedData.nota);
            if (!filme) {
                return res.status(404).json({ error: "Filme não encontrado" });
            }
            return res.status(200).json(filme);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ 
                    message: "Erro nos dados fornecidos",
                    issues: error.issues 
                });
            }
            console.log(error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}