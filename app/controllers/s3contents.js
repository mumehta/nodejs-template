var express = require('express')
  , router = express.Router()
  , S3contents = require('../models/s3contents')
  , _ = require('underscore')
  , app = express()

var s3f = require('../s3');
var params = { bucket: 'isentia-testing-sqs-bucket' };

router.get('/getdata', function(req, res) {

  var contentStream = s3f.listKeys(params, function (error, keys) {
    if (error) {
      return console.error(error);
    }
    var s3DataContents=[];

    _.each(keys, function (key) {
      s3DataContents.push({key: key});
    });

    res.render('s3contents', {data: s3DataContents})
  });
})

module.exports = router