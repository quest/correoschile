var cheerio = require('cheerio'),
    request = require('request');


exports = module.exports = function (code) {
    return new Promise(function(resolve, reject) {

        request
            .post('http://seguimientoweb.correos.cl/ConEnvCorreos.aspx', function(error, response, body) {
                if (error) {
                    reject(error);
                    return;
                }

                var $ = cheerio.load(body),
                    histories = [],
                    history = {},
                    keys = [],
                    values = [],
                    information = {};


                $('.datosgenerales td').each(function(i) {
                    if (i % 2 == 0) {
                        keys.push($(this).text().toLowerCase().trim().replace(' ', '_'));
                    }
                    else {
                        values.push($(this).text().trim());
                    }
                });
                keys.map(function(key, index){
                    information[key] = values[index];
                });


                $('.tracking tr').each(function() {
                    history = {
                        'state': $(this).children('td').eq(0).text().trim(),
                        'datetime': $(this).children('td').eq(1).text().trim(),
                        'place': $(this).children('td').eq(2).text().trim()
                    };

                    if (history.state) {
                        histories.push(history);
                    }
                });


                resolve({
                    'information': information,
                    'history': histories
                });
            })
            .form({
                obj_key: 'Cor398-cc',
                obj_env: code
            });

    });
};
