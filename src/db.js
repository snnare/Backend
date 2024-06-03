import mongoose from "mongoose";


export const connectDB = async () => {

    const URL = "mongodb+srv://admin:1212@cluester-t-escuela.lb9mm7z.mongodb.net/?retryWrites=true&w=majority&appName=Cluester-T-escuela"
    try {
        await mongoose.connect(URL)
        console.log("Db is connected")
    } catch (error) {
        console.log(error);
    }
}

