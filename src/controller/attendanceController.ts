import { Request , Response } from "express";
import { AUthRequest } from "../middleware/auth";
import { Attendance } from "../models/attendanceModel";

export const markAttendance = async (req: AUthRequest, res: Response) => {
  try {
    const { labourId, date, status, workingHours } = req.body;
    const newAttendance = new Attendance({
      labourId,
      date,
      status,
      workingHours,
    });
    await newAttendance.save();
    res.status(201).json({ message: "Attendance marked successfully", attendance: newAttendance });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark attendance", error });
  }
};

export const getAttendanceByLabour = async (req: AUthRequest, res: Response) => {
  try {
    const { labourId } = req.params;
    const attendanceRecords = await Attendance.find({ labourId });
    res.status(200).json({message : "Attendance records retrieved successfully", attendanceRecords });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve attendance records", error });
  } 
};

export const getAllAttendance = async (req: AUthRequest, res: Response) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.status(200).json({ message: "All attendance records retrieved successfully", attendanceRecords });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve attendance records", error });
  }
};

export const updateAttendance = async (req: AUthRequest, res: Response) => {
  try {
    const { attendanceId } = req.params;  
    const { status, workingHours } = req.body;
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      { status, workingHours },
      { new: true }
    );
    if (!updatedAttendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res.status(200).json({ message: "Attendance updated successfully", updatedAttendance });
  } catch (error) {
    res.status(500).json({ message: "Failed to update attendance", error });
  }
};

export const searchAttendance = async (req: AUthRequest, res: Response) => {
  try {
    const { labourId, startDate, endDate } = req.query;
    const query: any = {};  
    if (labourId) {
      query.labourId = labourId;
    }
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) };
    } 
    const attendanceRecords = await Attendance.find(query);
    res.status(200).json({ message: "Attendance records retrieved successfully", attendanceRecords });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve attendance records", error });
  }
};

export const deleteAttendance = async (req: AUthRequest, res: Response) => {
  try {
    const { attendanceId } = req.params;
    const deletedAttendance = await Attendance.findByIdAndDelete(attendanceId);
    if (!deletedAttendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res.status(200).json({ message: "Attendance record deleted successfully", deletedAttendance });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete attendance record", error });
  }
}; 