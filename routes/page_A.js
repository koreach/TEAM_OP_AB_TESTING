var data = require('../index.json');
exports.view = function(req, res){
  data['showAlternate'] = false;
  res.render('page_A', data);
};

var feed = require("../index.json");

exports.view = function(req, res){
  feed['showAlternate'] = false;
  if (req.session.user) {
      res.render('page_A',feed);
  } else {
      res.redirect("/login")
  }
};

exports.addToFeed = function(req, res) {
	var a = { feedPicture: req.query.feedPicture,
          month: req.query.month,
          date: req.query.date,
  				description: req.query.description,
  				startingLoc: req.query.startingLoc,
  				endingLoc: req.query.endingLoc,
  				theme: req.query.theme
  			};
    feed['showAlternate'] = false;
    res.render('page_A', feed);
    feed.feed_object.unshift(a);
};

exports.view2 = function(req, res){
  data['showAlternate'] = true;
  res.render('page_A', data);
};

exports.view2 = function(req, res){
feed['showAlternate'] = true;
  if (req.session.user) {
      res.render('page_A',feed);
  } else {
      res.redirect("/login")
  }
};

exports.addToFeed2 = function(req, res) {
	var a = { feedPicture: req.query.feedPicture,
          month: req.query.month,
          date: req.query.date,
  				description: req.query.description,
  				startingLoc: req.query.startingLoc,
  				endingLoc: req.query.endingLoc,
  				theme: req.query.theme
  			};
    feed['showAlternate'] = true;
    res.render('page_A', feed);
    feed.feed_object.unshift(a);
};
