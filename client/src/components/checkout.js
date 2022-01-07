import * as React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { UserContext, CartContext } from '../Contexts/UserContext';
import '../styles/components/cart/checkout.css';
import { PayPalButton } from "react-paypal-button-v2";
import Axios from 'axios';

export const Checkout = () => {
  const { user, setUser } = React.useContext(UserContext);
  const { cartItems, setCartItems } = React.useContext(CartContext);
  const [ subtotal, setSubtotal ] = React.useState(0);
  const [ quantity, setQuantity ] = React.useState(0);
  const [ tot, setTot ] = React.useState(0);
  const [ tax, setTax ] = React.useState(0);

  React.useEffect(() => {
    let total = 0;
    let totalQuantity = 0;
    if(cartItems) {
      for (let i = 0; i < cartItems.length; i++) {
        totalQuantity += cartItems[i].quantity;
        total += cartItems[i].product.price * cartItems[i].quantity;
      }

      //Calculate total outcome
      setTax(total * .06);
      setSubtotal(total);
      setQuantity(totalQuantity);
    }
    setTot(total * 1.06);
  }, [cartItems]);

  async function handleTransaction() {
    await Axios.post(`/cart/user/${user._id}/checkout`)
      .then(() => {
        //Clear cart items
        setCartItems([]);
      });
  }

  return (
    <div className="main-checkout-container">
      
      <div className="checkout-info-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="subtotal-container amount-container">
          <p>Subtotal({quantity} items):</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>

        <div className="tax-container amount-container">
          <p>Tax(6%):</p>
          <p>${tax.toFixed(2)}</p>
        </div>

        <div className="total-container amount-container">
          <p>Total:</p>
          <p>${tot.toFixed(2)}</p>
        </div>
        
        <div className="user-information-container">
          <h1>Payment Methods</h1>
          <PayPalButton
                amount={tot}
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={(details, data) => {
                  alert("Transaction completed by " + details.payer.name.given_name);
                  handleTransaction();
                  
                  // // OPTIONAL: Call your server to save the transaction
                  // return fetch("/paypal-transaction-complete", {
                  //   method: "post",
                  //   body: JSON.stringify({
                  //     orderId: data.orderID
                  //   })
                  //});
                  //Didn't add the code above because i'm not including a backend for an admin to look at orders
                }}
                options={{
                  clientId: "ARudjgN_Bja5iKlku07IufWVjrv_p5ANnUAJ8Gkd0S_ZAR1nfGL_ZGa_aGr8GhMGh2awhIUsU7qciUX7",
                  currency: "USD"
                }}
              />
        </div>
      </div>
    </div>
  )
};