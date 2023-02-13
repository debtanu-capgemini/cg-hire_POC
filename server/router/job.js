const express = require('express');
const app = express();
const _jobRouter = require('express').Router();
const fs = require('fs');

_jobRouter.route('/')
.all((req, res, next)=>{
  res.statusCode = 200;
  res.setHeader('Content-Type', 'Application/JSON');
  next();
})
.get((req, res, next)=>{
  fs.readFile('./assets/job-table.json', (error, data)=>{
    if(error) throw error;
    let job = JSON.parse(data);
    res.json({result:job});
  });
})
.post((req, res, next)=>{
  fs.readFile('./assets/job-table.json', (error, data)=>{
    if(error) throw error;
    let job = JSON.parse(data);
    req.body.id = job.length+1;
    job.push(req.body);
    fs.writeFile('./assets/job-table.json', JSON.stringify(job), (err, data)=>{
      res.json({result:job?job:null, message:'Successfuly created.'})
    });
  });
})
.delete((req, res, next)=>{
     res.json({result:[], message:'Delete not supported here!'})
})


module.exports = _jobRouter;
