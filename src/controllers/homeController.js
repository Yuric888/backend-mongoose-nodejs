// import PostModel from '../../models/PostModel.js'

// export const getPosts = async (req, res) => {
//     try{
//         const post = new PostModel({
//             title: 'test',
//             content: 'test content'
//         });
//         post.save();
//         const postMessage = await PostModel.findOne();
//         console.log(postMessage);
//         res.status(200).json(postMessage);
//     }catch(err){
//         res.status(500).json({message: err.message})
//     }
// }

// export const createPost = (req, res) => {
//     res.send('CREATE POST SUCCESS')
// }
export const getHomePage = (req, res) => {
   return res.render('index.ejs')
}

