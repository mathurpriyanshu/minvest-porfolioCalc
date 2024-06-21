// src/components/StockList.tsx
import React from 'react';
import { Stock } from '../types/Stock';
import StockItem from './StockItem';
import './StockList.css';

interface StockListProps {
  stocks: Stock[];
  addToPortfolio: (stock: Stock) => void;
}

const StockList: React.FC<StockListProps> = ({ stocks, addToPortfolio }) => {
  return (
    <div className="stock-list">
      {stocks.length === 0 ? (
        <p>No stocks available</p>
      ) : (
        stocks.map(stock => (
          <StockItem key={stock.symbol} stock={stock} addToPortfolio={addToPortfolio} />
        ))
      )}
    </div>
  );
};

export default StockList;
