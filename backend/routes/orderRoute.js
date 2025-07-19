import express from "express"
import authMiddleware from "../middleware/auth.js"
//import { placeOrder } from "../controllers/orderController.js"

const orderRouter = express.Router()

//orderRouter.post("/place",authMiddleware) // ,placeOrder
//kiba eta problem r karone uporor line tur bodli tolor tu use korisu
orderRouter.post("/place", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Order endpoint hit (handler to be implemented)" });
})

//orderRouter.post("/verify",verifyOrder)
//orderRouter.post("/userOrders",authMiddleware,userOrders) 
//orderRouter.get("/list",authMiddleware,listOrders)
//orderRouter.post("/status",updateStatus) 

export default orderRouter;