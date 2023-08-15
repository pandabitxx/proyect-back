import roleModel from "../models/role.model.js";
import userModel from "../models/user.model.js";

export const createUser = async (req, res) => {
    try {
      const { username, email, password, roles } = req.body;
  
      const rolesFound = await roleModel.find({ name: { $in: roles } });
  
      // creating a new User
      const user = new userModel({
        username,
        email,
        password,
        roles: rolesFound.map((role) => role._id),
      });
  
      // encrypting password
      user.password = await userModel.encryptPassword(user.password);
  
      // saving the new user
      const savedUser = await user.save();
  
      return res.status(200).json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        roles: savedUser.roles,
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  export const getUsers = async (req, res) => {
    const users = await userModel.find();
    return res.json(users);
  };
  
  export const getUser = async (req, res) => {
    const user = await userModel.findById(req.params.userId);
    return res.json(user);
  };