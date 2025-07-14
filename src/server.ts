import userRouter from "./routes/UserRoutes";
import produtoRouter from "./routes/produtoRoutes";
import express, {Application} from "express";
import { AppDataSource } from "./database/data-source";
import { Response, Request } from "express";
import cors from "cors";
import path from "path";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ['http://localhost:5500', "http://127.0.0.1:5500", "http://localhost:3000", "http://127.0.0.1:3000"]
}))

app.use(express.static('public'));

app.get("/", (req:Request, res:Response)=>{
    res.status(200).sendFile(path.join(__dirname,"../public/cadastro.html"));
    return;
})


AppDataSource.initialize().then(() => {

    app.use("/api",userRouter);
    app.use("/api",produtoRouter);

    app.listen(3000, ()=>{
        console.log("Servidor rodando em http://localhost:3000");
    })
}).catch((error) =>{
    console.error(error);
})