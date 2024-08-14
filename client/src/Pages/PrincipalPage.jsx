import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { Box, IconButton, Typography } from "@mui/material";
import TeacherList from "./../components/TeacherList";
import FlexBetween from "./../Layout/FlexBeteen";
import { useSelector } from "react-redux";
import ClassroomList from "./../components/ClassroomList";
import StudentList from "./../components/StudentList";

const PrincipalPage = () => {
  const token = useSelector((state) => state.token);

  return (
    <Layout>
      <Box width="50%" p="2rem" m="3rem auto" borderRadius="1.5rem" backgroundColor={"#F2E8CF"} boxShadow={"2px 2px 20px 1px"}>
        <TeacherList />
      </Box>
      <Box width="50%" p="2rem" m="3rem auto" borderRadius="1.5rem" backgroundColor={"#F2E8CF"} boxShadow={"2px 2px 20px 1px"}>
        <StudentList studentRole={false}/>
      </Box>
      <Box width="50%" p="2rem" m="3rem auto" borderRadius="1.5rem" backgroundColor={"#F2E8CF"} boxShadow={"2px 2px 20px 1px"}>
        <ClassroomList />
      </Box>
    </Layout>
  );
};

export default PrincipalPage;
