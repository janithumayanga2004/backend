import mongoose, {Document , Schema} from "mongoose";

export interface IDivision extends Document {
  _id: mongoose.Types.ObjectId;
  divisionName: string;
  estateId: mongoose.Types.ObjectId; 
  supervisorName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const DivisionSchema = new Schema<IDivision>(
  {
    divisionName: { type: String, required: true },
    estateId: { type: Schema.Types.ObjectId, ref: "Estate", required: true },
    supervisorName: { type: String }
  },
  { timestamps: true }
);

export const Division = mongoose.model<IDivision>("Division", DivisionSchema);
