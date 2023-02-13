import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import {useState} from 'react';

export function Logindata(){
   
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

const handleChange = (event, newValue) => {
console.log(event.target.name);
  };
const tabs = [
    {
      label: "Hr Team", 
      Component:[
      <TextField  variant="outlined" size="small" sx={{ p: 1,mb:2 }}
      placeholder="employee id"
      fullWidth
      key="1"
      name="userid"
      // onBlur={handleChange}
      onBlur={e => setUserName(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PersonIcon />
          </InputAdornment>
        ),
      }}
      />,
     
      <TextField type="password" size="small"  variant="outlined"  sx={{ p: 1,mt:1 }}
      placeholder="password"
      fullWidth
      key="2"
      name="passsword"
      // onBlur={handleChange}
      onBlur={e => setPassword(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon />
          </InputAdornment>
        ),
      }}
      />
    
    ]
    },
    {
      label: "Interviewer",
      Component: [

<TextField variant="outlined" size="small" sx={{ p: 1,mb:2 }}
      placeholder="employee id"
      fullWidth
      key="3"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PersonIcon />
          </InputAdornment>
        ),
      }}
      />,
      <TextField type="password" size="small"  variant="outlined"  sx={{ p: 1,mt:1 }}
      placeholder="password"
      fullWidth
      key="4"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
        <LockIcon />
          </InputAdornment>
        ),
      }}
      />

      ]
    },
   
  ]
  return tabs;
};

export  default Logindata;


  
