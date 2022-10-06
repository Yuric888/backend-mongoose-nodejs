
import PostModel from "../models/PostModel.js";
import fs from 'fs';
import {promisify } from 'util'
import path from 'path';
const unlinkAsync = promisify(fs.unlink)


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
        if(req.body){
            const user = new PostModel({
                title: req.body.title,
                content: req.body.content,
                image: req.file ? req.file.filename : null,
                price_1: req.body.price_1,
                price_2: req.body.price_2 ?? null
                })
            user.save()
        }
         res.redirect('/')
    }catch(err){
        res.status(500).send({message: err.message || "Error Occured"})
    }
   
}

export const deletePost = async (req, res, next) => {
    try{
        const id = req.params.id;
        const data = await PostModel.findById(id);
        if(data){
            await fs.unlink(`./src/public/images/${data.image}`, (err => {
                if(err) console.log('err', err)
                else{
                    console.log('file image deleted');
                }
            }));
            await PostModel.findByIdAndDelete(id);
        }
        
        res.redirect('/')
    }catch(err){
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
 console.log('err :>> ', err);
         res.status(500).send({message: err.message || "Error Occured"})
  }
}
export const updatePost = async (req, res)=>{
    try{
        const id = req.params.id
      if(id && req.body){
        await PostModel.findByIdAndUpdate(id, req.body);
        res.redirect('/')
      }
       
    }catch(err){
        console.log('err :>> ', err);
         res.status(500).send({message: err.message || "Error Occured"})
    }
}