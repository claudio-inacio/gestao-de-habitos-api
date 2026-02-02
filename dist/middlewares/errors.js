"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (error, req, res, next) => {
    const errorIsValid = error.statusCode;
    const statusCode = errorIsValid ?? 500;
    const message = errorIsValid ? error.message : 'Erro Interno do Servidor!';
    return res.status(statusCode).json({ message: message });
};
exports.errorMiddleware = errorMiddleware;
