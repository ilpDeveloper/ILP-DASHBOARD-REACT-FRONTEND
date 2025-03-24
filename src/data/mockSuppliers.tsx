export interface Supplier {
    id: number;
    name: string;
    address: string;
    contactNo: string;
  }
  
  export const mockSuppliers: Supplier[] = [
    {
      id: 1,
      name: "TechCorp",
      address: "123 Tech St, Silicon Valley, CA",
      contactNo: "555-1234",
    },
    {
      id: 2,
      name: "GearZone",
      address: "456 Gear Rd, Austin, TX",
      contactNo: "555-5678",
    },
    {
      id: 3,
      name: "KeyMasters",
      address: "789 Key Ave, Seattle, WA",
      contactNo: "555-9012",
    },
  ];