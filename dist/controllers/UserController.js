"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const User_1 = require("../models/User");
const data_source_1 = require("../database/data-source");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
class userController {
    async createUser(req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "Insira todos campos!" });
        }
        const verificaEmail = await userRepository.findOneBy({ email: email });
        if (!verificaEmail) {
            const user = new User_1.User(name, email, password);
            const newUser = userRepository.create(user);
            await userRepository.save(newUser);
            res.status(201).json({ message: "Usuario criado com sucesso", usuario: newUser });
            return;
        }
        else {
            res.status(409).json({ message: "Email já existente." });
            return;
        }
    }
    async Login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Insira todos campos!" });
            return;
        }
        const verificaEmail = await userRepository.findOneBy({ email: email });
        if (!verificaEmail) {
            res.status(404).json({ message: "E-mail não existe" });
            return;
        }
        const isValid = await bcryptjs_1.default.compare(password, verificaEmail.password);
        if (!isValid) {
            res.status(401).json({ message: "Senha invalida!" });
            return;
        }
        res.status(200).json({ message: "Login realizado com sucesso!" });
    }
    async listUser(req, res) {
        const user = await userRepository.find();
        res.status(200).json(user);
    }
}
exports.userController = userController;
