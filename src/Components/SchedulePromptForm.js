import React, { useState } from 'react';
import { useGoogleAuth } from '../Contexts/GoogleAuthContext';

const SchedulePromptForm = ({ onScheduleSubmit, onScheduleUpdated }) => {
    const { googleToken } = useGoogleAuth();
    const [schedulePrompt, setSchedulePrompt] = useState('');
    const [userConsent, setUserConsent] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!googleToken) {
        console.error("Google token is not available.");
        return;
      }

      if (!userConsent) {
        // Display an error message or prevent submission without consent
        console.error("Please provide consent to modify your Google Calendar.");
        return;
      }
    
      // Notify that the update process is starting
      onScheduleSubmit(); // This should set isLoading to true in parent

      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
      try {
        const response = await fetch('https://localhost:7112/Schedule', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${googleToken}`
          },
          body: JSON.stringify({ googleToken, schedulePrompt, userTimeZone })
        });
  
        if (!response.ok) {
          throw new Error('Failed to update schedule');
        }
  
        // Clear the input field after successful submission
        setSchedulePrompt('');

        // Notify that the update process is completed
        onScheduleUpdated(); // This should fetch new calendar data and reset isLoading
      } catch (error) {
        console.error('Error:', error);
        onScheduleUpdated();
      }
    };

    const handleConsentChange = (e) => {
        setUserConsent(e.target.checked);
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
    <div>
        {!userConsent && (
        <div style={{ color: 'red' }}>Please provide consent to the calendar modifications.</div>
      )}
      <form onSubmit={handleSubmit}>
    <div className="warning">
        <label>
          <input
            type="checkbox"
            checked={userConsent}
            onChange={handleConsentChange}
          />
          I understand and consent to modifying my Google Calendar schedule for tomorrow.
        </label>
      </div>
      <textarea
        style={inputStyle}
        value={schedulePrompt}
        onChange={(e) => setSchedulePrompt(e.target.value)}
        placeholder="Generate a schedule for tomorrow that allows me to..."
      />
      <button type="submit">Send</button>
    </form>
    </div>
    
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
    "userTimeZone": "string"
}
*/