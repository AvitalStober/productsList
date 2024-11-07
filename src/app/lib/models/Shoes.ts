import IShoes from "@/app/types/IShoes";
import mongoose, { Model, Schema } from "mongoose";

const ShoesSchema: Schema<IShoes> = new Schema({
    type: { type: String, required: true},
    size: {type: Number, required: true},
    color: { type: String, required: true},
});

const Shoes : Model<IShoes> = mongoose.models.Shoes || mongoose.model<IShoes>('Shoes', ShoesSchema);

export default Shoes;