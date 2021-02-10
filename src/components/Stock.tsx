import React, { useCallback, useEffect, useState } from 'react';
import api from '../services/api';
import { IProduct } from '../store/modules/cart/types';

interface IStock {
  id: number;
  title: string;
  quantity: number;
}

const Stock: React.FC = () => {
  const [stock, setStock] = useState<IStock[]>([]);

  const populateState = useCallback(async () => {
    const stockResponse = await api.get('stock');
    const productResponse = await api.get('products');

    const formattedStock = stockResponse.data.map((item: Omit<IStock, 'title'>) => {
      const productIndex = productResponse.data.findIndex((product: IProduct) => product.id === item.id);

      return {
        id: item.id,
        title: productResponse.data[productIndex].title,
        quantity: item.quantity,
      }
    });

    setStock(formattedStock);
  }, []);

  useEffect(() => {
    populateState();
  }, [populateState]);

  return (
    <div>
      <h1>Estoque</h1>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Estoque</th>
          </tr>
        </thead>
        <tbody>
          {stock.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stock;