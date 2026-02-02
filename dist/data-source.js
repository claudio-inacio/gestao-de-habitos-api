"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const port = process.env.DB_PORT;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres", // tipo de conexão (banco de dados)
    host: process.env.DB_HOST, // host do banco de dados
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    // entities: [Post, Category],
    subscribers: [],
    // propriedades necessarias para geramos nossas migrations e tabelas automaticamente
    // caminho de onde deve ser coletado os arquivos para geração das migrations
    entities: [`${__dirname}/**/entities/*.{ts,js}`], //pegue todos os arquivos de entidades do projeto tanto js quanto ts
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`] //pegue todos os arquivos de migrations do projeto tanto js quanto ts
});
