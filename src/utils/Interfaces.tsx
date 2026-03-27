export interface CustomerInterface {
  id: string;
  name: string;
  email: string;
  customerPhone: string;
}

export interface ProductNumberInterface {
  part_id: string;
  productId?: string;
  partNumber: string;
  partDescription: string;
  cost: number;
  availStock: number;
  type: string;
  productDescription: string;
}

export interface WorkInstructions {
  part: string;
  stepNumber: string;
  workInstruction: string;
  workInstructionImg: File[];
  workInstructionVideo: File | null;
}

export interface PartNumberInterface {
  part_id: string;
  partNumber: string;
  partDescription: string;
  cost: number;
  availStock: number;
  type: string;
}

export interface processInterface {
  id: string;
  name: string;
  partFamily: string;
  processName?: string;
  machineName?: string;
}

export interface SearchResultItem {
  id: string;
  productDescription: string;
  productNumber: string;
  location?: string;
  productQuantity: number;
  [key: string]: any;
}

export interface StockOrderScheduleInterface {
  customerName: string;
  shipDate: string;
  partNumber: string;
}

export interface ScheduledItem extends SearchResultItem {
  scheduledQty: number;
  shipDate: Date;
}

export interface ItemSelectedProps {
  availableItems: SearchResultItem[];
  isLoading: boolean;
}

export interface ItemInputState {
  [itemId: string]: {
    qty: string;
    shipDate: Date;
  };
}
