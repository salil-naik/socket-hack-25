import { useLocation } from "react-router-dom";
import useCheckStatus from "../hooks/useCheckStatus";
import shrey from "../assets/IMG_0B8497F06E53-1.jpeg";

export const Success = () => {
  // Get session_id from search params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  // Use the custom hook with sessionId
  const { status, loading } = useCheckStatus(sessionId || "");

  const {payment_intent} = status || {};

  return (
    <>
      <h1>Success</h1>
      {loading && <p>Loading...</p>}
      {status && (
        <div>
          <img src={shrey} style={{borderRadius: '20px', width: '200px'}} />
          <p className="read-the-docs">
            10% of every transaction goes toward this guy here 👆
            <br />
            Thanks for your support, he sleeps well because of you.
          </p>
          <p>Payment Id: {payment_intent}</p>
        </div>
      )}
    </>
  );
};
