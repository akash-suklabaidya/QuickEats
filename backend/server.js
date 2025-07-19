//here we will create a basic express server
//we will create a server that will be a module type server where we will use es6 feature
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

//import path from 'path';
//import { fileURLToPath } from 'url';


//app config
const app = express() //we have initialied our const app with express package
const port = 4000//port no. where our server will be running

//const __dirname = path.dirname(fileURLToPath(import.meta.url));


//middleware
app.use(express.json())//when we get request from frontend to backend, that will be passed using this express.json
app.use(cors())//using this, we can access package from any frontend

//db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter) 
app.use("/images", express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/",(req,res)=>{  //get method is a HTTP method using which we can request the data from the server. there are other methods like delete, update, post etc. and they have different uses
    res.send("API Working")
})

// Serve static files from React build
//app.use(express.static(path.join(__dirname, 'public'))); //../frontend/dist

//app.get('/*', (req, res) => {
 // res.sendFile(path.join(__dirname, 'public', 'index.html'));
//});


//now we will run express server
//to run express server, we will do the following
app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`) //when server is running, this message will be displayed in console
})

//mongodb+srv://barbichaliha1:dSp9Ed8ATyxLo4aq@cluster0.2muqjpx.mongodb.net/?
