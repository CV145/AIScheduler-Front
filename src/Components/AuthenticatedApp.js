import React, { useState, useCallback } from 'react';
import { useGoogleAuth } from '../Contexts/GoogleAuthContext';
import { Typography, AppBar, Toolbar } from '@mui/material';
import { SignInButton } from './SignInButton';
import CalendarComponent from './Calendar';
import SchedulePromptForm from './SchedulePromptForm';
import FlareIcon from '@mui/icons-material/Flare';
import HomePage from '../Pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from '../Pages/DashboardPage.js';

const AuthenticatedApp = () => {
  const { isSignedIn } = useGoogleAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [shouldFetchCalendarData, setShouldFetchCalendarData] = useState(false);

  const handleScheduleSubmit = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handleScheduleUpdated = () => {
    // Trigger actions to refresh calendar data...
    setShouldFetchCalendarData(true);
  };

  return (
    <div className="App">
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>

          <Typography variant="h6" color="inherit" noWrap style={{ flexGrow: 1 }}>
            Lighthouse
            <FlareIcon />
          </Typography>
        </Toolbar>
      </AppBar>

      <Router>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/AIScheduler-Front" element={<HomePage />} />
          {/* ... other authenticated routes */}
        </Routes>
      </Router>
    </div>
  );
};

export default AuthenticatedApp;

/*
Component that acts as parent and contains global google authentication
*/
