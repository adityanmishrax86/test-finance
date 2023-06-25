const fetchInsights = require('../services/openaiApiService');
const getInsights = async (req, res) => {
    try {
        // const data=await fetchInsights();
        res.send({ "data": "Hello There" });

    } catch (error) {
        console.error(error);
        res.status(500).send('Could not fetch data from our AI.')
    }
}

module.exports = { getInsights };
