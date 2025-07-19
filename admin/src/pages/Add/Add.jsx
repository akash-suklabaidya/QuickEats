import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {

  //const url = "http://localhost:4000"; as eitu app.jdx t likhi pale uorot url buli add kori disu, so eitu beleg koi likhibo nalage
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad" /* whenever we reload the webpage, our default category will be salad */
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  /* to check whether data is getting updated or not, we'll use useEffect */
  /* useEffect(()=>{
    console.log(data)
  },[data])
  */

  /* we'll do the following for API call */
  const onSubmitHandler = async (event) => {
    event.preventDefault(); //this will prevent the webpage from reloading when we click on ADD button
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price)) /* Number(price) buli likhisu as in const Add, we stored price as a string, but we defined the price as a number in the backend */
    formData.append("category", data.category)
    formData.append("image", image)
     //now we'll do the api call
      const response = await axios.post(`${url}/api/food/add`, formData) //post likhisu karon we have created the Add api using the post method
      //uporor tur karone formdata will be stored in database and image will be stored in backend folder
      if (response.data.success) {
        setData({
          name: "",        //when we click on ADD after a item, the form will be reset; it will be reset when our response is success
          description: "",
          price: "",
          category: "Salad"
        })
        setImage(false)
        toast.success(response.data.message)
      }
      else{
        toast.error(response.data.message)
      }
    }
    return (
      <div className='add'>
        <form className="flex-col" onSubmit={onSubmitHandler}>
          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />  {/* inside src, we are checking if there is any image available. if yes,then we will upload that image. if no, then we will upload image from the assets.upload_area */}
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
          </div>
          <div className="add-product-name flex-col">
            <p>Product Name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />{/* we'll change the input field to controlled input field by using onChange here and also using the const onChangeHandler . this means when we change anything in this input, it will be updated in the state variable */}
          </div>
          <div className="add-product-description flex-col">
            <p>Product Description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea> {/* eitu ku controlled bonai dilu */}
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product Category</p>
              <select onChange={onChangeHandler} name="category"> {/* eitu ku controlled bonai dilu */}
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodle">Noodle</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product Price</p>
              <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' /> {/* eitu ku controlled bonai dilu */}
            </div>
          </div>
          <button type='submit' className='add-btn'>ADD</button>
        </form>
      </div>
    )
  }

  export default Add;
