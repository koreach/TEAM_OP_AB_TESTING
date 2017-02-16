
/*
 * GET home page.
 */
var data = require('../index.json');

exports.view = function(req, res){
  res.render('index',data);
};