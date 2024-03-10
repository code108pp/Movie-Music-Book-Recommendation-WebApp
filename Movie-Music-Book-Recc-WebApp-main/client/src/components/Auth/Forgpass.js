import * as React from 'react';
import {Box,TextField,Avatar,Typography,Grid,Paper,Button }from '@mui/material';
import ResetTvIcon from '@mui/icons-material/ResetTv';
import { styled } from '@mui/material/styles';
import { Margin } from '@mui/icons-material';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function reset() {
  return (
    <Box
    sx={{
        marginTop: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{bgcolor: 'orange',m : 1 }}>
            <ResetTvIcon />
          </Avatar>
          <Typography variant="h3" color="white" >
            Reset Password
          </Typography>
      <TextField
              margin="normal"
              sx={{ width: '85ch' }}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
             <TextField
             margin="normal"
              sx={{ width: '85ch' }}
              id="phone"
              label="Enter Phone No."
              name="phone"
              autoComplete="phone"
            />
            <Button
            sx={{mt: 2 , width: '85ch' }}
              type="submit"
              variant="contained"
              >
               GET OTP
              </Button>
            <TextField
            margin="normal"
              sx={{ width: '85ch' }}
              id="otp"
              label="Enter OTP"
              name="otp"
            />
           
              <TextField
              margin="normal"
              sx={{ width: '85ch' }}
              id="newpass"
              label="Enter NEW PASSWORD"
              name="newpass"
            />
            <Button
            sx={{mt: 2 , width: '85ch' }}
              type="submit"
              variant="contained"
              >
                Set New Password
              </Button>
           

          
    </Box>
  );
}
