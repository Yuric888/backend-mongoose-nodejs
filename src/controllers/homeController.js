
import PostModel from "../models/PostModel.js";

export const getHomePage = async (req, res, next) => {
 PostModel.find((err, data) => {
    if(!err){
         res.render('index.ejs', {
        customers: data
        })
    }else{
        console.log('Failed to retrieve the Users List: ', err )
    }
  });

}
export const createPost = async (req, res) => {
//   const obj = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }

// console.log(obj); // { title: 'product' }

    const data = req.body;
    let customer = await new PostModel({
        title: data.title,
        content: data.content,
        image: data.image
    });
    customer = await customer.save();

   res.redirect('/')
}

export const deletePost = async (req, res, next) => {
   PostModel.findByIdAndRemove(req.params.id, (err, doc) =>{
        if(!err){
            res.redirect('/')
        }else{
            console.log('Failed to Delete user Details', err)
        }
    })
}