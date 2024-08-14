import { Box, Button, FormControlLabel, TextField, Checkbox } from "@mui/material";
import { Formik } from "formik";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const ClassroomForm = ({ onSuccess, isEdit, initialValueProp }) => {
  const [initials, setInitials] = useState(initialValueProp);
  useEffect(() => {
    setInitials(initialValueProp);
  }, [initialValueProp]);

  console.log(initials);
  const token = useSelector((state) => state.token);

  const handleCreate = async (values, onSubmitProps) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/classroom/create-classroom`,
      {
        ...values,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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

  const handleUpdate = async (values, onSubmitProps) => {
    const { data } = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/classroom/update-classroom/${isEdit}`,
      {
        ...values,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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
    <Formik onSubmit={handleFormSubmit} initialValues={initials}>
      {({ values, setFieldValue, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box display="grid" marginTop="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
            <TextField label="Class Name" onChange={(e) => setFieldValue("name", e.target.value)} value={values.name} name="name" sx={{ gridColumn: "span 4" }} />
          </Box>

          {days.map((day) => (
            <Box key={day} display="flex" justifyContent="space-between" alignItems="center" gap="50px" marginY="20px">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.daysInSession[day].selected}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setFieldValue(`daysInSession.${day}.selected`, isChecked);
                      if (!isChecked) {
                        setFieldValue(`daysInSession.${day}.startTime`, null);
                        setFieldValue(`daysInSession.${day}.endTime`, null);
                      }
                    }}
                  />
                }
                label={day}
              />

              <TimePicker.RangePicker
                value={
                  values.daysInSession[day].startTime && values.daysInSession[day].endTime
                    ? [dayjs().hour(values.daysInSession[day].startTime).minute(0), dayjs().hour(values.daysInSession[day].endTime).minute(0)]
                    : null
                }
                format="HH"
                onChange={(value) => {
                  if (value && value.length === 2) {
                    const startTime = value[0].hour();
                    const endTime = value[1].hour();
                    setFieldValue(`daysInSession.${day}.startTime`, startTime);
                    setFieldValue(`daysInSession.${day}.endTime`, endTime);
                  } else {
                    setFieldValue(`daysInSession.${day}.startTime`, null);
                    setFieldValue(`daysInSession.${day}.endTime`, null);
                  }
                }}
                style={{ width: "60%" }}
                disabled={!values.daysInSession[day].selected}
              />
            </Box>
          ))}

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

export default ClassroomForm;
