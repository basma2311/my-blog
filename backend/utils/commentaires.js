// Importe le module 'express' depuis le package "express"
import express from "express"; // Import avec les ESModule (il faut mettre dans package.json "type": "module") 

// Importe le module 'dotenv' pour la configuration des variables d'environnement
import dotenv from "dotenv";

// Importe la fonction connectDB depuis le fichier "database.js" situé dans le dossier "config"
import connectDB from "./config/database.js";

// Importe le routeur pour les articles depuis le fichier "articleRouter.js" situé dans le dossier "routes"
import articleRouter from "./routes/articleRouter.js";

// Importe le routeur pour les produits depuis le fichier "productRouter.js" situé dans le dossier "routes"
import productRouter from "./routes/productRouter.js";

// Importe le module 'cors' pour la gestion des requêtes HTTP cross-origin
import cors from "cors";

// Importe le routeur pour les utilisateurs depuis le fichier "userRoute.js" situé dans le dossier "routes"
import userRouter from "./routes/userRoute.js";

// Crée une instance du framework Express
const app = express();

// Active la prise en charge du corps de la requête au format JSON
app.use(express.json());

// Active la prise en charge des données de formulaire au format URL-encoded
app.use(express.urlencoded({ extended: true }));

// Configure les variables d'environnement à partir du fichier .env
dotenv.config();

// Établit la connexion à la base de données
connectDB();

// Configure le middleware CORS pour autoriser les requêtes depuis "http://localhost:5173"
app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true
}));

// Utilise le routeur des produits
app.use(productRouter);

// Utilise le routeur des articles
app.use(articleRouter);

// Active la gestion des fichiers statiques depuis le dossier "public"
app.use(express.static("public"));

// Utilise le routeur des utilisateurs
app.use(userRouter);

// Lance le serveur sur le port spécifié dans les variables d'environnement, et affiche un message lorsque le serveur démarre
app.listen(process.env.PORT, () => {
   console.log(`Le serveur est exécuté à : ${process.env.BASE_URL}`);
});
