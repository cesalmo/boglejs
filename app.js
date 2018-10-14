// dependencias
const fetch = require('node-fetch');
const jsdom = require('jsdom');
// const fs = require('fs');
const GestionBBDD = require('./models/bogledb');
const Aux = require('./app_aux');

const JsdomObj = jsdom.JSDOM;
const dbFilePath = './models/bogle.db';
const query1 = 'select * from portfolioSetup';


/**
 * parsea un html y devuelve precio
 * @param {string} text Cuerpo de repuesta de funcion 'FETCH'
 */
function oParsea(text) {
  // crea DOM y recupera campo
  const dom = new JsdomObj(text);
  const sVal = dom.window.document.getElementsByClassName('line text')[0].textContent;
  // parsea precio
  const sPrice = sVal.split(/\s/)[1].replace(',', '.');
  const nPrice = parseFloat(sPrice);
  return nPrice;
}

/**
 * Función principal
 */
async function main() {
  const oPromise = [];
  let oRetSelect = [];
  let oRes = [];
  let oURL = [];
  let sURL;
  let oInsertPrices = [];

  // recupera entradas de BBDD portfoliosetup
  await GestionBBDD.querySelect01(dbFilePath, query1)
    .then((retSelect) => {
      oRetSelect = retSelect;
    })
    .catch(error => console.log(error));

  // fs.writeFileSync('./retselect', JSON.stringify(oRetSelect));
  oURL = await GestionBBDD.selectUrl(dbFilePath, oRetSelect)


  // informa array de promesas con las entradas anteriores a partir de
  // la URL de PROVIDERS + el ID de PORTFOLIOSETUP
  for (let i = 0; i < oRetSelect.length; i += 1) {
    sURL = oURL.find(obj => obj.IDPROVFONDO === 1).URL;
    oPromise.push(fetch(sURL + oRetSelect[i].IDFONDO));
  }

  // scrapea los precios de los websites
  const oPrices = Promise.all(oPromise)
    .then((res) => {
      const oResProm = [];
      for (let a = 0; a < res.length; a += 1) {
        oResProm.push(res[a].text());
      }
      return Promise.all(oResProm);
    })
    // parsea html
    .then(
      (res) => {
        const oPrecios = res.map(oBody => oParsea(oBody));
        return oPrecios;
      },
      (rej) => {
        console.log(`error en promise.all ${rej}`);
      },
    )
    .catch(onrej => console.log(`error ${onrej}`));


  // await oPrices.then(res => console.log(res));
  await oPrices.then((res) => { oRes = res; });


  oInsertPrices = Aux.creaPrices(oRetSelect, oRes);


  const nRegistrosInsertados = await GestionBBDD.queryInsert01(dbFilePath, oInsertPrices)

  console.log(`Insertados ${nRegistrosInsertados} registros`);

}

main();
