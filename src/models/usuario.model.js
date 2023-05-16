import { Schema, model } from 'mongoose'

const schemaUsuario = new Schema(
    {
        fullname: { type: String, uppercase: true, trim: true },

        identify: { type: String, trim: true },

        username: { type: String, trim: true },

        password: { type: String, trim: true },

        lugarV: { type: String, trim: true },

        status: { type: Boolean, default: false },

        rol: {
            default: 'administrador',
            type: Schema.Types.String,
            ref: 'collectionUserRol'
        },
    },
    {
        versionKey: false
    }
)

export default model('collectionUsuario', schemaUsuario)