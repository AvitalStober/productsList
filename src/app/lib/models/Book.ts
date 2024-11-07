import IBooks from "@/app/types/IBooks";
import mongoose, { Model, Schema } from "mongoose";

const BooksSchema: Schema<IBooks> = new Schema({
    title: {type: String, required: true},
    author: { type: String, required: true},
});

const Books : Model<IBooks> = mongoose.models.Books || mongoose.model<IBooks>('Books', BooksSchema);

export default Books;