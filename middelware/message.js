

module.exports.SuccessMessage = (message)=>{
            return {message:'user created',value:true};
   }
module.exports.userAuthanticate = ()=>{
            return {message:'you are authorized person',value:true};
   }
module.exports.checkPassword = ()=>{
            return {message:'check your password again',value:false};
   }
module.exports.verify = ()=>{
            return {message:'Please verify your account first ',value:false};
   }
module.exports.checkEmail = ()=>{
            return {message:'Check Email id Again',value:false};
   }
module.exports.serverSideError = ()=>{
            return {message:'server side error please try again later',value:false};
   }