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
import { candidateTableColoumn, jobTableColoumn } from "../constants/constant";
import "../../css/globals.css";

export default function InterviewerDashboard_copy() {
  const [jobsList, SetjobsList] = useState("");
  const [CandidateData, SetCandidateData] = useState("");
  const [candidateTablePage, setCandidateTablePage] = useState(0);
  const [jobListTablePage, setJobListTablePage] = useState(0);

  const candidateTableRowsPerPage = 1;
  const jobListTableRowsPerPage = 1;

  const handleCandidateTableChangePage = (event, newPage) => {
    setCandidateTablePage(newPage);
  };

  const handleJobListTableChangePage = (event, newPage) => {
    setJobListTablePage(newPage);
  };

  useEffect(() => {
    getcandData();

    getjobData();
  }, []);

  async function getjobData() {
    let url = `http://localhost:8080/job`;
    let response = await fetch(url);
    let data = await response.json();
    SetjobsList(data.result);
  }
  async function getcandData() {
    let data = {
      key:"assign",
      val:window.sessionStorage.getItem("userId")
      ? window.sessionStorage.getItem("userId")
      : ""
      
    };
    let url = `http://localhost:8080/candidate?q=${JSON.stringify(data)}`;

    let response = await fetch(url);
    let resData = await response.json();
    SetCandidateData(resData.result);
  }
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
              Job List
            </Typography>
          </Box>
          <Box className="candidate-table-box">
            <TableContainer sx={{ height: 390 }}>
              <Table stickyHeader aria-label="simple table" size="small">
                <TableHead>
                  <TableRow>
                    {jobTableColoumn.map((col, index) => (
                      <TableCell
                        sx={{ fontWeight: "bold" }}
                        key={index}
                        align="center"
                      >
                        {col.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobsList.length > 0 &&
                    jobsList
                      .slice(
                        jobListTablePage * jobListTableRowsPerPage,
                        jobListTablePage * jobListTableRowsPerPage +
                          jobListTableRowsPerPage
                      )
                      .map((job) => (
                        <TableRow
                          key={job.jobId}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{job.jobId}</TableCell>
                          <TableCell align="center">{job.jobName}</TableCell>
                          <TableCell align="center">
                            {job.job_location.join(", ")}
                          </TableCell>
                          <TableCell align="center">{job.role}</TableCell>
                          <TableCell align="center">
                            {job.grade.join(", ")}
                          </TableCell>
                          <TableCell align="center">
                            <Box className="joblist-action-buttons-box">
                              <Fab size="small" color="primary">
                                <AddIcon />{" "}
                              </Fab>
                              <Fab size="small" color="success">
                                <EditIcon />{" "}
                              </Fab>
                              <Fab size="small" color="secondary">
                                <DeleteIcon />{" "}
                              </Fab>
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
              count={jobsList.length}
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
        <Item elevation={5}>
          <Box className="candidate-list-box">
            <Typography sx={{ m: 1 }} variant="h4">
              Candidate List
            </Typography>
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
                        <TableCell align="center">{candidate.assign}</TableCell>
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
      </Grid>
    </Grid>
  );
}
