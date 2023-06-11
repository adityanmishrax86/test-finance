const express = require('express');
const app = express();

app.get('/status', (req, res) => {
  res.status(200).send('OK');
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
