import type {
  CategoryOutPut,
  ProductDetailOutPut,
  ProudctOutPut,
  TagListOutPut,
} from "@/api";

export type FilterConditions = {
  All: string;
  Newset: string;
  Cheapest: string;
  MostExpensive: string;
  MostPopular: string;
};

export const ProductTypes = {
  PACKAGE: 1,
  GAME: 2,
  PHYCICAL: 3,
  GIFTCART: 4,
} as const;
export const PriceTypes = {
  EXPENSIVE: 1,
  INEXPENSIVE: 2,
  NEWEST: 3,
  FAVOURITE: 4,
} as const;

interface GamepadButton {
  pressed: boolean;
  touched: boolean;
  value: number;
}

export interface ButtonMapping {
  bottomButton: GamepadButton;
  rightButton: GamepadButton;
  leftButton: GamepadButton;
  topButton: GamepadButton;
  leftBumper: GamepadButton;
  rightBumper: GamepadButton;
  leftTrigger: GamepadButton;
  rightTrigger: GamepadButton;
  optionsButton: GamepadButton;
  startButton: GamepadButton;
  leftAnalogButton: GamepadButton;
  rightAnalogButton: GamepadButton;
  DpadUp: GamepadButton;
  DpadDown: GamepadButton;
  DpadLeft: GamepadButton;
  DpadRight: GamepadButton;
  power: GamepadButton;
}

export interface AxesMapping {
  leftAxesX: number;
  leftAxesY: number;
  rightAxesX: number;
  rightAxesY: number;
}

export enum CategoryTypes {
  PRODUCT = 1,
  FEATURE = 2,
  BRAND = 3,
  BLOG = 4,
  SERVICE = 5,
  GAME = 7,
  GIFTCART = 8,
}

export type Product = ProductDetailOutPut & ProudctOutPut;
export type Package = ProductDetailOutPut &
  ProudctOutPut & {
    included_products: any[];
  };
export interface LabelListApi {
  id: number;
  name: string;
  category_type: number;
  parent?: null;
  children?: ChildrenEntity[] | null;
}
export interface ChildrenEntity {
  id: number;
  name: string;
  category_type: number;
  parent: number;
  children?: (ChildrenEntity1 | null)[] | null;
}
export interface ChildrenEntity1 {
  id: number;
  name: string;
  category_type: number;
  parent: number;
  children?: null[] | null;
}
export interface Label {
  id: number;
  name: string;
  category_type: number;
  parent: number;
}
export interface Brand {
  id: number;
  label_type: number;
  name: string;
}
export type CardItems = {
  product: ProductDetailOutPut;
  attachment: Attachment;
  price: number;
  cart: number;
  id: number;
}[];
export type CategoryLabel = Label & {
  value: boolean;
};
export type CategoryOutPutWithSelected = CategoryLabel & { value: boolean };
export type BrandWithSelected = Brand & { value: boolean };

export interface Review {
  id: string;
  user: User;
  comment: string;
  created_at: string;
}
export interface User {
  firstname: string;
  lastname: string;
}
export interface Question {
  id: string;
  sender: Sender;
  question: string;
  answer: string;
}
export interface Sender {
  firstname: string;
  lastname: string;
}
export interface Attachment {
  id: string;
  title: string;
  description: string;
  attachment_type: number;
  price: string;
  is_force_attachment: boolean;
  selected: boolean;
}
export type TagOutPutWithSelected = { selected: boolean } & TagListOutPut;
