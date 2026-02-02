"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const routes_1 = __importDefault(require("./routes/routes"));
const errors_1 = require("./middlewares/errors");
data_source_1.AppDataSource.initialize().then(() => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json()); // middleware
    app.use(routes_1.default); // rotas
    app.use(errors_1.errorMiddleware); //GARANTE QUE O MIDDLEWARE DE ERRO SEJA UTILIZADO GLOBLAMENTE
    return app.listen(3000, () => {
        console.log("🚀 Server is running on port 3000");
    });
}).catch((error) => {
    console.error("❌ Erro ao iniciar o banco:", error);
});
