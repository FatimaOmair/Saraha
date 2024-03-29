const dataMethods=['body', 'query', 'params','headers']




const validation = (scheme) => {
  return (req, res, next) => {
  const validationArray=[];
  dataMethods.forEach(key=>{
    if(scheme[key]){
        const validationResult=scheme[key].validate(req[key], {abortEarly:false});
        if(validationResult.error){
            validationArray.push(validationResult.error)
        }
    }
   
  })

  if(validationArray.length > 0){
    return res.status(400).json({message:"validation error",validationArray})
  }
  next()
  };
};

export default validation;
