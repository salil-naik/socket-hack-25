import { useState } from "react";
import useCheckStatus from "../hooks/useCheckStatus";


export const Home = () => {
  // const { postCheckout } = useCheckout();
  const [sessionId, setSessionId] = useState<string>();
  const { status, loading } = useCheckStatus(sessionId || "");
  // const itemsToBuy = [
  //   { id: 1, quantity: 2 },
  //   { id: 2, quantity: 1 },
  // ];

  return (
    <div>
      <h1>Pay with Socket</h1>
      <div className="card">
        <button onClick={() => setSessionId("cs_test_b1XdsFFukLhq7w9JwUW1DkQm0LsRA3GTqPbDSW672XP4TQp4JsX9LkobtD")}>
          Pay motherfucker!
        </button>
        {loading && <span>loading</span>}
        {status && <span>{status}</span>}
      </div>
      {/* <p className="read-the-docs">
        10% of every transaction goes toward keeping a roof over my head.
        <br />
        Thanks for your support, he sleeps well because of you.
      </p> */}
    </div>
  );
};
