import { Document } from "mongoose";

interface ICars extends Document {
  Car: any;
  _id: string;
  year: number;
  carModel: string;
  color: string;
}

interface NewCar {
  year: number;
  carModel: string;
  color: string;
}

export type { ICars, NewCar };
