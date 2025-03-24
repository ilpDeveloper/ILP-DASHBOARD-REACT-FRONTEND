export interface Supplier {
    id: number;
    name: string;
    address: string;
    contactNo: string;
  }
  
  export interface Product {
    id: number;
    productCode: string;
    productName: string;
    barcode: string;
    quantity: number;
    pricePerUnit: number;
    totalAmount: number;
    salesRate: number;
    rackNo: string;
    manufacturingDate: string;
    expiryDate: string;
    supplier: Supplier;
    imageUrl: string;
  }
  
  export const mockProducts: Product[] = [
    {
      id: 1,
      productCode: "P001",
      productName: "Laptop Pro",
      barcode: "123456789012",
      quantity: 10,
      pricePerUnit: 999.99,
      totalAmount: 9999.90,
      salesRate: 5,
      rackNo: "A1",
      manufacturingDate: "2023-06-01",
      expiryDate: "2026-06-01",
      supplier: {
        id: 1,
        name: "TechCorp",
        address: "123 Tech St, Silicon Valley, CA",
        contactNo: "555-1234",
      },
      imageUrl: "https://via.placeholder.com/150?text=Laptop+Pro",
    },
    {
      id: 2,
      productCode: "P002",
      productName: "Wireless Mouse",
      barcode: "987654321098",
      quantity: 50,
      pricePerUnit: 19.99,
      totalAmount: 999.50,
      salesRate: 20,
      rackNo: "B2",
      manufacturingDate: "2024-01-15",
      expiryDate: "2027-01-15",
      supplier: {
        id: 2,
        name: "GearZone",
        address: "456 Gear Rd, Austin, TX",
        contactNo: "555-5678",
      },
      imageUrl: "https://via.placeholder.com/150?text=Wireless+Mouse",
    },
    {
      id: 3,
      productCode: "P003",
      productName: "USB-C Cable",
      barcode: "456789123456",
      quantity: 100,
      pricePerUnit: 5.99,
      totalAmount: 599.00,
      salesRate: 30,
      rackNo: "C3",
      manufacturingDate: "2023-12-10",
      expiryDate: "2025-12-10",
      supplier: {
        id: 1,
        name: "TechCorp",
        address: "123 Tech St, Silicon Valley, CA",
        contactNo: "555-1234",
      },
      imageUrl: "https://via.placeholder.com/150?text=USB-C+Cable",
    },
    {
      id: 4,
      productCode: "P004",
      productName: "Keyboard Mech",
      barcode: "789123456789",
      quantity: 25,
      pricePerUnit: 79.99,
      totalAmount: 1999.75,
      salesRate: 15,
      rackNo: "D4",
      manufacturingDate: "2023-09-20",
      expiryDate: "2026-09-20",
      supplier: {
        id: 3,
        name: "KeyMasters",
        address: "789 Key Ave, Seattle, WA",
        contactNo: "555-9012",
      },
      imageUrl: "https://via.placeholder.com/150?text=Keyboard+Mech",
    },
    {
      id: 5,
      productCode: "P005",
      productName: "Monitor 4K",
      barcode: "321654987321",
      quantity: 8,
      pricePerUnit: 299.99,
      totalAmount: 2399.92,
      salesRate: 3,
      rackNo: "E5",
      manufacturingDate: "2024-02-01",
      expiryDate: "2027-02-01",
      supplier: {
        id: 2,
        name: "GearZone",
        address: "456 Gear Rd, Austin, TX",
        contactNo: "555-5678",
      },
      imageUrl: "https://via.placeholder.com/150?text=Monitor+4K",
    },
  ];