const passport = require('passport');
const { Sequelize } = require('sequelize');
const Auth0Strategy = require('passport-auth0');
const LockStrategy = require('passport-auth0');

const { v4: uuidv4 } = require('uuid');

const dotenv = require('dotenv');
dotenv.config();

const DATABASE_URL = `${process.env.DATABASE_TENANT}://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:5432/${process.env.DATABASE_NAME}`;

const sequelize = new Sequelize(DATABASE_URL);


// Define the User model
const User = sequelize.define('User', {
    auth0id: { type: Sequelize.STRING, allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false }
});

const setupPassport = () => {
    // Configure the Auth0 authentication strategy
    const strategy = new Auth0Strategy(
        {
            domain: process.env.AUTH0_DOMAIN,
            clientID: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            callbackURL: process.env.AUTH0_CALLBACK_URL
        },
        async (accessToken, refreshToken, object, profile, done) => {
            try {
                // Save user details to the database
                const [user] = await User.findOrCreate({
                    where: { auth0id: profile.id },
                    defaults: {
                        id: uuidv4(),
                        name: profile.displayName,
                        email: profile.emails[0].value
                    }
                });
                done(null, user);
            } catch (error) {
                console.log(error);
                done(error);
            }
        }
    );

    passport.use(strategy);


    // Serialize and deserialize user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, user.name);
        } catch (error) {
            console.log(error);
            done(error);
        }
    });
}

module.exports = setupPassport;
