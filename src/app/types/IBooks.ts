import { Document } from "mongoose";

interface IBooks extends Document {
  Book: any;
  _id: string;
  title: string;
  author: string;
}

interface NewBook {
  title: string;
  author: string;
}

export type { IBooks, NewBook };
