import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ContactlessIcon from "@mui/icons-material/Contactless";

export default function SigninAppBar() {
  return (
    <Box style={{ display: "flex" }} 
    marginBottom={3}
      marginRight={3}
      marginLeft={3}
      marginTop={2.5}>
      <AppBar style={{ background: "#5579C6", borderRadius: "20px" }}
        position="xifed"
        elevation={0}
        >
        <Toolbar>
        <IconButton size="large" color="inherit">
            <ContactlessIcon />
          </IconButton>
          <Typography variant="h4" color="white" component="div">
            Movicon
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
