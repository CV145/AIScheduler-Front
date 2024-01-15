import React, { useState, useContext } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import Calendar from '../Components/Calendar';
import SchedulePromptForm from '../Components/SchedulePromptForm';
import { GoogleAuthProvider, useGoogleAuth } from '../Contexts/GoogleAuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [shouldFetchData, setShouldFetchData] = useState(true);

    const { isSignedIn } = useGoogleAuth();
    let navigate = useNavigate();

    if (!isSignedIn) {
        navigate('/AIScheduler-Front');
        return null;
    }

    const onScheduleSubmit = () => {
        setIsLoading(true);
    };

    const handleScheduleUpdated = () => {
        // Trigger actions to refresh calendar data...
        setShouldFetchData(true);
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            {/* Calendar */}
            <Paper style={{ marginBottom: '20px', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <Calendar
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    shouldFetchData={shouldFetchData}
                    setShouldFetchData={setShouldFetchData}
                />
            </Paper>

            {/* Schedule Prompt Form */}
            <Paper style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <SchedulePromptForm onScheduleSubmit={onScheduleSubmit} onScheduleUpdated={handleScheduleUpdated} />
            </Paper>
        </Container>
    );


};

export default DashboardPage;
