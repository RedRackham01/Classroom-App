import express from "express";
import { isPrincipal, isTeacher, requireSignIn } from "../middlewares/authMiddleware.js";
import { loginController, registerController, updateUserController, deleteUserController, getAllTeachersController, getAllStudentsController, getUserController } from "../controllers/authController.js";

//router object
const router = express.Router();

//routing

//Register
router.post("/register",requireSignIn, registerController);

//Login
router.post("/login", loginController);

//protected Student route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Principal route auth
router.get("/principal-auth", requireSignIn, isPrincipal, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Teacher route auth
router.get("/teacher-auth", requireSignIn, isTeacher, (req, res) => {
  res.status(200).send({ ok: true });
});

//update user
router.put("/update-user/:id", requireSignIn, updateUserController);

//all teachers
router.get("/all-teachers", requireSignIn, getAllTeachersController);

//all students
router.get("/all-students", requireSignIn, getAllStudentsController);

//delete-user
router.delete("/delete-user/:id", requireSignIn, deleteUserController);

//get-user
router.get("/get-user/:id",requireSignIn, getUserController)

export default router;
