import express from "express";
import {
  createClassroomController,
  getClassroomController,
  updateClassroomController,
  deleteClassroomController,
  getTimetableController,
  updateTimetableController,
  getAllClassroomsController,
  assignController,
} from "../controllers/classroomController.js";
import { isPrincipal, isTeacher, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

// Create a new classroom (Principal only)
router.post("/create-classroom", requireSignIn, isPrincipal,createClassroomController);

//get all classrooms 
router.get("/all-classrooms", requireSignIn, getAllClassroomsController);

// Get a specific classroom by ID
router.get("/get-classroom/:id", requireSignIn, getClassroomController);

// Update classroom details
router.put("/update-classroom/:id", requireSignIn, updateClassroomController);

// Delete a classroom
router.delete("/delete-classroom/:id", requireSignIn, deleteClassroomController);

// Assign a user to a classroom
router.put("/assign-user/:classroomId", requireSignIn, assignController);

// Get the timetable for a classroom
router.get("/classroom/:id/timetable", requireSignIn, getTimetableController);

// Update the timetable for a classroom
router.put("/classroom/:id/timetable", requireSignIn, updateTimetableController);

export default router;
