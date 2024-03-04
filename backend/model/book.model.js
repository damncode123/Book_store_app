import mongoose,{Schema} from "mongoose";
const bookmodel=new Schema(
{
  title:{
    type:String,
    required:true,
  },
  author:{
    type:String,
    required:true,
  },
  publishYear:{
    type:String,
    required:true,
  }
},
{
    timestamps:true
}
);
export const Book=mongoose.model('Book',bookmodel)