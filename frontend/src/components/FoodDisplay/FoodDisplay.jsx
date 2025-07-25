import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
   //in this fooddisplay component, first we'll get the food_list array using the context API
   const {food_list} = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {food_list.map((item, index)=>{
           if(category==="All" || category===item.category){
              //we will return a component that will take the food data and will display that in the cart
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
           }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
