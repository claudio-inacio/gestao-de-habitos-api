import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes/routes";
import cors from 'cors';

import { errorMiddleware } from "./middlewares/errors";

AppDataSource.initialize().then(() => {
    const app = express();
    app.use(cors());


    app.use(express.json()); // middleware

    
    app.use(routes)// rotas

    app.use(errorMiddleware)//GARANTE QUE O MIDDLEWARE DE ERRO SEJA UTILIZADO GLOBLAMENTE

   return  app.listen(3000, () => {
        console.log("🚀 Server is running on port 3000");
    });
}).catch((error) => {
    console.error("❌ Erro ao iniciar o banco:", error);
});
