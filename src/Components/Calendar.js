import React, { useState, useEffect } from 'react';
import { useGoogleAuth } from '../Contexts/GoogleAuthContext';
import {
  Button,
  CircularProgress,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import RefreshIcon from '@mui/icons-material/Refresh';

const CalendarComponent = ({ isLoading, setIsLoading, shouldFetchData, setShouldFetchData }) => {
  const { googleToken } = useGoogleAuth();
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [error, setError] = useState(null);

  // Function to get start and end times for tomorrow
  const getTomorrowDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const start = new Date(tomorrow.setHours(0, 0, 0, 0)).toISOString();
    const end = new Date(tomorrow.setHours(23, 59, 59, 999)).toISOString();

    return { start, end };
  };

  // Function to fetch calendar data
  const fetchCalendarData = async () => {
    if (!googleToken) return; // Ensure token is available

    const { start, end } = getTomorrowDates();
    setIsLoading(true);
    console.log('fetching calendar data');

    try {
      console.log('Beginning data fetch');
      const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${start}&timeMax=${end}`, {
        headers: {
          Authorization: `Bearer ${googleToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch calendar data');
      }
      const data = await response.json();
      setCalendarEvents(data.items); // Assuming 'items' contains the events
    } catch (err) {
      setError(err.message);
    } finally {
      console.log('Data finished fetching');
      setIsLoading(false);
      setShouldFetchData(false); //After data is fetched
    }
  };

  // Fetch data when component mounts or googleToken changes
  useEffect(() => {

    //Refresh when state is true
    if (shouldFetchData) {
      fetchCalendarData();
    }


    //Poll every 60 seconds
    const fetchInterval = setInterval(fetchCalendarData, 60000);
    //Fetch immediately on mount
    fetchCalendarData();

    //Clean on unmount
    return () => clearInterval(fetchInterval);
  }, [googleToken, shouldFetchData, setShouldFetchData]);

  if (isLoading) {
    return <div>Building calendar data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography variant="h6" color="error" style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
          <Error style={{ marginRight: 10 }} />
          Error: {error}
        </Typography>
      ) : (
        <div>
          <Typography variant="h4" style={{ margin: '20px 0', textAlign: 'center' }}>
            Tomorrow's Calendar Events
          </Typography>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <IconButton color="primary" onClick={fetchCalendarData}>
              <RefreshIcon />
            </IconButton>
          </div>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}> {/* Set maximum height and enable scrolling */}
            <List>
              {calendarEvents.length === 0 ? (
                <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                  No events scheduled for tomorrow.
                </Typography>
              ) : (
                calendarEvents.map(event => (
                  <ListItem key={event.id} style={{ border: '1px solid #eee', margin: '10px 0', borderRadius: '4px' }}>
                    <ListItemText
                      primary={event.summary}
                      secondary={
                        event.start && event.end && event.start.dateTime && event.end.dateTime
                          ? `${new Date(event.start.dateTime).toLocaleTimeString()} - ${new Date(
                            event.end.dateTime
                          ).toLocaleTimeString()}`
                          : 'All day'
                      }
                    />
                  </ListItem>
                ))
              )}
            </List>
          </div>
        </div>
      )}
    </Container>
  );


};

export default CalendarComponent;
