// src/components/StockItem.tsx
import React from 'react';
import { Stock } from '../types/Stock';
import './StockItem.css';

interface StockItemProps {
  stock: Stock;
  addToPortfolio: (stock: Stock) => void;
}

const StockItem: React.FC<StockItemProps> = ({ stock, addToPortfolio }) => {
  return (
    <div className="stock-item" onClick={() => addToPortfolio(stock)}>
      <p><strong>Symbol:</strong> {stock.symbol}</p>
      <p><strong>Price:</strong> ${stock.price.toFixed(2)}</p>
      <p><strong>Sector:</strong> {stock.sector}</p>
    </div>
  );
};

export default StockItem;
