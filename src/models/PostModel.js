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
    public_id:{
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  price_1: {
    type: Number,
    required: true
  },
  price_2: {
    type: Number,
    required: false
  },

}, {timestamps: true}
)

const PostModel = mongoose.model('Post', schema);
export default PostModel