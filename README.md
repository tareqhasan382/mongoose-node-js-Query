<p>
## setup project ##

npm init -y
tsc --init
npm install express @types/express ts-node-dev typescript cors @types/cors mongoose dotenv @types/dotenv

rootdir:"./src",
outdir:"./dist",

script:{
"dev":"ts-node-dev --rs --poll .src/index.ts",
"build":"tsc",
"start":"node ./dist/index.js",
}

===yarn dev or npm dev===

===express setup moduler pattern folder ===

dist => index.ts
src => app => modules => product

src=>
index.ts
app.ts
app

{(src=>app =>)
modules
utils
}
{(src=>app=> utils)
dbConnect.ts
logger.ts
}
{(src=>app=>modules=>product)
product.interface.ts
product.model.ts
product.service.ts
product.controller.ts
product.router.ts
}

====================

<Details>
#app.ts
[
import cors from "cors"
import 'dotenv/config'
import express,{Application} from "express";
import { dbConnect } from "./app/utils/dbConnect";
const app:Application=express();;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// render ejs optional
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

]

</Details>

<Details>
#index.ts 
{
    import { app } from "./app";
    import { log } from "./app/utils/logger";
    const {PORT} = process.env;

    const startServer = async():Promise<void> =>{
    try {
        app.listen(PORT, () =>{
            log.info(`🌐 Server is running on port ${PORT}`);
        })

    } catch (error:any) {
        log.error(error.message);

    }

};
startServer();

}

</Details>
<DEtails>
#dbConnect.ts
{
    import mongoose from "mongoose";
    import { log } from "./logger";

    const {URL} = process.env;

    const dbConnect = async() :Promise<void> => {
    try {
        if(!URL){
            log.error("No URL found in .env file");
            process.exit(1);
        }
        await mongoose.connect(URL);
        console.log("🚀 Database connected")
    } catch (error:any) {
        log.error(error.message)

    }

};

export {dbConnect};
}

</DEtails>
<DEtails>
#interface
[
export interface IBook extends Document {
    title: string;
    author: string[];
    publisher: {
    name: string;
    location: string;
    };
    reviews: {
    user: string;
    comment: string;
    }[];

};

]

</DEtails>
<DEtails>
#Schema & model
[
import mongoose, { Schema, model } from "mongoose";
import { IBook } from "./product.interface";

// Define the schema for the Book collection
const BookSchema = new Schema<IBook>({
title: {
type: String,
required: true
},
author: {
type: [String],
required: true
},
publisher: {
name: {
type: String,
required: true
},
location: {
type: String,
required: true
}
},
reviews: {
type: [{
user: {
type: String,
required: true
},
comment: {
type: String,
required: true
}
}],
required: true
},

});
// export default Book = mongoose.model<IBook>("Book",BookSchema);

// Create and export the Book model
const Book = mongoose.model<IBook>('Book', BookSchema);
module.exports = Book;

]

</DEtails>
<DEtails>
#service.ts  all quere here

// Find all books with the genre "Fantasy"
import { IBook } from "./product.interface";
const Book = require("./product.model");

export const findBooksByGenre = async():Promise<IBook[]> =>{
try {
const genre = 'Fantasy';
const books: IBook[] = await Book.find({ genre });
return books;
} catch (error) {

        throw error;
      }

}

</DEtails>
<DEtails>
#controller.ts

// specific book find findBooksByGenre
import findBooksByGenre

export const getSpecifyBooks = async(req:Request,res:Response) =>{
const products = await findBooksByGenre();
res.send(products)
};

</DEtails>
<DEtails>
#router.ts

import { Router } from "express";
import { getAllBooks} from "./product.controller";
const router:Router = Router();

// get all books
router.get("/allBooks",getAllBooks);

</DEtails>
<DEtails></DEtails>
<DEtails></DEtails>
<DEtails></DEtails>
</p>
