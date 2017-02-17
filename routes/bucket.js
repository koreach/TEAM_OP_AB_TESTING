var data = require("../bucket.json");
exports.view = function(req, res){
    res.render('bucket', data);
};

var buckets = require('../bucket.json');

exports.view = function(req, res){
  var buc = { title: req.query.title, date: "b",theme: "c",startingLoc: "d", endingLoc: "e", picture: "http://itzkong.s3-us-west-2.amazonaws.com/wp-content/uploads/2016/10/27140330/itzkong_20161027150333-422x375.jpg"}
  res.render('bucket',buckets); buckets.bucketlist.push(buc);
};
