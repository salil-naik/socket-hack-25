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
        <button onClick={() => postCheckout(itemsToBuy)}>Pay now!</button>
      </div>
    </div>
  );
};
