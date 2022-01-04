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
  async function updateQuantity(productQuantity) {
    await Axios.get(`/cart/user/${user._id}`, productQuantity)
      .then(response => {
        console.log(response);
      });
  };
  
  async function deleteProduct() {
    await Axios.get(`/cart/user/${user._id}`)
      .then(response => {
        console.log(response);
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
                    <input type="text" value={item.quantity} className="cart-quantity" onChange={e => setQuantity(e.target.value)} />
                    <button onClick={() => updateQuantity(quantity)} className="btn-update">Update</button>
                  </div>
                  
                  <img onClick={deleteProduct} src="https://img.icons8.com/material-outlined/384/000000/trash--v2.png" className="delete-product" alt="trash can"/>
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

        <div className="subtotal-container">
          <p>Subtotal({quantity} items):</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>

        <Link to={`/cart/user/${user ? user._id : 'unauthorized'}/checkout`} className="btn-checkout">Checkout</Link>
      </div>
    </div>
  )
};