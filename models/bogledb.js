const sqlite3 = require('sqlite3');
// const fs = require('fs');

const dbFilePath = './models/bogle.db';

// var query1 = "select * from portfolioSetup where USR = ?";
// var params = [ '01' ];

/** ******************************************************
 *
 * @param {string} dbFilePath ruta a bbdd
 * @param {string} query1 query a realizar
 * @param {Array} params parametros de la query
 */
function querySelect01(dbFilePath, query1, params) {
  // abre la ddbb
  const db = new sqlite3.Database(dbFilePath, (error) => {
    if (error) {
      console.log('error al abrir la ddbb');
    } else {
      console.log('ddbb abierta correctamente');
    }
  });

  // hace select
  function select01() {
    return new Promise((resolve, reject) => {
      db.all(query1, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  const retSelect = select01();
  db.close();
  return retSelect;
}

/** ******************************************************
 * Recupera URL de proveedor de datos de tabla PROVIDERS
 * @param {string} dbFilePath ruto a ddbb
 * @param {*} oRetSelect retorno de funcion querySelect01()
 */
async function selectUrl(dbFilePath, oRetSelect) {
  // const oRetSelectBin = fs.readFileSync('.//models//oRetSelect.txt');
  // const oRetSelect = JSON.parse(oRetSelectBin);
  const oSetIdProvFondo = new Set();
  const params2 = [];
  let oUrl = {};

  oRetSelect.forEach((element) => {
    oSetIdProvFondo.add(element.IDPROVFONDO);
  });

  const oIdProvFondo = Array.from(oSetIdProvFondo).join();

  const query2 = `select * from  PROVIDERS where (IDPROVFONDO in (${oIdProvFondo}))`;

  await querySelect01(dbFilePath, query2, params2)
    .then((retSelect) => {
      oUrl = retSelect;
    })
    .catch(error => console.log(error));

  return oUrl;
}

/** ******************************************************
 *  Inserta en BBDD PROVIDERS.
 * @param {string } dbFilePath ruta a ddbb
 * @param {array} oPrices array de arrays con formato (usr, fecha, idfondo, price)
 * @returns  (Promesa) nº de registros insertados
 */
async function queryInsert01(dbFilePath, oPrices) {
  const params2 = [];

  // abre ddbb
  const db = new sqlite3.Database(dbFilePath, (error) => {
    if (error) {
      console.log('error al abrir la ddbb para insertar');
    } else {
      console.log('ddbb abierta correctamente para insertar');
    }
  });
  // append "?"
  const sPlaceholders = oPrices.map(a => '(?, ?, ?, ?)').join(',');
  // forma query
  const query2 = `insert into PRICES ( usr, fecha, idfondo, price )
values ${sPlaceholders}`;
  // forma parameters informando todos los datos en un unico array
  oPrices.forEach((a) => {
    for (let i = 0; i < a.length; i += 1) {
      params2.push(a[i]);
    }
  });

  function insert01() {
    return new Promise(((resolve, reject) => {
      db.run(query2, params2,
        function callback(error) {
          if (error) {
            reject(error);
          } else {
            resolve(this.changes);
          }
        });
    }));
  }
  const oPromiseInsert = insert01();
  db.close();
  return oPromiseInsert;
}

module.exports = {
  querySelect01,
  selectUrl,
  queryInsert01,
};
//* **********************************************/
// const oInsert =
//   [['01', '2018-10-12', 'idfondo1', 125.21],
//   ['01', '2018-10-12', 'idfondo2', 13.4]];
// queryInsert01(dbFilePath, oInsert);
//* **********************************************/
// selectUrl();
//* **********************************************/
// querySelect01(dbFilePath, query1, params)
//     .then((retSelect) => console.log(retSelect[0]))
//     .catch((error) => console.log(error));
//* *********************************************/
// console.log("fin");
