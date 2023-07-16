
const {getInsights}=require('../../controllers/insight.controllers');

// const { ensureAuthenticated } = require('../../../middlewares');

const router = require('express').Router();

router.get('/insights', getInsights);

module.exports=router

