import ModelUser from '../models/usuario.model.js'
import ModelCand from '../models/candidato.model.js'

export const addUser = async (req, res) => {
    try{
        const { ...data } = req.body
        const existe = await ModelUser.findOne({ identify: data.identify})
        if(existe){
            return res.status(400).json({msg: `The user ${existe.identify} already exists`})
        }
        const usuario = new ModelUser(data)
        await usuario.save()
        return res.status(201).json({msg: 'Usuario created successfully', usuario})
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const getUsers = async (req, res) => {
    const data = await ModelUser.find()
    return res.status(200).json(data)
}

export const voteUser = async (req, res) => {
    try{
        const user = await ModelUser.findById({_id: req.userId})
        if(user.status === true){
            return res.status(201).json({msg: 'Usted ya eligio'})
        }
        const { id } = req.params
        const voto = await ModelCand.findById(id)
        user.status = !user.status
        Number(voto.VOTOS_DE_LISTA++)
        await voto.save()
        await user.save()
        return res.status(201).json({msg: 'Vota guardado con exito'})
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}