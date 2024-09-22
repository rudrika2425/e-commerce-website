import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    })

    const imageHandler = (e) => {
         const file = e.target.files[0];
         setImage(e.target.files[0]); // Preview the image
         setProductDetails({ ...productDetails, image: URL.createObjectURL(file) });
    }

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }

    const Add_Product = async () => {
        console.log(productDetails);
        //linking add product page with backend

        let responseData;
        let product=productDetails;
        //created copy of product object

        let formData=new FormData();
        formData.append('product', image);

         await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            }).then((resp)=>resp.json()).then((data)=>{responseData=data});

            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            //const data = await response.json();
            
            if (responseData.success) {
             //means image stored in multer
                product.image=responseData.image_url;
                console.log(product);
                 await fetch('http://localhost:4000/addproduct',{
                 method:'POST',
                 headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                 },
                 body:JSON.stringify(product),
                }).then((resp)=>resp.json()).then((data)=>{
                    data.success?alert("Product Added"):alert("Failed")
                })
                
        //     } 
        //     else {
        //         console.error('Upload failed:', data.message);
        //     }
        // } catch (error) {
        //     console.error('Error uploading image:', error);
        }
    }

    return (
        <div className="add-product">
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input
                    value={productDetails.name}
                    onChange={changeHandler}
                    type="text"
                    name="name"
                    placeholder="Type here"
                />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input
                        value={productDetails.old_price}
                        onChange={changeHandler}
                        type="text"
                        name="old_price"
                        placeholder="Type here"
                    />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input
                        value={productDetails.new_price}
                        onChange={changeHandler}
                        type="text"
                        name="new_price"
                        placeholder="Type here"
                    />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select
                    value={productDetails.category}
                    onChange={changeHandler}
                    name="category"
                    className="add-product-selector"
                >
                    <option value="women">Women</option>
                    <option value="Kid">Kid</option>
                    <option value="men">Men</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img
                        src={image ? URL.createObjectURL(image) : upload_area}
                        className="addproduct-thumnail-img"
                        alt=""
                    />
                    
                </label>
                
                <input
                    onChange={imageHandler}
                    type="file"
                    name="image"
                    id="file-input"
                    hidden
                />
            </div>
            <button  onClick={()=>{Add_Product()}}  className='addproduct-btn'>
                ADD
            </button>
           
        </div>
    );
};

export default AddProduct;