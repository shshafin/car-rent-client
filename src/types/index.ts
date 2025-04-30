import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface ICar {
  _id: string;
  name: string;
  model: string;
  seats: number;
  rate: number;
  image: string;
}

export interface ILocation {
  _id: string;
  location: string;
  country: string;
  state: string;
  city: string;
  zipCode?: string;
}

export interface IPackage {
  _id: string;
  name: string;
  description?: string;
  pickupLocation: any;
  dropLocation: any;
  carPricing: any;
  features?: string[];
  createdBy: any;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IUser = {
  _id: string;
  role: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  password: string;
};

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label?: React.ReactNode;
  name: string;
  isClearable?: boolean;
  defaultValue?: string;
}

export interface IMake {
  _id: string;
  make: string;
  // year?: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IYear {
  _id: string;
  year: {
    numeric: number;
    display: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IModel {
  _id: string;
  model: string;
  make: IMake | string;
  year: IYear | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ITrim {
  _id: string;
  trim: string;
  make: IMake | string;
  model: IModel | string;
  year: IYear | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ITyreSize {
  _id: string;
  tireSize: string;
  make: IMake | string;
  model: IModel | string;
  year: IYear | string;
  trim: ITrim | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IBooking {
  _id: string
  user: User
  car: Car
  pickupLocation: PickupLocation
  dropLocation: DropLocation
  package: string
  pickUpTime: string
  totalAmount: number
  paymentStatus: string
  paymentType: string
  amountPaid: number
  transactionId: string
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

export interface User {
  _id: string
  role: string
  fullName: string
  email: string
  phone: string
  address: string
  zipCode: string
  city: string
  country: string
  needsPasswordChange: boolean
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

export interface Car {
  _id: string
  name: string
  model: string
  seats: number
  bags: number
  image: string
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

export interface PickupLocation {
  _id: string
  location: string
  country: string
  state: string
  city: string
  zipCode: string
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

export interface DropLocation {
  _id: string
  location: string
  country: string
  state: string
  city: string
  zipCode: string
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

export interface ITourBooking {
  _id: string
  name: string
  description: string
  pickupLocation: string
  dropoffLocation: string
  pickupDate: string
  dropoffDate: string
  pickupTime: string
  dropoffTime: string
  numberOfPeople: number
  address: string
  phoneNumber: string
  email: string
  status: string
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}
