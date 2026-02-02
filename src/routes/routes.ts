import { Router } from "express";
import { SubjectController } from "../controllers/SubjectController";
import { RoomController } from "../controllers/RoomController";
import { ApiError } from "../helpers/api-errors";
import { User } from "../entities/User";
import { UserController } from "../controllers/UserController";
import { LoginController } from "../controllers/LoginController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routes = Router();

routes.get('/', (res, req) => {
    throw new Error('erro novo maneira de tratar')
})

routes.post('/subject', new SubjectController().create)
routes.post('/room', new RoomController().create)
routes.post('/room/:idRoom/create', new RoomController().createVideo)
routes.post('/room/:idRoom/subject', new RoomController().roomSubject)
routes.get('/room', new RoomController().list)


routes.post('/user', new UserController().create)
routes.post('/login', new LoginController().login)

// routes.get('/profile', authMiddleware, new LoginController().getProfile) //autenticar uma rota por rota

// routes.use(authMiddleware) // faz com que todas as rotas inseridas abaixo tenham que ser autenticadas
routes.get('/profile', new LoginController().getProfile)

export default routes