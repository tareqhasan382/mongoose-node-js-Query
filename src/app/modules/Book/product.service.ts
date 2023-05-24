import { IBook } from "./product.interface";
//import { Book } from "./product.model";
const Book = require("./product.model");

export const getAllBooksDB = async():Promise<IBook[]> =>{
 return Book.find();
};

   // Find all books with the genre "Fantasy"
export const findBooksByGenre = async():Promise<IBook[]> =>{
    try {
        const genre = 'Fantasy';
        const books: IBook[] = await Book.find({ genre });
        return books;
      } catch (error) {
        
        throw error;
      }
}


// find specific genre “Sci-Fi” and published by “Roli Books”.

export const findBooksByGenreAndPublisher = async(): Promise<IBook[]> =>{
    try {
      const genre = 'Sci-Fi';
      const publisherName = 'Roli Books';
  
      const books: IBook[] = await Book.find({
        $and: [
          { genre },
          { 'publisher.name': publisherName }
        ]
      });
      return books;
    } catch (error) {
      //console.error('Error finding books:', error);
      throw error;
    }
  };


  // Define a static method to retrieve featured books
  export const getFeaturedBooks = async ():Promise <IBook[]> => {
    const featured:IBook[] = await Book.aggregate([
        {
           $match: {
              rating: { $gte: 4 }
           }
        },
        {
           $addFields: {
              featured: {
                 $cond: {
                    if: { $gte: ["$rating", 4.5] },
                    then: "BestSeller",
                    else: "Popular"
                 }
              }
           }
        }
     ])

   return featured;
           
  } 
  
 //o update the prices of books from string format to integer format,
 export const getIntegerFormat = async ():Promise <IBook[]> => {
    const featured: IBook[] = await Book.updateMany(
        {
          publicationYear: { $gt: 2020 },
          price: { $type: "string" }
        },
        [
          {
            $set: {
              price: {
                $toInt: "$price"
              }
            }
          }
        ]
      );
    return featured;
  }

