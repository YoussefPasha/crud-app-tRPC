export interface IApartment {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
  createdAt: string;
  price: string;
  ratings: number;
}

export interface IApartmentById {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  units: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  price: string;
  ratings: number;
}

export interface IApartmentsAPIResponse {
  data: IApartment[];
  total: number;
  page: number;
  totalPages: number;
}

export interface IApartmentAPIResponse {
  data: IApartmentById;
}
