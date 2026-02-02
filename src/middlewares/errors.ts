

import  { NextFunction, Response, Request } from "express";
import { ApiError } from "../helpers/api-errors";
export const errorMiddleware = (error: Error & Partial<ApiError>, req: Request, res: Response, next: NextFunction) => {//middleware de tratamento de erros global

    console.log('statuscode: ', error.statusCode)
        const errorIsValid = error.statusCode
        const statusCode = errorIsValid ?? 500
        const message = errorIsValid ? error.message : 'Erro Interno do Servidor!'
        
        return res.status(statusCode).json({message: message})
    }