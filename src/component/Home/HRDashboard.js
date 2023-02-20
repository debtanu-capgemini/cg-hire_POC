import * as React from "react";
import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  TablePagination,
  InputLabel,
  Button,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  Snackbar,
  Fab,
  TextField,
  Popover,
} from "@mui/material";
import { Budget } from "./budget";
import { TotalCustomers } from "./total-customers";
import { TasksProgress } from "./tasks-progress";
import { TotalInterviewer } from "./total-interviewer";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import MuiAlert from "@mui/material/Alert";
import {
  Item,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../CustomMUIComponent/CustomMUIComponent";
import "../../css/globals.css";
import {
  candidateTableColoumn,
  interviewerTableColoumn,
} from "../constants/constant";
import Modal from "@mui/material/Modal";
import ApplicantCreateForm from "../Candidate/ApplicantCreateForm";
import Visibility from "@material-ui/icons/Visibility";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import IconButton from "@material-ui/core/IconButton";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AssignmentIndOutlined } from "@mui/icons-material";
import AssignPanellist from "../Candidate/AssignPanellist";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const timeSlot = [
  {
    value: "09:00AM - 10:00AM",
    label: "09:00AM - 10:00AM",
  },
  {
    value: "10:00AM - 11:00AM",
    label: "10:00AM - 11:00AM",
  },
  {
    value: "11:00AM - 12:00PM",
    label: "11:00AM - 12:00PM",
  },
  {
    value: "12:00PM - 01:00PM",
    label: "12:00PM - 01:00PM",
  },
  {
    value: "01:00PAM - 02:00PM",
    label: "01:00PAM - 02:00PM",
  },
  {
    value: "02:00PAM - 03:00PM",
    label: "02:00PAM - 03:00PM",
  },
];

let cgUserDataOriginal;

export default function HRDashboard() {
  const [CandidateData, SetCandidateData] = useState("");
  const [CgUserData, SetCgUserData] = useState("");
  const [open, setOpen] = useState(false);
  const [msg, setmsg] = useState("");
  const [candidateTablePage, setCandidateTablePage] = React.useState(0);
  const [interviewerTablePage, setInterviewerTablePage] = React.useState(0);
  const [searchText, setSearchText] = useState("");
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState("");
  const handleOpen = () => setModal(true);
  const candidateTableRowsPerPage = 5;
  const interviewerTableRowsPerPage = 1;
  const navigate = useNavigate();

  const [assignOpen, setAssignOpen] = useState(false);
  const handleAssignOpen = () => setAssignOpen(true);
  const handleAssignClose = () => setAssignOpen(false);

  const handleCandidateTableChangePage = (event, newPage) => {
    setCandidateTablePage(newPage);
  };

  function upperCase(str) {
    const titleCase = str
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");

    return titleCase;
  }

  const handleInterviewerTableChangePage = (event, newPage) => {
    setInterviewerTablePage(newPage);
  };

  const onSearchTextChangeHandler = (e) => {
    setSearchText(e.target.value);
    console.log("e value", e.target.value);
    if (e.target.value) {
      console.log("inside if");
      const filteredRows = cgUserDataOriginal.filter((cguser, index) => {
        let cgProfile = cguser.profile;
        if (
          cgProfile.propername
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          cgProfile.email.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return cgProfile;
        }
      });
      SetCgUserData(filteredRows);
      handleInterviewerTableChangePage(e, 0);
    } else {
      SetCgUserData(cgUserDataOriginal);
    }
  };

  const handleChange = (e) => {
    let candId = e.target.name;
    let interViewerId = e.target.value;
    console.log(e.target.name, "value1");
    const filteredRows = CandidateData.map((can) => {
      if (can.id == candId) {
        can.assign = interViewerId;
      }
      return can;
    });

    SetCandidateData(filteredRows);

    async function putData() {
      // let url = "http://localhost:8080/candidate";
      let searchData = { key: "id", val: Number(candId) };
      let url = `http://localhost:8080/candidate?q=${JSON.stringify(
        searchData
      )}`;
      let data = { assign: interViewerId };
      console.log(url, "url11");
      console.log(JSON.stringify(data), "json11111");
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      if (resData) {
        setOpen(true);
        setmsg("Successfully Assigned Panellist");
      }
    }
    putData();
  };

  const handleDateChange = (e, index) => {
    let candId = e.target.name;
    let interviewDate = e.target.value;
   
    const filteredRows = CandidateData.map((can) => {
      if (can.id == candId) {
        can.interviewDate = interviewDate;
      }
      return can;
    });

    SetCandidateData(filteredRows);

    async function datePutData() {
      // let url = "http://localhost:8080/candidate";
      let searchData = { key: "id", val: Number(candId) };
      let url = `http://localhost:8080/candidate?q=${JSON.stringify(
        searchData
      )}`;
      let data = { interviewDate: interviewDate };
      console.log(url, "url11");
      console.log(JSON.stringify(data), "json11111");
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      if (resData) {
        setOpen(true);
        setmsg("Successfully Assigned Date");
      }
    }
    datePutData();
  };

  useEffect(() => {
    getcandData();
    getcgUserData();
  }, []);

  async function getcandData() {
    let url = `http://localhost:8080/candidate`;
    let response = await fetch(url);
    let data = await response.json();
    SetCandidateData(data.result);
  }

  async function getcgUserData() {
    let url = `http://localhost:8080/cg_user`;
    let response = await fetch(url);
    let data = await response.json();
    SetCgUserData(data.result);
    cgUserDataOriginal = data.result;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setModal(false);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const editApplicant = async (userid) => {
    console.log(userid);
    localStorage.removeItem("activeStep");
    navigate(`/profile/${userid}`);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        mt: 1,
        p: 2,
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={4000}
        onClose={handleSnackClose}
      >
        <MuiAlert variant="filled" severity="success" sx={{ width: "100%" }}>
          {msg}
        </MuiAlert>
      </Snackbar>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <Budget />
      </Grid>
      <Grid item xl={3} lg={3} sm={6} xs={12}>
        <TotalCustomers />
      </Grid>
      <Grid item xl={3} lg={3} sm={6} xs={12}>
        <TasksProgress />
      </Grid>
      <Grid item xl={3} lg={3} sm={6} xs={12}>
        <TotalInterviewer />
      </Grid>
      <Grid item xs={12}>
        <Item elevation={5}>
          <Box className="candidate-list-box">
            <Typography sx={{ m: 1 }} variant="h4">
              Candidate List
            </Typography>
            <Box sx={{ m: 1 }}>
              <Button
                startIcon={<DownloadIcon fontSize="small" />}
                sx={{ mr: 1 }}
                size="small"
                variant="outlined"
              >
                Export
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={handleOpen}
              >
                <GroupAddOutlinedIcon sx={{ pr: 1 }} />
                Add Candidate
              </Button>

              <Modal
                open={modal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-description">
                    <div className="modal-size">
                      <ApplicantCreateForm />

                      {/* <Signup /> */}

                      {/* <CandidateCreateForm /> */}
                      <Button className="close-button" onClick={handleClose}>
                        Close
                      </Button>
                    </div>
                  </Typography>
                </Box>
              </Modal>
            </Box>
          </Box>
          <Box className="candidate-table-box">
            <TableContainer sx={{ height: 390 }}>
              <Table stickyHeader aria-label="simple table" size="small">
                <TableHead>
                  <TableRow>
                    {candidateTableColoumn.map((col, index) => (
                      <TableCell
                        sx={{ fontWeight: "bold" }}
                        key={index}
                        width={col.width}
                        align="left"
                      >
                        {col.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {CandidateData.length > 0 &&
                    CandidateData.slice(
                      candidateTablePage * candidateTableRowsPerPage,
                      candidateTablePage * candidateTableRowsPerPage +
                        candidateTableRowsPerPage
                    ).map((candidate, index) => (
                      <TableRow
                        key={candidate.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{candidate.position}</TableCell>
                        <TableCell align="left">
                          {upperCase(`${candidate.fname} ${candidate.lName}`)}
                        </TableCell>
                        <TableCell align="left">
                          {candidate.experience}
                        </TableCell>
                        <TableCell align="left">{candidate.skill}</TableCell>
                        <TableCell align="left">
                          {upperCase(`${candidate.location}`)}
                        </TableCell>
                        <TableCell align="left">{candidate.status}</TableCell>
                        <TableCell align="left">
                          <FormControl
                            size="small"
                            sx={{ mt: 1, mb: 1, minWidth: 120, width: 150 }}
                            align="left"
                          >
                            <InputLabel>Assign To</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              value={candidate.assign ? candidate.assign : 0}
                              label="Assign To"
                              onChange={handleChange}
                              name={candidate.id.toString()}
                            >
                              <MenuItem value={0}>Select Interviewer</MenuItem>
                              {CgUserData.length > 0 &&
                                CgUserData.map((cguser) => (
                                  <MenuItem
                                    value={cguser.profile.userid}
                                    key={cguser.profile.userid}
                                  >
                                    {cguser.profile.propername}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align="left">
                          <FormControl
                            size="small"
                            // sx={{ mt: 1, mb: 1, minWidth: 120, width: 150 }}
                            align="left"
                          >
                            {/* <InputLabel>Assign Date</InputLabel> */}
                            <TextField
                              id="date"
                              className="datePicker"
                              label="Select Date"
                              name={candidate.id.toString()}
                              type="date"
                              onChange={handleDateChange}
                              value={
                                candidate.interviewDate
                                  ? candidate.interviewDate
                                  : 0
                              }
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </FormControl>
                        </TableCell>

                        <TableCell align="left">
                          <FormControl
                            size="small"
                            sx={{ mt: 1, mb: 1, minWidth: 120, width: 150 }}
                            align="left"
                          >
                            <InputLabel>Time Slots</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              value={
                                candidate.timeSlot ? candidate.timeSlot : 0
                              }
                              label="Time Slots"
                              onChange={handleChange}
                              name="timeSlot"
                            >
                              <MenuItem disabled value={0}>
                                Time Slots
                              </MenuItem>
                              {timeSlot.length > 0 &&
                                timeSlot.map((slot) => (
                                  <MenuItem value={slot.value} key={slot.value}>
                                    {slot.label}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => editApplicant(candidate.id)}
                            // onClick={()=> editApplicant(candidate.idNumber)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            onClick={() => editApplicant(candidate.idNumber)}
                          >
                            <Visibility />
                          </Button>
                        </TableCell>

                        {/* assign modal start here */}

                        {/* <TableCell align="left">
                          <FormControl
                            size="small"
                            // sx={{ mt: 1, mb: 1, minWidth: 120, width: 150 }}
                            align="left"
                          >
                            <Button
                              color="secondary"
                              variant="contained"
                              size="medium"
                              onClick={handleAssignOpen}
                            >
                              <AssignmentIndOutlined sx={{ pr: 1 }} />
                              Assign
                            </Button>
                            <Modal
                              id="id"
                              open={assignOpen}
                              onClose={handleAssignClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style}>
                                <Typography id="modal-modal-description">
                                  <div className="modal-size">
                                    <AssignPanellist 
                                    edit={candidate}
                                    Candid={candidate.id} />
                                   
                                  </div>
                                </Typography>
                              </Box>
                            </Modal>
                          </FormControl>
                        </TableCell> */}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage=""
              rowsPerPageOptions={[]}
              component="div"
              count={CandidateData.length}
              rowsPerPage={candidateTableRowsPerPage}
              page={candidateTablePage}
              onPageChange={handleCandidateTableChangePage}
              sx={{
                mr: 2,
                "& p": {
                  m: 0,
                },
              }}
            />
          </Box>
        </Item>
        <Item elevation={5}>
          <Box className="interviewer-list-box">
            <Typography sx={{ m: 1 }} variant="h4">
              Interviewer List
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchText}
                onChange={onSearchTextChangeHandler}
              />
            </Search>
          </Box>
          <Box className="candidate-table-box">
            <TableContainer sx={{ height: 390 }}>
              <Table
                stickyHeader
                aria-label="simple table"
                sx={{ width: "1200px" }}
              >
                <TableHead>
                  <TableRow>
                    {interviewerTableColoumn.map((col, index) => (
                      <TableCell
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                        key={index}
                        align="left"
                      >
                        {col.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {CgUserData.length > 0 &&
                    CgUserData.slice(
                      interviewerTablePage * interviewerTableRowsPerPage,
                      interviewerTablePage * interviewerTableRowsPerPage +
                        interviewerTableRowsPerPage
                    ).map((cguser) => (
                      <TableRow
                        key={cguser.profile.userid}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">
                          {cguser.profile.propername}
                        </TableCell>
                        <TableCell align="left">
                          {cguser.profile.userid}
                        </TableCell>
                        <TableCell align="left">
                          {cguser.profile.role}
                        </TableCell>
                        <TableCell align="left">
                          {cguser.profile.email}
                        </TableCell>
                        <TableCell align="left">
                          {cguser.profile.language}
                        </TableCell>

                        <TableCell align="left">
                          {cguser.profile.usertimezoneid}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage=""
              rowsPerPageOptions={[]}
              component="div"
              count={CgUserData.length}
              rowsPerPage={interviewerTableRowsPerPage}
              page={interviewerTablePage}
              onPageChange={handleInterviewerTableChangePage}
              sx={{
                mr: 2,
                "& p": {
                  m: 0,
                },
              }}
            />
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
}
