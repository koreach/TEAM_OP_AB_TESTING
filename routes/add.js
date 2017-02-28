var data = require("../bucket.json");

var formidable = require('formidable');
var fs = require('fs-extra');
var qt = require('quickthumb');
var util = require('util');
var bodyparser = require('body-parser');

var title, date, theme, description, startingloc, endingloc, pic;
var counter;
module.exports = {
    upload: function(req, res) {
        var form = new formidable.IncomingForm();

        counter = 0;

        console.info("sds");

        form.parse(req, function(err, fields, files) {
            title = fields.title;
            date = fields.date;
            theme = fields.theme;
            description = fields.description;
            startingloc = fields.startingLoc;
            endingloc = fields.endingLoc;
            //res.writeHead(200, {'content-type': 'text/plain'});
            //res.write('received upload:\n\n');
            res.location('/friend');
            res.redirect('/friend');
            res.end(util.inspect({
                fields: fields,
                files: files
            }));

        });

        form.on('end', function(fields, files) {
            pic = this.openedFiles[0].name;
            data.bucketlist.unshift({
                "title": title,
                "date": date,
                "theme": theme,
                "description": description,
                "startingLoc": startingloc,
                "endingLoc": endingloc,
                "picture": "images/" + pic
            });
            /* Temporary location of our uploaded file */
            var temp_path = this.openedFiles[0].path;
            /* The file name of the uploaded file */
            var file_name = this.openedFiles[0].name;
            /* Location where we want to copy the uploaded file */
            var new_location = 'public/images/';

            fs.copy(temp_path, new_location + file_name, function(err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("success!");
                }
            });
        });
    }
};
