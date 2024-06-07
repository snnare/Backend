import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


//const FRONT_URL = "http://192.168.100.82:8081";

// URLs del frontend
const ALLOWED_ORIGINS = [
    "http://192.168.100.82:8081", // IPv4 local
    "http://187.190.193.53:8081",// IPv4 pública 
]



// Configuración de CORS
const corsOptions = {
    origin: (origin, callback) => {
      // Permite cualquier origen
      callback(null, true);
    },
    credentials: true, // Esto permite el uso de credenciales (cookies)
    optionsSuccessStatus: 200, // Para asegurar compatibilidad con navegadores legacy (algunos exploran el status 204)
  };



const  app = express()

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api", taskRoutes)

export default app