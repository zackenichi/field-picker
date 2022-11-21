import { Grid, TextField, Typography } from '@mui/material';
import React from 'react';

const DisplayFields = ({ dynamicFieldsArray }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
          Fields
        </Typography>
      </Grid>
      {/* <Grid item xs={12}>
        <Typography fontWeight="bold">Field name</Typography>
      </Grid> */}
      {dynamicFieldsArray.map((field, index) => {
        return (
          <Grid item xs={12} key={index.toString()}>
            <TextField
              //   InputProps={{ readOnly: true }}
              label={field}
              value={field}
              fullWidth
              //   InputProps={{ readOnly: true }}
              //   value={emailContent.emailRecipient}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DisplayFields;
