import mongoose, { Document, Schema } from "mongoose";

export interface IAttendance extends Document {
  labourId: mongoose.Types.ObjectId;
  date: Date;
  status: "Present" | "Absent";
  workingHours?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    labourId: { type: Schema.Types.ObjectId, ref: "Labour", required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["Present", "Absent"], required: true },
    workingHours: { type: Number }, 
  },
  { timestamps: true }
);

export const Attendance = mongoose.model<IAttendance>("Attendance", AttendanceSchema);
