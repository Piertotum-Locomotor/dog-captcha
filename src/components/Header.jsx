import { AppBar, Toolbar, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import PetsIcon from '@mui/icons-material/Pets';

const useStyles = makeStyles(() => ({
    typographyStyles: {
      flex: 1
    }
  }));
  
  const Header = () => {
    const classes = useStyles();
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.typographyStyles}>
            わんわんCAPTCHA デモ版 (dogCAPTCHA)
          </Typography>
          <PetsIcon />
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Header;
  