import express from "express";
import { addFood,listFood,removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router(); //we have created an express router

//here we will create logic using which image will be saved in upload folder
//Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads", //folder where we want to store the image
    filename: (req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})//the storage after the colon is the storage we created above. 
//so middleware upload has been created, using this we can store the image in the upload folder

foodRouter.post("/add",upload.single("image"), addFood) //we will use the post method to send the data on the server, and on the server our data will be processed and then we will get a response
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)



export default foodRouter;