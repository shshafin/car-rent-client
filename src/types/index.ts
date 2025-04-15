import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface IPost {
  _id: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  city: string;
  dateFound: string;
  status: string;
  isReported: boolean;
  reportCount: number;
  category: ICategory;
  user: IUser;
  questions: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentCategory?: {
    _id: string;
    name: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export interface IDrivingType {
  _id: string;
  title: string;
  subTitle: string;
  options: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IUser {
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

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