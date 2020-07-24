import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import Navigation from './Navigation';
import useInputState from '../hooks/useInputState';
import useDebounce from '../hooks/useDebounce';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  container: {
    padding: theme.spacing(2, 1, 1, 1),
  },
  menuIcon: {
    background: 'white',
  },
  cover: {
    padding: theme.spacing(1),
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  footer: {
    marginTop: 'auto',
  },
  error: {
    marginTop: theme.spacing(5),
  },
  search: {
    padding: theme.spacing(1, 0, 1, 0),
  },
}));

export default function Basket(props) {
  const classes = useStyles();
  const [value, handleChange, reset] = useInputState({
    search: '',
  });
  const searchTerm = useDebounce(value, 1000);

  //   useEffect(() => {
  //     const fetchGroups = async () => {
  //       try {
  //         dispatch({
  //           type: 'FETCH_GROUPS',
  //           payload: await axios.get('/api/baskets'),
  //         });
  //       } catch (error) {
  //         dispatch({
  //           type: 'ERROR',
  //           payload: error.response.data.errors,
  //         });
  //       }
  //     };

  //     fetchGroups();
  //   }, []);
  useEffect(() => {
    console.log('estoy buscando zorra');
  }, [searchTerm]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <SearchBar/>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" component="main" className={classes.container}>
        <Grid
          container
          spacing={2}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <div>contenido</div>
        </Grid>
      </Container>
      <footer className={classes.footer}>
        <Box mt={8}>
          <Navigation />
        </Box>
      </footer>
    </div>
  );
}
