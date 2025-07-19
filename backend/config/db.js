//here we will create the  logic using which we will connect to the database
import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://barbichaliha1:dSp9Ed8ATyxLo4aq@cluster0.2muqjpx.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}