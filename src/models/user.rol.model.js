import { Schema, model } from 'mongoose'

const schemaUserRol = new Schema(
    {
        rol: { type: String, uppercase: true, trim: true }
    },
    {
        versionKey: false
    }
)

export default model('collectionUserRol', schemaUserRol)