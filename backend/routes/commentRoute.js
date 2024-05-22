import  express  from "express";
import { addNewComment, getAllCommentsByRecipe } from "../controllers/commentController.js";
// import { isAuthorized, isLogged } from "../middlewares/auth.js";




const commentRouter = express.Router();

commentRouter.get("/comments/:recipeId", getAllCommentsByRecipe)
// commentRouter.get("/comments/answers/:commentId", getAllAnswersByComment)
// commentRouter.post('/comments/:commentId/answer',isLogged,isAuthorized(["admin", "user"]), addAnswer)
commentRouter.post('/comments/new/:recipeId/:userId', addNewComment)

export default commentRouter