import React, { useState } from 'react';
import { AppBar, Button, FormControl, InputLabel, MenuItem, Select, Toolbar } from '@mui/material';
import axios from 'axios';
import { SearchQuery } from '../../types';
import { DESTINATIONS, GROUPSIZE } from '../../constants/searchConstants';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import "./styles.css";
import moment from 'moment';

type SearchBarProps = {
  handleSearchDescription: (data: SearchQuery) => void
}

const SearchBar: React.FC<SearchBarProps> = React.memo(({ handleSearchDescription }) => {
  const [destination, setDestination] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDestinationChange = (event: any) => {
    setDestination(event.target.value);
  }

  const handleGroupSizeChange = (event: any) => {
    setGroupSize(event.target.value);
  }

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  }

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  }

  const handleSearch = async () => {
    try {
      const reqBody: SearchQuery = {
        ski_site: Number(destination),
        from_date: moment(startDate).format('MM/DD/yyyy'),
        to_date: moment(endDate).format('MM/DD/yyyy'),
        group_size: Number(groupSize)
      }
      handleSearchDescription({
        ski_site: Number(destination),
        from_date: moment(startDate).format('MMM DD'),
        to_date: moment(endDate).format('MMM DD'),
        group_size: Number(groupSize)
      })
      await axios.post('http://localhost:5000/hotel/search', reqBody);
    } catch (error) {
      console.error('Error fetching search results', error);
    }
  };

  return (
    <AppBar position="static" className='searchBarContainer'>
      <Toolbar>
        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
          <InputLabel id="destination-label">Destination</InputLabel>
          <Select
            labelId='destination-label'
            value={destination}
            label="Destination"
            onChange={handleDestinationChange}
          >
            {DESTINATIONS.map(dest => <MenuItem key={dest.id} value={dest.id}>{dest.name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
          <InputLabel id="groupSize-label">Group Size</InputLabel>
          <Select
            labelId='groupSize-label'
            value={groupSize}
            label="Group Size"
            onChange={handleGroupSizeChange}
          >
            {GROUPSIZE.map(size => <MenuItem key={size} value={size}>{size}</MenuItem>)}
          </Select>
        </FormControl>
        <DateRangePicker startDate={startDate} endDate={endDate} handleStartDateChange={handleStartDateChange} handleEndDateChange={handleEndDateChange} />
        <Button variant="outlined" color="primary" onClick={handleSearch} style={{ height: '40px' }}
          disabled={!destination || !groupSize || !startDate || !endDate}>Search</Button>
      </Toolbar>
    </AppBar>
  );
});

export default SearchBar;