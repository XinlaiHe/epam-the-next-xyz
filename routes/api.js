var express = require('express');
var router = express.Router();
var _ = require('underscore');

// note that typically data would NOT be loaded from the filesystem in this manner :)

router.get('/articles', function(req, res, next) {

	var fs = require('fs');
	var obj;
	fs.readFile('./data/articles.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  res.json(JSON.parse(data));
	});
});


module.exports = router;