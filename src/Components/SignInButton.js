import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useGoogleAuth } from '../Contexts/GoogleAuthContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const SignInButton = () => {
  const buttonStyle = {
    margin: '20px 0'
  };

  const navigate = useNavigate();



  console.log("Context: ", useGoogleAuth());
  const authContext = useGoogleAuth();

  const { isSignedIn, handleSignIn, handleSignOut } = useGoogleAuth();

  const googleLogin = useGoogleLogin({
    onSuccess: tokenResponse => {
      //Successful login actions
      handleSignIn(tokenResponse.access_token);
      navigate('/dashboard');
    },
    onError: () => {
      console.log('Login Failed');
    }
  });

  return (
    <div style={{ position: 'relative' }}>
      {isSignedIn ? (
        <Button style={buttonStyle} variant="contained" color="primary" onClick={handleSignOut}>Sign Out</Button>
      ) : (
        <Button style={buttonStyle} variant="contained" color="primary" onClick={() => googleLogin()}>Sign in with Google</Button>
      )}
    </div>
  );
};

/*
We got the tokenResponse, now we need to do things like:
- replace the sign in button with sign out
- send requests to the backend containing the
schedule prompt and google token
- use the google calendar api to output the user's calendar data

Take a deep breath... take some time to focus... find a nice place to study and work
*/