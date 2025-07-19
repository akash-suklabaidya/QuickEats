import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {

    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState([])

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } }) //eituwe etiya error dekhaise console t as we have not added /userorders in orderRouter yet (xei part tu skip korisile as payment is not working)
        setData(response.data.data)
    }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                <img src={assets.parcel_icon} alt="" /> {/*eitu actually div key={index} tag tur bhitorot hobo lagisil, but since amar payment not working, so order successfully placed nohol, so data.map() r bhitorot img tuwe kaam kora nai(as order is empty) */}
                {data.map((order,index)=>{
                    return (
                        <div key={index} className="my-orders-order">
                            
                            <p>
                                {order.items.map((item,index)=>{
                                    if(index === order.items.length-1){
                                        return item.name+" x "+item.quantity  //this should show name and quantity below parcel image, but amar taat nedekhai as our order is not working
                                    }
                                    else{
                                        return item.name+" x "+item.quantity+", "
                                    }
                                })}
                            </p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders
