import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}));

export default function SelectableUserListDialog(props) {
  const classes = useStyles();
  const { handleClose, open, checked, setChecked, createGroup } = props;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers((await axios.get('/api/users')).data);
    };

    fetchUsers();
  }, []);
  console.log(users)
  const toggleChecked = (id) => (e) => {
    const index = checked.indexOf(id);
    const newChecked = [...checked];

    if (index === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(index, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      scroll="body"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Selecciona usuarios</DialogTitle>
      <List>
        {users.map((user) => (
          <ListItem button key={user.id} onClick={toggleChecked(user.id)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(user.id) !== -1}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText id={user.id} primary={user.username} />
          </ListItem>
        ))}
      </List>
      <Grid container justify="center" alignItems="center" direction="column" className={classes.container}>
        <Button variant="contained" color="primary" onClick={createGroup}>
          Crear
        </Button>
      </Grid>
    </Dialog>
  );
}
