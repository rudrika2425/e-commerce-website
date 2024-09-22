const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));


  app.get('/', (req, res) => res.send('Express App is running'));

// Image storage engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage:storage });

// Upload endpoint for images
app.use('/images', express.static('upload/images'));
app.post('/upload', upload.single('product'), (req, res) => {
  res.json({ success: 1, image_url: `http://localhost:${port}/images/${req.file.filename}` });
});
 


// Schema for products
const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true }
});

const Product = mongoose.model('Product', ProductSchema);


// Schema for user model



// API for adding products
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
      let last_product_array=product.slice(-1);
      let last_product=last_product_array[0];
      id=last_product.id+1;
    }
    else{
      id=1;
    }
    const product = new Product({
      id:id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price
    });
    await product.save();
    res.json({ success: true, name: req.body.name });
    });



// API for deleting products
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({id:req.body.id});
  res.json({ success: true, name: req.body.name 
})
})


// API for getting all products
app.get('/allproducts', async (req, res) => {
  let products = await Product.find({});
    res.json(products);
  });

//schema for user model
  const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Map, of: Number, default: {} },
    date: { type: Date, default: Date.now }
  });
  const Users = mongoose.model('Users', UserSchema);

// API for new collections
app.get('/newcollections', async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
    res.send(newcollection);
  
});

// API for popular products in women's category
app.get('/popularinwomen', async (req, res) => {
  let products = await Product.find({ category: 'women' });
  let popular_in_women = products.slice(0, 4);
    res.send(popular_in_women);
  
});

// Middleware to fetch user and convert auth token to user id
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).send({ errors: 'Please authenticate using a valid token' });
  }
 else{
  try {
    const data = jwt.verify(token, secret_ecom);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: 'Please authenticate using a valid token' });
  }
}
};


// API for user signup
app.post('/signup', async (req, res) => {
  let check=await Users.findOne({email:req.body.email});
  if(check){
    return res.status(400).json({success:false,errors:"existing user"})
  }
  let cart={};
  for(let i=0;i<300;i++)
  {
    cart[i]=0;
  }
  const user=new Users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
  })
  await user.save();
  const data={user:{
    id:user.id
  }}
  const token=jwt.sign(data,'secret_ecom');
  res.json({success:true,token})
})
  

// API for user login
app.post('/login', async (req, res) => {
  let user=await Users.findOne({email:req.body.email});
  if(user){
    const passCompare=req.body.password===user.password;
    if(passCompare){
      const data={
        user:{
          id:user.id
        }
      }
      const token=jwt.sign(data,'secret_ecom');
      res.json({success:true,token});
    }
    else{
      res.json({success:false,errors:"wrong password"})

    }
  }
    else
    {
      res.json({success:false,error:"Wrong Email Id"})
    }
  })

// API for adding items to cart
app.post('/addtocart', fetchUser, async (req, res) => {
  
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData})
     res.send("Added");
});

// API for removing items from cart
app.post('/removefromcart', fetchUser, async (req, res) => {
  console.log("remove",req.body.itemId);
  let userData=await Users.findOne({_id:req.user.id});
  if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
  await Users.findoneAndUpdate({_id:req.user.id},{cartData:userData})
  res.send("Removed")
})

// API for getting cart items
app.post('/getcart', fetchUser, async (req, res) => {
  let userData=await Users.findOne({_id:req.user.id});
  res.json(userData.cartData);
})

//app.listen(port, () => console.log(`Server running on port ${port}`));

app.listen(port,(error)=>{
  if(!error)
  {
    console.log("Server running on port"+port);
  }
  else{
    console.log("Error :"+error)
  }
})
