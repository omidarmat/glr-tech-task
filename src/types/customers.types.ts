export enum CusotmerStatus {
  Active = "active",
  Inactive = "inactive",
}

export interface Customer {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  city: string;
  status: CusotmerStatus;
  lastOrderAmount: string;
}
