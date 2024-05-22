import express from "express";
import { deleteUser, getAllUsers, getOneUser, login, register, updateUserRole } from "../controllers/usersController.js";
import { isAuthorized, isLogged } from "../middlewares/auth.js";




const userRouter= express.Router();

userRouter.post ('/register', register);
userRouter.post('/login', login);
userRouter.get('/users',isLogged,isAuthorized(["admin"]), getAllUsers)
userRouter.delete('/users/:id',isLogged,isAuthorized(["admin"]), deleteUser)
userRouter.get('/users/:id',isLogged,isAuthorized(["admin"]), getOneUser)
userRouter.put('/users/role/:id',isLogged,isAuthorized(["admin"]),updateUserRole )

export default userRouter