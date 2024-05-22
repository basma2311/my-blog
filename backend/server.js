import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/database.js";
import recipeRouter from "./routes/recipeRouter.js";
import userRouter from "./routes/userRouter.js";
import cors from 'cors'
import commentRouter from "./routes/commentRoute.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.static("public"))

dotenv.config()

// Établit la connexion à la base de données
connectDB();
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))
app.use(recipeRouter);
app.use(userRouter);
app.use(commentRouter);




//// Lance le serveur sur le port spécifié
app.listen(process.env.PORT, () => {
  console.log(`Le serveur est exécuté à : ${process.env.BASE_URL}`);
});