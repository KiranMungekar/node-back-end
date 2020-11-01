const passport =require('passport');

const GoogleStrategy= require('passport-google-oauth2').Strategy;


passport.serializeUser((user, done)=>{
    done(null,user.id);
  });
  
  passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then(user=>{
      done(null, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'http://localhost:3000/api/google/callback',
    passReqToCallback:true
    }, async (request,accessToken,refreshToken,profile,done)=>{
        console.log(profile);
        return done(null, profile);
    }
));
