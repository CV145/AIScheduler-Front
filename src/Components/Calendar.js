import React, { useState, useEffect } from 'react';
import { useGoogleAuth } from '../Contexts/GoogleAuthContext';

const CalendarComponent = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /*
  Use the Google Token for API requests. Stored in the GoogleAuth Context that wraps this component
  */
  const {googleToken, isSignedIn} = useGoogleAuth();

  useEffect(() => {
    const fetchCalendarData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
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
        setIsLoading(false);
      }
    };

    if (googleToken) {
      fetchCalendarData();
    }
  }, [googleToken]);

  if (isLoading) {
    return <div>Loading calendar data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Your Calendar Events</h2>
      <ul>
        {calendarEvents.map(event => (
            <li key={event.id}>
                {event.summary} - {event.start?.dateTime ? new Date(event.start.dateTime).toLocaleString() : 'No start time'}
            </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarComponent;
