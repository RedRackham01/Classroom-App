import mongoose from "mongoose";

const periodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const classroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      default: "Not Assigned",
    },
    teacher: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    students: [
      {
        type: mongoose.ObjectId,
        ref: "users",
      },
    ],
    timetable: {
      Monday: {
        type: [periodSchema],
        default: [],
      },
      Tuesday: {
        type: [periodSchema],
        default: [],
      },
      Wednesday: {
        type: [periodSchema],
        default: [],
      },
      Thursday: {
        type: [periodSchema],
        default: [],
      },
      Friday: {
        type: [periodSchema],
        default: [],
      },
      Saturday: {
        type: [periodSchema],
        default: [],
      },
    },
    daysInSession: [
      {
        type: periodSchema,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Classroom", classroomSchema);
