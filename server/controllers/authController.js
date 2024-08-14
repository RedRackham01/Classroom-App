import userModel from "../models/userModel.js";
// import classroomModel from "../models/classroomModel.js";

import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, role, classroom } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!role) {
      return res.send({ message: "Role is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered. Please Login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      role,
      classroom: classroom || "",
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    //validation
    if (!email || !password || !role) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password or role",
      });
    }
    //check user
    const user = await userModel.findOne({ email }).populate("classroom");
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is Not Registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    if (role !== user.role) {
      return res.status(200).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        classroom: user.classroom,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//update user
export const updateUserController = async (req, res) => {
  try {
    const { name, email, classroom, password, role } = req.body;
    const { id } = req.params;
    const hashedPassword = await hashPassword(password);
    const user = await userModel.findByIdAndUpdate(id, { name, email, role, classroom: classroom || "", password: hashedPassword }, { new: true });
    res.status(200).send({
      success: true,
      messsage: "User Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating user",
    });
  }
};

//all-teachers
export const getAllTeachersController = async (req, res) => {
  try {
    const users = await userModel.find({ role: "Teacher" }).populate("classroom").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting Users",
      error,
    });
  }
};

//all-students
export const getAllStudentsController = async (req, res) => {
  try {
    const users = await userModel.find({ role: "Student" }).populate("classroom").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting Users",
      error,
    });
  }
};

//delete user
export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting User",
      error,
    });
  }
};

//get-user
export const getUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).populate("classroom").sort({ createdAt: -1 });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting Users",
      error,
    });
  }
};
