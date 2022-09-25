import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: String,
  content: String,
})

const PostModel = mongoose.model('Post', schema);
export default PostModel