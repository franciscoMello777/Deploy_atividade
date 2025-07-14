"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.produtoController = void 0;
const data_source_1 = __importDefault(require("../database/data-source"));
const produto_1 = require("../models/produto");
const produtoRepository = data_source_1.default.getRepository(produto_1.Produto);
class produtoController {
    async list(req, res) {
        const produtos = await produtoRepository.find();
        res.json(produtos);
        return;
    }
    async create(req, res) {
        const { name, preco, descricao } = req.body;
        const produto = produtoRepository.create({ name, preco, descricao });
        await produtoRepository.save(produto);
        res.status(201).json(produto);
        return;
    }
    async show(req, res) {
        const { id } = req.params;
        const produto = await produtoRepository.findOneBy({ id: Number(id) });
        if (!produto) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return;
        }
        res.json(produto);
        return;
    }
    async update(req, res) {
        const { id } = req.params;
        const { name, preco, descricao } = req.body;
        const produto = await produtoRepository.findOneBy({ id: Number(id) });
        if (!produto) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return;
        }
        produto.name = name;
        produto.preco = preco;
        produto.descricao = descricao;
        await produtoRepository.save(produto);
        res.json(produto);
        return;
    }
    async delete(req, res) {
        const { id } = req.params;
        const produto = await produtoRepository.findOneBy({ id: Number(id) });
        if (!produto) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return;
        }
        await produtoRepository.remove(produto);
        res.status(204).send();
        return;
    }
}
exports.produtoController = produtoController;
