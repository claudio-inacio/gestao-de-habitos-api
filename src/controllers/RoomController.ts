import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { videoRepository } from "../repositories/videoRepository";
import { subjectRepository } from "../repositories/subjectRepository";

export class RoomController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "O campo nome é obrigatorio" });
    }

    if (!description) {
      return res
        .status(400)
        .json({ message: "O campo descrição é obrigatorio" });
    }
    try {
      const newRoom = roomRepository.create({ name, description });
      await roomRepository.save(newRoom);
      return res.status(201).json(newRoom);
    } catch (error) {
      return res.status(500).json({ message: "Internal server Error" });
    }
  }

  async createVideo(req: Request, res: Response) {
    const { title, url } = req.body;
    const { idRoom } = req.params;

    const room = await roomRepository.findOneBy({ id: Number(idRoom) });
    if (!room) {
      return res.status(404).json({ message: "Aula não existe" });
    }

    try {
      const newVideo = videoRepository.create({
        title,
        url,
        room,
      });
      await videoRepository.save(newVideo);
      return res.status(201).json(newVideo);
    } catch (error) {
      return res.status(500).json({ message: "Internal server Error" });
    }
  }

  async roomSubject(req: Request, res: Response) {
    const { idSubject } = req.body;
    const { idRoom } = req.params;

    const room = await roomRepository.findOneBy( {id: Number(idRoom)});
    const subject = await subjectRepository.findOneBy({id: Number(idSubject)})
    try{
        if(!room){
            return res.status(404).json({message: 'Aula não existe'})
        }
        if(!subject){
            return res.status(404).json({message: 'Disciplina não existe'})
        }

        const roomUpdate = {
              ...room,
        subjects: [subject]
        }
    await roomRepository.save(roomUpdate)
    return res.status(200).json(room);
    }catch(error){
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
  }
  async list(req: Request, res: Response){
    try{
        const rooms = await roomRepository.find(
            {
                     relations: {
            subjects: true
        }
            }
        );
   return res.json(rooms)
    }catch(error){
        console.log({error})
        return res.status(500).json({message: 'Internal Server Error'})
    }
  }
}
