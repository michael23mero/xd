import { Schema, model } from 'mongoose'

const schemaCandidato = new Schema(
    {
        NOMBRES_DEL_CANDIDATO: { type: String, uppercase: true, trim: true },

        PROPUESTA_DE_CANDIDATO: { type: String, uppercase: true, trim: true },

        IMAGEN_DEL_CANDIDATO: { type: String, trim: true },

        VOTOS_DE_LISTA: { type: Number, default: 0 },

        NUMERO_DE_LISTA: { type: Number },
    },
    {
        versionKey: false
    }
)

export default model('collectionCandidato', schemaCandidato)