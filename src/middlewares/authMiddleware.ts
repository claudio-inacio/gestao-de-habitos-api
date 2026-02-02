import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../helpers/api-errors";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";

type JwtPayload = {
  id: number,
  name: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers
    if(!authorization){
        throw new UnauthorizedError('Usuário não autorizado')
    }
    const token = authorization.split(' ')[1]

    try{
        const {id} = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload
    
        const userIsAuthorized = await userRepository.findOneBy({ id });
        
    
        if(!userIsAuthorized){
          throw new UnauthorizedError('Usuário não autorizado')
        }
        const {password: _, ...loggedUser} = userIsAuthorized
    
        req.user = loggedUser
    
        next()
    }catch(error){
        throw new UnauthorizedError('Token inválido ou expirado')
    }
}