import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


//const FRONT_URL = "http://192.168.100.82:8081";
const FRONT_URL = "http://[2806:2f0:9021:cb34:41b3:d385:5246:d5b9]:8081";


// URLs del frontend
const ALLOWED_ORIGINS = [
    "http://[2806:2f0:9021:cb34:41b3:d385:5246:d5b9]:8081", // IPv6
    "http://192.168.100.82:8081", // IPv4 local
    "http://187.190.193.53:8081",// IPv4 pública 
]


const  app = express()

app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        if(ALLOWED_ORIGINS.includes(origin) || !origin){
            callback(null, true)
        } else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api", taskRoutes)

export default app