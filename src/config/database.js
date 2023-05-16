import mongoose from "mongoose";

export const dbconnection = async () => {
    try{
        await mongoose.set("strictQuery", false).connect(process.env.MONGO_URI)
        console.log('Conexion establecida con la base de datos')
    }catch(err){
        console.error(err);
    }
}