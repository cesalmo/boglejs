//dependencias
const fetch = require('node-fetch');
const jsdom = require("jsdom");
var selectPortfolioSetup = require("./models/bogledb");
const jsdomObj = jsdom.JSDOM;

var dbFilePath = './models/bogle.db';
var query1 = "select * from portfolioSetup";

//construye url a partir del id
var urlMorningStar = function (id) {
    return "http://www.morningstar.es/es/funds/snapshot/snapshot.aspx?id=" + id;
};

async function main() {
    var oPromise = new Array();
    var oRetSelect = new Array();

    //recupera entradas de BBDD portfoliosetup
    await selectPortfolioSetup(dbFilePath, query1)
        .then((retSelect) => oRetSelect = retSelect)
        .catch((error) => console.log(error));

    //informa array de promesas con las entradas anteriores
    for (let i in oRetSelect) {

        oPromise.push(fetch(urlMorningStar(oRetSelect[i].IDFONDO)));

    };

    //scrapea los precios de los websites
    var oPrices =
        //recupera raw html
        Promise.all(oPromise).then(function (res) {
            var oResProm = new Array();
            for (let a in res) {
                oResProm.push(res[a].text())
            };
            return Promise.all(oResProm);
        }).
            //parsea html
            then(function (res) {
                var oParsea = function (text) {
                    // crea DOM y recupera campo
                    const dom = new jsdomObj(text);
                    var sVal = dom.window.document.
                        getElementsByClassName("line text")[0].textContent
                    // parsea precio
                    var sPrice = sVal.split(/\s/)[1].replace(",", ".");
                    var nPrice = parseFloat(sPrice);
                    return nPrice;
                };

                var oPrecios =
                    res.map(function (oBody) {
                        return oParsea(oBody)
                    });
                return oPrecios;
            }).
            catch(console.log("error"));

    await oPrices.then(res => console.log(res));
    console.log("fin");

};

main();

