var data = require("../data.json");

exports.addAdventure = function(req, res) {
  var q_title = req.query.title;
  var q_date = req.query.date;
  var q_theme = req.query.theme;
  var q_startingLoc = req.query.startingLoc;
  var q_endingLoc = req.query.endingLoc;
  var jsonobj = {"title": q_title, "date": q_date, "theme": q_theme,
                 "startingLoc": q_startingLoc, "endingLoc": q_endingLoc,
                 "picture" : "images/night.jpg"};
  data.bucketlist.push(jsonobj);
  res.render('bucket', data);
}
