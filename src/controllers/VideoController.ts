
import { Request, Response } from "express";
import { videoRepository } from "../repositories/videoRepository";



export class VideoController{
    async create(req: Request, res: Response){

        const {title, url} = req.body;
        const {idAula} = req.params;

        if(!title){
            return res.status(400).json({message: 'O campo titulo é obrigatorio'})
        }

        if(!url){
            return res.status(400).json({message: 'O campo url é obrigatorio'})
        }
        try{
            const newRoom = videoRepository.create({title, url});
            await videoRepository.save(newRoom);
            return res.status(201).json(newRoom)
        }catch(error){
            return res.status(500).json({message: 'Internal server Error'})
        }
    }
}