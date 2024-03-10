const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const keys = require('../config/keys');
const User = require("../model/userSchema")


    
passport.serializeUser((user,done)=>{
    done(null,user.id);    
});
passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then(user=>done(null,user));
})

passport.use(new GoogleStrategy({
    clientID: '1055944225663-mrd09cqvidgsihthj7ijjiacsmus3bk1.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback'
},async(accessToken, refreshToken, profile, done)=>{

    // console.log(req)
    console.log(profile)

    const existingUser = await User.findOne({googleId:profile.id})
        if(existingUser){
            //already have a record with the profile id
            return done(null,existingUser);
        }
        const user = await new User ({googleId: profile.id}).save();
        done(null,user);
}));
