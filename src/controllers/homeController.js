
import PostModel from "../models/PostModel.js";
import pkg from 'cloudinary';
const {UploadApiResponse ,v2: cloudinary} = pkg;

export const getHomePage = async (req, res) => {
    try {
      const data = await PostModel.find();
         res.render('index.ejs', {
        customers: data
        })
    }catch (err) {
        res.status(500).send({message: err.message || "Error Occured"})
    }
}
export const getAllPost = async (req, res) => {
    try{
        const data = await PostModel.find();
        res.status(200).json(data);
    }catch (err) {
        res.status(500).send({message: err.message || "Error Occured"})
    }
}

export const createPost = async (req, res) => {
    try{ 
        if(req.body && req.file){  
            let uploadedFile=UploadApiResponse;
            uploadedFile = await cloudinary.uploader.upload(req.file.path,{
                folder: "node_cloudinary",
                resource_type: "auto"
            });
            const {secure_url,public_id} = uploadedFile;
            if(secure_url || public_id){
                const user = new PostModel({
                    title: req.body.title,
                    content: req.body.content,
                    image: {
                        url: secure_url,
                        public_id: public_id,
                    },
                    price_1: req.body.price_1,
                    price_2: req.body.price_2 ?? null
                    })
                user.save();
                }else{
                    console.log('Your cloudinary error');
                }
        }
         res.redirect('/')
   } catch(err){
    console.log('Cant create new post');
        res.status(500).send({message: err.message || "Error Occured"})
   }
}

export const deletePost = async (req, res, next) => {
    try{
        const id = req.params.id;
        const data = await PostModel.findById(id);
        if(data){
            await cloudinary.uploader.destroy(data.image.public_id);
            await PostModel.findByIdAndDelete(id);
        }
        
        res.redirect('/')
    }catch(err){
        console.log('Delete err :>> ', err);
        res.status(500).send({message: err.message || "Error Occured"})
    }
}

export const getOnePost = async(req, res) => {
  try{
      const id = req.params.id;
      if(id){
        const post = await PostModel.findById(id)
        res.render('post.ejs', {data: post})
      }
  }catch(err){
        console.log('Get data err :>> ', err);
        res.status(500).send({message: err.message || "Error Occured"})
  }
}
export const updatePost = async (req, res)=>{
    try{
        const id = req.params.id
        if(req.file){
            const post = await PostModel.findById(id)
            await cloudinary.uploader.destroy(post.image.public_id);
             
            let uploadedFile=UploadApiResponse;
            
            uploadedFile = await cloudinary.uploader.upload(req.file.path,{
                folder: "node_cloudinary",
                resource_type: "auto"
            });
            const {secure_url, public_id} = uploadedFile
            await PostModel.findByIdAndUpdate(id, {
                title: req.body.title,
                content: req.body.content,
                image: {
                    url: secure_url,
                    public_id: public_id
                },
                price_1: req.body.price_1,
                price_2: req.body.price_2
            });
        }else{
            await PostModel.findByIdAndUpdate(id, {
                title: req.body.title,
                content: req.body.content,
                price_1: req.body.price_1,
                price_2: req.body.price_2
            });
        }
        res.redirect('/')
    }catch(err){
        console.log('Update data err :>> ', err);
        res.status(500).send({message: err.message || "Error Occured"})
    }
}