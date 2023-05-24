import { Router } from "express";
import { getAllBooks, getIntegerFormatPrice, getSpecifyBooks, getpublishedBooks, getstaticsBooks } from "./product.controller";
const router:Router = Router();

// get all books
router.get("/allBooks",getAllBooks);
router.get("/specificBook",getSpecifyBooks);
router.get("/publishedficBook",getpublishedBooks);
router.get("/feturedBook",getstaticsBooks);
router.get("/integerPrice",getIntegerFormatPrice);


// getIntegerFormatPrice 

export default router;