const axios = require('axios');
const asyncWrapper = require('../middlewares/async');
const Order= require('../models/orderModel');







const getOrders = asyncWrapper(async (req, res, next) => {
    const authHeader =req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null){
        return next(createCustomError(`No token `,401))
    }
    else{    
            const response= await axios.post('http://localhost:3030/verify',{token});
    
            if(response.data.msg ==="Verified"){
              let allOrders =await Order.findOne({userid: response.data.user}).exec()

              if(!allOrders){
                return next(createCustomError(`No Such user `,401))
              }
                
                
                return res.status(200).json({orders:allOrders._doc.orders});
            }

          else{

              return next(createCustomError('Auth expired',401));
          } 

    } 
});

const addOrders = asyncWrapper(async (req, res, next) => {
    const authHeader =req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null){
        return next(createCustomError(`No token `,401))
    }
    else{    
            const response= await axios.post('http://localhost:3030/verify',{token});
            console.log(response);
            if(response.data.msg ==="Verified"){
                console.log(req.body);

              let update =await Order.findOneAndUpdate({userid: response.data.user},
                { "$push": { "orders": req.body.orders } },
                { new : true ,runValidators: true}
               
                ).exec();
                
                return res.status(200).json({msg: `User details updated with ${update}`});
            }

          else{

              return next(createCustomError('Auth expired',401));
          }
        
    

    }    
})




module.exports = {
    getOrders, addOrders
}