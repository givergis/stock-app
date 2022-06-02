const companyModel =  require('./CompanyModel')

const getCompanyByName = (req,res)=>{
    let cname = req.params.name;

    companyModel.find({Name:cname}).exec()
    .then((response)=>{
        if(response){
            res.send({
                status:200,
                msg:"Company found",
                company:response
            }); 
        }else {
        res.send({
            status:500,
            msg:"Not found"
        });
    }    
    })
    .catch((err)=>{
        res.send({
            status:500,
            msg:"error",
            error:err
        });
    });
}

const getCompany = (req,res)=>{

    companyModel.find().exec()
    .then((response)=>{
        res.send({
            status:200,
            msg:"Company list",
            company:response
        });
    })
    .catch((err)=>{
        res.send({
            status:500,
            msg:"error",
            error:err
        });
    });
}

module.exports ={getCompanyByName,getCompany}