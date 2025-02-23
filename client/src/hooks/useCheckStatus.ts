import { useEffect, useState } from 'react';

const useCheckStatus = (sessionId: string) => {
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`https://6ovc37fu52.execute-api.us-east-1.amazonaws.com/dev/api/status?session_id=${sessionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
