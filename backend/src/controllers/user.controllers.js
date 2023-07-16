
const db = require("../models");
// Define the User model
const User = db.User;

const userOps = {
    async getAllUsers(req, res, next) {
        let users;
        try {
            users = await User.findAll({
                attributes: {
                    exclude: ['password']
                }
            })
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
                    id: req.query.id
                },
                attributes: {
                    exclude: ['password']
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
                },
                attributes: {
                    exclude: ['password']
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