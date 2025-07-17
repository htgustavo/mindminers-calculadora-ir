import type { Operation } from "@/types/operations";

export const mockOperations: Operation[] = [
  {
    id: "1",
    date: "2025-01-01",
    ticker: "PETR4",
    type: "BUY",
    price: 25.9,
    quantity: 100,
    brokerage: 8.5,
  },
  {
    id: "2",
    date: "2025-01-02",
    ticker: "PETR4",
    type: "BUY",
    price: 26.4,
    quantity: 200,
    brokerage: 8.5,
  },
  {
    id: "3",
    date: "2025-01-03",
    ticker: "PETR4",
    type: "BUY",
    price: 27.87,
    quantity: 100,
    brokerage: 8.5,
  },
  {
    id: "4",
    date: "2025-01-10",
    ticker: "PETR4",
    type: "SELL",
    price: 26.53,
    quantity: 100,
    brokerage: 8.5,
  },
  {
    id: "5",
    date: "2025-01-15",
    ticker: "PETR4",
    type: "SELL",
    price: 27.39,
    quantity: 100,
    brokerage: 8.5,
  },
];
