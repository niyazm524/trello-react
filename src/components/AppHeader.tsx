import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {Props} from "../containers/AppHeader";
import {Link as RouterLink} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  spacer: {
    flexGrow: 1,
  },
}));

export default function AppHeader({isUserLogon}: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant={"dense"}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <div className={classes.spacer} />
          <Typography variant="h6">
            Trello
          </Typography>
          <div className={classes.spacer} />
          {
            !isUserLogon && (<Button color="inherit" component={RouterLink} to="/sign-in">Войти</Button>)
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
