import {React,useState, useEffect, useRef} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';


function CandidateCreateForm() {
  console.log("create");
  const [open, setOpen] = useState(false);
  const [msg, setmsg] = useState('');
  const [searchText, setSearchText] = useState("");
  const [CgUserData, SetCgUserData] = useState("");
  let uploadFile = "";
  // const [file, setFile] = useState();
  // function handleChange(event) {
  //   setFile(event.target.files[0])
  // }

  
  useEffect(() => {
    getcgUserData();
  }, []);
  async function getcgUserData() {
    let url = `http://localhost:8080/job`;
    let response = await fetch(url);
    let data = await response.json();
    SetCgUserData(data.result,"jobdata");
  }

  const url ="http://localhost:8080/candidate"
  const [data,setData]=useState({
    fName :"",
    lName:"",
    email:"",
    mobile:"",
    location:"",
    skill:"",
    experience:"",
    position:[],
    assign:"",
    idType:"",
    idNumber:"",
    address:[],
    country:"",
    state:"",
    city:"",
    address1:"",
    pincode:"",
    resume:""
  })
  function submit(e){
    e.preventDefault();
    const url = 'http://localhost:8080/uploadFile';
    const formData = new FormData();
    console.log(data.resume,"resume");
    formData.append('file', uploadFile);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });

    async function postData() {
      let url = "http://localhost:8080/candidate";
      let obj = {
        fname: data["fName"],
        lName: data["lName"],
        email:data["email"],
        mobile:data["mobile"],
        location:data["location"],
        skill:data["skill"],
        experience:data["experience"],
        position:data["position"],
        assign:data["assign"],
        idType:data["idType"],
        idNumber:data["idNumber"],
        country:data["country"],
        state:data["state"],
        city:data["city"],
        address1:data["address1"],
        pincode:data["pincode"],
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      const resData = await response.json();
      console.log(resData);
      if(resData){
        setOpen(true);
        setmsg("Candidate Successfully Registered")
      }
    }
    postData();
    window.location.reload();
    // history.push('./dashboard');
    
  }
  function addCandidate(e){
    const newData={...data}
    newData[e.target.id] = e.target.value;

    setData(newData);
    console.log(newData);
    uploadFile=(e.target.files[0]);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }; 
  

  return (
    <div className="candidate-informatiom-form-container container">
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right', }} 
    open={open} autoHideDuration={2000} onClose={handleClose}>
        <MuiAlert  variant="filled" severity="success"
         sx={{ width: '100%' }}>
         {msg}
        </MuiAlert >
      </Snackbar>
      <form 
        onSubmit={(e)=>submit(e)}
        id="canReg">
        <small className="text-danger fw-normal col-12">
          Note: All * field are required to submit the form
        </small>
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              <div className="form-floating mb-3 col-md-6 col-xl-4">
                <input
                  type="text"
                  className="form-control"
                  name="fName"
                  placeholder="First Name"
                  onChange={(e)=>addCandidate(e)}
                  id="fName"
                  value={data.fName}
                  required
                />
                <label className="px-4">First Name *</label>
              </div>

              <div className="form-floating mb-3 col-md-6 col-xl-4">
                <input
                  type="text"
                  className="form-control"
                  name="lName"
                  placeholder="Last Name"
                  onChange={(e)=>addCandidate(e)}
                  id="lName"
                  value={data.lName}
                  required
                />
                <label className="px-4">Last Name *</label>
              </div>

              <div className="form-floating mb-3col-md-6 col-xl-4">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  onChange={(e)=>addCandidate(e)}
                  value={data.email}
                  id="email"
                  required
                />
                <label className="px-4">Email *</label>
              </div>

              <div className="form-floating mb-3 col-md-6 col-xl-4">
                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  placeholder="Mobile Number"
                  onChange={(e)=>addCandidate(e)}
                  value={data.mobile}
                  id="mobile"
                  required
                />
                <label className="px-4">Mobile No. *</label>
              </div>

              <div className="form-floating mb-3 col-md-6 col-xl-4">
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="Select Location"
                  onChange={(e)=>addCandidate(e)}
                  value={data.location}
                  id="location"
                  required
                />
                <label className="px-4">Select Location *</label>
              </div>

              <div className="form-floating mb-3 col-md-6 col-xl-4">
                <input
                  type="text"
                  className="form-control"
                  name="primarySkill"
                  placeholder="Primary Skill"
                  onChange={(e)=>addCandidate(e)}
                  value={data.skill}
                  id="skill"
                  required
                />
                <label className="px-4">Primary Skill *</label>
              </div>

              <div className="form-floating mb-3 col-md-6 col-xl-4">
                <input
                  type="text"
                  className="form-control"
                  name="experience"
                  placeholder="Experience"
                  onChange={(e)=>addCandidate(e)}
                  value={data.experience}
                  id="experience"
                />
                <label className="px-4">Experience</label>
              </div>

              <div className="form-floating mb-3 col-md-6 col-xl-4">
                
                  <select
                    className="form-select"
                    key={"id"}
                    name="position"
                    id="position"
                    onChange={(e)=>addCandidate(e)}
                  >
                     <option value="0">Select</option>
                          {CgUserData.length > 0 &&
                            CgUserData.map((cguser) => {
                              return (
                                <option
                                  value={cguser.jobName}
                                  key={cguser.jobName}
                                >
                                  {cguser.jobId}{"-"+cguser.jobName}
                                </option>
                              );
                            })}
                    
                  </select>
              </div>

              <div className="form-floating mb-3 col-md-6 col-xl-4">
                <input
                  type="text"
                  className="form-control"
                  name="assignedTo"
                  placeholder="Assign To"
                  onChange={(e)=>addCandidate(e)}
                  value={data.assign}
                  id="assign"
                />
                <label className="px-4">Assign To</label>
              </div>

              <div className="form-floating mb-3 col-md-6 col-xl-4">
                <input
                  type="text"
                  className="form-control"
                  name="idType"
                  placeholder="ID Type"
                  onChange={(e)=>addCandidate(e)}
                  value={data.idType}
                  id="idType"
                />
                <label className="px-4">ID Type</label>
              </div>

              <div className="form-floating mb-3 col-md-6 col-xl-4">
                <input
                  type="text"
                  className="form-control"
                  name="idNumber"
                  placeholder="ID Number"
                  onChange={(e)=>addCandidate(e)}
                  value={data.idNumber}
                  id="idNumber"
                />
                <label className="px-4">ID Number</label>
              </div>

            </div>
          </div>
          <div className="col-md-3">
            <figure className="imageProfile">
              <figcaption></figcaption>
            </figure>
          </div>
          <div className="row">
            <div className="form-floating mb-3 col-md-4 col-xl-3">
              <input
                type="text"
                className="form-control"
                name="country"
                placeholder="Country"
                id="country"
                onChange={(e)=>addCandidate(e)}
                value={data.country}
              />
              <label className="px-4">Country</label>
            </div>

            <div className="form-floating mb-3 col-md-4 col-xl-3">
              <input
                type="text"
                className="form-control"
                name="state"
                placeholder="State"
                id="state"
                onChange={(e)=>addCandidate(e)}
                value={data.state}
              />
              <label className="px-4">State</label>
            </div>

            <div className="form-floating mb-3 col-md-4 col-xl-3">
              <input
                type="text"
                className="form-control"
                name="city"
                placeholder="City"
                id="city"
                onChange={(e)=>addCandidate(e)}
                value={data.city}
              />
              <label className="px-4">City</label>
            </div>

            <div className="form-floating mb-3 col-md-4 col-xl-3">
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="Address"
                id="address1"
                onChange={(e)=>addCandidate(e)}
                value={data.address1}
              />
              <label className="px-4">Address</label>
            </div>

            <div className="form-floating mb-3 col-md-4 col-xl-3">
              <input
                type="text"
                className="form-control"
                name="pinCode"
                placeholder="Pin Code"
                id="pincode"
                onChange={(e)=>addCandidate(e)}
                value={data.pincode}
              />
              <label className="px-4">Pin Code</label>
            </div>

          </div>
          <div className="col-md-6">
            <div className="file-upload">
              <label>Upload Your Resume *</label>
              <input
               type="file" 
               placeholder="upload Resume" 
               onChange={(e)=>addCandidate(e)}
               id="resume"
               name="resume"
               required/>
            </div>
          </div>
          <div className="col-md-6">
            <section className="d-flex">
              <h4>Applied For:</h4>
              <ul className="job-list">
                <li>
                  <span>{"Job id"}</span>
                </li>
              </ul>
            </section>
          </div>
          <div className="col my-4">
            <button className="btn btn-info text-white" type='submit'>Submit Informatiom</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CandidateCreateForm;
