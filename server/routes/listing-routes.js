const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bearer = require('../auth/bearer');
const passportGoogle = require('../auth/google');
const Listing = require ('../models/listing');

mongoose.Promise = global.Promise;


//change this back to req.user.googleID and protect path
router.post('/listing', passportGoogle.authenticate('bearer', {session: false}), (req, res) => {
  const listingDetails = {
    createdBy: req.user.googleID,
    title: req.body.title,
    categories: req.body.categories,
    price: req.body.price,
    product_url: req.body.product_url,
    images: req.body.images,
    position: req.body.position
  };

  Listing.create(listingDetails)
    .then(listing => {
      res.status(200).json({listing});
    })
    .catch(err => {
      res.status(500).json({err: err});
    });
});

router.get('/listings', (req, res) => {
  Listing
    .find()
    .exec()
    .then(listings => {
      res.json(listings);
    })
    .catch(err => {
      res.status(500).json({error: 'something went wrong'});
    });
});

router.get('/listing/:id', (req, res) => {
  Listing
    .find({_id: req.params.id})
    .exec()
    .then(listing => {
      res.json(listing);
    })
    .catch(err => {
      res.status(500).json({error: 'something went wrong'});
    });
});

router.delete('/listing/:createBy/:id', passportGoogle.authenticate('bearer', {session: false}),
  (req, res) => {
    Listing
      .findByIdAndRemove(req.params.id)
      .exec()
      .then(() => {
        res.status(200).json({message: 'success'});
      })
      .catch(err => {
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

router.put('/listing/:createBy/:id', passportGoogle.authenticate('bearer', {session: false}),
  (req, res) => {
    if(!(req.params.id && req.body._id && req.params.id === req.body._id)) {
      res.status(400).json({
        error:'Request path id and request body id values must match'
      });
    }
    const updated = {};
    const canBeUpdated = ['title', 'price', 'categories', 'images'];
    canBeUpdated.forEach(field => {
      if (field in req.body) {
        updated[field] = req.body[field];
      }
    });

    Listing
      .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
      .exec()
      .then(updatedListing => res.status(201).json(updatedListing))
      .catch(err => res.status(500).json({message: 'Something went wrong'}));
});






module.exports = router;


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
