import mongoose , {Document , Schema} from "mongoose";

export interface IEstate extends Document {
  _id: mongoose.Types.ObjectId
  estateName: string
  location: string
  size: number
  createdAt?: Date
  updatedAt?: Date
}

const EstateSchema = new Schema<IEstate>(
  {
    estateName: { type: String, required: true },
    location: { type: String, required: true },
    size: { type: Number, required: true}
  },
  {
    timestamps: true
  }
)

export const Estate = mongoose.model<IEstate>("Estate", EstateSchema);