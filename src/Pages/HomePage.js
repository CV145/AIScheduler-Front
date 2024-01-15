import React from 'react';
import { Container, Typography, AppBar, Toolbar, Box, Paper } from '@mui/material';
import { SignInButton } from '../Components/SignInButton';

const HomePage = () => {
    return (
        <div>

            <Container maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
                <Paper elevation={3} style={{ padding: '30px', marginTop: '30px', borderRadius: '15px' }}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Welcome to Lighthouse
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Organize your day effortlessly. Let AI help you schedule your time, aligning your plans with purpose.
                    </Typography>
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <SignInButton />
                    </Box>
                </Paper>
            </Container>
        </div>
    );
};


export default HomePage;
