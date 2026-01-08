import { Router } from 'express';
import { FilmeController } from './controllers/FilmeControllers';

const router = Router();

const filmeController = new FilmeController();

router.post('/filmes', filmeController.create);
router.get('/filmes', filmeController.list);
router.delete('/filmes/:id', filmeController.delete);
router.put('/filmes/:id', filmeController.update);

export { router };