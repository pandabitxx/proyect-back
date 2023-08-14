import { Schema, model } from "mongoose";
import { bycrypt } from bcryptjs

const UserSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
}, {
    timestamps: true
})




//Encriptar las contraseñas de los usuarios
UserSchema.methods.encryptPassword = async password => {
    const salt = await bycrypt.genSalt(10);
    return await bycrypt.hash('password', salt);
};

UserSchema.methods.matchPassword = async function(password) {
    return await bycrypt.compare(password, this.password);
}


module.exports = model('User', UserSchemaSchema);