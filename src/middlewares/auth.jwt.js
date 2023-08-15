// Autenticar  roles. (authentications)
import Jwt from "jsonwebtoken";
import config from "../config/config.js";
import userModel from "../dao/models/user.model.js";
import roleModel from "../dao/models/role.model.js";


export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        console.log(token)
    
        if (!token) return res.status(403).json({message: "No token provided"})
    
        const decoded = Jwt.verify(token, config.SECRET)
        req.userId = decoded.id;
    
        const user = await userModel.findById(req.userId, {password: 0})
        if (!user) return res.status(404).json({message: 'no user found'})
    
        next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'})
    }
};

export const isModerator = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.userId);
        const roles = await roleModel.find({ _id: { $in: user.roles } });
        for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }
        }
        return res.status(403).json({ message: "Require Moderator Role!" });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.userId);
      const roles = await roleModel.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
  
      return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error });
    }
  }