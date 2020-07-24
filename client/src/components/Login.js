import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { DispatchContext } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';
import useInputState from '../hooks/useInputState';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';

import Copyright from './Copyright';

const PUBLIC_VAPID_KEY =
  'BAgfqXQf_bBXiPL7azqPUE7Qaaw2CZrLWpny6tTTVKQsMKZuIt7nJTQnMe4-wv0fem6OGZdhU7aXN4D3aws3dEU';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const { auth, getToken } = useContext(AuthContext);
  const [value, handleChange, reset] = useInputState({
    username: '',
    password: '',
    remember: false,
  });

  if (getToken()) {
    return <Redirect to="/basketlist" />;
  }
  //console.log(Notification.requestPermission());
  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceWorker = await navigator.serviceWorker.ready;
    if (
      Notification.permission === 'granted' ||
      (await Notification.requestPermission()) === 'granted'
    ) {
      const registration = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
      });
      try {
        dispatch({
          type: 'LOGIN',
          payload: await axios.post('api/auth/signin', {
            ...value,
            registration,
          }),
        });
        reset();
      } catch (error) {
        dispatch({
          type: 'LOGIN_ERROR',
          error: error.response.data.errors,
        });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          variant="square"
          className={classes.avatar}
          alt="Remy Sharp"
          src="/api/static/1"
        />
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nombre"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
            value={value.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={value.password}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                checked={value.remember}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Recordar la cuenta"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
        </form>
      </div>
      <Snackbar open={auth.errormsg ? true : false} autoHideDuration={6000}>
        <Alert severity="error">{auth.errormsg}</Alert>
      </Snackbar>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
