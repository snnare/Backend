import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const FRONT_URL = "http://187.190.193.53:8081";


const  app = express()

app.use(cors({
    credentials: true,
    origin: "*"
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api", taskRoutes)

export default app