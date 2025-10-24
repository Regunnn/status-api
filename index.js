const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/status', (req, res) => {
  res.json({ status: 'OK', message: 'Service is up and running' });
});

app.get('/', (req, res) => {
  res.send('Status API. Use GET /status');
});

app.listen(PORT, () => {
  console.log(`Status API listening on port ${PORT}`);
});
