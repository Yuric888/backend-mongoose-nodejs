import ProductsBuy from '../models/ProductsBuy.js'
export const getAllProducts = async (req, res) =>{
      try{
        const dataProducts = await ProductsBuy.find({user: '634e71632e59d1aae447b774'});
        console.log('dataProducts :>> ', dataProducts);
        res.render('product.ejs', {
            dataProducts: dataProducts
        })
      }catch(e){
        console.log('err :>> ', err);
      }
    }
export const createProductUser = async (req, res) => {
   try{
    const {userId, products} = req.body;
    console.log('req.body :>> ', req.body);
    const data = await ProductsBuy.findById(userId)
    if(!data){
        const newProduct = new ProductsBuy({
            user: userId
        })
        // newProduct.products.push(products);
        await newProduct.save()
        console.log('save success :>> ');
    }
    if(data){
     if(products.length > 0){
        data.products
     }
    }
    
   }catch(err){
    console.log('err :>> ', err);
   }
}