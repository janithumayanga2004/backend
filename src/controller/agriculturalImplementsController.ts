import { Request , Response } from "express";
import { AUthRequest } from "../middleware/auth";
import { AgriculturalImplement } from "../models/agriculturalImplementsModel";


export const createAgriculturalImplement = async (req: AUthRequest, res: Response) => {
  try {
    const { itemName, categoryId, quantity, condition, purchasedDate } = req.body;
    const newImplement = new AgriculturalImplement({
      itemName,
      categoryId,
      quantity,
      condition,
      purchasedDate,
    });
    await newImplement.save();
    res.status(201).json({ message: "Agricultural implement created", data: newImplement });
  } catch (error) {
    res.status(500).json({ message: "Failed to create agricultural implement", error });
  }
};

export const getAgriculturalImplements = async (req: AUthRequest, res: Response) => {
  try {
    const agriculturalImplements = await AgriculturalImplement.find(); 

    res.status(200).json({
      message: "Agricultural implements retrieved",
      data: agriculturalImplements
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve agricultural implements",
      error
    });
  }
};

export const getAgriculturalImplementById = async (req: AUthRequest, res: Response) => {
  try {
    const implementId = req.params.id;
    const agriculturalImplement = await AgriculturalImplement.findById(implementId);
    if (!agriculturalImplement) {
      return res.status(404).json({ message: "Agricultural implement not found" });
    }
    res.status(200).json({ message: "Agricultural implement retrieved", data: agriculturalImplement });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch agricultural implement", error });
  }
}; 

export const updateAgriculturalImplement = async (req: AUthRequest, res: Response) => {
  try {
    const implementId = req.params.id;
    const updates = req.body;
    const updatedImplement = await AgriculturalImplement.findByIdAndUpdate(
      implementId,
      updates,
      { new: true }
    );  
    if (!updatedImplement) {
      return res.status(404).json({ message: "Agricultural implement not found" });
    }
    res.status(200).json({ message: "Agricultural implement updated", data: updatedImplement });
  } catch (error) {
    res.status(500).json({ message: "Failed to update agricultural implement", error });
  }
};

export const deleteAgriculturalImplement = async (req: AUthRequest, res: Response) => {
  try {
    const implementId = req.params.id;
    const deletedImplement = await AgriculturalImplement.findByIdAndDelete(implementId);
    if (!deletedImplement) {
      return res.status(404).json({ message: "Agricultural implement not found" });
    }
    res.status(200).json({ message: "Agricultural implement deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete agricultural implement", error });
  } 
};

export const searchAgriculturalImplements = async (req: AUthRequest, res: Response) => {
  try {
    const { itemName, categoryId, condition } = req.query; 
    const query: any = {};

    if (itemName) {
      query.itemName = { $regex: itemName as string, $options: "i" };
    }
    if (categoryId) {
      query.categoryId = categoryId;
    }
    if (condition) {
      query.condition = { $regex: condition as string, $options: "i" };
    }
    const agriculturalImplements = await AgriculturalImplement.find(query);
    res.status(200).json({ message: "Agricultural implements retrieved", data: agriculturalImplements });
  } catch (error) {
    res.status(500).json({ message: "Failed to search agricultural implements", error });
  }
};