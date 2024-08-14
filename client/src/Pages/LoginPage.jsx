import { Box, Typography } from "@mui/material";
import Layout from "../Layout/Layout";
import LoginForm from "../components/LoginForm"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(`/${user.role.toLowerCase()}`);
    }
  });

  return (
    <Layout>
      <Box width="50%" p="3rem" m="3rem auto" borderRadius="1.5rem" backgroundColor={"#F2E8CF"} boxShadow={"2px 2px 20px 1px"}>
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to The Classroom App
        </Typography>
        <LoginForm />
      </Box>
    </Layout>
  );
};

export default LoginPage;
