var sqlite3 = require('sqlite3');
var dbFilePath = './models/bogle.db';
var query1 = "select * from portfolioSetup";


module.exports = 
async function select01(dbFilePath, query1) {

    // abre la ddbb
    this.db = new sqlite3.Database(dbFilePath, (error) => {
        if (error) {
            console.log("error al abrir la ddbb");
        } else {
            console.log("ddbb abierta correctamente");
        };

    });

    // hace select
    var select01 = function () {
        return new Promise(function (resolve, reject) {
            this.db.all(query1, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                };
            });
        })
    };

    var retSelect = select01();

    return retSelect;
};

// select01(dbFilePath, query1)
//     .then((retSelect) => console.log(retSelect[0]))
//     .catch((error) => console.log(error));

// console.log("fin");