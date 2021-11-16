const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id:{
        type:Number,
        required :true
       
    },
    title:{
        type:String,
        required:true 
        
    },
    price :{
        type: Number,
        required:true
        
    },
    description :{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    rating :{
        type :Number,
        required:true
    }

})
const Orders = new mongoose.Schema({
    userid:{
        type: String
    },
    orders : {
        type: [orderSchema], 
        required :[true ,'Address required']
    }
})
module.exports =mongoose.model('Orders',Orders, 'logins')