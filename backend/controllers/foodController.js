import foodModel from "../models/foodModel.js";
import fs from 'fs' //fs file system is prebuilt in nodejs


//add food item

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })
    try {
        await food.save();
        res.json({ success: true, message: "FoodAdded" }) //if product is saved, we'll get this response
    } catch (error) {
        console.log(error) //if error, then error will be displayed
        res.json({ success: false, message: "Error" }) //not saved, so we  will get this response
    }
}

//all food list
const listFood = async (req, res) => { //using this we can display all the food items in the database
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//remove food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export { addFood, listFood, removeFood };