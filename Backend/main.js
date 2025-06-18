import {PORT} from './config/dotenv.js'
import express from 'express'
import cors from 'cors'
import userRouter from './routes/user_R.js'
import flightsRouter from './routes/flights_R.js'
import airlinesRouter from './routes/airlines_R.js'
import adminRoute from './routes/admin_R.js'
import bookingRoute from "./routes/bookings.js"
import baggage_Router from './routes/baggae_R.js'
import inquiries_R from './routes/inq_R.js'
import RateLimit from 'express-rate-limit';
const app=express()
const port =process.env.PORT|| PORT ||5000
const limiter = RateLimit({
    windowMs: 10 * 60 * 1000, // 15 minutes
    max: 150, // limit each IP to 150 requests per windowMs
    handler: function (req, res) {
      res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }
  });
app.set('trust proxy', 1);

app.use(limiter)
app.use(express.json());
app.use(cors()) // used to by pass cors Limitation by browser
app.get('/',(req,res)=>{
    res.send("Welcome to the Flight Booking API");
})
app.use('/api/users',userRouter);
app.use('/api/data/flights',flightsRouter);
app.use('/api/data/airlines',airlinesRouter);
app.use("/api/admin",adminRoute)
app.use('/api/users/booking',bookingRoute)
app.use('/api/data/baggage', baggage_Router)
app.use("/api/inquiries", inquiries_R)
app.listen(port,()=>{
    console.log("Server running in Port : ",port);
})