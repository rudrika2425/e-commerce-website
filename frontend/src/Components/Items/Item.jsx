import React from 'react'
import'./Item.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '..//Assets/star_dull_icon.png'
import { Link } from 'react-router-dom'
const Item = (props) => {

  return (
    <div className="item">
      <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
      <p>{props.name}</p>
      <div className="item-prices">
      <div className="item-price-new">
          Rs.{props.new_price}
        </div>
        <div className="item-price-old">
            MRP: Rs.{props.old_price}
        </div>
       
      </div>
      <div className="productdisplay-right-star-new">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(98)</p>
        </div>
     
    </div>
  )
}

export default Item
