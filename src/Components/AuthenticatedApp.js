import React, {useState, useCallback} from 'react';
import { useGoogleAuth } from '../Contexts/GoogleAuthContext';
import { SignInButton } from './SignInButton';
import CalendarComponent from './Calendar';
import SchedulePromptForm from './SchedulePromptForm';

const AuthenticatedApp = () => {
  const { isSignedIn } = useGoogleAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [shouldFetchCalendarData, setShouldFetchCalendarData] = useState(false);

  const handleScheduleSubmit = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handleScheduleUpdated = () => {
    // Trigger actions to refresh calendar data...
    setShouldFetchCalendarData(true);
};

  return (
    <div className="App">
      <SignInButton />
      {isSignedIn && <CalendarComponent isLoading={isLoading} setIsLoading={setIsLoading} shouldFetchData={shouldFetchCalendarData} setShouldFetchData={setShouldFetchCalendarData} />}
      
      <SchedulePromptForm onScheduleSubmit={handleScheduleSubmit} onScheduleUpdated={handleScheduleUpdated}/>
    </div>
  );
};

export default AuthenticatedApp;

/*
Component that acts as parent and contains global google authentication
*/
