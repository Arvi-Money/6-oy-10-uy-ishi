import { Box, Container, TextField, Typography, Button } from "@mui/material"
import { useRef, useState } from "react"

const validateEmail = (email) =>{
  return String(email)
      .toLowerCase()
      .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


function validate(usernameRef, emailRef, passwordRef) {
  if (!usernameRef.current.value) {
      usernameRef.current.focus();
      alert('Name is empty');
      return false;
  }

  if (!(validateEmail(emailRef.current.value))) {
      emailRef.current.focus();
      alert('Email is empty');
      return false;
  }

  if (!passwordRef.current.value) {
      passwordRef.current.focus();
      alert('Phone number is empty');
      return false;
  }

  return true
}

function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  function handleClick(e) {
      e.preventDefault();
      setIsLoading(true);
      const isValid = validate();

      if(isValid){
        const user = {
          usernameRef: usernameRef.current.value,
          emailRef: emailRef.current.value,
          passwordRef: passwordRef.current.value,

        }

        fetch("https://auth-rg69.onrender.com/api/auth/signup", {
            method: "POST",
            headers:{
              'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })

            .then(res => {
              setIsLoading(false);
              if(res.status >= 200 &&  res.status <= 300){
                return res.json()
              }              
            })
            .then(data => {
              console.log(data);
            })
            .catch(err => {
              console.log(err);
            })
      }
  }

  return (
    <Container>
      <Box>
        <Typography variant="h3" textAlign={'center'} gutterBottom>
          Register page
        </Typography>

        <form>
          <TextField id='outlined-basic' type="text" label='Username' variant="outlined" fullWidth margin="normal" inputRef={usernameRef}/>
          <TextField id='outlined-basic' type="email" label='Email' variant="outlined" fullWidth sx={{mt: '1rem'}} inputRef={emailRef} />
          <TextField id='outlined-basic' type="password" label='Password' variant="outlined" fullWidth sx={{mt: '1rem'}} inputRef={passwordRef}/>
        </form>
        <Button disabled = {isLoading ? true : false} variant="contained" fullWidth sx={{mt: '1rem'}} onClick={handleClick}>{isLoading ? "Loading..." :"Save"}</Button>
      </Box>
    </Container>
  )
}

export default Register