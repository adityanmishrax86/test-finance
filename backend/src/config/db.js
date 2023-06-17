const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

dotenv.config();

const DATABASE_URL = `${process.env.DATABASE_TENANT}://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:5432/${process.env.DATABASE_NAME}`;

const sequelize = new Sequelize(DATABASE_URL);

module.exports = sequelize;