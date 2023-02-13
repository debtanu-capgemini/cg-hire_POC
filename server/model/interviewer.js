const express = require('express');
const cors = require('cors');
const app = express();
const interviewer_router = app.Router();
const fs = require('fs');
app.use(cors())
interviewer_router.route('/')
.all((req, res, next)=>{
  res.statusCode = 200;
  res.setHeader('Content-Type', 'Application/JSON');
  next();
})

app.get('/login', (req, res)=>{
  fs.readFile('../assets/cg_user.json', (error, data)=>{
    if(error) throw error;
    let candidate = JSON.parse(data);
    res.json({result:candidate});
  })
})
app.listen(8080,()=>console.log('API is running on http://localhost:8080/login'))