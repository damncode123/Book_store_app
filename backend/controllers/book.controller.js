import {Book} from "../model/book.model.js"
// POST request simple:-
const newbook=async(req,res)=>{
   try {
     if(!req.body.title||!req.body.author||!req.body.publishYear){
       return res.status(400).send({
        message:"Send all the required fields: title,author,publishYear"
       })
     }
     const newBook={
        title:req.body.title,
        author:req.body.author,
        publishYear:req.body.publishYear
     }
     const book = await Book.create(newBook);
     return res.status(200).send(book);
   } catch (err) {
      console.error(err);
      return res.status(500).send({message:err.message})
   }
}
// GET request simple:-
const getbook=async(req,res)=>{
    try {
      const books=await Book.find({});
    //   console.log(books);
    // for getting output  in json better to use ( .json ) as method 
      return res.status(200).json({
        count:books.length,
        data:books
      });
    } catch (err) {
        console.error(err);
        return res.status(400).send({
            message:err.message
        })
    }
}
// GET (getbookbyid) request simple 
const getbookbyid=async(req,res)=>{
    try { 
        const {id}=req.params;
      const Onebook=await Book.findById(id);
      return res.status(200).send(
        Onebook
      );
    } catch (err) {
        console.error(err);
        return res.status(400).send({
            message:err.message
        })
    }
}
// PUT request simple:-
const updatebook=async(req,res)=>{
   try {
    if(!req.body.title||!req.body.author||!req.body.publishYear){
        return res.status(400).send({
         message:"Send all the required fields: title,author,publishYear"
        })
      }
      const {id}= req.params;
      // In this it will find the data from id and then replace  the whole data from new data which we will get from req,.body.
      const updatebook=await Book.findByIdAndUpdate(id,req.body)
      if(!updatebook)
      {
        console.error("ID is not found");
        return res.status(404).json({message:"Book not found"})
      }
      return res.status(200).json({message:"Given Book has been updated successfully"}) 
   } catch (err) {
    console.log(err.message);
    return res.status(400).send({
        message:err.message
    })
   }
}
// DELETE request simple:-
const deletebook=async(req,res)=>{
    try {
        const {id}=req.params;
        const deletebook=await Book.findByIdAndDelete(id);
        if(!deletebook)
      {
        console.error("ID is not found");
        return res.status(404).json({message:"Book not found"})
      }
      return res.status(200).json({message:"Given Book has been updated successfully"})

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message:error.message
        })
    }
}
export {newbook,getbook,getbookbyid,updatebook,deletebook}