import { Request , Response } from "express";
import { AUthRequest } from "../middleware/auth";
import { Labour } from "../models/labourModel";

export const createLabour = async (req: AUthRequest, res: Response) => {
  try {
    const { firstName, lastName, nic, phone, address, divisionId } = req.body;
    const newLabour = new Labour({
      firstName,
      lastName,
        nic,
        phone,
        address,
        divisionId,
    });
    await newLabour.save();
    res.status(201).json({ message: "Labour created", data: newLabour });
  } catch (error) {
    res.status(500).json({ message: "Failed to create labour", error });
  }
};

export const getLabours = async (req: AUthRequest, res: Response) => {
  try {
    const labours = await Labour.find().populate('divisionId', 'divisionName'); // <-- correct

    res.status(200).json({ 
       message: "Labours retrieved", 
       data: labours 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to fetch labours", 
      error 
    });
  }
};


export const getLabourById = async (req: AUthRequest, res: Response) => {
  try {
    const labourId = req.params.id;
    const labour = await Labour.findById(labourId);
    if (!labour) {
      return res.status(404).json({ message: "Labour not found" });
    }
    res.status(200).json({ message: "Labour retrieved", data: labour });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch labour", error });
  }
};

export const updateLabour = async (req: AUthRequest, res: Response) => {
  try {
    const labourId = req.params.id;
    const updates = req.body;
    const updatedLabour = await Labour.findByIdAndUpdate(
      labourId,
      updates,
      { new: true }
    );  
    if (!updatedLabour) {
      return res.status(404).json({ message: "Labour not found" });
    }
    res.status(200).json({ message: "Labour updated", data: updatedLabour });
  } catch (error) {
    res.status(500).json({ message: "Failed to update labour", error });
  }
};

export const deleteLabour = async (req: AUthRequest, res: Response) => {
  try {
    const labourId = req.params.id;
    const deletedLabour = await Labour.findByIdAndDelete(labourId);
    if (!deletedLabour) {
      return res.status(404).json({ message: "Labour not found" });
    }
    res.status(200).json({ message: "Labour deleted", data: deletedLabour });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete labour", error });
  }
};

export const searchLabours = async (req: AUthRequest, res: Response) => {
  try {
    const queryValue = (req.query.query as string)?.trim();

    if (!queryValue) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

  
    const keywords = queryValue.split(/\s+/);

    // Generate regex OR conditions for each keyword
    const conditions = keywords.map((word) => ({
      $or: [
        { firstName: { $regex: `^${word}`, $options: "i" } }, 
        { lastName: { $regex: `^${word}`, $options: "i" } },
        { nic: { $regex: word, $options: "i" } },
        { phone: { $regex: word, $options: "i" } },
        { address: { $regex: word, $options: "i" } },
      ],
    }));

    
    const labours = await Labour.find({ $and: conditions });

    res.status(200).json({
      message: "Labours retrieved",
      data: labours,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Search failed", error: err });
  }
};
