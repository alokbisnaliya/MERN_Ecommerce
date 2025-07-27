const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    shippingAddress:{
        address:String,
        city:String,
        state:String,
        pincode:String,
        phone:String
    },
    items:[{
        product:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
            required:true,
            default:1,
        }
    }],
    status:{
        type:String,
        enum: ['processing', 'shipped', 'delivered', 'cancelled'],
        default: 'processing',
    },

    totalAmount:{
       type:Number,
       required:true
    },
    createdAt:{
        type:Date,
        default: new Date()
    },
    cancellationReason :{
        type:String
    }

})

module.exports = mongoose.model('Order',orderSchema);