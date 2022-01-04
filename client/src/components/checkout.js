import * as React from 'react';
import Axios from 'axios';
import { UserContext, CartContext } from '../Contexts/UserContext';
import { Link } from 'react-router-dom';

export const Checkout = () => {
  const { user, setUser } = React.useContext(UserContext);
  const { cartItems, setCartItems } = React.useContext(CartContext);
  const [ subtotal, setSubtotal ] = React.useState(0);
  console.log(cartItems);

  React.useEffect(() => {
    let total = 0;
    let quantityTotal = 0;
    if(user) {
      for (let i = 0; i < cartItems.length; i++) {
        total += 0;
      }
    }
    
    setSubtotal(total);
  }, [cartItems]);

  return (
    <div className="main-checkout-container">
      
    </div>
  )
};