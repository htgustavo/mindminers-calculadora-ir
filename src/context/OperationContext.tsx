import type { ReactNode } from "react";
import { createContext, useContext } from "react";

import { useOperation } from "@/hooks/useOperation";

type OperationContextType = ReturnType<typeof useOperation>;

const OperationContext = createContext<OperationContextType | undefined>(
  undefined,
);

interface OperationProviderProps {
  children: ReactNode;
}

export function OperationProvider({ children }: OperationProviderProps) {
  const data = useOperation();

  return (
    <OperationContext.Provider value={data}>
      {children}
    </OperationContext.Provider>
  );
}

export function useOperationContext() {
  const context = useContext(OperationContext);
  if (context === undefined) {
    throw new Error(
      "useOperationContext must be used within a OperationProvider",
    );
  }
  return context;
}
