import { createContext, useState, ReactNode } from "react";
interface Part {
  partNumber: string;
  partFamily: string;
  productNumber: string;
  description: string;
  cost: number;
  leadTime: number;
  availableStock: string;
  orderQty: number;
  cycleTime: number;
}

interface PartContextType {
  parts: Part[];
  addPart: (newPart: Part) => void;
}

export const PartContext = createContext<PartContextType | undefined>(
  undefined
);

interface PartProviderProps {
  children: ReactNode;
}

export function PartProvider({ children }: PartProviderProps) {
  const [parts, setParts] = useState<Part[]>([]);

  const addPart = (newPart: Part) => {
    setParts([...parts, newPart]);
  };

  return (
    <PartContext.Provider value={{ parts, addPart }}>
      {children}
    </PartContext.Provider>
  );
}
