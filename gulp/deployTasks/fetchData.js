/* var gulp = require('gulp');
var Spreadsheet = require('edit-google-spreadsheet');
var fs = require('fs');

var output = './src/htdocs/data/data.json';

gulp.task('data', function() {
    Spreadsheet.load({
        debug: true,
        spreadsheetId: '1MeZYSnVE2700bqUNtSvsaeH11T9SD6GRtomIgryfUDY',
        worksheetId: 'od6',
        oauth : {
            email: '223467986052-m7huc9kkh067r0o4ptpep34oauhsvfna@developer.gserviceaccount.com',
            keyFile: 'keys/fusion-static.pem'
        }

    }, function sheetReady(err, spreadsheet) {

        if (err) {
            throw err;
        }

        spreadsheet.receive(function(err, rows, info) {
            if (err) {
                throw err;
            }

            var data = [];

            for (var x in rows) {
                var dict = {};
                dict.id = rows[x]['1'];
                dict.body = rows[x]['2'];
                data.push(dict);
            }

            data.shift();

            fs.writeFile(output, JSON.stringify(data, null, 4), function(err) {
                if(err) {
                  console.log(err);
                } else {
                  console.log("JSON saved to " + output);
                }
            });
        });
    });
});
*/