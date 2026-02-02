import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/api-errors";
import bcrypt from 'bcrypt'

export class UserController {
    async create(req: Request, res: Response){
            const {document, password, name} = req.body            

            const userExiste = await userRepository.findOneBy({document})

            if(userExiste){
                throw new BadRequestError('Usuário ja registrado')
            }

            const hashPassword = await bcrypt.hash(password, 10)

            const newUser = userRepository.create({
                name,
                document,
                password: hashPassword
            });

            await userRepository.save(newUser)


            const {password: _, ...userReturn} = newUser
            return res.status(201).json(userReturn)
    }
}c