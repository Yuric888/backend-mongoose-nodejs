
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
    console.log('req.file :>> ', req.file);
    const user = new PostModel({
        title: req.body.title,
        content: req.body.content,
        image: req.file.filename
    })
    user.save()
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