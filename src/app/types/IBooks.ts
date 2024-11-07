import { Document } from "mongoose";

interface Books extends Document {
  title: string;
  author: string;
}

export default Books;
