import logo from './logo.svg';
import './App.css';
import {SignInButton} from './Components/SignInButton'
import { GoogleOAuthProvider } from '@react-oauth/google';
import CalendarComponent from './Components/Calendar';
import { GoogleAuthProvider } from './Contexts/GoogleAuthContext';

function App() {
  return (
    <GoogleOAuthProvider clientId='581682671017-2ah5d48ucdblall52a02ld6g0pc2l3kt.apps.googleusercontent.com'>

    {/*The Provider is a context wrapped around components that need google authentication*/}
    <GoogleAuthProvider>
      <div className="App">
        <SignInButton/>
        <CalendarComponent/>
      </div>
    </GoogleAuthProvider>

    </GoogleOAuthProvider>
  );
}

export default App;
