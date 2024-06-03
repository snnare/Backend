import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const register = async (req, res) => {
    const { email, password, username } = req.body

    try {

        // Encriptar password
        const passwordHash = await bcrypt.hash(password, 10)


        // Guardar los datos en una instancia User
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })

        const userSaved = await newUser.save()
        const token =  await createAccessToken({id:userSaved._id})

        res.cookie('token', token)
        res.json({
            message: "User created successfully"
        })

    } catch (error) {
        res.status(500).json( {message: error.message})
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        // Veririfcar que el usuario existe
        const userFound = await User.findOne({email});
        if(!userFound) return res.status(400).json({message: "user not found"})

        // Verificar si la password es correcta
        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"})

        // Generar el token
        const token  = await createAccessToken({id: userFound._id})


        res.cookie('token', token)
        res.json({
            message: "User successfully log in"
        })

    } catch (error) {
        res.status(500).json( {message: error.message})
    }
}

export const logout =   (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = (req, res)  => {
    console.log(req.user)
    res.send('profile')
}