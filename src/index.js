import dotenv from 'dotenv/config';
if(process.env.NODE_ENV === 'production'){ dotenv }

import Servidor from './server.js';
import { dbconnection } from './config/database.js';

const server = new Servidor()

async function main(){
    await server.listen()
    await dbconnection()
}; main()