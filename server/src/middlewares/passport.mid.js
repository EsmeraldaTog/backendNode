import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { createHash, validatePass } from "../utils/hash.util.js";
import { testUsers } from "../data/mongo/manager.mongo.js";


//nombre de la estrategia y el con structor de la estrategia local
passport.use("register", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
           async (req, email, password, done) => {
try {
    const user= await testUsers.readByEmail(email)
    if(!user){
        let data= req.body;
        data.password= createHash(password)
        let user= await testUsers.create(data)
        return done(null,user);
    }
    else{
        return done(null,false)
    }
    
} catch (error) {
    done(error)
    
}

            }
    ))



passport.use("login", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
try {

    let user= await testUsers.readByEmail(email)
    console.log(user.password)
    console.log(password)
    if(user && validatePass(password,user.password)){
        req.session.email= email;
        req.session.role= user.role;
        return done(null,user)
    }
    else{
        return done(null,false)
    }
} catch (error) {
    return done(error)
    
}



    }
))

export default passport;