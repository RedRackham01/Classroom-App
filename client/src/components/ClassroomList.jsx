import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { Box, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import ClassroomForm from "./classroomForm";
import FlexBetween from "../Layout/FlexBeteen";

const initialValues = {
  name: "",
  daysInSession: {
    Monday: { selected: false, startTime: null, endTime: null },
    Tuesday: { selected: false, startTime: null, endTime: null },
    Wednesday: { selected: false, startTime: null, endTime: null },
    Thursday: { selected: false, startTime: null, endTime: null },
    Friday: { selected: false, startTime: null, endTime: null },
    Saturday: { selected: false, startTime: null, endTime: null },
  },
};

const ClassroomList = () => {
  const [classrooms, setClassrooms] = useState([]);
  const token = useSelector((state) => state.token);
  const [newClassVisible, setNewClassVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [newValues, setNewValues] = useState(initialValues);
  const [classID, setClassID] = useState(null);

  // Get all classrooms
  const getClassrooms = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/classroom/all-classrooms`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClassrooms(data.classrooms);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching classrooms");
    }
  };

  useEffect(() => {
    getClassrooms();
  }, []);

  // Delete classroom
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/classroom/delete-classroom/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        toast.success(`Classroom is deleted`);
        getClassrooms();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  //handle edit
  const handleEdit = (classroom) => {
    setClassID(classroom._id);
    const updatedValues = { ...initialValues };
    updatedValues.name = classroom.name;
    classroom.daysInSession.forEach((day) => {
      if (updatedValues.daysInSession[day.name]) {
        updatedValues.daysInSession[day.name] = {
          selected: true,
          startTime: day.startTime,
          endTime: day.endTime,
        };
      }
    });

    setNewValues(updatedValues);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setNewClassVisible(false);
    setVisible(false);
    getClassrooms();
    setNewValues(initialValues);
    setClassID(null);
  };

  return (
    <>
      <div>
        <FlexBetween>
          <Typography fontWeight="500" variant="h5">
            Classes
          </Typography>
          <IconButton
            aria-label="add-class"
            onClick={() => {
              setNewClassVisible(true);
            }}>
            <Add />
          </IconButton>
        </FlexBetween>
      </div>
      <div>
        <TableContainer sx={{ backgroundColor: "#f2e8cf" }}>
          <Table sx={{ minWidth: 650 }} aria-label="classroom table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name of Classroom</TableCell>
                <TableCell align="right">Teacher Assigned</TableCell>
                <TableCell align="right">No. of Students</TableCell>
                <TableCell align="right">Days in Session</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classrooms.map((classroom, i) => (
                <TableRow key={classroom._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {classroom.name}
                  </TableCell>
                  <TableCell align="right">{classroom.teacher ? classroom.teacher.name : "Not Assigned"}</TableCell>
                  <TableCell align="right">{classroom.students.length}</TableCell>
                  <TableCell>
                    {classroom.daysInSession.map((day, index) => (
                      <div key={index}>
                        {day.name} ({day.startTime} - {day.endTime})
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="edit" onClick={() => handleEdit(classroom)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" sx={{ color: "#BC4749" }} onClick={() => handleDelete(classroom._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal onCancel={handleCloseModal} footer={null} open={visible}>
          <ClassroomForm onSuccess={handleCloseModal} isEdit={classID} initialValueProp={newValues} />
        </Modal>
        <Modal onCancel={handleCloseModal} footer={null} open={newClassVisible}>
          <ClassroomForm onSuccess={handleCloseModal} isEdit={false} initialValueProp={initialValues} />
        </Modal>
      </div>
    </>
  );
};

export default ClassroomList;
