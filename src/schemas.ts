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
    rating: Number
});

export const productCategorySchema = new Schema({
    name: String,
    // one to many relationship here, using a reference in an attempt to do normalization.
    // product can be embedded here as well, but there could be too many products under one product-category, so product-category document will be exausted early.
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Models.Products
        }
    ]
});
