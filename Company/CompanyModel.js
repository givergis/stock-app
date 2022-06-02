const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    Name:{type:String,required:true},
    CurrentMarketPrice:{type:String,required:true},
    MarketCap:{type:String,required:true},
    StockPE:{type:String,required:true},
    DividendYield:{type:String,required:true},
    ROCE:{type:String,required:true},
    ROEpreviousAnnum:{type:String,required:true},
    DebtToEquity:{type:String,required:true},
    EPS:{type:String,required:true},
    Reserves:{type:String,required:true},
    Debt:{type:String,required:true}
});

const companyModel = mongoose.model('Company',companySchema);

module.exports = companyModel;