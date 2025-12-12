import { Request, Response } from "express";
import { AUthRequest } from "../middleware/auth";
import { Category } from "../models/categoryModel";
import cloudinary from "../config/cloudinary"; 
import multer from "multer";


const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const createCategory = async (req: AUthRequest, res: Response) => {
  try {
    const { name, description } = req.body;
    let imageURL = "";

    
    if (req.file && req.file.buffer) {
      const result: any = await new Promise((resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          { folder: "categories" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        upload_stream.end(req.file?.buffer);
      });
      imageURL = result.secure_url;
    }

    const newCategory = new Category({
      name,
      description,
      photo: imageURL,
    });

    await newCategory.save();

    res.status(201).json({ message: "Category created", data: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create category", error });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ message : "Categories fetched", data: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch categories", error });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category fetched", data: category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch category", error });
  }
};

export const updateCategory = async (req: AUthRequest, res: Response) => {
  try {
    const { name, description } = req.body;
    let imageURL;

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    
    if (name) category.name = name;
    if (description) category.description = description;

    if (req.file && req.file.buffer) {
      const result: any = await new Promise((resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          { folder: "categories" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        upload_stream.end(req.file?.buffer);
      });
      imageURL = result.secure_url;
      category.photo = imageURL;
    }

    await category.save();
    res.status(200).json({ message: "Category updated", data: category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update category", error });
  }
};

export const deleteCategory = async (req: AUthRequest, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted", data: category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete category", error });
  }
};

export const searchCategories = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }
    const categories = await Category.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    });
    res.status(200).json({ message: "Search results", data: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Search failed", error });
  }
};