const app = require('../server');

module.exports = (req, res) => {
  // Set CORS headers for every request
  res.setHeader('Access-Control-Allow-Origin', 'https://smart-bus-pass.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  app(req, res);
};
