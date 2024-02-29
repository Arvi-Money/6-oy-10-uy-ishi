import { Box,Container, TextField, Typography } from "@mui/material"

function Register() {
  return (
    <Container>
        <Box>
            <Typography>
                Register page
            </Typography>

            <form>
                <TextField id="outlined-basic" label='Username' variant="outlined" fullWidth margin="normal" />
            </form>
        </Box>
    </Container>
  )
}

export default Register