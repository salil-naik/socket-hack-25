import { useEffect, useState } from 'react';

const useCheckStatus = (sessionId: string) => {
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3000/dev/api/status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ session_id: sessionId }), // Pass the session ID
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setStatus(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchStatus();
    }
  }, [sessionId]);

  return { status, loading, error };
};

export default useCheckStatus;
