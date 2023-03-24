import { IUser } from 'satelnet-types';
import passport from 'passport'
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../db/models/user.schema";

const googleClientId = process.env.GOOGLE_CLIENT_ID as string,
  googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user: IUser, done) => {
  User.findOne({ email: user.email }).then((user) => {
    return done(null, user);
  }).catch(error => {
    done(error, undefined)
  })
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: `${process.env.URL_BASE}/auth/google/redirect`,
      scope: ["profile", "email"],
    },
    async (request:any, accessToken:any, refreshToken:any, profile:any, done:any) => {
      const {
        _json: { email, name },
      } = profile;
      const user : IUser | null = await User.findOneAndUpdate( { email }, { lastLogin: new Date() },)
      if (user) {
        return done(null, user);
      }
      // If user not exist for first time, we create him
      else {
        const thereAreUsers = await User.find();
        if (thereAreUsers.length) {
          done(null, {});
        } else {
          new User({
            name,
            email,
            role: 'admin',
            lastLogin: new Date()
          })
            .save()
            .then((user) => {
              return done(null, user);
            })
            .catch((error) => {
              return done(error);
            });
        }
      }
    }
  )
);
