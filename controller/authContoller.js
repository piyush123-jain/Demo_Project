const user  = require('../schema/userSchema');
// const message = require('../middelware/message');
const send = require('../middelware/verifyEmail');
var jwt = require('jsonwebtoken');
const emailTemplate  = require('../middelware/emailTemplate');
const maxAge = 3* 24*24;

const bcrypt = require('bcrypt');
const saltRounds = 10;

  
// tokken creatation 
const createToken = (id)=>{
    return jwt.sign({ id },'demoPurpose', { algorithm: 'RS256'},{expiresIn:maxAge});
}


module.exports.signUp_post =  async (req,res)=>{
    // check user exits or not
    
        // genrate password/otp 
        var otp = Math.floor(Math.random()*10000);

        var html = await emailTemplate.emailTemplate(otp);

        // send email of  new user 
        send.mailSend(
            'piyushj1937@gmail.com', 
            req.body.email,
            "OTP",
            html
            
        ).then(function(data){
            // Save user.

            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                console.log(hash);
                req.body.password = hash
            var users = new user(req.body);       
            users.otp = otp;
            users.save(function (err, userCreated) {                                        // save momessagedel to database
                if (err){  
                        console.log(err);
                    return res.json({message:'check your data again',value:false})};                       //send error message to user
            return res.json({message:'user created',value:true});                // send success response to user
            // return res.json({ });                // send success response to user
           });
           })
// Now we can store the password hash in db.
}).catch(err => {return res.send(err); }) ;
}


// check email id exists or not 
module.exports.checkEmail = async (req,res)=>{
    const { email } = req.body;
    console.log(email);
    try {
        userExists =  await user.login(email);
        if(userExists){   return res.json({exists:' Exists! try another one'})}

        res.json({success:'new user'});
    }
        catch(err){ 
            console.log(err);
        }
}
// check login
module.exports.verifyEmail = async (req,res)=>{

/// Load hash from the db, which was preivously stored 
    user.find({ email: req.body.email}, function(err, users) {
        if (err) {
            return res.send('login error');
        }
        if(!users){
            return res.send('user not found');
        }
        if(users[0].otp == req.body.otp){ 
            user.updateOne({_id:users[0]._id}, {
                isConfirmed:true, 
            }, function(err, affected, data) {

                if(err) return res.json({message:'some thing goes wrong',value:false})
                return res.json({message:'you are authorized person',value:true})
            })
        }

        
        
});
}

// verification email 
module.exports.login = async (req,res)=>{
    var message ;
    const {email,password} = req.body;

     try {
        userExists =  await user.login(email);
        console.log(userExists);
        if(userExists)
        {  
            if(userExists.isConfirmed){
            bcrypt.compare(password,userExists.password, function(err, data) {
                console.log(data);
                        if(data) {  return res.send({message:'you are authorized person',value:true}) }
                        
                        else { return res.send({message:'check your password again',value:false})}
                    });
  
                }
                else{  return res.send({message:'Please verify your account first ',value:false}); }
} 
        else { return res.send({message:'Check Email id Again',value:false}); }
    }
        catch(err){
                console.log(err);
            return res.send({message:'server side error please try again later',value:false}); }

}

