import express from 'express';
import path from 'path';

import cookies from "cookie-parser";

import rutas from './routes/index.js'
import index from './routes/index.routes.js'

export default class Servidor{
    constructor(){
        this.app = express();
        this.port = process.env.PORT

        this.middlewares()
        this.routes()
        this.views()
    }

    middlewares(){
        this.app.use(cookies())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    routes(){
        this.app.use('/api/v1', rutas)
        this.app.use(index)
    }

    views(){
        this.app.set('views', path.join('src/views'))
        this.app.set('view engine', 'hbs')
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor a su servicio en el puerto ${this.port}`);
        })
    }
}