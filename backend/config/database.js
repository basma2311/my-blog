import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
export const connectDB = () => {

  mongoose.connect(`${process.env.MONGO_URI}`)
  .then(()=> console.log('Connection à la BDD'))
  .catch(()=> console.log('Impossible de connecter à la BDD'))
  
  
  }
  
  
  export default connectDB;