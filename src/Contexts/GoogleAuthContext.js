import React, { createContext, useContext, useState } from 'react';

const GoogleAuthContext = createContext(null);

//Consuming context using useContext hook in functional components
export const useGoogleAuth = () => useContext(GoogleAuthContext);

export const GoogleAuthProvider = ({ children }) => {
  const [googleToken, setGoogleToken] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = (token) => {
    setGoogleToken(token);
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setGoogleToken(null);
    setIsSignedIn(false);
  };

  return (
    <GoogleAuthContext.Provider value={{ googleToken, isSignedIn, handleSignIn, handleSignOut }}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

/*
 What is a context?
- Used for sharing global data across many components
- Share values like user data and UI themes, authentication state etc

React.createContext() returns a Context object

Provider componetns allow child components to have access to given values like googleToken and handleSignIn/Out functions

We pass functions down to call them in the child components
*/