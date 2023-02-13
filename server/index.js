const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
app.use(cors());
const _multer = require('multer');
const bodyparser = require('body-parser');
const candidate_module = require('./router/candidate.js');
const job_module = require('./router/job.js');
const _Router =  express.Router();
app.use(bodyparser.json())


app.get('/login/:data', (req, res)=>{
  fs.readFile('./assets/cg_user.json', (error, data)=>{
    if(error) throw error;
    let profile = JSON.parse(data);
    let getdata = JSON.parse(req.params.data);
    let user;
    let userid;
    let pwd;
    let role;
    userid = getdata.userid;
     pwd = getdata.pwd;
     role = getdata.role===1?"Portal User":"HR"

      
    for(let i = 0; i<profile.length; i++){
      if(userid === profile[i].profile.userid && pwd ===  profile[i].profile.pwd && profile[i].profile.role===role ){
        user = profile[i];
      }
    }
    res.json({result:user});
  });
});



app.get('/cg_user', (req, res)=>{
  fs.readFile('./assets/cg_user.json', (error, data)=>{
    if(error) throw error;
    let profile = JSON.parse(data);

   
    res.json({result:profile});
  });
});


const storage = _multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix +'_'+ file.originalname)
  }
})
const upload = _multer({dest:"uploads/", storage:storage});
function uploadFiles(req, res) {
  console.log(req.body);  
  console.log(req.files);
  res.json({ message: "Successfully uploaded files", results:req.files});
}

app.post("/upload_files", upload.array("files"), uploadFiles);



app.listen(8080, ()=>{
  console.log('Server Start at port 8080...');
});
app.use('/candidate',candidate_module); 
app.use('/job',job_module); 

