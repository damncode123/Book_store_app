import { Router } from "express";
import { newbook } from "../controllers/book.controller.js";
import { getbook } from "../controllers/book.controller.js";
import { getbookbyid } from "../controllers/book.controller.js";
import { updatebook } from "../controllers/book.controller.js";
import { deletebook } from "../controllers/book.controller.js";
const BookRoute = Router()
// for give some params we use "/:{params}"
BookRoute.get("/book/:id",getbookbyid)
BookRoute.get("/book",getbook)
BookRoute.post("/book",newbook)
BookRoute.put("/book/:id",updatebook)
BookRoute.delete("/book/:id",deletebook)
export { BookRoute };  
