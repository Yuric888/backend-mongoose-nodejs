import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Users' 
    },
    products : [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
  ]
},{ timestamps: true },
)

const ProductsBuy = mongoose.model('Products', ProductSchema);

export default ProductsBuy;