import { createContext, useEffect, useState } from "react";
//import { food_list } from "../assets/assets";  we can remove this imported food_list after bringing the const [food_list,setFoodList] = useState([]) and adding food in the useState
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])

    //functionality for add to cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) { //if item id is not available in cart,ie,user is addind that item for the first time
            setCartItems((prev) => ({ ...prev, [itemId]: 1 })) //then 1 entry will be created for that item, the key id will be itemId
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 })) //if item is already present in cart, then increease it by 1
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}}) //this is done so that we can add items to database from frontend too
        }
    }

    //functionality for remove from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}}) //this is done so that we can remove items to database from frontend too
        }
    }

    /* useEffect(()=>{
        console.log(cartItems)
    },[cartItems]) */
    //we'll remove this above one and use the below one
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list")
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token")) //this is done so that when we reload the webpage, we won't get logged out
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    }, [])

    const contextValue = {
        //here we can provide any value or function, and we can access that in any function using the context. to add the support of this context in our project, go to main.jsx file 
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;