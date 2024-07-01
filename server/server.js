const express = require('express')
const mongoose =  require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const validator = require('express-validator')
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

app.post('/upload',(req,res)=>{

    const role = req.body.selectedOption;
    const data = req.body.data;

    console.log(role,data);
})



app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})