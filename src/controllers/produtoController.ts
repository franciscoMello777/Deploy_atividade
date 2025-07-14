import { Request, Response } from 'express';
import  AppDataSource  from '../database/data-source';
import { Produto } from '../models/produto';

const produtoRepository = AppDataSource.getRepository(Produto);

export class produtoController {

    async list(req: Request, res: Response) {
        const produtos = await produtoRepository.find();
        res.json(produtos);
        return 
    }

    async create(req: Request, res: Response) {
        const { name, preco, descricao } = req.body;

        const produto = produtoRepository.create({ name, preco, descricao });
        await produtoRepository.save(produto);

        res.status(201).json(produto);
        return 
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const produto = await produtoRepository.findOneBy({ id: Number(id) });

        if (!produto) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return 
        }

        res.json(produto);
        return 
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, preco, descricao } = req.body;

        const produto = await produtoRepository.findOneBy({ id: Number(id) });

        if (!produto) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return 
        }

        produto.name = name;
        produto.preco = preco;
        produto.descricao = descricao;

        await produtoRepository.save(produto);

        res.json(produto);
        return 
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const produto = await produtoRepository.findOneBy({ id: Number(id) });

        if (!produto) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return 
        }

        await produtoRepository.remove(produto);

        res.status(204).send();
        return 
    }
}
