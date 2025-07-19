import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type:String,required:true}, //means if we try to store any data without name, then that will not be stored as we added required:true
    description: {type:String,required:true},
    price: {type:Number,required:true},
    image: {type:String,required:true}, //this will have image url
    category: {type:String,required:true}
})
//using the above schema, we will create the model

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema) //if first model is already there, it will be used, otherwise a new model(the second one) will be created

export default foodModel;