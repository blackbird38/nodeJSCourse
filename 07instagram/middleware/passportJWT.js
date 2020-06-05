const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../models/user');
const config = require('../config');

const ExctractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExctractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = () => {
    const strategy = new Strategy(params, async (payload, done) => {
        const user = await User.findById(payload.id);
        if(!user) return done(new Error('User not found'), null);
        return done(null, user);
    });
    passport.use(strategy);
    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate('jwt', {session: false});
        }
    };
};