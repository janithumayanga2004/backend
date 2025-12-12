import mongoose, { Document, Schema } from "mongoose";
import { ICategory } from "./categoryModel";

export interface IAgriImplement extends Document {
  itemName: string;
  categoryId: mongoose.Types.ObjectId;
  quantity: number;
  condition: string;
  purchasedDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const AgriImplementSchema = new Schema<IAgriImplement>(
  {
    itemName: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    quantity: { type: Number, required: true },
    condition: { type: String, required: true },
    purchasedDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const AgriculturalImplement = mongoose.model<IAgriImplement>("AgriculturalImplement",AgriImplementSchema);
