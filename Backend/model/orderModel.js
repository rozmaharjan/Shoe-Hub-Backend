const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    // orderid, userid, productid, quantity, 
    // price, totalprice, orderdate, status, cartitems
    orderId : {
        type : String,
        required : true,
        default : "ORDER-NO-" + Math.floor(Math.random() * 1000000)
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true,
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "products",
        required : true,
    },
    quantity : {
        type : Number,
        required : true,
    },
    status : {
        type : String,
        required : true,
        default : "pending",
    }
});

const Orders = mongoose.model('orders', orderSchema);
module.exports = Orders;