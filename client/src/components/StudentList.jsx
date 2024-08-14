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

const StudentList = ({ studentRole }) => {
  const [students, setStudents] = useState([]);
  const token = useSelector((state) => state.token);
  const [visible, setVisible] = useState(false);
  const [newUserVisible, setNewUserVisible] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [selectedStudent, setSelectedStudent] = useState(null);

  //get all students
  const getStudents = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/all-students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  //update user
  const handleEdit = (student) => {
    setSelectedStudent(student._id);
    setFormValues({
      name: student.name,
      email: student.email,
      password: student.password,
      classroom: student.classroom.name || "",
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

        getStudents();
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
    setSelectedStudent(null);
  };

  return (
    <>
      <div>
        <FlexBetween>
          <Typography fontWeight="500" variant="h5">
            Students List
          </Typography>
          <IconButton aria-label="add-teacher" onClick={() => setNewUserVisible(true)}>
            <Add />
          </IconButton>
        </FlexBetween>
      </div>
      <div>
        <TableContainer sx={{ backgroundColor: "#f2e8cf" }}>
          <Table sx={{ minWidth: 650 }} aria-label="student table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Classroom Assigned</TableCell>
                {!studentRole && <TableCell align="right">Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, i) => (
                <TableRow key={student._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell align="right">{student.email}</TableCell>
                  <TableCell align="right">{student.classroom.name || "Not Assigned"}</TableCell>
                  {!studentRole && (
                    <TableCell align="right">
                      <IconButton aria-label="edit" onClick={() => handleEdit(student)}>
                        <Edit />
                      </IconButton>
                      <IconButton aria-label="delete" sx={{ color: "#BC4749" }} onClick={() => handleDelete(student._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal onCancel={handleCloseModal} footer={null} open={visible}>
          <UserForm onSuccess={handleCloseModal} isEdit={selectedStudent} initialValueProp={formValues} role="Student" />
        </Modal>
        <Modal onCancel={handleCloseModal} footer={null} open={newUserVisible}>
          <UserForm onSuccess={handleCloseModal} isEdit={false} initialValueProp={initialValues} role="Student" />
        </Modal>
      </div>
    </>
  );
};

export default StudentList;
