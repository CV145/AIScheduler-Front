import React, {useState, useCallback} from 'react';
import { useGoogleAuth } from '../Contexts/GoogleAuthContext';
import { SignInButton } from './SignInButton';
import CalendarComponent from './Calendar';
import SchedulePromptForm from './SchedulePromptForm';

const AuthenticatedApp = () => {
  const { isSignedIn } = useGoogleAuth();
  const [calendarIsRefreshing, setIsRefreshing] = useState(false);

  const handleScheduleUpdate = useCallback(() => {
    setIsRefreshing(true);
  }, []);

  return (
    <div className="App">
      <SignInButton />
      {isSignedIn && <CalendarComponent isRefreshing={calendarIsRefreshing} setIsRefreshing={setIsRefreshing}/>}
      <SchedulePromptForm onScheduleUpdate={handleScheduleUpdate}/>
    </div>
  );
};

export default AuthenticatedApp;

/*
Component that acts as parent and contains global google authentication
*/
