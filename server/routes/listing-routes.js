const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bearer = require('../auth/bearer');
const passportGoogle = require('../auth/google');
const fs = require('fs');
const User = require('../models/user');
const Listing = require ('../models/listing');
const cloudinary = require('cloudinary');

mongoose.Promise = global.Promise;

const cloudinaryConfig = {
  cloud_name: 'dez1byutg',
  api_key: '447436759672695',
  api_secret: 'cuKAgIXupCoe8adzqWSL_sWE9qY'
};





// let Grid = require('gridfs-stream');
// let conn = mongoose.connection;
// Grid.mongo = mongoose.mongo;
// let gfs;
//
// conn.once('open', () => {
//   gfs = Grid(conn.db);
//   router.get('/', (req, res) => {
//     res.send('conn open');
//   });
//
//   router.post('/img', (req, res) => {
//     console.log(req.files);
//     let part = req.files.file;
//     let writeStream = gfs.createWriteStream({
//       filename: `img_${part.name}`,
//       mode: 'w',
//       content_type: part.mimetype
//     });
//
//     writeStream.on('close', file => {
//       return res.status(200).send({
//         message: 'Success',
//         file: file
//       });
//     });
//
//     writeStream.write(part.data);
//
//     writeStream.end();
//   });
//
//   router.get('/img/:imgname', (req, res) => {
//     gfs.files.find({
//       filename: `img_${req.params.imgname}`
//     }).toArray((err, files) => {
//       if (files.length === 0){
//         return res.status(400).send({ message: "File Not Found"});
//       }
//       let data = [];
//       let readStream = gfs.createReadStream({
//         filename: files[0].filename
//       });
//
//       readStream.on('data', chunk => {
//         data.push(chunk);
//       });
//
//       readStream.on('end', () => {
//         data = Buffer.concat(data);
//         let img = `data:image/png;base64,${Buffer(data).toString('base64')}`;
//         res.end(img);
//       });
//
//       readStream.on('error', err => {
//         console.log(`Error Occured on ReadStream: ${err}`);
//         throw err;
//       });
//
//     });
//
//   });
//
// });
//


module.exports = router;
