var data = require('../index.json');
exports.view = function(req, res){
  res.render('page_B', data);
};

var feed = require("../index.json");

exports.view = function(req, res){

if (req.session.user) {
    res.render('page_B',feed);
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
    res.render('page_B', feed);
    feed.feed_object.unshift(a);
};
