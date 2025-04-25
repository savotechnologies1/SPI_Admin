import { createContext, useState, ReactNode } from "react";

// Define Part Data Structure
interface Part {
  partNumber: string;
  partFamily : string;
  description : string;
  cost: number;
  leadTime : number;
  availableStock: string;
  orderQty: number;
  cycleTime: number;
}

// Define Context Type
interface PartContextType {
  parts: Part[];
  addPart: (newPart: Part) => void;
}

// Create Context with Default Values
export const PartContext = createContext<PartContextType | undefined>(undefined);

// Props for Provider
interface PartProviderProps {
  children: ReactNode;
}

// Provider Component
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
