import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';

export default function BasicDateCalendar(props) {
  const [value, setValue] = useState(null);

  const handleDateValue = (newValue) => {
    setValue(newValue);
    if (props?.setStartDate) {
      props.setStartDate(new Date(newValue?.$d).getDate());
    }
    if (props?.setEndDate) {
      props.setEndDate(new Date(newValue?.$d).getDate());
    }
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1 className='text-center'>{props?.text}</h1>
        <DateCalendar onChange={(newValue) => handleDateValue(newValue)} />
      </LocalizationProvider>
    </div>
  );
}
