const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/index').User;

passport.use(new LocalStrategy(
    {}, 
    async function (username, password, done) {
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return done(null, false, {});
            }
            if (!user.validatePassword(password)) {
                return done(null, false, {});
            }
            return done(null, user);
        } catch (error) {
            console.log('ERROR', error);
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(async function (user, done) {
    try {
        const verify_user = await User.findById(user.id);
        if (!verify_user) {
            return done(new Error('Invalid user!'));
        }
        return done(null, verify_user);
    } catch (error) {
        console.log('ERROR:', error);
    }
});

module.exports = passport;