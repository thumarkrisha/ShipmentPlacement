
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    CompanyId : Number,
  CompanyName:{ 
    type:String,
    required:true,
    },

    CompanyAddress: String,
    CompanyPhone: String,
    CompanyEmail: String,
    CompanyWebsite: String,
    NoOfEmploy: Number,
    FoundedDate:Date,
    IndustryType:{
        type : String,
        enum:[ "Technology", "Finance", "Healthcare", "Retail", "Other"],
        required:true,
    }
  
});

const CompanyModel = mongoose.model('Company', companySchema);

module.exports = CompanyModel;