import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { brandsRouter, usersRouter, vehiclesRouter } from "./routes/index.js"
dotenv.config()
import cors from "cors";

const app = express();

app.use(cors())

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("Conexion exitosa con mongo"))
.catch((err)=> console.log("error al conectar con mongo", err))


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use('/uploads', express.static('uploads'));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html' ))
})

app.use('/vehicles', vehiclesRouter)
app.use('/users', usersRouter)
app.use('/brands', brandsRouter)

app.use((req, res, next) => {
    res.status(404).json({
        message: "Ruta no encontrada o no tienes acceso a este recurso."
    });
});

app.listen(3000, () => {
    console.log("servidor corriendo en puerto 3000");
})