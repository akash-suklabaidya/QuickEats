/* 
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import pkg from "cashfree-pg"
import dotenv from "dotenv";
dotenv.config();

const { CashfreePG } = pkg;

//placing user order for frontend
const placeOrder = async (req, res) => {

  const frontend_url = "http://localhost:5173"

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    })
    await newOrder.save()
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "INR",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100 * 80 //multiply by 80 korilu because we got the price in dollars and wanted to convert it to rupees
      },
      quantity: item.quantity
    }))

    line_items.push({
      price_data: {
        currency: "INR",
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: 2 * 100 * 80 //as delivery charge is 2 dollars
      },
      quantity: 1
    })

    //the below part was using stripe. as we are using cashfree now, so we'll do the part below this commented one, we took it from chatgpt

     //using the line_items, we'll create a session. For that we'll do the following
  //   const session = await stripe.checkout.sessions.create({
  //       line_items:line_items,
  //       mode:'payment',
  //       success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
  //       cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
  //       //if payment is successful, then we'll go to success page. otherwise, if payment fails, we'll go to cancel page
  //   })

    // res.json({success:true,session_url:session.url})
   
    const totalAmount = line_items.reduce((sum, item) => {
      return sum + item.price_data.unit_amount * item.quantity;
    }, 0) / 100; // convert paise to rupees

    const orderNote = req.body.items.map(item => `${item.name} x${item.quantity}`).join(", ");

    // Step 3: Setup Cashfree
  //  Cashfree.XClientId = process.env.CASHFREE_APP_ID;
  //  Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
  //  Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
  //     //eitur bodli tolorkhini korim

    CashfreePG.init({
      env: "SANDBOX",
      clientId: process.env.CASHFREE_APP_ID,
      clientSecret: process.env.CASHFREE_SECRET_KEY
    })

    // Step 4: Create payment session
    const response = await CashfreePG.order.create({
      order_id: newOrder._id.toString(),
      order_amount: totalAmount,
      order_currency: "INR",
      customer_details: {
        customer_id: req.body.userId,
        customer_email: req.body.email || "test@example.com",
        customer_phone: req.body.phone || "9999999999"
      },
      order_note: orderNote,
      order_meta: {
        return_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        notify_url: "https://your-backend.com/webhook/cashfree"
      }
    });

    // Step 5: Send session_url like before
    if (response && response.payment_session_id) {
      const paymentLink = `https://sandbox.cashfree.com/pgapp/v3/orders/${response.order_id}`;
      res.json({ success: true, session_url: paymentLink });
    } else {
      throw new Error("Failed to create order");
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }

}

export { placeOrder };
*/


/*
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import cashfree from "cashfree-pg";
//import dotenv from "dotenv";
//dotenv.config();
import 'dotenv/config'

const CashfreePG = cashfree.Cashfree.PG;

//console.log("CashfreePG object keys:", Object.keys(CashfreePG)); // should show "init", "order", etc.

//the below helps to verify the environment and initialization
//console.log("ENV", process.env.CASHFREE_APP_ID);
//console.log("CashfreePG:", typeof CashfreePG?.order?.create);

CashfreePG.init({
      env: "SANDBOX",
      clientId: process.env.CASHFREE_APP_ID,
      clientSecret: process.env.CASHFREE_SECRET_KEY
    });

console.log("Cashfree SDK initialized");
console.log("Available PG functions:", Object.keys(CashfreePG.order));


//placing user order for frontend
const placeOrder = async (req, res) => {

  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "INR",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100 * 80
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: "INR",
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: 2 * 100 * 80
      },
      quantity: 1
    });

    const totalAmount = line_items.reduce((sum, item) => {
      return sum + item.price_data.unit_amount * item.quantity;
    }, 0) / 100;

    const orderNote = req.body.items.map(item => `${item.name} x${item.quantity}`).join(", ");

    //  Cashfree Initialization (corrected)
    

    //  Create Cashfree order
    const response = await CashfreePG.order.create({
      order_id: newOrder._id.toString(),
      order_amount: totalAmount,
      order_currency: "INR",
      customer_details: {
        customer_id: req.body.userId,
        customer_email: req.body.email || "test@example.com",
        customer_phone: req.body.phone || "9999999999"
      },
      order_note: orderNote,
      order_meta: {
        return_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        notify_url: "https://your-backend.com/webhook/cashfree"
      }
    });

    if (response && response.payment_session_id) {
      const paymentLink = `https://sandbox.cashfree.com/pgapp/v3/orders/${response.order_id}`;
      res.json({ success: true, session_url: paymentLink });
    } else {
      throw new Error("Failed to create order");
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req,res) => {
  const {orderId, success} = req.body
  try {
    if (success=="true") { //here we are using true as a string.....while calling api, we'll use this data as a string
      await orderModel.findByIdAndUpdate(orderId,{payment:true})
      res.json({success:true,message:"Paid"})
    }
    else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false,message:"Not Paid"})
    }
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
}

//Listing Orders for admin panel
const listOrders = async (req, res)
.......... 9.19 manor pora akou skip korilu

//api for updating order status
const updateStatus = aync (req,res)
.......akou skip korilu from 9.43

export { placeOrder };  //skip marilu karone nilikhilu - verifyOrder,userOrders,listOrders,updateStatus
*/