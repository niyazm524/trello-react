import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {Props} from "../containers/AppHeader";
import {Link as RouterLink} from "react-router-dom";
import {AccountCircle} from "@material-ui/icons";
import {logout} from "../authentication";
import {useHistory} from 'react-router-dom';

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

export default function AppHeader({isUserLogon, user}: Props) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen: boolean = !!anchorEl;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogoutClick = () => {
    handleClose();
    logout()
      .then(() => history.push('/sign-in'))
  };

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
            !isUserLogon ? (<Button color="inherit" component={RouterLink} to="/sign-in">Войти</Button>)
              : (<div>
                <Button
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  variant={"text"}
                  size={"large"}
                  startIcon={<AccountCircle />}
                  onClick={handleMenu}
                  color="inherit"
                > {user?.firstName}
                </Button>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={isMenuOpen}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Мой аккаунт</MenuItem>
                  <MenuItem onClick={onLogoutClick}>Выйти</MenuItem>
                </Menu>
            </div>)
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
