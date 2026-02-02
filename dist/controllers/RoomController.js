"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const roomRepository_1 = require("../repositories/roomRepository");
const videoRepository_1 = require("../repositories/videoRepository");
const subjectRepository_1 = require("../repositories/subjectRepository");
class RoomController {
    async create(req, res) {
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
            const newRoom = roomRepository_1.roomRepository.create({ name, description });
            await roomRepository_1.roomRepository.save(newRoom);
            return res.status(201).json(newRoom);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server Error" });
        }
    }
    async createVideo(req, res) {
        const { title, url } = req.body;
        const { idRoom } = req.params;
        const room = await roomRepository_1.roomRepository.findOneBy({ id: Number(idRoom) });
        if (!room) {
            return res.status(404).json({ message: "Aula não existe" });
        }
        try {
            const newVideo = videoRepository_1.videoRepository.create({
                title,
                url,
                room,
            });
            await videoRepository_1.videoRepository.save(newVideo);
            return res.status(201).json(newVideo);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server Error" });
        }
    }
    async roomSubject(req, res) {
        const { idSubject } = req.body;
        const { idRoom } = req.params;
        const room = await roomRepository_1.roomRepository.findOneBy({ id: Number(idRoom) });
        const subject = await subjectRepository_1.subjectRepository.findOneBy({ id: Number(idSubject) });
        try {
            if (!room) {
                return res.status(404).json({ message: 'Aula não existe' });
            }
            if (!subject) {
                return res.status(404).json({ message: 'Disciplina não existe' });
            }
            const roomUpdate = {
                ...room,
                subjects: [subject]
            };
            await roomRepository_1.roomRepository.save(roomUpdate);
            return res.status(200).json(room);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async list(req, res) {
        try {
            const rooms = await roomRepository_1.roomRepository.find({
                relations: {
                    subjects: true
                }
            });
            return res.json(rooms);
        }
        catch (error) {
            console.log({ error });
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
exports.RoomController = RoomController;
