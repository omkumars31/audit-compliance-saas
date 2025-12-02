import { Request, Response } from "express";
import {prisma} from "../config/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";


export const Signup = async (req : Request, res: Response) =>{
try{
    const {name, email, password, role} = req.body;

    const existingUser = await prisma.user.findUnique({
        where: {email}
    });



    if(existingUser){
        return res.status(400).json({message: "User already Exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await prisma.user.create({
        data: {
            name, 
            email,
            password: hashedPassword,
            role : role || "User"
        }
    })

    res.json({
        message: "Signup Successful",
        user, 
        token: generateToken(user.id)

    })
}

catch (error){
    res.status(500).json({message: "Server Error"});

}
};

export const login = async (req: Request, res: Response)=>{
    try {
        const {email, password} = req.body;


        const user = await prisma.user.findUnique({
            where: {email}
        });

        if(!user){
            return res.send(400).json({message: "Invalid Credintals"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            return res.send(400).json({message: "Invalid Credintals"});
        }

        res.json({
            message: "Login Succesful",
            user, 
            token: generateToken(user.id)
        })
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }

}