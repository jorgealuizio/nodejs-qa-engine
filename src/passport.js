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

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passport;