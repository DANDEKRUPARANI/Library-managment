import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import userRoute from "./route/userRoute.js";
import bookRoute from "./route/bookRoute.js";
const app = express();
const corsOptions = {
  origin: "*",
};


const client =new MongoClient('mongodb+srv://admin:admin@cluster0.v2cj5g5.mongodb.net/?retryWrites=true&w=majority');
client.connect()                              //cluster
const db=client.db('s21')                   //database
const col=db.collection('register')       //collection

app.get('/home',(req,res)=>{
    res.send("welcome")
})


// MIDDLEWARES.
app.use(cors(corsOptions));
app.use(express.json()); // To validate json objects.
app.use("/user", userRoute); // user routes.
app.use("/books", bookRoute); // book routes.

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
    status: err.status,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  mongo();
  console.log(`Port successfully started at ${PORT}`);
});
