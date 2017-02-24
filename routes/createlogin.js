exports.view = function(req, res){
  	if (req.session.user) {
        res.redirect("/");
    } else {
        res.render("createlogin");
    }
};