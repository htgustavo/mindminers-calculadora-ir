export interface Operation {
  id: string;
  date: string;
  ticker: string;
  type: "BUY" | "SELL";
  price: number;
  quantity: number;
  brokerage: number;
  createdAt?: string;
}

export interface OperationPosition {
  ticker: string;
  averagePrice: number;
  quantity: number;
  accumulatedLoss: number;
}

export interface TaxCalculationResult {
  operation: Operation;
  result: number;
  tax: number;
  position: OperationPosition;
}
