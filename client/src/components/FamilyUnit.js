import React, { useContext } from 'react';
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import Navigation from './Navigation';

import { GeneralContext } from '../context/GeneralContext';
import { DispatchContext } from '../context/GeneralContext';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
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
}));

const familyUnits = [{ users: ['Juan', 'Maria', 'Manuel'] }];

export default function FamilyUnit() {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const state = useContext(GeneralContext);

  const createGroup = (e) => {
    dispatch({
      type: 'CREATE_GROUP',
      payload: axios.post('/api/group', {users: [{username: 'Adria Claret', id: '5f0839f122c1cd30289c45c8'}]})
    })
  };

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
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              Shopping List
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" component="main" className={classes.container}>
        <Grid container spacing={2} direction="column">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                onClick={createGroup}
              >
                Añadir grupo
              </Button>
            </Grid>
          </Grid>
          {familyUnits.map((unit, index) => {
            return (
              <Grid item key={index}>
                <Card>
                  <Grid container direction="row">
                    <Grid item xs={4}>
                      <CardMedia
                        component="img"
                        alt="Family"
                        src="api/static/2"
                        title="Family"
                        className={classes.cover}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <CardContent>
                        {unit.users.map((user, index) => {
                          return (
                            <Typography variant="subtitle1" key={index}>
                              {user}
                            </Typography>
                          );
                        })}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
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