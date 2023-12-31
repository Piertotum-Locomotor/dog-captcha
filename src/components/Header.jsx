import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import PetsIcon from '@mui/icons-material/Pets';

  const Header = () => {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography style={{flex: "1 0 0"}}>
            わんわんCAPTCHA デモ版 (dogCAPTCHA)
          </Typography>
          <PetsIcon />
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Header;
  