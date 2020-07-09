import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Made with '}
        <span role="img" aria-label="icon heart">
          ❤️
        </span>
        {' by Adria Claret'}
        {'.'}
      </Typography>
    );
  }