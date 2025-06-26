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
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    const readstream = gfs.createReadStream(file.filename);
    res.set('Content-Type', file.contentType || 'application/octet-stream');
    readstream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving file', details: err.message });
  }
});

module.exports = router;
