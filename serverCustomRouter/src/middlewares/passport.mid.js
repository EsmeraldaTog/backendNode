import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
const { GOOGLE_ID, GOOGLE_CLIENT,SECRET } = process.env;

import { createHash, validatePass } from "../utils/hash.util.js";
import dao from "../data/index.factory.js";
const { testUsers } = dao 
// import  testUsers  from "../data/mongo/manager.mongo.js";
import { createToken } from "../utils/token.util.js";
import UserDTO from "../dto/users.dto.js";


//nombre de la estrategia y el con structor de la estrategia local
passport.use("register", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
           async (req, email, password, done) => {
try {
    const user= await testUsers.readByEmail(email)
    if(!user){
        let data= req.body;
        data.password= createHash(password)
        data = new UserDTO(data);        
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
        const token= createToken({email,role:user.role})
        req.token= token;
       // req.session.email= email;
       // req.session.role= user.role;
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

passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: GOOGLE_ID,
        clientSecret: GOOGLE_CLIENT,
        callbackURL: "http://localhost:8080/api/sessions/google/cb",
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
   try {
    console.log(profile)
    let user= await testUsers.readByEmail(profile.id)
    if(user){
        req.session.email=user.email;
        req.session.role=user.role;
        
        return done(null,user)
    }
else{
    user={
        email: profile.id,
        name: profile.name.givenName,
        lastName: profile.name.familyName,
        photo: profile.coverPhoto,
        password: createHash(profile.id),
    }
   // let newUser = await testUsers.create(user)
    let newUser= await testUsers.create(user)
   
    req.session.email=newUser.email;
    req.session.role=newuser.role;
    //req.session.photo=user.photo;    
    console.log(newUser.email)
    return done(null,user)
}

   }
   catch (error) {
    return done(error)
    
   }
      }));
   




      passport.use(
        "jwt",
        new JwtStrategy({
          jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies["token"]]),
          secretOrKey: SECRET,
         },
         async (jwt_payload, done) => {
           try {
             let user = await testUsers.readByEmail(jwt_payload.email);
             if (user) {
                // se protege la contraseña
                user.password= null;
                return done(null,user)
             }
             else 
             return done(null, false);
           } catch (error) {
             return done(error);
           }
         }
       )
      );
      
export default passport;