// import userModel from "../models/userModel.js"
// //we'll create 3 arrow functions...add to cart, remove from cart, get cart

// //add items to user cart
// const addToCart = async (req,res) => {
//     try {
//         //here we'll find and add user data
//         let userData = await userModel.findById(req.body.userId)
//         let cartData = await userData.cartData
//         if(!cartData[req.body.itemId]){
//             cartData[req.body.itemId] = 1 //if user wants to adda aproduct in the cart with a productId, and from that itemId there is no entry in the cart, then it will create a new entry          
//         }
//         else{
//             cartData[req.body.itemId] += 1 //if that cartId is available, then we'll increase that value
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData})
//         res.json({success:true,message:"Added To Cart"})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:"Error"})
//     } 
// }

// //remove items from user cart
// const removeFromCart = async (req,res) => {
//     try {
//         let userData = await userModel.findById(req.body.userId)
//         let cartData = await userData.cartData
//         if (cartData[req.body.itemId]>0) {
//             cartData[req.body.itemId] -= 1
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData})
//         res.json({success:true,message:"Removed From Cart"})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:"Error"})
//     }
// }

// //fetch user cart data
// const getCart = async (req,res) => {
//     try {
//         let userData = await userModel.findById(req.body.userId)
//         let cartData = await userData.cartData
//         res.json({success:true,cartData})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:"Error"})
//     }
// }

// export {addToCart, removeFromCart, getCart}


import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Ensure cartData is an object
        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (cartData[itemId] && cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get cart data
const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export { addToCart, removeFromCart, getCart };
