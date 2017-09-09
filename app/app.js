var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , _ = require('underscore')
  , port = process.env.PORT || 3000

var s3f = require('./s3');

app.set('views', __dirname + '/views')
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(require('./controllers'))

var s3DataContents = [];
var params = { bucket: 'isentia-testing-sqs-bucket' };


var server = app.listen(port, function() {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
