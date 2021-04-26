const mongoose = require('mongoose');
const { isEmail } = require('validator');

const users = new mongoose.Schema({
    address:{
        type:String
    },
    birth_date:{
        type:String
    },
    
    email:{
        type:String,
        required:[true,'please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'please enter a valid email'],
    },
    
    gender:{
        type:String
    },
    married:{
        type:String
    },
    name:{
        type:String
    },
    occupation:{
        type:String
    },
    org:{
        type:String
    },
    password:{
        type:String
    },
    pincode:{
        type:String
    },
    position:{
        type:String
    },
    some:{
        type:String
    },
    title:{
        type:String
    },
    otp:{
        type:Number
    }
    })


// create static login function 

users.static('login', async function(email) {
    const auth = await this.findOne({email});
    if(auth){
        return auth;
    }
    else { return null}

})
const user  = mongoose.model('user',users);

module.exports = user;



