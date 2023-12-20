import React, { useState } from 'react';
import { useGoogleAuth } from '../Contexts/GoogleAuthContext';

const SchedulePromptForm = ({ onScheduleUpdate }) => {
    const { googleToken } = useGoogleAuth();
    const [schedulePrompt, setSchedulePrompt] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!googleToken) {
        console.error("Google token is not available.");
        return;
      }
  
      try {
        const response = await fetch('https://localhost:7112/Schedule', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${googleToken}`
          },
          body: JSON.stringify({ googleToken, schedulePrompt })
        });
  
        if (!response.ok) {
          throw new Error('Failed to update schedule');
        }
  
        // Clear the input field after successful submission
        setSchedulePrompt('');
  
        // Notify the parent component (like App) to refresh the calendar
        onScheduleUpdate();
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Styles for the input field
  const inputStyle = {
    width: '100%',        // Full width
    height: '150px',      // Larger height
    overflowY: 'auto',    // Vertical scroll
    padding: '10px',      // Padding inside the input field
    boxSizing: 'border-box', // Include padding and border in the element's total width and height
    borderRadius: '5px', // Optional: rounded corners
    border: '1px solid #ccc' // Optional: border styling
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        style={inputStyle}
        value={schedulePrompt}
        onChange={(e) => setSchedulePrompt(e.target.value)}
        placeholder="Enter your desired schedule for tomorrow"
      />
      <button type="submit">Send</button>
    </form>
  );
  };

export default SchedulePromptForm;


/*
Backend endpoints:
/Authentication/google-token

POST
/Schedule 
{
    "googleToken": "string",
    "schedulePrompt": "string"
}
*/