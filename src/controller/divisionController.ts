import { Request , Response } from "express";
import { AUthRequest } from "../middleware/auth";
import { Division } from "../models/divisionModel";

export const createDivision = async (req: AUthRequest, res: Response) => {
  try {
    const { divisionName, estateId, supervisorName } = req.body;
    const newDivision = new Division({
      divisionName,
      estateId,
      supervisorName,
    });
    await newDivision.save();
    res.status(201).json({
      message: "Division created",
      data: newDivision,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fail to create division" });
  }
};

export const getAllDivisions = async (req: Request, res: Response) => {
  try {
    const divisions = await Division.find();
    res.status(200).json({
      message: "Divisions retrieved",
      data: divisions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fail to retrieve divisions" });
  }
};

export const getDivisionById = async (req: Request, res: Response) => {
  try {
    const divisionId = req.params.id;
    const division = await Division.findById(divisionId);
    if (!division) {
      return res.status(404).json({ message: "Division not found" });
    }
    res.status(200).json({
      message: "Division retrieved",
      data: division,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fail to retrieve division" });
  }
};

export const updateDivision = async (req: AUthRequest, res: Response) => {
  try {
    const divisionId = req.params.id;
    const { divisionName, estateId, supervisorName } = req.body;
    const updatedDivision = await Division.findByIdAndUpdate(
      divisionId,
      { divisionName, estateId, supervisorName },
      { new: true }
    );
    if (!updatedDivision) {
      return res.status(404).json({ message: "Division not found" });
    }
    res.status(200).json({
      message: "Division updated",
      data: updatedDivision,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fail to update division" });
  }
};

export const deleteDivision = async (req: AUthRequest, res: Response) => {
  try {
    const divisionId = req.params.id;
    const deletedDivision = await Division.findByIdAndDelete(divisionId);
    if (!deletedDivision) {
      return res.status(404).json({ message: "Division not found" });
    }
    res.status(200).json({
      message: "Division deleted",
      data: deletedDivision,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fail to delete division" });
  }
};

export const searchDivisions = async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;

    if (!query || typeof query !== "string") {
      return res.status(400).json({
        message: "Query parameter must be a string",
      });
    }

    const divisions = await Division.find({
      divisionName: { $regex: query, $options: "i" },
    });

    res.status(200).json({
      message: "Divisions retrieved",
      data: divisions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fail to search divisions" });
  }
};
