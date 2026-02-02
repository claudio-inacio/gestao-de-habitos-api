import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/api-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export class LoginController {
  async login(req: Request, res: Response) {
    const { document, password } = req.body;
    const user = await userRepository.findOneBy({ document });
    if (!user) {
      throw new BadRequestError("Usuário ou senha invalidos");
    }

    const verifyPass = await bcrypt.compare(password, user?.password);

    if (!verifyPass) {
      throw new BadRequestError("Usuário ou senha invalidos");
    }

    const token = jwt.sign({user_id: user.id, name: user?.name}, process.env.JWT_PASS ?? '', {expiresIn: '8h'});
    
    const {password: _, ...userLogin} = user;
    return res.json({
      user: userLogin,
      token: token,
    })
  
  }


  ///verificando rota protegida
  async getProfile(req: Request, res: Response){    
    return res.json(req?.user)
  }
}
