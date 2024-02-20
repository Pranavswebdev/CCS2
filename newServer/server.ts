 
import express from 'express';
import cors from 'cors';
const app = express()
const PORT = 8080
import morgan from "morgan";
import cookieParser from "cookie-parser";
import  connectMongoDb  from "./util/mongoConnect";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (  {req, res }:any     ) => {
    res.json({ message: "Home" }) 
});

import userRoutes from './routes/user';
// import projectRoutes from './routes/project.ts';

app.use("/api/", userRoutes)
// app.use("/api/", projectRoutes)
app.use(cookieParser());
app.use(morgan("tiny"));


// let  = require("./util/mongoConnect.ts");


connectMongoDb().then(()=>{
    console.log(" DB Connected");
    
})
app.listen(PORT, () => {
    console.log(`Server at ${PORT}`);
});

module.exports = app;