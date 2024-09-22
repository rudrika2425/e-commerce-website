import React, { useContext } from 'react';
import './Css/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Items/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  // Normalize the category from props and items for case-insensitive comparison
  const normalizedCategory = props.category.toLowerCase();

  return (
    <div className='shopcategory'>
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        {/* <div className="shopcategory-sort">
          Sort By <img src={dropdown_icon} alt="" />
        </div> */}
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          // Compare categories in a case-insensitive manner
          if (normalizedCategory === item.category.toLowerCase()) {
            return <Item 
              key={i} 
              id={item.id} 
              name={item.name} 
              image={item.image} 
              new_price={item.new_price} 
              old_price={item.old_price} 
            />;
          } else {
            return null;
          }
        })}
      </div>
      
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
