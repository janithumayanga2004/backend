import mongoose, { Document, Schema } from "mongoose";

export interface ILabour extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  nic: string;
  phone: string;
  address: string;
  divisionId: mongoose.Types.ObjectId; 
  createdAt?: Date;
  updatedAt?: Date;
}

const LabourSchema = new Schema<ILabour>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nic: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },

    divisionId: { 
      type: Schema.Types.ObjectId, 
      ref: "Division", 
      required: true 
    },
  },
  { timestamps: true }
);

export const Labour = mongoose.model<ILabour>("Labour", LabourSchema);
