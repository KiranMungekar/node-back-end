const passport =require('passport');

const GoogleStrat= require('passport-google-oauth2').Strategy;


passport.use(new GoogleStrat({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'http://localhost:3000/api/google/callback',
    passReqToCallback:true
    },(request,accessToken,refreshToken,profile,done)=>{
        console.log(profile);
        return done(null, profile);
    }
));
