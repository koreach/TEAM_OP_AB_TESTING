
/*
 * GET home page.
 */
var data = require('../index.json');

exports.view = function(req, res){
  	if (req.session.user) {
        res.render('index',data);
    } else {
        res.redirect("/login")
    }
};