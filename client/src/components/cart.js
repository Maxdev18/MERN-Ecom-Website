import * as React from 'react';
import Axios from 'axios';
import { UserContext, CartContext } from '../Contexts/UserContext';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { user, setUser } = React.useContext(UserContext);
  const { cartItems, setCartItems } = React.useContext(CartContext);
  const [ subtotal, setSubtotal ] = React.useState(0);
  const [ quantity, setQuantity ] = React.useState(0);
  console.log(cartItems);

  React.useEffect(() => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += 0;
    }
    setSubtotal(total);
  }, []);

  //Update quantity of products
  async function updateQuantity(productQuantity) {
    await Axios.get(`/cart/user/${user._id}`, productQuantity)
      .then(response => {
        console.log(response);
      });
  };
  
  return (
    <div className="main-cart-container">
      <div className="cart-products-container">
        {cartItems.map(item => {
          return (
            <div className="cart-products-rendered" key={item._id}>
              <img src={item.imageURL} alt={item.name} className="product-photo"/>
              <div className="cart-product-info">
                <div className="cart-product-title">
                  <h3>{item.name}</h3>
                  <h3>{item.price}</h3>
                </div>

                <p className="cart-product-description">{item.description}</p>

                <div className="cart-quantity-container">
                  <div className="quantity-container">
                    <input type="text" className="cart-quantity" onChange={e => setQuantity(e.target.value)} />
                    <button onClick={updateQuantity(quantity)} className="btn-update">Update</button>
                  </div>
                  
                  <img src="https://img.icons8.com/material-outlined/384/000000/trash--v2.png" className="delete-product" alt="trash can"/>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="cart-sidebar-container">
        <div className="cart-sidebar-title">
          <h2 className="cart-title">Cart</h2>
        </div>

        <div className="subtotal-container">
          <p>Subtotal({cartItems.length} items):</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>

        <Link to={`/cart/user/${user._id}/checkout`} className="btn-checkout">Checkout</Link>
      </div>
    </div>
  )
};