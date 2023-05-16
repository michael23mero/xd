import ModelCandidato from '../models/candidato.model.js'

export const addCandidato = async (req, res) => {
    try{
        const { ...data } = req.body
        const existe = await ModelCandidato.findOne({NOMBRES_DEL_CANDIDATO: data.NOMBRES_DEL_CANDIDATO})
        if(existe){
            return res.status(400).json({msg: `The candidato ${existe.NOMBRES_DEL_CANDIDATO} already exists`})
        }
        const candidato = new ModelCandidato(data)
        await candidato.save()
        return res.status(201).json({msg: 'Candidato created successfully', candidato})
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const getCandidatos = async (req, res) => {
    const data = await ModelCandidato.find()
    return res.status(200).json(data)
}

export const getCandidato = async (req, res) => {
    const { id } = req.params
    const data = await ModelCandidato.findById(id)
    return res.status(200).json(data)
}

export const updateCandidato = async (req, res) => {
    try{
        const { id } = req.params
        const { ...data } = req.body
        await ModelCandidato.findByIdAndUpdate(id, data, {new: true})
        return res.status(200).json({msg: `Candidato updated successfully`})
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export const removeCandidato = async (req, res) => {
    try{
        const { id } = req.params
        await ModelCandidato.findByIdAndRemove(id)
        return res.status(200).json({msg: 'Candidato deleted successfully'})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: err.message});
    }
}