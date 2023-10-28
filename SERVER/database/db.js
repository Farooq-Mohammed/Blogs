import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true });
        console.log('Database connected successfully!!');
    } catch(error) {
        console.log('There is an error while connecting database...', error);
    }
}

export default connectDB;