import { Request , Response } from "express";
import { AUthRequest } from "../middleware/auth";
import { Estate } from "../models/estateModel";

export const createEstate = async (req: AUthRequest, res: Response) => {
  try {
    const {estateName , location, size } = req.body
    
    const newEstate = new Estate({
      estateName,
      location,
      size,
    
    })
    await newEstate.save()

    res.status(201).json({
      message: "Estate created",
      data: newEstate
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Fail to create estate" })
  }
  
}

export const getEstates = async (req: Request, res: Response) => {
  try {
    const estates = await Estate.find()
    res.status(200).json({
      message: "Estates retrieved",
      data: estates
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Fail to retrieve estates" })
  }
}

export const getEstateById = async (req: Request, res: Response) => {
  try {
    const estateId = req.params.id
    const estate = await Estate.findById(estateId)
    if (!estate) {
      return res.status(404).json({ message: "Estate not found" })
    }
    res.status(200).json({
      message: "Estate retrieved",
      data: estate
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Fail to retrieve estate" })
  }
}

export const updateEstate = async (req: AUthRequest, res: Response) => {
  try {
    const estateId = req.params.id
    const { estateName, location, size } = req.body 
    const updatedEstate = await Estate.findByIdAndUpdate(
      estateId,
      { estateName, location, size },
      { new: true }
    )
    if (!updatedEstate) {
      return res.status(404).json({ message: "Estate not found" })
    }
    res.status(200).json({
      message: "Estate updated",
      data: updatedEstate
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Fail to update estate" })
  }
}

export const deleteEstate = async (req: AUthRequest, res: Response) => {
  try {
    const estateId = req.params.id
    const deletedEstate = await Estate.findByIdAndDelete(estateId)
    if (!deletedEstate) {
      return res.status(404).json({ message: "Estate not found" })
    }
    res.status(200).json({
      message: "Estate deleted",
      data: deletedEstate
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Fail to delete estate" })
  }
}

export const searchEstates = async (req: Request, res: Response) => {
  try {
    const {estateName, location , size } = req.query  
    const query: any = {}

    if (estateName) {
      query.estateName = { $regex: estateName, $options: "i" }
    }
    if (location) {
      query.location = { $regex: location, $options: "i" }
    }

    if (size) {
      query.size = size
    }

    const estates = await Estate.find(query)
    res.status(200).json({
      message: "Estates retrieved",
      data: estates
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Fail to search estates" })
  }
}