// Get a particular comment
exports.get = function(cb){
  var s3DataContents = [];
  var params = { bucket: 'isentia-testing-sqs-bucket' };

  var contentStream = s3f.listKeys(params, function (error, keys) {
    if (error) {
      return console.error(error);
    }
    _.each(keys, function (key) {
      console.log(key);
      s3DataContents = s3DataContents.concat(key);
      return s3DataContents;
    });
  });

   cb({contentStream: contentStream})
}
