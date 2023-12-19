import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useGoogleAuth } from '../Contexts/GoogleAuthContext';

export const SignInButton = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { handleSignIn } = useGoogleAuth();


  const googleLogin = useGoogleLogin({
    onSuccess: tokenResponse => 
    {
        //Successful login actions
        console.log(tokenResponse);
        handleSignIn(tokenResponse.access_token);
        setIsSignedIn(true);
    },
    onError: () => 
    {
        console.log('Login Failed');
        setIsSignedIn(false);
    }
  });

  const handleSignOut = () => {
    // Implement sign-out logic
    setIsSignedIn(false);
  };
  

  return (
    <div>
      {isSignedIn ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={() => googleLogin()}>Sign in with Google</button>
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