import userModel from "../models/userModel.js";
import classroomModel from "../models/classroomModel.js";

export const createClassroomController = async (req, res) => {
  try {
    const { name, daysInSession } = req.body;
    const exisitingClassroom = await classroomModel.findOne({ name });
    //exisiting class
    if (exisitingClassroom) {
      return res.status(200).send({
        success: false,
        message: "Already Created",
      });
    }
    const filteredDaysInSession = Object.keys(daysInSession)
      .filter((day) => daysInSession[day].selected)
      .map((day) => {
        const { startTime, endTime } = daysInSession[day];
        if (startTime && endTime) {
          return {
            name: day,
            startTime,
            endTime,
          };
        }
        return null;
      })
      .filter((day) => day !== null);
    //create
    const classroom = await new classroomModel({
      name,
      daysInSession: filteredDaysInSession,
    }).save();

    res.status(201).send({
      success: true,
      message: "Classroom Created Successfully",
      classroom,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creation",
      error,
    });
  }
};

//get all classrooms
export const getAllClassroomsController = async (req, res) => {
  try {
    const classrooms = await classroomModel.find().populate("teacher").populate("students");
    res.status(200).send({
      success: true,
      classrooms,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching classrooms",
      error,
    });
  }
};

//get specific classroom
export const getClassroomController = async (req, res) => {
  try {
    const { id } = req.params;
    const {classroom} = await userModel.findById(id).populate("classroom");
    if (!classroom) {
      return res.status(404).send({
        success: false,
        message: "Classroom not found",
      });
    }
    res.status(200).send({
      success: true,
      classroom,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching classroom",
      error,
    });
  }
};

// Update classroom details
export const updateClassroomController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, daysInSession } = req.body;
    const filteredDaysInSession = Object.keys(daysInSession)
      .filter((day) => daysInSession[day].selected)
      .map((day) => {
        const { startTime, endTime } = daysInSession[day];
        if (startTime && endTime) {
          return {
            name: day,
            startTime,
            endTime,
          };
        }
        return null;
      })
      .filter((day) => day !== null);

    // Update classroom
    const classroom = await classroomModel.findByIdAndUpdate(
      id,
      {
        name,
        daysInSession: filteredDaysInSession,
      },
      { new: true }
    );
    if (!classroom) {
      return res.status(404).send({
        success: false,
        message: "Classroom not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Classroom updated successfully",
      classroom,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error updating classroom",
      error,
    });
  }
};

// Delete a classroom
export const deleteClassroomController = async (req, res) => {
  try {
    const { id } = req.params;
    const classroom = await classroomModel.findByIdAndDelete(id);
    if (!classroom) {
      return res.status(404).send({
        success: false,
        message: "Classroom not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Classroom deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error deleting classroom",
      error,
    });
  }
};

// Assign a user to a classroom
export const assignController = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const { userId,role } = req.body;
    const classroom = await classroomModel.findById(classroomId);
    if (!classroom) {
      return res.status(404).send({
        success: false,
        message: "Classroom not found",
      });
    }
    const user = await userModel.findById(userId);
    if (!user ) {
      return res.status(400).send({
        success: false,
        message: "Invalid",
      });
    }
    if(role==="Teacher") classroom.teacher = userId;
    else if(role==="Student") classroom.students.push(userId);
    await classroom.save();
    res.status(200).send({
      success: true,
      message: "User assigned to classroom successfully",
      classroom,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error assigning User",
      error,
    });
  }
};


// Get the timetable for a classroom
export const getTimetableController = async (req, res) => {
  try {
    const { id } = req.params;
    const classroom = await classroomModel.findById(id);
    if (!classroom) {
      return res.status(404).send({
        success: false,
        message: "Classroom not found",
      });
    }
    res.status(200).send({
      success: true,
      timetable: classroom.timetable,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching timetable",
      error,
    });
  }
};

// Update the timetable for a classroom
export const updateTimetableController = async (req, res) => {
  try {
    const { id } = req.params;
    const { timetable } = req.body;
    const classroom = await classroomModel.findById(id);
    if (!classroom) {
      return res.status(404).send({
        success: false,
        message: "Classroom not found",
      });
    }
    classroom.timetable = timetable;
    await classroom.save();
    res.status(200).send({
      success: true,
      message: "Timetable updated successfully",
      classroom,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error updating timetable",
      error,
    });
  }
};
