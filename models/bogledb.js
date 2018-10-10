const sqlite3 = require('sqlite3');
const fs = require('fs');

// const dbFilePath = './models/bogle.db';

// var query1 = "select * from portfolioSetup where USR = ?";
// var params = [ '01' ];

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

module.exports = {
  querySelect01,
};

// selectUrl();

// querySelect01(dbFilePath, query1, params)
//     .then((retSelect) => console.log(retSelect[0]))
//     .catch((error) => console.log(error));

// console.log("fin");
