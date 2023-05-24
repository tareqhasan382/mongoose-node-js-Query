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