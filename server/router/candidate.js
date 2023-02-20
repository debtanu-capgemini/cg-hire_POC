const express = require("express");
const CandidateRouter = express.Router();
const fs = require("fs");
CandidateRouter.route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "Application/JSON");
    next();
  })
  .get((req, res, next) => {
    fs.readFile("./assets/candidate_db.json", (error, data) => {
      if (error) throw error;
      let candidate = JSON.parse(data);
      let getdata = req.query.q?JSON.parse(req.query.q):'';
      let searchField = req.query.q?getdata.key:'';
      let searchVal = req.query.q?getdata.val:'';
      let user=[];
      if(searchField){
        for(let i = 0; i<candidate.length; i++){
          if(searchVal === candidate[i][searchField]){
            user.push(candidate[i])
          }
        }
        res.json({ result: user });
       }
       else{
        res.json({ result: candidate });
       }
      
    });
  })
  .post((req, res, next) => {
    fs.readFile("./assets/candidate_db.json", (error, data) => {
      if (error) throw error;
      let candidate = JSON.parse(data);
      req.body.id = candidate.length + 1;
      candidate.push(req.body);

      fs.writeFile(
        "./assets/candidate_db.json",
        JSON.stringify(candidate),
        (err, data) => {
          res.json({
            result: candidate ? candidate : null,
            message: "Successfuly created.",
          });
        }
      );
    });
  })
  .put((req, res, next) => {
    fs.readFile("./assets/candidate_db.json", (error, data) => {
      if (error) throw error;
      let candidate = JSON.parse(data);
      let body = req.body;
      // let candId = body.candId;
      let assign = body.assign?body.assign:"";
      let interviewDate = body.interviewDate? body.interviewDate:"";
      let getdata = JSON.parse(req.query.q);
      let searchField = getdata.key;
      let searchVal = getdata.val;
      let msg='';

      for (let i = 0; i < candidate.length; i++) {
        if (candidate[i][searchField] === searchVal) {
           if (Object.keys(body).length === 1) {
            if(req.body.assign){
              candidate[i].assign = assign;
              msg="Successfully Asigned";
            }else{
              candidate[i].interviewDate = interviewDate;
                  msg="Successfully Asigned date";
            }

                  
                }
                else{
                  candidate[i] = body;
                  msg="Successfully Updated";
                }
         
        }
      }


      fs.writeFile(
        "./assets/candidate_db.json",
        JSON.stringify(candidate),
        (err, data) => {
          res.json({ message: msg });
        }
      );
    });
  })

  .delete((req, res, next) => {
    fs.readFile("./assets/candidate_db.json", (error, data) => {
      if (error) throw error;
      let idx;
      let candidate = JSON.parse(data);
      for (let i = 0; i < candidate.length; i++) {
        if (candidate[i].userId === req.params.id) {
          idx = i;
        }
      }
      candidate.splice(idx, 1);
      fs.writeFile(
        "./assets/candidate_db.json",
        JSON.stringify(candidate),
        (err, data) => {
          res.json({
            result: candidate ? candidate : null,
            message: "Successfuly created.",
          });
        }
      );
    });
  });

module.exports = CandidateRouter;
