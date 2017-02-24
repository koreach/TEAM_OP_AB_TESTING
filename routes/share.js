exports.view = function(req, res){
  	if (req.session.user) {
        res.render('/share');
    } else {
        res.render("/login");
    }
};