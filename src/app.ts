import cors from "cors"
import 'dotenv/config'
import express,{Application} from "express";
import { dbConnect } from "./app/utils/dbConnect";
const app:Application=express();
//const mongoose = require('mongoose');

// using cors
app.use(cors());
//parse data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// render ejs
app.set("view engine", "ejs");

// db connection
dbConnect();

// import all routes here
import booksRoute from "./app/modules/Book/product.router";
// default routes here
app.get("/",(req,res)=>{
    res.render("indes");
    //res.send("Welcome typeScript Moduler express app")
})
//costum routes here
app.use("/books",booksRoute);
export {app};