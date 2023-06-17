const passport = require('passport');
const { Sequelize } = require('sequelize');
const Auth0Strategy = require('passport-auth0');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const db = require('../config/db');


const { v4: uuidv4 } = require('uuid');

const dotenv = require('dotenv');
dotenv.config();


// Define the User model
const User = db.define('User', {
    auth0id: { type: Sequelize.STRING, allowNull: true },
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: true }
});

function authUser(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_KEY, {
        expiresIn: 86400 // expires in 24 hours
    });
}

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

                let user = await User.findOne({
                    where: {
                        email: profile.emails[0].value
                    }
                })

                if (user) {
                    done(null, {
                        name: user.name,
                        id: user.id
                    });
                    return;
                }

                const [newUser] = await User.create({

                    id: uuidv4(),
                    auth0id: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value

                });
                done(null, newUser);
            } catch (error) {
                console.log(error);
                done(error);
            }
        }
    );

    passport.use(strategy);

    const localStrategy = new LocalStrategy(async (user, password, done) => {
        let username;
        try {
            username = await User.findOne({
                where: {
                    email: user
                }
            })

            if (!username) {
                return done(null, false);
            }

            bcrypt.compare(password, username.password)
                .then(match => {
                    if (match) {
                        const token = authUser(username)
                        return done(null, { username, token });
                    }
                    return done(null, false);
                })
                .catch(err => {
                    return done(err, false)
                })
        } catch (err) {
            done(err, false);
        }

    })

    passport.use(localStrategy);


    // Serialize and deserialize user
    passport.serializeUser((user, done) => {
        done(null, user.id ? user.id : user?.username?.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, {
                name: user.name,
                id: user.id
            });
        } catch (error) {
            console.log(error);
            done(error);
        }
    });
}

module.exports = setupPassport;
