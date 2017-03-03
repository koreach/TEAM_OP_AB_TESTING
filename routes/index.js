var data = require('../index.json');
exports.view = function(req, res){
  res.render('index', data);
};

var feed = require("../index.json");

exports.view = function(req, res){

if (req.session.user) {
    res.render('index',feed);
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
    res.render('index', feed);
    feed.feed_object.unshift(a);
};
