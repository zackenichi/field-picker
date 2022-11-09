import { Grid, Typography } from '@mui/material';
import React from 'react';
import AppBody from './AppBody';
// import AppControls from './AppControls';

const FieldPickerApp = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography
          variant="h1"
          fontSize="24px"
          textAlign="center"
          fontWeight="bold"
        >
          Field picker for email templates
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {/* Controls - (Email - contacts - company settings) */}
        {/* <AppControls /> */}
      </Grid>
      <Grid item xs={12}>
        <AppBody />
      </Grid>
      {/* <Grid item xs={12}>
        Generated Emails (2 per row)
      </Grid> */}
    </Grid>
  );
};

export default FieldPickerApp;
