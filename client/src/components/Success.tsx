import { useLocation } from 'react-router-dom';
import useCheckStatus from '../hooks/useCheckStatus';

export const Success = () => {
  // Get session_id from search params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');

  // Use the custom hook with sessionId
  const { status, loading } = useCheckStatus(sessionId || "");


  return (
    <>
        <h1>Success</h1>  
        {loading && <p>Loading...</p>}
        {status && <p>Status: {JSON.stringify(status)}</p>}
    </>
  );
}
 