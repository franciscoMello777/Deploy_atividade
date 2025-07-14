"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const produtoRoutes_1 = __importDefault(require("./routes/produtoRoutes"));
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./database/data-source");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ['http://localhost:5500', "http://127.0.0.1:5500", "http://localhost:3000", "http://127.0.0.1:3000"]
}));
app.use(express_1.default.static('public'));
app.get("/", (req, res) => {
    res.status(200).sendFile(path_1.default.join(__dirname, "../public/cadastro.html"));
    return;
});
data_source_1.AppDataSource.initialize().then(() => {
    app.use("/api", UserRoutes_1.default);
    app.use("/api", produtoRoutes_1.default);
    app.listen(3000, () => {
        console.log("Servidor rodando em http://localhost:3000");
    });
}).catch((error) => {
    console.error(error);
});
