import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Box, IconButton, Typography, CircularProgress } from "@mui/material";
import FlexBetween from "./../Layout/FlexBeteen";
import { useSelector } from "react-redux";
import ClassroomList from "../components/classroomList";
import StudentList from "./../components/StudentList";
import axios from "axios";

const TeacherPage = () => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  return (
    <Layout>
      <Box width="50%" p="2rem" m="3rem auto" borderRadius="1.5rem" backgroundColor={"#F2E8CF"} boxShadow={"2px 2px 20px 1px"}>
        {user ? <Typography variant="h5">Welcome {user.name}</Typography> : <Typography variant="h5">Loading user data...</Typography>}
      </Box>
      <Box width="50%" p="2rem" m="3rem auto" borderRadius="1.5rem" backgroundColor={"#F2E8CF"} boxShadow={"2px 2px 20px 1px"}>
        <StudentList studentRole={false} />
      </Box>
      <Box width="50%" p="2rem" m="3rem auto" borderRadius="1.5rem" backgroundColor={"#F2E8CF"} boxShadow={"2px 2px 20px 1px"}>
        You are assigned Class {user.classroom.name}
      </Box>
    </Layout>
  );
};

export default TeacherPage;
