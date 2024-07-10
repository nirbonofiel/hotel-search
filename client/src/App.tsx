import { useEffect, useState } from 'react';
import SearchBar from './components/Search/Search';
import { io } from 'socket.io-client';
import { HotelType, SearchQuery } from './types';
import HotelsList from './components/HotelsList/HotelsList';
import { Typography } from '@mui/material';
import ResultDescription from './components/ResultDescription/ResultDescription';

const socket = io('http://localhost:5000');

function App() {
  const [results, setResults] = useState<HotelType[]>([]);
  const [searchDescription, setSearchDescription] = useState<SearchQuery>();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    socket.on('searchResults', (newResults) => {
      setResults((prevResults) => [...prevResults, ...newResults]
      .sort((a: { price: string; }, b: { price: string; }) => parseFloat(a.price) - parseFloat(b.price)));
    });

    return () => {
      socket.off('searchResults');
    };
  }, []);

  const handleSearchDescription = (reqData: SearchQuery) => {
    setSearchDescription(reqData);
  }

  return (
    <div style={{backgroundColor:'rgba(25, 118, 210, 0.08)'}}>
      <SearchBar handleSearchDescription={handleSearchDescription} />
      {
        results && searchDescription &&
        <>
          <Typography variant="h5" fontWeight={600} textAlign="center"  style={{paddingTop:20}}>Select your ski trip</Typography>
          <ResultDescription resultCount={results.length} searchDescription={searchDescription} />
        </>
      }
      {
        results && <HotelsList hotels={results} />
      }
    </div>
  );
}

export default App;
