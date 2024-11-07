import { Document } from "mongoose";

interface ICars extends Document {
  year: number;
  carModel: string;
  color: string;
}

export default ICars;
