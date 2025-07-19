import React, { useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    //we'll get backend url from context api
    const {url} = useContext(StoreContext)
    const navigate = useNavigate()

    const verifyPayment = async () => {
        const response = await axios.post(url+"/api/order/verify",{success,orderId})
        if (response.data.success) {
            navigate("/myorders")  //when payment is successful and verified, we'll be redirected to My Orders page
        }
        else{
            navigate("/")  //otherwise we'll be redirected to home page
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify

{/* eitu page payment r pisot hoi but mur payment tu huwa nai */}