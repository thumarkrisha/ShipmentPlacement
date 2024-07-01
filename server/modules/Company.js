
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  CompanyName:{ 
    type:String,
    require:true
    },

    CompanyAddress: String,
    CompanyPhone: String,
    CompanyEmail: String,
    CompanyWebsite: String,
    NoOfEmploy: Number,
    FoundedDate:date,
    IndustryType:{
        enum:[ "Technology", "Finance", "Healthcare", "Retail", "Other"],
        required:true
    }

  
});

const CompanyModel = mongoose.model('Company', companySchema);

module.exports = CompanyModel;