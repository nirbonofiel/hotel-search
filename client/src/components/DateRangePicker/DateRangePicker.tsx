import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./styles.css";

type DateRangePickerProps = {
  startDate: Date | null,
  endDate: Date | null,
  handleStartDateChange: (date: Date | null) => void,
  handleEndDateChange: (date: Date | null) => void
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDate, endDate, handleStartDateChange, handleEndDateChange }) => {

  return (
    <>
      <div>
        <DatePicker
          selected={startDate}
          minDate={new Date("01/01/2025")}
          onChange={handleStartDateChange}
          selectsStart
          placeholderText="Start Date" />
      </div>
      <div>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          disabled={startDate ? false : true}
          startDate={startDate ? startDate : undefined}
          minDate={startDate ? startDate : undefined}
          placeholderText="End Date" />
      </div></>

  );
};

export default DateRangePicker;