import { useState } from "react";
import PropTypes from "prop-types";
import { Form, FormikProvider, useFormik } from "formik";
// material
import {
  Box,
  Card,
  Checkbox,
  CardHeader,
  Typography,
  FormControlLabel,
  Stack
} from "@mui/material";

// ----------------------------------------------------------------------

const TASKS = [
  "Create FireStone Logo",
  "Add SCSS and JS files if required",
  "Stakeholder Meeting",
  "Scoping & Estimations",
  "Sprint Showcase"
];

// ----------------------------------------------------------------------

TaskItem.propTypes = {
  task: PropTypes.string,
  checked: PropTypes.bool,
  formik: PropTypes.object
};

function TaskItem({ task, checked, formik, ...other }) {
  const { getFieldProps } = formik;

  return (
    <Stack direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>
      <FormControlLabel
        control={
          <Checkbox
            {...getFieldProps("checked")}
            value={task}
            checked={checked}
            {...other}
          />
        }
        label={
          <Typography
            variant="body2"
            sx={{
              ...(checked && {
                color: "text.disabled",
                textDecoration: "line-through"
              })
            }}
          >
            {task}
          </Typography>
        }
      />
    </Stack>
  );
}

export default function AppTasks() {
  const formik = useFormik({
    initialValues: {
      checked: [TASKS[2]]
    },
    onSubmit: (values) => {}
  });

  const { values, handleSubmit } = formik;
  const [inputs, setInput] = useState("");
  const [tasks, setTasks] = useState(TASKS);
  const addTask = () => {
    if (!inputs || /^\s*$/.test(inputs)) {
      alert("Task cannot be empty!");
    } else {
      setTasks([...tasks, inputs]);
      setInput("");
    }
  };

  return (
    <Card>
      <CardHeader title="Tasks" />
      <Box sx={{ px: 3, py: 1 }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={inputs}
            />
            <button type="button" onClick={addTask}>
              Submit
            </button>
            {tasks.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                formik={formik}
                checked={values.checked.includes(task)}
              />
            ))}
          </Form>
        </FormikProvider>
      </Box>
    </Card>
  );
}
