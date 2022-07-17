import React from "react";
import App from "../../App";
import { usePaystackPayment } from "react-paystack";

function Payment() {
  const [email, setEmail] = React.useState("");
  const [homePage, setHomePage] = React.useState(false);

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: 20000,
    publickey: "pk_test_2bdbcc37a718423f78d2750348393f28b9b9b51b",
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference) => {
    alert(reference);
  };

  const onClose = () => {
    setHomePage(true);
  };

  return (
    <div>
      {!homePage ? (
        <div>
          <div>
            <div>
              <h3>Make Payment</h3>
            </div>
          </div>
          <div></div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Amount</label>
            <input type="tel" />
          </div>
          <div>
            <button
              onClick={() => {
                initializePayment(onSuccess, onClose);
              }}
            >
              Pay
            </button>
          </div>
        </div>
      ) : (
        <App />
      )}
    </div>
  );
}
export default Payment;
