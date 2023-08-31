import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User from "../dao/models/user.model.js";
import CartModel from "../dao/models/Cart.model.js";

const cart = CartModel;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "Not User found." });
      }

      // Match Password's User
      const isMatch = await user.matchPassword(password);
      if (!isMatch)
        return done(null, false, { message: "Incorrect Password." });

      if (!user.cart){
        const newCart = new cart();
        await newCart.save();
        user.cart = newCart._id;
        await user.save();
      }
      
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });