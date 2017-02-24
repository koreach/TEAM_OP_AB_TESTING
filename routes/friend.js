exports.view = function(req, res){
  	if (req.session.user) {
        res.render('friend');
    } else {
        res.redirect("/login");
    }
};