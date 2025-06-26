const app = require('../server');

module.exports = (req, res) => {
  try {
    // Robust CORS: allow multiple origins
    const allowedOrigins = [
      'https://smart-bus-pass.netlify.app',
      'http://localhost:5173',
      'http://localhost:3000'
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    app(req, res);
  } catch (err) {
    console.error('API Handler Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};
