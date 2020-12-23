const ErrorRespone = require("../utils/errorResponse");

const DEBUG=true
const errorHandler = (err, req, res, next) => {

    if(DEBUG)
    {
        console.log("err.value:",err.value)
        console.log("err.stack:",err.stack);
        console.log("err.message:",err.message);
        console.log("err.model",err)
    }
    // 
  //copy error message
  let error = { ...err };
  error.message = err.message;

  //Log to Console for Dev
//   

  //Mongoose bad object id
  if (err.name === "CastError") {
    const message = `id ${err.value}  is not available at the moment`;
    error = new ErrorRespone(message, 404);
  }


  if(err.code ===11000){
      const message = "Duplicate field value enterd";
      error = new ErrorRespone(message,400)
  }
  if(err.name==="ValidationError"){
      const message = Object.values(err.errors).map(val=>val.message);
      error = new ErrorRespone(message,400)
  }
  console.log(err.name);
  res.status(err.statusCode || 500).json({
    sucess: false,
    error: error.message || "server error",
    errorname:err.name,
    errcode:err.code
  });
};

module.exports = errorHandler;
