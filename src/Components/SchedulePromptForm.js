import React, { useState } from 'react';
import { useGoogleAuth } from '../Contexts/GoogleAuthContext';
import { Button, Container, Typography, TextareaAutosize, FormControlLabel, Checkbox } from '@mui/material';

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
      const response = await fetch('https://aischedulerapi.azurewebsites.net/Schedule', {
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
    marginBottom: '20px'
  };

  return (
    <Container style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', marginTop: '20px' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={userConsent}
                onChange={handleConsentChange}
                name="userConsent"
                color="primary"
              />
            }
            label="I understand and consent to overriding my Google Calendar schedule for tomorrow."
          />
        </div>
        <TextareaAutosize
          value={schedulePrompt}
          onChange={(e) => setSchedulePrompt(e.target.value)}
          placeholder="Generate a schedule for tomorrow that allows me to..."
          minRows={5}
          style={{ width: '100%', marginBottom: '20px', padding: '10px', borderColor: '#e0e0e0', borderRadius: '4px' }}
          disabled={!userConsent}
        />
        <Button type="submit" variant="contained" color="primary" disabled={!userConsent} fullWidth>
          Send
        </Button>
      </form>
      {!userConsent && (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
          Please provide consent to the calendar modifications.
        </div>
      )}
    </Container>
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