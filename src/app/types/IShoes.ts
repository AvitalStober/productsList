import { Document } from "mongoose";

interface IShoes extends Document {
  type: string;
  size: number;
  color: string;
}

export default IShoes;
