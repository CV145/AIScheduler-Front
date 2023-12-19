import React from 'react';
import { useGoogleAuth } from '../Contexts/GoogleAuthContext';
import { SignInButton } from './SignInButton';
import CalendarComponent from './Calendar';

const AuthenticatedApp = () => {
  const { isSignedIn } = useGoogleAuth();

  return (
    <div className="App">
      <SignInButton />
      {isSignedIn && <CalendarComponent />}
    </div>
  );
};

export default AuthenticatedApp;

/*
Component that acts as parent and contains global google authentication
*/
