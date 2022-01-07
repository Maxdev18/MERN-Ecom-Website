import * as React from 'react';
import Axios from 'axios';
import { UserContext, CartContext } from '../Contexts/UserContext';
import { Link } from 'react-router-dom';
import '../styles/components/cart/cart.css';

export const Cart = () => {
  const { user, setUser } = React.useContext(UserContext);
  const { cartItems, setCartItems } = React.useContext(CartContext);
  const [ subtotal, setSubtotal ] = React.useState(0);
  const [ quantity, setQuantity ] = React.useState(0);

  React.useEffect(() => {
    let total = 0;
    let totalQuantity = 0;
    if(cartItems) {
      for (let i = 0; i < cartItems.length; i++) {
        totalQuantity += cartItems[i].quantity;
        total += cartItems[i].product.price * cartItems[i].quantity;
      }
      setSubtotal(total);
      setQuantity(totalQuantity);
    }
  }, [cartItems]);

  //Update quantity of products
  async function increment(product) {
    await Axios.post(`/cart/user/${user._id}`, { type: 'INCREMENT', product })
      .then(response => {
        setCartItems([...response.data.products]);
    });
  }

  async function decrement(product) {
    await Axios.post(`/cart/user/${user._id}`, { type: 'DECREMENT', product })
    .then(response => {
      setCartItems([...response.data.products]);
    });
  }
  
  async function deleteProduct(product) {
    await Axios.post(`/cart/user/${user._id}`, { type: 'DELETE', product })
      .then(response => {
        setCartItems([...response.data.products]);
      });
  };
  
  return (
    <div className="main-cart-container">
      <div className="cart-products-container">
        {cartItems.map(item => {
          return (
            <div className="cart-products-rendered" key={item.product._id}>
              <img src={item.product.imageURL} alt={item.product.name} className="product-photo"/>
              <div className="cart-product-info">
                <div className="cart-product-title">
                  <h3>{item.product.name}</h3>
                  <h3>${item.product.price.toFixed(2)}</h3>
                </div>

                <p className="cart-product-description">Item description: {item.product.description}</p>

                <div className="cart-quantity-container">
                  <div className="quantity-container">
                    <button onClick={() => decrement(item)} className="btn-decrement">-</button>
                    <p className="cart-quantity">{item.quantity}</p>
                    <button onClick={() => increment(item)} className="btn-increment">+</button>
                  </div>
                  
                  <img onClick={() => deleteProduct(item)} src="https://img.icons8.com/material-outlined/384/000000/trash--v2.png" className="delete-product" alt="trash can"/>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-sidebar-container">
        <div className="cart-sidebar-title">
          <h2 className="cart-title">Cart</h2>
        </div>

        <div className="subtotal-container amount-container">
          <p>Subtotal({quantity} items):</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>

        <Link to={`/cart/user/${user._id}/checkout`} className="btn-checkout">Checkout</Link>
      </div>
    </div>
  )
};