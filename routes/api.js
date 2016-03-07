 var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var _ = require('underscore');


var Article = mongoose.model("Article");

// note that typically data would NOT be loaded from the filesystem in this manner :)
router.put('/articles/:id', function(req, res, next){
  var update = {$set: req.body};
  Article.update({"id" : req.params.id}, update, function(err){
      if(err) throw err;
      else res.send("success");
  });
});

router.get('/articles', function(req, res, next) {

  Article.find({},function(err, data){
    res.json(data);
  })
});

router.get('/articles/:id',function(req, res, next){

  Article.find({"id" : req.params.id}, function(err, data){
      res.json(data[0]);
  })
});

router.delete('/articles/:id', function(req, res, next){

  Article.remove({"id" : req.params.id}, function(err){
      if(err) throw err;
      else res.send("success");
  });
});

module.exports = router;