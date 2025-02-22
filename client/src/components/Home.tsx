import useCheckout from "../hooks/useCheckout";

export const Home = () => {
  const { postCheckout } = useCheckout();
  const itemsToBuy = [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
  ];

  return (
    <div>
      <h1>Pay with Socket</h1>
      <div className="card">
        <button onClick={() => postCheckout(itemsToBuy)}>
          Pay motherfucker!
        </button>
      </div>
      {/* <p className="read-the-docs">
        10% of every transaction goes toward keeping a roof over my head.
        <br />
        Thanks for your support, he sleeps well because of you.
      </p> */}
    </div>
  );
};
