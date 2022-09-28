import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  price_1: {
    type: Number,
    required: false
  },
  price_2: {
    type: Number,
    required: false
  },

})

const PostModel = mongoose.model('Post', schema);
export default PostModel