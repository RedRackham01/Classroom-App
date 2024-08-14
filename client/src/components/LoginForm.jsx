import { Box, Button, FormControl, InputLabel, TextField, Typography, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import axios from "axios";
import toast from "react-hot-toast";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  role: yup.string().required("required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
  role: "",
};

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
      ...values,
    });
    const loggedIn = await loggedInResponse.data;
    onSubmitProps.resetForm();
    if (loggedIn && loggedIn.success) {
      toast.success(loggedIn.message);
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate(`/${loggedIn.user.role.toLowerCase()}`);
    } else {
      toast.error(loggedIn.message);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValuesLogin} validationSchema={loginSchema}>
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm }) => (
        <form onSubmit={handleSubmit}>
          <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            <Box display="flex" alignItems="center" sx={{ minWidth: 250 }}>
              <FormControl fullWidth>
                <InputLabel id="role">Role</InputLabel>
                <Select labelId="role" id="role" label="Role" name="role" value={values.role} onChange={(event) => setFieldValue("role", event.target.value)}>
                  <MenuItem value={"Principal"}>Principal</MenuItem>
                  <MenuItem value={"Teacher"}>Teacher</MenuItem>
                  <MenuItem value={"Student"}>Student</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: "#335C3A",
                color: "white",
                "&:hover": { backgroundColor: "#61A86D" },
              }}>
              Login
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
