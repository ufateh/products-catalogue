import { Schema } from "mongoose";
import mongoose from 'mongoose';
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

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
        ref: Models.ProductCategory
    },
    slug: { type: String, slug: ["name","price"], unique: true }
});

// in order to perform text search on mongoDB, we need to index that information which we will be searching.
// in our case, going to index two columns here
productSchema.index({name: 'text',dimentions: 'text' });

export const productCategorySchema = new Schema({
    name: String
});
