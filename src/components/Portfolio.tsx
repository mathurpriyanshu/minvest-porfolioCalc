// src/components/Portfolio.tsx
import React from 'react';
import { Stock } from '../types/Stock';
import './Portfolio.css';

interface PortfolioProps {
  portfolio: Stock[];
  diversityScore: number;
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio, diversityScore }) => {
  return (
    <div className="portfolio">
      <h2>Portfolio</h2>
      <p>Diversity Score: {diversityScore.toFixed(2)}</p>
      {portfolio.map(stock => (
        <div key={stock.symbol} className="portfolio-item">
          <p>Symbol: {stock.symbol}</p>
          <p>Price: ${stock.price.toFixed(2)}</p>
          <p>Sector: {stock.sector}</p>
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
