/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Shared Market Data Context for EB Wealth
 * Synchronizes real-time market data across scrolling tickers,
 * summary cards, and calculators.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { MarketDataResponse, MarketIndicatorItem, fetchMarketData, FALLBACK_MARKET_DATA } from '../services/marketDataService';

interface MarketDataContextType {
  data: MarketDataResponse;
  indicators: MarketIndicatorItem[];
  isLoading: boolean;
  isError: boolean;
  isStale: boolean;
  lastUpdatedFormatted: string;
  source: string;
  refresh: () => Promise<void>;
}

const MarketDataContext = createContext<MarketDataContextType | null>(null);

export const MarketDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<MarketDataResponse>(FALLBACK_MARKET_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetchMarketData();
      setData(res);
      setIsError(false);
    } catch (err) {
      console.error('Market data error:', err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    // Refresh every 60 seconds
    const interval = setInterval(() => {
      // Only refresh if tab is visible
      if (!document.hidden) {
        loadData();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [loadData]);

  const lastUpdatedFormatted = React.useMemo(() => {
    try {
      const d = new Date(data.timestamp);
      return d.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      });
    } catch {
      return 'Recent';
    }
  }, [data.timestamp]);

  return (
    <MarketDataContext.Provider
      value={{
        data,
        indicators: data.indicators,
        isLoading,
        isError,
        isStale: data.isStale,
        lastUpdatedFormatted,
        source: data.source,
        refresh: loadData
      }}
    >
      {children}
    </MarketDataContext.Provider>
  );
};

export function useMarketData(): MarketDataContextType {
  const ctx = useContext(MarketDataContext);
  if (!ctx) {
    return {
      data: FALLBACK_MARKET_DATA,
      indicators: FALLBACK_MARKET_DATA.indicators,
      isLoading: false,
      isError: false,
      isStale: true,
      lastUpdatedFormatted: 'Standard Close',
      source: FALLBACK_MARKET_DATA.source,
      refresh: async () => {}
    };
  }
  return ctx;
}

