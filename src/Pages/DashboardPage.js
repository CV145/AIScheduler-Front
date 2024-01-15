import React, { useState } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import Calendar from '../Components/Calendar';
import SchedulePromptForm from '../Components/SchedulePromptForm';

const DashboardPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [shouldFetchData, setShouldFetchData] = useState(true);

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
                <SchedulePromptForm />
            </Paper>
        </Container>
    );


};

export default DashboardPage;
