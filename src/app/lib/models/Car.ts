import ICars from "@/app/types/ICars";
import mongoose, { Model, Schema } from "mongoose";

const CarsSchema: Schema<ICars> = new Schema({
    year: { type: Number, required: true},
    carModel: {type: String, required: true},
    color: { type: String, required: true},
});

const Cars : Model<ICars> = mongoose.models.Cars || mongoose.model<ICars>('Cars', CarsSchema);

export default Cars;