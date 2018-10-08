var sqlite3 = require('sqlite3');
var dbFilePath = './models/bogle.db';
var query1 = "select * from portfolioSetup where USR = ?";
var params = [ '01' ];


module.exports = 
async function selectPortfolioSetup(dbFilePath, query1, params) {

    // abre la ddbb
    let db = new sqlite3.Database(dbFilePath, (error) => {
        if (error) {
            console.log("error al abrir la ddbb");
        } else {
            console.log("ddbb abierta correctamente");
        };

    });

    // hace select
    var select01 = function () {
        return new Promise(function (resolve, reject) {
            db.all(query1, params, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                };
            });
        })
    };

    var retSelect = await select01();
    db.close();
    return retSelect;
};

// selectPortfolioSetup(dbFilePath, query1, params)
//     .then((retSelect) => console.log(retSelect[0]))
//     .catch((error) => console.log(error));

// console.log("fin");