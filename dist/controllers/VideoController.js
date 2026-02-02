"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoController = void 0;
const videoRepository_1 = require("../repositories/videoRepository");
class VideoController {
    async create(req, res) {
        const { title, url } = req.body;
        const { idAula } = req.params;
        if (!title) {
            return res.status(400).json({ message: 'O campo titulo é obrigatorio' });
        }
        if (!url) {
            return res.status(400).json({ message: 'O campo url é obrigatorio' });
        }
        try {
            const newRoom = videoRepository_1.videoRepository.create({ title, url });
            await videoRepository_1.videoRepository.save(newRoom);
            return res.status(201).json(newRoom);
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal server Error' });
        }
    }
}
exports.VideoController = VideoController;
