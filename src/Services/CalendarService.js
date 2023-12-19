const fetchCalendarData = async (googleToken) => {
    try {
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: {
          Authorization: `Bearer ${googleToken}`
        }
      });
      const calendarData = await response.json();
      // Process and display calendar data
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  };
  