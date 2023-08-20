import User from "../models/user.model.js";
import Jwt from "jsonwebtoken";
import config from "../../config/config.js";
import roleModel from "../models/role.model.js";
import userModel from "../models/user.model.js";
import { serialize } from "cookie";

export const signUp = async (req, res) => {
  
    const {name, email, password, roles} = req.body;

    //const userFound = User.find({email})

    const newUser = new User({
        name,
        email,
        password: await User.encryptPassword(password)
    });

    if (roles) {
        const foundRoles = await roleModel.find({name:{$in: roles}})
        newUser.roles = foundRoles.map(role => role.id)
    }else{
        const role = await roleModel.findOne({name: "user"})
        newUser.roles = [role._id];
    };

    const savedUser = await newUser.save()
    console.log(savedUser)

    const token = Jwt.sign({id: savedUser._id}, config.SECRET,{
        expiresIn: 3600 //24 Horas
    });

    //res.status(200).json({token});
    res.redirect('/products')
}



export const signIn = async (req, res) => {

    const userFound = await userModel.findOne({email: req.body.email}).populate('')

    if (!userFound) return res.status(400).json({message: "User not found"})

    const matchPassword = await User.comparePassword(
        req.body.password,
        userFound.password
      );

    if (!matchPassword) return res.status(401).json({token: null, message: 'Invalid Password'})

    console.log(userFound);

    const token = Jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 3600, // 60 segundos
    });

    //res.json({token})
    //res.redirect('/products')


    //cookie configuration 

    const serialized = serialize('myTokenName', token, {
        httpOnly: true,
       secure: process.env.NODE_ENV === 'production',
       sameSite: 'strict',
       maxAge: 1000 * 60 * 24 * 30, 
       path: '/'
    })

    res.setHeader('Set-Cookie', serialized)
    return  res.redirect('/products')
}