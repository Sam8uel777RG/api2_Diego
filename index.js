import express, { json } from "express";
import mongoose, { Mongoose } from "mongoose";
import cors from "cors";
import dotenv, { config } from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => "conectado al Mongo Atlas")
.catch(err => console.error("Error Conectando a MongoDB:", err))

// Definir Proyecto y campos

const ProyectoSchema = new mongoose.Schema({
    nombre:{type: String, required: true },
    precio:{type: Number},
    estado:{type: Boolean}
})

const Proyecto = mongoose.model("Proyecto",ProyectoSchema);

app.get("/Proyectos",async(req,res) => {
    const Proyectos = await Proyecto.find();
    res.json(Proyectos)
}) 
app.get("/Proyectos/:id",async(req,res) => {
    const proyecto = await Proyecto.findById(req.params.id)
    res.json(proyecto);
})

app.post("/Proyectos", async(req,res) => {
    const NuevoProyecto = new Proyecto (req.body);
    await NuevoProyecto.save();
    res.json (NuevoProyecto)
})

app.put("/Proyectos/:id", async(req,res) => {
    const ProductoEditado = await Proyecto.findByIdAndUpdate(req.params.id, req.body,{new: true});
    res.json ("editado")
})

app.delete("/proyectos/:id",async(req,res)=>{
    await Proyecto.findByIdAndDelete(req.params.id)
    res.json ("eliminado")
})

app.listen(process.env.PORT, () => {
    console.log(`Escuchando por el puerto en: http://localhost:${process.env.PORT}`)
})