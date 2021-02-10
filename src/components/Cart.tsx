import React from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../store';
import { ICartItem } from '../store/modules/cart/types';

const Cart: React.FC = () => {
  const items = useSelector<IState, ICartItem[]>(state => state.cart.items);
  const total = useSelector<IState, number>(state => state.cart.total);

  return (
    <div>
      <h1>Carrinho</h1>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.product.id}>
              <td>{item.product.title}</td>
              <td>{(item.product.price).toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>{(item.product.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td>{total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Cart;