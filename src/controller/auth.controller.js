import jwt from "jsonwebtoken";

import ModelUser from "../models/usuario.model.js";

export const authAdmin = async (req, res) => {
    const { username, password } = req.body
    const existe = await ModelUser.findOne({ username: username })
    if(!existe){
        return res.status(404).json({ msg: 'Usuario no encontrado' })
    }else{
        const token = jwt.sign({id: existe._id}, process.env.JWT, { expiresIn: 60*60*24 })
        return res.status(200).json({ msg: 'Welcome', auth: true, accessToken: token })
    }  
}

export const authUser = async (req, res) => {
    const { identify } = req.body
    const existe = await ModelUser.findOne({ identify: identify})
    if(!existe){
        return res.status(404).json({ msg: 'Usuario no encontrado' })
    }else{
        const token = jwt.sign({id: existe._id}, process.env.JWT, { expiresIn: 60*60*24 })
    return res.status(200).json({ msg: 'Welcome', auth: true, accessToken: token, role: existe.rol })
    } 
}

export const homeUser = async (req, res) => {
    const user = await ModelUser.findById(req.userId, {password: 0})
    return res.status(200).json(user)
}