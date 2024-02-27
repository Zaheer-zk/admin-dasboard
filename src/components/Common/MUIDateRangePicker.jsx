import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { DateRangePicker as DateRangePick, DateRange } from '@mui/lab';

const MUIDateRangePicker = () => {
  const [value, setValue] = useState([null, null]);
  console.log('Date value', value);
  return (
    <Box>
      <DateRangePick
        startText='Start Date'
        endText='End Date'
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}>to</Box>
            <TextField {...endProps} />
          </>
        )}
      />
    </Box>
  );
};

export default MUIDateRangePicker;
