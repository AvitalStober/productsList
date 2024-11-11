import { Document } from "mongoose";

interface IShoes extends Document {
  Shoes: any;
  _id: string;
  type: string;
  size: number;
  color: string;
}

interface NewShoe {
  type: string;
  size: number;
  color: string;
}

export type { IShoes, NewShoe };
