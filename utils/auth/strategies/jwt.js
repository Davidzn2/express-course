const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('boom');
const MongoLib = require("../../../lib/mongo");
const { config } = require('../../../config')
passport.use(
    new Strategy(
        {
            secretOrKey: config.AuthJwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async function(tokenPayload, cb){
            const mongoDB = new MongoLib();

            try{
                const [user] = await mongoDB.getAll("users",{
                    username: tokenPayload.sub
                })
                if (!user){
                    cb(boom.unauthorized, false)
                }
                return cb(null, user);
            }
            catch(error){
                return cb(error)
            }
        }
    )
);