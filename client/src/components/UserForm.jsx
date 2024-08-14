import { Box, Button, FormControl, InputLabel, TextField, Checkbox, Select, MenuItem } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

const UserForm = ({ onSuccess, isEdit, initialValueProp, role }) => {
  const token = useSelector((state) => state.token);
  const [classrooms, setClassrooms] = useState([]);
  const [initials, setInitials] = useState({ ...initialValueProp, password: "" });
  useEffect(() => {
    setInitials({ ...initialValueProp, password: "" });
  }, [initialValueProp]);
  //get all classrooms
  const getAllClassrooms = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/classroom/all-classrooms`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setClassrooms(data.classrooms);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting classrooms");
    }
  };
  useEffect(() => {
    getAllClassrooms();
  }, []);

  //create-user
  const handleCreate = async (values, onSubmitProps) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
      {
        ...values,
        role,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (data.success && values.classroom) {
      const { response } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/classroom/assign-user/${values.classroom}`,
        {
          userId: data.user._id,
          role,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    onSubmitProps.resetForm();
    if (data && data.success) {
      toast.success(data.message);
      if (onSuccess) {
        onSuccess();
      }
    } else {
      toast.error(data.message);
    }
  };

  //update-user
  const handleUpdate = async (values, onSubmitProps) => {
    const { data } = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/auth/update-user/${isEdit}`,
      {
        ...values,
        role,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (data.success && values.classroom) {
      const { response } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/classroom/assign-user/${values.classroom}`,
        {
          userId: data.user._id,
          role,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
    onSubmitProps.resetForm();
    if (data && data.success) {
      toast.success(data.message);
      if (onSuccess) {
        onSuccess();
      }
    } else {
      toast.error(data.message);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isEdit) await handleUpdate(values, onSubmitProps);
    else await handleCreate(values, onSubmitProps);
  };

  return (
    <Formik initialValues={initials} onSubmit={handleFormSubmit}>
      {({ values, handleChange, handleBlur, setFieldValue, handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <Box display="grid" marginTop="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
            <TextField label="Name" onChange={(e) => setFieldValue("name", e.target.value)} value={values.name} name="name" sx={{ gridColumn: "span 4" }} />
          </Box>
          <Box display="grid" marginTop="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
            <TextField label="Email" onChange={(e) => setFieldValue("email", e.target.value)} value={values.email} name="email" sx={{ gridColumn: "span 4" }} />
          </Box>
          <Box display="grid" marginTop="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
            <TextField label="Password" onChange={(e) => setFieldValue("password", e.target.value)} value={values.password} name="password" sx={{ gridColumn: "span 4" }} />
          </Box>
          <div>
            <FormControl fullWidth margin="normal">
              <InputLabel id="classroom-select-label">Classroom</InputLabel>
              <Select
                labelId="classroom-select-label"
                name="classroom"
                value={values.classroom}
                onChange={(e) => setFieldValue("classroom", e.target.value)}
                onBlur={handleBlur}
                label="Classroom"
                error={touched.classroom && Boolean(errors.classroom)}>
                {classrooms.map(
                  (cls) =>
                    (role == "Student" || !cls.teacher) && (
                      <MenuItem key={cls._id} value={cls._id}>
                        {cls.name}
                      </MenuItem>
                    )
                )}
              </Select>
              {touched.classroom && errors.classroom && <div style={{ color: "red", marginTop: "0.5rem" }}>{errors.classroom}</div>}
            </FormControl>
          </div>
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                p: "1rem",
                backgroundColor: "#335C3A",
                color: "white",
                "&:hover": { backgroundColor: "#61A86D" },
              }}>
              {isEdit ? "Edit" : "Submit"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default UserForm;
