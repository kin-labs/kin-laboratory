import React, { ReactNode, useEffect, useState } from 'react';

const DEFAULT_CREATION_PRICE = 0.00204928;
const DEFAULT_TRANSACTION_PRICE = 0.000005;

const DEFAULT_CREATION_MAX = 1_000;
const DEFAULT_TRANSACTION_MAX = 100_000;

export interface WebCalculatorProviderContext {
  creationPrice: number;
  creationCount: number;
  creationMax: number;
  creationTotal: number;
  setCreationCount: (value: number) => void;
  transactionPrice: number;
  transactionCount: number;
  transactionMax: number;
  transactionTotal: number;
  setTransactionCount: (value: number) => void;
  total: number;
}

const WebCalculatorContext = React.createContext<WebCalculatorProviderContext>(
  {} as WebCalculatorProviderContext
);

function WebCalculatorProvider({ children }: { children: ReactNode }) {
  // Prices
  const [creationPrice] = useState<number>(DEFAULT_CREATION_PRICE);
  const [transactionPrice] = useState<number>(DEFAULT_TRANSACTION_PRICE);

  // Max Values
  const [creationMax, setCreationMax] = useState<number>(DEFAULT_CREATION_MAX);
  const [transactionMax, setTransactionMax] = useState<number>(
    DEFAULT_TRANSACTION_MAX
  );

  // Counters
  const [creationCount, setCreationCount] = useState<number>(400);
  const [transactionCount, setTransactionCount] = useState<number>(36058);

  // Totals
  const creationTotal = creationCount * creationPrice;
  const transactionTotal = transactionCount * transactionPrice;
  const total = creationTotal + transactionTotal;

  useEffect(() => {
    if (creationCount >= creationMax) {
      setCreationMax(creationMax * 2);
    }
    if (creationCount < DEFAULT_CREATION_MAX) {
      setCreationMax(DEFAULT_CREATION_MAX);
    }
  }, [creationMax, creationCount]);

  useEffect(() => {
    if (transactionCount >= transactionMax) {
      setCreationMax(transactionMax * 2);
    }
    if (transactionCount < DEFAULT_TRANSACTION_MAX) {
      setCreationMax(DEFAULT_TRANSACTION_MAX);
    }
  }, [transactionMax, transactionCount]);

  const value: WebCalculatorProviderContext = {
    creationCount,
    creationMax,
    creationPrice,
    creationTotal,
    setCreationCount,
    setTransactionCount,
    total,
    transactionCount,
    transactionMax,
    transactionPrice,
    transactionTotal,
  };

  return (
    <WebCalculatorContext.Provider value={value}>
      {children}
    </WebCalculatorContext.Provider>
  );
}

const useWebCalculator = () => React.useContext(WebCalculatorContext);

export { WebCalculatorProvider, useWebCalculator };
