import logo from './logo.svg';
import './App.css';
import {SignInButton} from './Components/SignInButton'
import { GoogleOAuthProvider } from '@react-oauth/google';
import CalendarComponent from './Components/Calendar';
import { GoogleAuthProvider, useGoogleAuth } from './Contexts/GoogleAuthContext';
import AuthenticatedApp from './Components/AuthenticatedApp';

function App() {
  return (
    <GoogleOAuthProvider clientId='581682671017-2ah5d48ucdblall52a02ld6g0pc2l3kt.apps.googleusercontent.com'>


      {/*The Provider is a context wrapped around components that need google authentication*/}
      <GoogleAuthProvider>
        <AuthenticatedApp/>
      </GoogleAuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

{/*
 Conditional Rendering: CalendarComponent is only rendered when isSignedIn is true
 - Allows app to reactively display component based on user authentication status
*/}