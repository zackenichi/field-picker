import { Grid, Typography } from '@mui/material';
import React from 'react';

const TargetInfo = ({ selectedField, selectionStart }) => {
  return (
    <Grid item xs={12}>
      <Typography>
        Target: {selectedField || 'none'} index:{' '}
        {selectedField ? selectionStart : '-'}
      </Typography>
      {/* end of test - delete later */}
    </Grid>
  );
};

export default TargetInfo;
