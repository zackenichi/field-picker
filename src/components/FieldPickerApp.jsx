import { Grid, Typography } from '@mui/material';
import React from 'react';
import EmailContainer from './EmailContainer';
import GeneratedEmail from './GeneratedEmail';
// import AppControls from './AppControls';

const FieldPickerApp = () => {
  const [emailContent, setEmailContent] = React.useState();

  const handleGenerateEmail = (emailSubject, emailMessage, emailRecipient) => {
    setEmailContent({ emailSubject, emailMessage, emailRecipient });
    console.log(emailContent);
  };

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
        <EmailContainer handleGenerateEmail={handleGenerateEmail} />
      </Grid>
      <Grid item xs={12}>
        {/* Generated Email (random contact) */}
        {emailContent && emailContent.emailRecipient && (
          <GeneratedEmail emailContent={emailContent} />
        )}
        {/* <GeneratedEmail /> */}
      </Grid>
    </Grid>
  );
};

export default FieldPickerApp;
