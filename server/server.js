const express = require('express')
const mongoose =  require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const validator = require('express-validator')
const CompanyModel = require('./modules/Company')
const ContactModel = require('./modules/Contact')
const port = 8000;

dotenv.config()

const app = express()
app.use(express.json())

app.use(cors({
    origin:["http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }))
  

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

  app.post('/upload', async (req, res) => {
    const role = req.body.selectedOption;
    const data = req.body.data;

    if (!role || !data) {
        return res.status(400).json({ error: 'Role and data are required.' });
    }

    try {
        if (role === 'company') {
            const result = await CompanyModel.insertMany(data);
            res.sendStatus(200);
        } else if (role === 'contact') {
            const result = await ContactModel.insertMany(data);
            res.sendStatus(200);
        }
    } catch (err) {
        console.error('Error during data insertion:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
  });
  


app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})