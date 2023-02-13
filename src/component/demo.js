import  '../../css/globals.css';
import {useState, useEffect} from 'react';
export default function Dashboard(){
const [CandidateData,SetCandidateData] = useState('');
const [CgUserData,SetCgUserData] = useState('');

useEffect(()=>{
    
       getcandData();
       getcgUserData();
},[])


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
   }

  

    

   
    return (
        <div className="hr-dashboard-container container">
             
            <button className="create-candidate-btn btn btn-primary"> Create Candidate</button>
          
        <div className="candidate-section">
         
          <div className="candidates-list overflow-auto shadow-lg p-3 mb-5 bg-white rounded">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th className="form-heading">No</th>
                  <th className="form-heading">Job ID</th>
                  <th className="form-heading">Name</th>
                  <th className="form-heading">Experience</th>
                  <th className="form-heading">Skill</th>
                  <th className="form-heading">Location</th>
                  <th className="form-heading">Status</th>
                  <th className="form-heading">Assign To</th>
                  <th className="form-heading"></th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {CandidateData.length>0 &&(
                    CandidateData.map(
                        (candidate)=>{
                          return(
                          <tr key={candidate.id}>
                            <td>{candidate.id}</td>
                            <td>{candidate.position}</td>
                            <td>{candidate.fname}</td>
                            <td>{candidate.experience}</td>
                            <td>{candidate.skill}</td>
                            <td>{candidate.location}</td>
                            <td>{candidate.status}</td>
                            <td>
                              <a className="btn btn-danger table-anchor" href="/">
                                click to assign
                              </a>
                            </td>
                            <td>
                              <a className="btn btn-info table-anchor" href="/">
                                edit
                              </a>
                            </td>
                          </tr>
                        );
                      })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="interviewer-section">
          <div className="interviewer-section-heading">
            <h1> Interviewer List</h1>
          </div>
          <div className="interviewer-list overflow-auto shadow-lg p-3 mb-5 bg-white rounded">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th className="form-heading">Name</th>
                  <th className="form-heading">Emp ID</th>
                  <th className="form-heading">Proper Name</th>
                  <th className="form-heading">Role</th>
                  <th className="form-heading">Email</th>
                  <th className="form-heading">Language</th>
                  <th className="form-heading">No</th>
                  <th className="form-heading">User Time zone</th>
                  <th className="form-heading">Istrl</th>
                  <th className="form-heading">fedusername</th>
                  <th className="form-heading">useridhash</th>
                  <th className="form-heading">wfmuser</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {CgUserData.length>0 &&(CgUserData.map(
        (cguser)=>{
        return (
          <tr key={cguser.no}>
            <td>{cguser.profile.userid}</td>
            <td>{cguser.profile.userid}</td>
            <td>{cguser.profile.propername}</td>
            <td>{cguser.profile.role}</td>
            <td>{cguser.profile.email}</td>
            <td>{cguser.profile.language}</td>
            <td>{cguser.profile.userid}</td>
            <td>{cguser.profile.usertimezoneid}</td>
            <td>{cguser.profile.isrtl}</td>
            <td>{cguser.profile.userid}</td>
            <td>{cguser.profile.useridhash}</td>
            <td>{cguser.profile.wfmuser}</td>
          </tr>
        );
      }))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
}