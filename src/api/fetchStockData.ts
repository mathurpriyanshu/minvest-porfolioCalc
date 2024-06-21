// src/api/fetchStockData.ts
import { Stock } from '../types/Stock';

const API_KEY = process.env.REACT_APP_API_KEY || 'cpm1km1r01qn8g1vebf0cpm1km1r01qn8g1vebfg';
const STOCK_API_URL = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_KEY}`;
const QUOTE_API_URL = (symbol: string) => `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
const PROFILE_API_URL = (symbol: string) => `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`;

export const fetchStockData = async (): Promise<Stock[]> => {
  try {
    const response = await fetch(STOCK_API_URL);
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      console.error('No stock symbols fetched');
      return [];
    }

    const stockDetails = await Promise.all(data.slice(0, 30).map(async (stock: any) => {
      try {
        const stockDataResponse = await fetch(QUOTE_API_URL(stock.symbol));
        const stockData = await stockDataResponse.json();

        const profileDataResponse = await fetch(PROFILE_API_URL(stock.symbol));
        const profileData = await profileDataResponse.json();

        return {
          symbol: stock.symbol,
          price: stockData.c,
          sector: profileData.finnhubIndustry || 'Unknown'
        } as Stock;
      } catch (error) {
        console.error('Error fetching data for stock:', stock.symbol, error);
        return null;
      }
    }));

    return stockDetails.filter((stock): stock is Stock => stock !== null);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return [];
  }
};
