export interface PurchaseProduct {
    productCode: string;
    productName: string;
    barcode: string;
    storageType: string;
    quantity: number;
    pricePerUnit: number;
    totalAmount: number;
    salesRate?: number;
    rackNo?: string;
    manufacturingDate?: string;
    expiryDate?: string;
  }
  
  export interface Purchase {
    id: number;
    invoiceNo: string;
    invoiceDate: string;
    referenceNo1?: string;
    referenceNo2?: string;
    taxType: string;
    supplierId: number;
    supplierName: string;
    supplierInvoiceNo?: string;
    supplierInvoiceDate?: string;
    products: PurchaseProduct[];
    subTotal: number;
    discount: number;
    tax: number;
    freightCharges: number;
    otherCharges: number;
    roundOff: number;
    grandTotal: number;
  }
  
  export const mockPurchases: Purchase[] = [];