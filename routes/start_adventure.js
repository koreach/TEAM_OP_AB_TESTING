var data = require("../start_adventure.json");
exports.view = function(req, res){
    res.render('start_adventure', data);
};

var adventures = require("../start_adventure.json");

exports.view = function(req, res){
  if (req.session.user) {
      res.render('start_adventure', adventures);
  } else {
      res.redirect("/login");
  }
};

exports.addToAdventure = function(req, res) {
	var adv = { picture: req.query.picture,
          date: req.query.date,
  				description: req.query.description,
  				startingLoc: req.query.startingLoc,
  				endingLoc: req.query.endingLoc,
  				theme: req.query.theme
  			};
        console.log(adv);
  	res.render('start_adventure',adventures);
    adventures.adventure.push(adv);
};

exports.delTripDay = function() {
  adventures.splice(index, 1); // then delete by index
};
