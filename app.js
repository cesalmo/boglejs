// dependencias
const fetch = require('node-fetch');
const jsdom = require('jsdom');
const selectPortfolioSetup = require('./models/bogledb');

const JsdomObj = jsdom.JSDOM;
const dbFilePath = './models/bogle.db';
const query1 = 'select * from portfolioSetup';

// construye url a partir del id
function urlMorningStar(id) {
  return `http://www.morningstar.es/es/funds/snapshot/snapshot.aspx?id=${id}`;
}

async function main() {
  const oPromise = [];
  let oRetSelect = [];

  // recupera entradas de BBDD portfoliosetup
  await selectPortfolioSetup(dbFilePath, query1)
    // .then(retSelect => (oRetSelect = retSelect))
    .then((retSelect) => {
      oRetSelect = retSelect;
    })
    .catch(error => console.log(error));

  // informa array de promesas con las entradas anteriores
  for (const i in oRetSelect) {
    oPromise.push(fetch(urlMorningStar(oRetSelect[i].IDFONDO)));
  }

  // scrapea los precios de los websites
  const oPrices = Promise.all(oPromise)
    .then((res) => {
      const oResProm = [];
      for (const a in res) {
        oResProm.push(res[a].text());
      }
      return Promise.all(oResProm);
    })
    // parsea html
    .then(
      (res) => {
        function oParsea(text) {
          // crea DOM y recupera campo
          const dom = new JsdomObj(text);
          const sVal = dom.window.document.getElementsByClassName('line text')[0].textContent;
          // parsea precio
          const sPrice = sVal.split(/\s/)[1].replace(',', '.');
          const nPrice = parseFloat(sPrice);
          return nPrice;
        }

        const oPrecios = res.map(oBody => oParsea(oBody));
        return oPrecios;
      },
      ( rej ) => { console.log(`error en promise.all ${rej}`) },
    )
    .catch(console.log('error'));

  await oPrices.then(res => console.log(res));
  console.log('fin');
}

main();
