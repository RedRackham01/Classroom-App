import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import UserForm from "./UserForm";
import FlexBetween from "../Layout/FlexBeteen";

const initialValues = {
  name: "",
  email: "",
  password: "",
  classroom: "",
};

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const token = useSelector((state) => state.token);
  const [visible, setVisible] = useState(false);
  const [newUserVisible, setNewUserVisible] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  //get all teachers
  const getTeachers = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/all-teachers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  //update user
  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher._id);
    setFormValues({
      name: teacher.name,
      email: teacher.email,
      password: teacher.password,
      classroom: teacher.classroom.name || "",
    });
    setVisible(true);
  };

  //delete user
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/auth/delete-user/${pId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        toast.success(`User is deleted`);

        getTeachers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
    setNewUserVisible(false);
    setFormValues(initialValues);
    setSelectedTeacher(null);
  };

  return (
    <>
      <div>
        <FlexBetween>
          <Typography fontWeight="500" variant="h5">
            Teachers List
          </Typography>
          <IconButton aria-label="add-teacher" onClick={() => setNewUserVisible(true)}>
            <Add />
          </IconButton>
        </FlexBetween>
      </div>
      <div>
        <TableContainer sx={{ backgroundColor: "#f2e8cf" }}>
          <Table sx={{ minWidth: 650 }} aria-label="teacher table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Classroom Assigned</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher, i) => (
                <TableRow key={teacher._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell align="right">{teacher.email}</TableCell>
                  <TableCell align="right">{teacher.classroom.name || "Not Assigned"}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="edit" onClick={() => handleEdit(teacher)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" sx={{ color: "#BC4749" }} onClick={() => handleDelete(teacher._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal onCancel={handleCloseModal} footer={null} open={visible}>
          <UserForm onSuccess={handleCloseModal} isEdit={selectedTeacher} initialValueProp={formValues} role="Teacher" />
        </Modal>
        <Modal onCancel={handleCloseModal} footer={null} open={newUserVisible}>
          <UserForm onSuccess={handleCloseModal} isEdit={false} initialValueProp={initialValues} role="Teacher" />
        </Modal>
      </div>
    </>
  );
};

export default TeacherList;
