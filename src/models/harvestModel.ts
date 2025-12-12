import mongoose, { Document, Schema } from "mongoose";

export interface IHarvest extends Document {
  estateId: mongoose.Types.ObjectId;
  divisionId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  quantity: number;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const HarvestSchema = new Schema<IHarvest>(
  {
    estateId: { type: Schema.Types.ObjectId, ref: "Estate", required: true },
    divisionId: { type: Schema.Types.ObjectId, ref: "Division", required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Harvest = mongoose.model<IHarvest>("Harvest", HarvestSchema);
