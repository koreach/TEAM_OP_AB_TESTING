exports.view = function(req, res){
  	if (req.session.user) {
        res.render('start_adventure');
    } else {
        res.redirect("/login");
    }
};
