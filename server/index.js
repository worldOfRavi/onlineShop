import express from 'express';
import 'dotenv/config'
import connectDB from './db/connectDB.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import appRouter from "./routes/index.js"
const app = express();
// const PORT = process.env.PORT ||  3000;
const PORT =  5000;

// enable cors middleware

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET", "POST", "DELETE", "PUT"],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials:true
}))

app.use(cookieParser());
app.use(express.json());

// this router contains all app routes
app.use(appRouter);
// app.use("/",(req, res)=>{
//     res.json("Hello from server");
// })


connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running at port no ${PORT}`);
        
    })
})

