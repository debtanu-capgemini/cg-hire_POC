import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Grid,
  Typography,
  Box,
  TablePagination,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fab,
} from "@mui/material";
import { Item } from "../CustomMUIComponent/CustomMUIComponent";
import { interviewStatusColoum, jobTableColoumn } from "../constants/constant";
import "../../css/globals.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import StartIcon from "@mui/icons-material/Start";
import Tooltip from "@mui/material/Tooltip";
import { Visibility } from "@material-ui/icons";

export default function InterviewerDashboard() {
  const { id } = useParams();
  // const [editData, setEditData] = useState("");
  const [jobsList, SetjobsList] = useState("");
  const [pendingCandidate, SetPendingCandidate] = useState("");
  const [completeCandidate, setCompleteCandidate] = useState("");
  const [candidateTablePage, setCandidateTablePage] = useState(0);
  const [jobListTablePage, setJobListTablePage] = useState(0);
  const navigate = useNavigate();
  const candidateTableRowsPerPage = 5;
  const jobListTableRowsPerPage = 5;

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

  const handleJobListTableChangePage = (event, newPage) => {
    setJobListTablePage(newPage);
  };

  useEffect(() => {
    getcandData();
    getjobData();
  }, []);

  // async function getEditData() {
  //   let obj = {
  //     key: "id",
  //     val: parseInt(id),
  //   };
  //   let url = `http://localhost:8080/candidate?q=${JSON.stringify(obj)}`;

  //   let response = await fetch(url);
  //   let data = await response.json();

  //   setEditData(data.result[0]);
  // }

  async function getjobData() {
    let url = `http://localhost:8080/job`;
    let response = await fetch(url);
    let data = await response.json();
    SetjobsList(data.result);
  }
  async function getcandData() {
    // let data = {
    //   assign: window.sessionStorage.getItem("userId")
    //     ? window.sessionStorage.getItem("userId")
    //     : "",
    // };
    let data = {
      key: "assign",
      val: window.sessionStorage.getItem("userId")
        ? window.sessionStorage.getItem("userId")
        : "",
    };
    let url = `http://localhost:8080/candidate?q=${JSON.stringify(data)}`;

    let response = await fetch(url);
    let resData = await response.json();
    console.log(resData.status, "resdata");

    let pendingCandidate = resData.result.filter(({ status }) => status === 0);
    console.log(pendingCandidate, "filterData");
    SetPendingCandidate(pendingCandidate);

    let completeCandidate = resData.result.filter(({ status }) => status === 1);
    console.log(completeCandidate, "filterData1");
    setCompleteCandidate(completeCandidate);
  }
  const getStatus = (status) => {
    if (status === 1) return "Done";
  };
  const editFeedback = async (userid) => {
    console.log(userid);
    navigate(`/feedback_/${userid}`);
  };
  const viewFeedback = async (userid) => {
    console.log(userid);
    navigate(`/feedback/view/${userid}`);
  };
  const updateFeedback = async (userid) => {
    console.log(userid);
    navigate(`/feedback/${userid}`);
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
      <Grid item xs={12}>
        <Item elevation={5}>
          <Box className="candidate-list-box">
            <Typography sx={{ m: 1 }} variant="h4">
              Ongoing Interview
            </Typography>
          </Box>
          <Box className="candidate-table-box">
            <TableContainer sx={{ height: 330 }}>
              <Table stickyHeader aria-label="simple table" size="small">
                <TableHead>
                  {pendingCandidate.length > 0 ? (
                    <TableRow>
                      {jobTableColoumn.map((col, index) => (
                        <TableCell
                          sx={{ fontWeight: "bold" }}
                          key={index}
                          align="left"
                        >
                          {col.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  ) : (
                    <h1>No pending Interview</h1>
                  )}
                </TableHead>
                <TableBody>
                  {pendingCandidate.length > 0 &&
                    pendingCandidate
                      .slice(
                        candidateTablePage * candidateTableRowsPerPage,
                        candidateTablePage * candidateTableRowsPerPage +
                          candidateTableRowsPerPage
                      )
                      .map((candidate, index) => (
                        <TableRow
                          key={candidate.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left">{index + 1}</TableCell>
                          <TableCell align="left">
                            {candidate.position}
                          </TableCell>
                          <TableCell align="left">
                            {upperCase(`${candidate.fname} ${candidate.lName}`)}{" "}
                          </TableCell>
                          <TableCell align="left">
                            {candidate.experience}
                          </TableCell>
                          <TableCell align="left">{candidate.skill}</TableCell>
                          <TableCell align="left">{candidate.interviewDate}</TableCell>
                          <TableCell align="left">{"SLOT"}</TableCell>
                          <TableCell align="left">
                            <Box className="joblist-action-buttons-box">
                              {candidate.ratingScale == "" ? (
                                <Fab size="small" color="primary">
                                  <Tooltip title="Start Interview">
                                    <StartIcon
                                      onClick={() => editFeedback(candidate.id)}
                                    />
                                  </Tooltip>{" "}
                                </Fab>
                              ) : (
                                <Fab size="small" color="primary" disabled>
                                  <Tooltip title="Interview completed">
                                    <StartIcon
                                      onClick={() => editFeedback(candidate.id)}
                                    />
                                  </Tooltip>{" "}
                                </Fab>
                              )}

                              {/* <Fab size="small" color="success">
                                <EditIcon onClick={()=> updateFeedback(candidate.id)} />{" "}
                              </Fab> */}
                              {/* <Fab size="small" color="secondary">
                                <DeleteIcon />{" "}
                              </Fab> */}
                            </Box>
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
              count={pendingCandidate.length}
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
          <Box className="candidate-list-box">
            <Typography sx={{ m: 1 }} variant="h4">
              Interview Status
            </Typography>
          </Box>
          <Box className="candidate-table-box">
            <TableContainer sx={{ height: 390 }}>
              <Table stickyHeader aria-label="simple table" size="small">
                <TableHead>
                  <TableRow>
                    {interviewStatusColoum.map((col, index) => (
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
                  {completeCandidate.length > 0 &&
                    completeCandidate
                      .slice(
                        jobListTablePage * jobListTableRowsPerPage,
                        jobListTablePage * jobListTableRowsPerPage +
                          jobListTableRowsPerPage
                      )
                      .map((candidate, index) => (
                        <TableRow
                          key={candidate.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left">{index + 1}</TableCell>
                          <TableCell align="left">
                            {candidate.position}
                          </TableCell>
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
                          <TableCell align="left">
                            {getStatus(candidate.status)}
                          </TableCell>
                          <TableCell align="left">
                            <Button onClick={() => viewFeedback(candidate.id)}>
                              <Visibility />
                            </Button>
                          </TableCell>
                          {/* <TableCell align="center">{candidate.assign}</TableCell> */}
                          {/* <TableCell align="center">
                          <Button size="small" variant="contained">
                            Edit
                          </Button>
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
              count={completeCandidate.length}
              rowsPerPage={jobListTableRowsPerPage}
              page={jobListTablePage}
              onPageChange={handleJobListTableChangePage}
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
