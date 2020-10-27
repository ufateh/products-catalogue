import { Schema } from "mongoose";
import mongoose from 'mongoose';


export enum Models {
    Products = "Product",
    ProductCategory = "ProductCategory"
}

export const productSchema = new Schema({
    name: String,
    price: Number,
    dimentions: String,
    manufacture_date: { type: Date, default: Date.now },
    expiry_date: { type: Date, default: Date.now },
    remaining: Number,
    rating: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Models.Products
    }
});

export const productCategorySchema = new Schema({
    name: String
});
