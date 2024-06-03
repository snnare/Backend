import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


//const FRONT_URL = "http://192.168.100.82:8081";
const FRONT_URL = "http://[2806:2f0:9021:cb34:41b3:d385:5246:d5b9]:8081";


const  app = express()

app.use(cors({
    credentials: true,
    origin: FRONT_URL
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api", taskRoutes)

export default app