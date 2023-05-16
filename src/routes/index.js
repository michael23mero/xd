import { Router } from "express";
import { authUser, homeUser } from "../controller/auth.controller.js";
import { addCandidato, getCandidato, getCandidatos } from "../controller/candidato.controller.js";
import { addUser, getUsers, voteUser } from "../controller/user.controller.js";
import { verifyToken } from "../middlewares/verifyAuth.js";

const rutas = Router()

rutas.post('/auth-user', authUser)
rutas.get('/home-user', [ verifyToken ], homeUser)

rutas.post('/add-user', addUser)
rutas.get('/get-users', getUsers)

rutas.post('/add-candidato', addCandidato)
rutas.get('/get-candidatos', getCandidatos)
rutas.get('/get-candidato', getCandidato)
rutas.get('/elegir-cand/:id', [ verifyToken ] , voteUser)

export default rutas