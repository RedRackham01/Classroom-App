import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required:true,
      default: "Student",
      enum: ["Principal", "Teacher", "Student"],
    },
    classroom:{
      type: mongoose.ObjectId,
      ref: "Classroom",
    }
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
