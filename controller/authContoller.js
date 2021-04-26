const user  = require('../schema/userSchema');
// const message = require('../middelware/message');
const send = require('../middelware/verifyEmail');
var jwt = require('jsonwebtoken');


const maxAge = 3* 24*24;


// tokken creatation 
const createToken = (id)=>{
    return jwt.sign({ id },'demoPurpose', { algorithm: 'RS256'},{expiresIn:maxAge});
}


module.exports.signUp_post =  async (req,res)=>{
    // check user exits or not
    
        // genrate password/otp 
        var password = Math.floor(Math.random()*10000);

        var html = `<p>your password ${password}</p>
                    <p>Please enter you password inside of  click here url </p>
                    <a href="http://localhost:4200/verifyEmail">Click here </a>`
        // send email of  new user 
        send.mailSend(
            'piyushj1937@gmail.com', 
            req.body.email,
            "password",
            html
        ).then(function(data){
            // Save user.
            var users = new user(req.body);       
            users.otp = password;
            users.save(function (err, userCreated) {                                        // save momessagedel to database
            
            if (err){  return res.json({message:'check your data again',value:false})};                       //send error message to user
            return res.json({message:'user created',value:true});                // send success response to user
            // return res.json({ });                // send success response to user
           });
           }).catch(err => {

            return res.send(err);
        }) ;

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
module.exports.login = async (req,res)=>{

        user.find({ email: req.body.email,password:req.body.password}, function(err, user) {
        console.log(user);
        if (err) {
            return res.send('login error');
        }
        if(!user){
            return res.send('user not found');
        }
        res.send(user);

});
}

// verification email 
module.exports.verifyEmail = async (req,res)=>{
    const {email,password} = req.body;
    console.log(req.body);

     try {
        userExists =  await user.login(email);
        console.log(userExists);
        if(userExists)
        {  if(password == userExists.otp){
                    return res.json({message:'you are authorized person',value:true});
                }
                console.log('this otp not match');
                return res.json({message:'check your otp again ',value:false});
} 
        else { return res.json({message:'Check Email id Again',value:false}); }
    }
        catch(err){  return res.json({message:'server side error please try again later',value:false}); }

}

