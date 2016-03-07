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

router.get('/articles/:id',function(req, res, next){
  var fs = require('fs');

  fs.readFile('./data/articles.json', 'utf8', function (err, data) {
    if (err) throw err;

    data = _.filter(JSON.parse(data), function(item) {
        return item.id == req.params.id;
    });
    res.json(data[0]);
  });
})

router.delete('/articles/:id',function(req, res, next){
  var fs = require('fs');

  fs.readFile('./data/articles.json', 'utf8', function (err, data) {
    if (err) throw err;

    var new_arr = [];
    _.each(JSON.parse(data), function(element, index){
        if(element.id != req.params.id){
          new_arr.push(element);
        }
    })
    fs.writeFile('./data/articles.json', JSON.stringify(new_arr),'UTF-8',function(err){
      if(err) throw err;
    });
    res.send("sucess");
  });
})

module.exports = router;