import { Router } from 'express';
import { produtoController } from '../controllers/produtoController';

const routes = Router();
const produtosController = new produtoController();

routes.get('/produtos', produtosController.list);
routes.post('/produtos', produtosController.create);
routes.get('/produtos/:id', produtosController.show);
routes.put('/produtos/:id', produtosController.update);
routes.delete('/produtos/:id', produtosController.delete);

export default routes;