import React, {ChangeEvent, useState} from 'react';
import {Avatar, Button, TextField, Grid, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Link, useHistory} from "react-router-dom";
import {IUserCredentials} from "../models/User";
import {login} from "../authentication";


const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [state, setState] = useState<IUserCredentials>({usernameOrEmail: '', password: ''});
  const history = useHistory();

  const onPassFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({...state, password: event.target.value})
  };
  const onUsernameOrEmailFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({...state, usernameOrEmail: event.target.value})
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(state)
      .then(() => history.push('/'))
      .catch(console.error);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Имя пользователя или почта"
            name="email"
            value={state.usernameOrEmail}
            onChange={onUsernameOrEmailFieldChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={state.password}
            onChange={onPassFieldChange}
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
          <Grid container>
            {/*<Grid item xs>*/}
            {/*  <Link href="#">*/}
            {/*    Забыли пароль?*/}
            {/*  </Link>*/}
            {/*</Grid>*/}
            <Grid item>
              <Link to="/sign-up">
                {"Ещё нет аккаунта? Зарегистрироваться"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
