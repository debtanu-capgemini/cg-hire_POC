import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "../css/Login.module.css";
import logo from "../img/Capgemini_Logo.png";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Login(props) {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const [loginError, setloginError] = React.useState();
  const validationSchema = Yup.object({
    userid: Yup.string().max(255).required("UserId is required"),
    password: Yup.string().max(255).required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      userid: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let userCred={
        userid:values.userid,
        pwd:values.password,
        role:value
       
      };
      async function loginUser(credentials) {
    let url = `http://localhost:8080/login/${JSON.stringify(credentials)}`;
    let response = await fetch(url);
    let data = await response.json();

    if (Object.keys(data).length > 0) {
      window.sessionStorage.setItem("role", value === 1 ? "Portal User" : "HR");
      window.sessionStorage.setItem("userId", values.userid);
      navigate("/dashboard");
    } else {
      setloginError("*wrong userid or pwd");
      
    }
  }
      loginUser(userCred);

    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setloginError('');
  };
  

  const tabs = [
    {
      label: "Hr Team",
      Component: [
        <TextField
          variant="outlined"
          size="small"
          sx={{ p: 1, mb: 2 }}
          placeholder="employee id"
          fullWidth
          key="1"
          error={Boolean(formik.touched.userid && formik.errors.userid) }
          helperText={formik.touched.userid && formik.errors.userid}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userid}
          name="userid"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />,

        <TextField
          type="password"
          size="small"
          variant="outlined"
          sx={{ p: 1, mt: 1 }}
          placeholder="password"
          fullWidth
          key="2"
          name="password"
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />,
      ],
    },
    {
      label: "Interviewer",
      Component: [
        <TextField
          variant="outlined"
          size="small"
          sx={{ p: 1, mb: 2 }}
          placeholder="employee id"
          fullWidth
          key="3"
          error={Boolean(formik.touched.userid && formik.errors.userid)}
          helperText={formik.touched.userid && formik.errors.userid}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userid}
          name="userid"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />,
        <TextField
          type="password"
          size="small"
          variant="outlined"
          sx={{ p: 1, mt: 1 }}
          placeholder="password"
          fullWidth
          key="4"
          name="password"
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />,
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <form onSubmit={formik.handleSubmit}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            {tabs.map(({ label }, i) => (
              <Tab label={label} key={i} />
            ))}
          </Tabs>

          <img src={logo} alt="logo" className={styles.logoimg}></img>

          {tabs.map(({ Component }, i) => (
            <TabPanel value={value} index={i} key={i}>
              {Component}
            </TabPanel>
          ))}
        {loginError? <span className={styles.errMsg}>{loginError}</span>:''}
          <div className={styles.btnanimate}>
            <button className={styles.btnsignin} type="submit">
              Login to your account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
