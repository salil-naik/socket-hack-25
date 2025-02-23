import { useEffect, useState } from 'react';

const useCheckStatus = (sessionId: string) => {
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(true);

  /**
   * Okay, here is what we do
   * 
   * 1. Make a login page that takes the session id
   * 2. Display the session id on the UI for now. 
   * 3. login page takes the session id and calls the api
   * 4. Proof is generated agains the status of the response
   */

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3000/dev/api/status?session_id=${sessionId}`, {
          method: 'GET',
          headers: {
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Methods": "OPTIONS, GET",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setStatus(data);
      } catch (err) {
        console.error('Error fetching status:', err);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchStatus();
    }
  }, [sessionId]);

  return { status, loading };
};

export default useCheckStatus;
