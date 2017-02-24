exports.view = function(req, res){
  	if (req.session.user) {
        res.render('/map');
    } else {
        res.render("/login");
    }
};