// src/components/App.tsx
import React, { useState, useEffect } from 'react';
import { fetchStockData } from '../api/fetchStockData';
import { Stock } from '../types/Stock';
import StockList from './StockList';
import Portfolio from './Portfolio';
import './App.css';

const App: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [portfolio, setPortfolio] = useState<Stock[]>([]);

  useEffect(() => {
    fetchStockData().then(data => {
      setStocks(data);
    });
  }, []);

  const addToPortfolio = (stock: Stock) => {
    if (!portfolio.find(p => p.symbol === stock.symbol)) {
      setPortfolio([...portfolio, stock]);
    }
  };

  const calculateDiversityScore = (): number => {
    const sectorWeights: { [key: string]: number } = {};
    portfolio.forEach(stock => {
      if (sectorWeights[stock.sector]) {
        sectorWeights[stock.sector] += stock.price;
      } else {
        sectorWeights[stock.sector] = stock.price;
      }
    });

    const totalValue = portfolio.reduce((acc, stock) => acc + stock.price, 0);
    const sectorDiversity = Object.values(sectorWeights).map(value => value / totalValue);
    const diversityScore = (1 - sectorDiversity.reduce((acc, w) => acc + w ** 2, 0)) * 100;

    return diversityScore;
  };

  return (
    <div className="App">
      <h1>Minvest Portfolio Diversity Calculator</h1>
      <div className="container">
        <div className="selected-stocks">
          <h2>Selected Stocks</h2>
          <Portfolio portfolio={portfolio} diversityScore={calculateDiversityScore()} />
        </div>
        <div className="all-stocks">
          <h2>All Stocks</h2>
          <StockList stocks={stocks} addToPortfolio={addToPortfolio} />
        </div>
        <div className="diversity-score">
          <h2>Stock Portfolio Diversity</h2>
          <div className="score-box">
            <p>{calculateDiversityScore().toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
