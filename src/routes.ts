import { Router } from 'express';
import { FilmeController } from './controllers/FilmeControllers';

const router = Router();

const filmeController = new FilmeController();

router.post('/filmes', filmeController.create);

export { router };