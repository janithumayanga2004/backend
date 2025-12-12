import { Request , Response } from "express";
import { AUthRequest } from "../middleware/auth";
import { Harvest } from "../models/harvestModel";

export const createHarvest = async (req: AUthRequest, res: Response) => {
  try {
    const { estateId, divisionId, categoryId, quantity, date } = req.body;  
    const newHarvest = new Harvest({
      estateId,
      divisionId,   
        categoryId,
        quantity,
        date,
    });
    await newHarvest.save();
    res.status(201).json({ message: "Harvest created", data: newHarvest });
  } catch (error) {
    res.status(500).json({ message: "Failed to create harvest", error });
  } 
};

export const getAllHarvests = async (req: AUthRequest, res: Response) => {
  try {
    const harvests = await Harvest.find();
    res.status(200).json({ message: "Harvests fetched", data: harvests });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch harvests", error });
  } 
};

export const getHarvestById = async (req: AUthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const harvest = await Harvest.findById(id);
    if (!harvest) {
      return res.status(404).json({ message: "Harvest not found" });
    } 
    res.status(200).json({ message: "Harvest fetched", data: harvest });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch harvest", error });
  }
}

export const updateHarvest = async (req: AUthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { estateId, divisionId, categoryId, quantity, date } = req.body;
    const updatedHarvest = await Harvest.findByIdAndUpdate(
      id,
      { estateId, divisionId, categoryId, quantity, date },
      { new: true }
    );
    if (!updatedHarvest) {
      return res.status(404).json({ message: "Harvest not found" });
    }
    res.status(200).json({ message: "Harvest updated", data: updatedHarvest });
  } catch (error) {
    res.status(500).json({ message: "Failed to update harvest", error });
  }
}

export const deleteHarvest = async (req: AUthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const deletedHarvest = await Harvest.findByIdAndDelete(id);
    if (!deletedHarvest) {
      return res.status(404).json({ message: "Harvest not found" });
    }
    res.status(200).json({ message: "Harvest deleted", data: deletedHarvest });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete harvest", error });
  }
}

export const searchHarvests = async (req: AUthRequest, res: Response) => {
  try {
    const { estateId, divisionId, categoryId, startDate, endDate } = req.query; 
    const query: any = {};

    if (estateId) query.estateId = estateId;  
    if (divisionId) query.divisionId = divisionId;
    if (categoryId) query.categoryId = categoryId;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate as string);
      if (endDate) query.date.$lte = new Date(endDate as string);
    }
    const harvests = await Harvest.find(query);
    res.status(200).json({ message: "Harvests fetched", data: harvests });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch harvests", error });
  }
}