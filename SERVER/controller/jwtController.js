import jwt from "jsonwebtoken";

import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({msg: "Token is missing"});
    }

    jwt.verify(token, process.env.SECRET_ACCESS_KEY, (error, user) => {
        if(error) {
            return res.status(403).json({msg: "Invalid credentials"})
        }
        req.user = user;
        next();
    });
}