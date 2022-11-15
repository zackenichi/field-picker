import { Grid, TextField, Typography } from '@mui/material';
import React from 'react';

const GeneratedEmail = ({ emailContent }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Typography fontSize="20px" fontWeight="bold">
          Generated Email
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography fontWeight="bold">To</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          InputProps={{ readOnly: true }}
          value={emailContent.emailRecipient}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography fontWeight="bold">Subject</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          InputProps={{ readOnly: true }}
          value={emailContent.emailSubject}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography fontWeight="bold">Message</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          InputProps={{ readOnly: true }}
          maxRows={25}
          minRows={5}
          multiline
          value={emailContent.emailMessage}
        />
      </Grid>
    </Grid>
  );
};

export default GeneratedEmail;
