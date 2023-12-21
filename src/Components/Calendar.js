import React, { useState, useEffect } from 'react';
import { useGoogleAuth } from '../Contexts/GoogleAuthContext';

const CalendarComponent = ({isLoading, setIsLoading, shouldFetchData, setShouldFetchData}) => {
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
    if (shouldFetchData)
    {
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
    <div>
      <h2>Tomorrow's Calendar Events</h2>
      <button onClick={fetchCalendarData}>Refresh Calendar</button>
      <ul>
        {calendarEvents.map(event => (
          <li key={event.id}>
            {event.summary} - {event.start.dateTime ? 
              `${new Date(event.start.dateTime).toLocaleTimeString()} - ${new Date(event.end.dateTime).toLocaleTimeString()}` : 
              'All day'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarComponent;
