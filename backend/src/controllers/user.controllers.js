const { Sequelize } = require('sequelize');
const db = require('../config/db');
// Define the User model
const User = db.define('User', {
    id: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
});

const userOps = {
    async getAllUsers(req, res, next) {
        let users;
        try {
            users = await User.findAll({})
        } catch (err) {
            next(err);
        }
        return res.status(200).send(users);

    },
    async getUserById(req, res, next) {
        let user;
        try {
            user = await User.findOne({
                where: {
                    id: req.params.id
                }
            })

        } catch (err) {
            next(err);
        }
        return res.status(200).send(user) || res.status(200).send({});

    },
    async updateUserDetails(req, res, next) {
        let { ...details } = req.body;
        console.log(details);
        const { id } = req.params;
        let user;
        try {
            user = await User.update(details, {
                where: {
                    id: id
                }
            })

        } catch (err) {
            next(err)
        }
        return res.status(200).send(user);

    },
    async deleteUser(req) {
        const { id } = req.params;
        try {
            await User.destroy({
                where: {
                    id: id
                }
            });
        } catch (e) {
            next(err);
        }
        return res.status(200).send([]);
    }
}

module.exports = userOps;