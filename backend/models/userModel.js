//here we'll define model of our user
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true}, //unique:true mane eta email di already account ase jodi beleg eta akou bonabo nuwaru with the same mail
    password: {type:String, required:true},
    cartData: {type:Object, default:{}}
},{minimize:false}) //we've used minimize:false so that cartData will be created without any data ( because cart data is empty as default t eku likha nai)

const userModel = mongoose.models.user || mongoose.model("user", userSchema) //either already existing eta use koribo nohole notun eta create kori lobo

export default userModel