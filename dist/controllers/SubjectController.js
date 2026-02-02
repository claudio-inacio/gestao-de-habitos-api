"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectController = void 0;
const subjectRepository_1 = require("./../repositories/subjectRepository");
class SubjectController {
    async create(req, res) {
        //criar disciplita
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'O campo nome é obrigatorio' });
        }
        try {
            const newSubject = subjectRepository_1.subjectRepository.create({ name });
            await subjectRepository_1.subjectRepository.save(newSubject);
            return res.status(201).json(newSubject);
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal server Error' });
        }
    }
}
exports.SubjectController = SubjectController;
