import { Request, Response } from "express";
import { findBooksByGenre, findBooksByGenreAndPublisher, getFeaturedBooks, getAllBooksDB, getIntegerFormat } from "./product.service";

export const getAllBooks = async(req:Request,res:Response) =>{
    const products = await getAllBooksDB();
    res.send(products)
};

// specific book find  findBooksByGenre
export const getSpecifyBooks = async(req:Request,res:Response) =>{
    const products = await findBooksByGenre();
    res.send(products)
};

// find specific genre “Sci-Fi” and published by “Roli Books”.
export const getpublishedBooks = async(req:Request,res:Response) =>{
    const products = await findBooksByGenreAndPublisher();
    res.send(products)
};
// Define a static method to retrieve featured books
export const getstaticsBooks =async(req:Request,res:Response) =>{
    const products = await getFeaturedBooks();
    res.status(200).json(products)
};


// getIntegerFormat
// Define a static method to retrieve featured books
export const getIntegerFormatPrice =async(req:Request,res:Response) =>{
    const products = await getIntegerFormat();
    res.status(200).json(products)
};