
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  ContactName:{ 
    type:String,
    require:true
    },

    ContactEmail: {
        type: String,
        require:true
    },

    CompanyPhone: String,

    BirthDate:Date,
    ContactType:{
        type : String,
        enum:[  "Primary", "Secondary", "Other"],
        required:true
    },

    CompanyId:{
        type: Number,
        ref: "Company"
    }

  
});

const ContactModel = mongoose.model('Contact', contactSchema);

module.exports = ContactModel;