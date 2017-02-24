var data = require("../bucket.json");
exports.view = function(req, res){
    res.render('bucket', data);
};

var buckets = require('../bucket.json');

exports.view = function(req, res){

  res.render('bucket',buckets);
};

exports.addToBucket = function(req, res) {
	var buc = { picture: req.query.picture, date: req.query.date,
  				description: req.query.description,
  				startingLoc: req.query.startingLoc,
  				endingLoc: req.query.endingLoc,
  				theme: req.query.theme
  			};
  	res.render('bucket',buckets);
    buckets.bucketlist.unshift(buc);
};
