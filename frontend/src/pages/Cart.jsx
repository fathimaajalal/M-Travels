import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../context/BookContext';

const Cart = () => {
  // const { busRoutes, currency, cartItems } = useContext(ShopContext);
  const { busRoutes, currency, busItems } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const items in busItems) {
      for (const item in busItems[items]) {
        if (busItems[items][item] > 0) {
          tempData.push({
            productId: item,
            quantity: busItems[items][item],
          });
        }
      }
    }

    console.log(tempData);
  }, [busItems]);

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cartData.map((data, index) => (
          <li key={index}>
            Product ID: {data.productId}, Quantity: {data.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;