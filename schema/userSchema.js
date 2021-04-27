const mongoose = require('mongoose');
const { isEmail } = require('validator');

const users = new mongoose.Schema({
    
    email:{
        type:String,
        required:[true,'please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'please enter a valid email'],
    },
    isConfirmed:{
        type:Boolean,
        default:false
    },
    address:schemaFunction('String'),
    birth_date:schemaFunction('String'),
        gender:schemaFunction('String'),
    married:schemaFunction('String'),
    name:schemaFunction('String'),
    phone:schemaFunction('Number'),
    occupation:schemaFunction('String'),
    org:schemaFunction('String'),
    password:schemaFunction('String'),
    pincode:schemaFunction('String'),
    position:schemaFunction('String'),
    some:schemaFunction('String'),
    title:schemaFunction('String'),
    otp:schemaFunction('Number'),
    })
    function schemaFunction(types){
    
        return {
            type:types
        }
    }

// create static login function 

users.static('login', async function(email) {
    const auth = await this.findOne({email});
    if(auth){
        return auth;
    }
    else { return null}

})
// users.static('phone_number_check', async function(phone) {
//     const phone = await this.findOne({phone});
//     if(phone){
//         return phone;
//     }
//     else { return null}

// })

const user  = mongoose.model('user',users);

module.exports = user;



