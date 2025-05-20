import {
    Strategy as JwtStrategy,
    ExtractJwt,
    StrategyOptions,
  } from "passport-jwt";
  import { PassportStatic } from "passport";
import { prisma } from "../app";
 
  
  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret",
  };
  
  // Export the Passport strategy
  export default (passport: PassportStatic) => {
    passport.use(
      new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
          const user = await prisma.user.findUnique({
            where: { id: jwt_payload.id },
          });
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        } catch (error) {
          return done(error, false);
        }
      })
    );
  };