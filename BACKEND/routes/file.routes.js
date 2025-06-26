const express = require('express');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const router = express.Router();

let gfs;
mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');
});

router.get('/:filename', async (req, res) => {
  try {
    if (!gfs) {
      return res.status(503).json({ error: 'File system not ready (GridFS not initialized)' });
    }
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    const readstream = gfs.createReadStream(file.filename);
    res.set('Content-Type', file.contentType || 'application/octet-stream');
    readstream.on('error', (err) => {
      console.error('ReadStream error:', err);
      res.status(500).json({ error: 'Error streaming file', details: err.message });
    });
    readstream.pipe(res);
  } catch (err) {
    console.error('File route error:', err);
    res.status(500).json({ error: 'Error retrieving file', details: err.message, stack: err.stack });
  }
});

module.exports = router;
