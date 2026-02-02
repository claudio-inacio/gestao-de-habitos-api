"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SubjectController_1 = require("../controllers/SubjectController");
const RoomController_1 = require("../controllers/RoomController");
const routes = (0, express_1.Router)();
routes.get('/', (res, req) => {
    throw new Error('erro novo maneira de tratar');
});
routes.post('/subject', new SubjectController_1.SubjectController().create);
routes.post('/room', new RoomController_1.RoomController().create);
routes.post('/room/:idRoom/create', new RoomController_1.RoomController().createVideo);
routes.post('/room/:idRoom/subject', new RoomController_1.RoomController().roomSubject);
routes.get('/room', new RoomController_1.RoomController().list);
exports.default = routes;
