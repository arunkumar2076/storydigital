const envPath = `${__dirname}/.env.${process.env.NODE_ENV}`
// console.log(envPath);
const dotenv = require('dotenv')
const express = require('express')
dotenv.config({path:envPath})
const dbConnection = require('./database/dbConfig')
const adminRouter = require('./routes/admin')
const postRouter = require('./routes/post')
const PORT = process.env.PORT 
const cors = require('cors')
process.env.TZ = 'Asia/Kolkata'
const app = express()
app.use(express.json())
app.use(cors())
// var corsOptions = {
//     origin: 'http://localhost:8080',
//     optionsSuccessStatus: 200 // For legacy browser support
// }

app.listen(PORT , ()=>{
    console.log(`server is running at http://localhost:${PORT}`);
});



dbConnection(error=>{
    if(error){
        console.log("Error from mongo connection");
        console.error(error);
        process.exit(1)
    }

    console.log("Connected to Mongo Database");
});
app.get('/' , async(req,res)=>{
    return res.json({error:false , msg:"OK"})
})
app.use('/admin' , adminRouter)
app.use('/post' , postRouter)


//static router
// app.use(express.static(__dirname + 'uploads'));
// app.use('/uploads',express.static('uploads'));