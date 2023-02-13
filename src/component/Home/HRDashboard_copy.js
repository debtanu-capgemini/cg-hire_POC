import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, Typography, Box, TablePagination } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Budget } from "./budget";
import { TotalCustomers } from "./total-customers";
import { TasksProgress } from "./tasks-progress";
import { TotalInterviewer } from "./total-interviewer";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "../../css/globals.css";
import Modal from '@mui/material/Modal';
import ApplicantCreateForm  from "../Candidate/ApplicantCreateForm";


const candidateTableColoumn = [
  { label: "No", width: "5%" },
  { label: "Job ID", width: "20%" },
  { label: "Name", width: "15%" },
  { label: "Experience", width: "5%" },
  { label: "Skill", width: "5%" },
  { label: "Location", width: "10%" },
  { label: "Status", width: "5%" },
  { label: "Assign To", width: "20%" },
  { label: "Action", width: "15%" },
];

const interviewerTableColoumn = [
  { label: "Name" },
  { label: "Emp ID" },
  { label: "Proper Name" },
  { label: "Role" },
  { label: "Email" },
  { label: "Language" },
  { label: "No" },
  { label: "User Time zone" },
  { label: "Istrl" },
  { label: "fedusername" },
  { label: "useridhash" },
  { label: "wfmuser" },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  border: "1px solid blue",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));


const style = (theme) => ({ 
position: 'absolute', 
top: '50%', 
left: '50%', 
transform: 'translate(-50%, -50%)',
width:'75%',
 bgcolor: 'background.paper', 
 border: '2px solid #000', 
 boxShadow: 24, p: 4,
 [theme.breakpoints.down('md')]: {
  overflow: "scroll",
  height:600
},
});

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
  const handleOpen = () => setModal(true);
  const candidateTableRowsPerPage = 5;
  const interviewerTableRowsPerPage = 1;

  const handleCandidateTableChangePage = (event, newPage) => {
    setCandidateTablePage(newPage);
  };

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
    const filteredRows = CandidateData.map((can) => {
      if (can.id == candId) {
        can.assign = interViewerId;
      }
      return can;
    });

    SetCandidateData(filteredRows);

    async function putData() {
      let url = "http://localhost:8080/candidate";
      let data = {
        assign: interViewerId,
        candId: candId,
      };
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
        setmsg("Successfully Assigned");
      }
    }
    putData();
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
    setOpen(false);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        mt: 2,
        p: 2,
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
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
              <Button color="primary" variant="contained" size="small" onClick={handleOpen}>
                Add Candidate
              </Button>

              <Modal

        open={modal}

        onClose={handleClose}

        aria-labelledby="modal-modal-title"

        aria-describedby="modal-modal-description"

      >

        <Box sx={style}>

          

            <div className="modal-size">

              <ApplicantCreateForm />

             

            </div>

         

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
                        align="center"
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
                    ).map((candidate) => (
                      <TableRow
                        key={candidate.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{candidate.id}</TableCell>
                        <TableCell align="center">
                          {candidate.position}
                        </TableCell>
                        <TableCell align="center">{candidate.fname}</TableCell>
                        <TableCell align="center">
                          {candidate.experience}
                        </TableCell>
                        <TableCell align="center">{candidate.skill}</TableCell>
                        <TableCell align="center">
                          {candidate.location}
                        </TableCell>
                        <TableCell align="center">{candidate.status}</TableCell>
                        <TableCell align="center">
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
                              <MenuItem value={0} disabled>Select Interviewer</MenuItem>
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
                        <TableCell align="center">
                          <Button size="small" variant="contained">
                            Edit
                          </Button>
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
                        align="center"
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
                        <TableCell align="center">
                          {cguser.profile.userid}
                        </TableCell>
                        <TableCell align="center">
                          {cguser.profile.userid}
                        </TableCell>
                        <TableCell align="center">
                          {cguser.profile.propername}
                        </TableCell>
                        <TableCell align="center">
                          {cguser.profile.role}
                        </TableCell>
                        <TableCell align="center">
                          {cguser.profile.email}
                        </TableCell>
                        <TableCell align="center">
                          {cguser.profile.language}
                        </TableCell>
                        <TableCell align="center">
                          {cguser.profile.userid}
                        </TableCell>
                        <TableCell align="center">
                          {cguser.profile.usertimezoneid}
                        </TableCell>
                        <TableCell align="center">
                          {cguser.profile.isrtl}
                        </TableCell>
                        <TableCell align="center">
                          {cguser.profile.userid}
                        </TableCell>
                        <TableCell align="center">
                          {cguser.profile.useridhash}
                        </TableCell>
                        <TableCell align="center">
                          {cguser.profile.wfmuser}
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
