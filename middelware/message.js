

module.exports.message = (err)=>{
    console.log(err.code);
    let errors  ={email:''
    // ,password:''
};

    if(err.code == 11000)
    {
        errors.message = "email is already exists";
        error.value=false;
        return errors }
    
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        });
    }    

    return errors;
}


module.exports.SuccessMessage = (message)=>{
    console.log(message);
        return {message:'user created',value:true};
   }