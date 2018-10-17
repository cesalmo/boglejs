const moment = require('moment');

// let retselect = [];
// const res = [174.85,
//   318.35,
//   217.2,
//   136.58,
//   264.73,
//   220.06,
//   15.45,
//   13.31,
//   109.54,
//   99.06,
//   54.73,
// ];

// retselect = [
//   {
//     USR: '01',
//     FECHA: '2018-10-06',
//     IDFONDO: 'F00000286Y',
//     IDPROVFONDO: 1,
//     IDNOMBREFONDO: 'Am. Europe',
//     PESO: null,
//     CATEGORIA: 1,
//     SHARES: 131.16,
//     MONEDA: 'EUR',
//   },
//   {
//     USR: '01',
//     FECHA: '2018-10-06',
//     IDFONDO: 'F000002873',
//     IDPROVFONDO: 1,
//     IDNOMBREFONDO: 'Am. N. America',
//     PESO: null,
//     CATEGORIA: 1,
//     SHARES: 58.76,
//     MONEDA: 'EUR',
//   },
//   {
//     USR: '01',
//     FECHA: '2018-10-06',
//     IDFONDO: 'F000002HT2',
//     IDPROVFONDO: 1,
//     IDNOMBREFONDO: 'Am. Pac. Ex Japan',
//     PESO: null,
//     CATEGORIA: 1,
//     SHARES: 22.68,
//     MONEDA: 'EUR',
//   },
//   {
//     USR: '01',
//     FECHA: '2018-10-06',
//     IDFONDO: 'F00000MIC3',
//     IDPROVFONDO: 1,
//     IDNOMBREFONDO: 'Pict. Japan',
//     PESO: null,
//     CATEGORIA: 1,
//     SHARES: 37.88,
//     MONEDA: 'EUR',
//   },
//   {
//     USR: '01',
//     FECHA: '2018-10-06',
//     IDFONDO: 'F0GBR056JX',
//     IDPROVFONDO: 1,
//     IDNOMBREFONDO: 'Pict. E.Markets USD',
//     PESO: null,
//     CATEGORIA: 1,
//     SHARES: 35.71,
//     MONEDA: 'USD',
//   },
//   {
//     USR: '01',
//     FECHA: '2018-10-06',
//     IDFONDO: 'F00000MIC6',
//     IDPROVFONDO: 1,
//     IDNOMBREFONDO: 'Pict. E.Markets EUR',
//     PESO: null,
//     CATEGORIA: 1,
//     SHARES: 5.21,
//     MONEDA: 'EUR',
//   },
//   {
//     USR: '01',
//     FECHA: '2018-10-06',
//     IDFONDO: 'F0GBR04MYG',
//     IDPROVFONDO: 1,
//     IDNOMBREFONDO: 'ING Ibex35',
//     PESO: null,
//     CATEGORIA: 1,
//     SHARES: 0,
//     MONEDA: 'EUR',
//   },
//   {
//     USR: '01',
//     FECHA: '2018-10-06',
//     IDFONDO: 'F0GBR06Q1R',
//     IDPROVFONDO: 1,
//     IDNOMBREFONDO: 'ING RF',
//     PESO: null,
//     CATEGORIA: 2,
//     SHARES: 0,
//     MONEDA: 'EUR',
//   },
//   {
//     USR: '01',
//     FECHA: '2018-10-06',
//     IDFONDO: 'F00000T654',
//     IDPROVFONDO: 1,
//     IDNOMBREFONDO: 'Am. RF Eur Govs.',
//     PESO: null,
//     CATEGORIA: 2,
//     SHARES: 158.23,
//     MONEDA: 'EUR',
//   },
//   {
//     USR: '01',
//     FECHA: '2018-10-06',
//     IDFONDO: 'F0000020BC',
//     IDPROVFONDO: 1,
//     IDNOMBREFONDO: 'Pict. Short Term EUR',
//     PESO: null,
//     CATEGORIA: 2,
//     SHARES: 413.23,
//     MONEDA: 'EUR',
//   },
//   {
//     USR: '01',
//     FECHA: '2018-10-06',
//     IDFONDO: 'F0GBR06B2N',
//     IDPROVFONDO: 1,
//     IDNOMBREFONDO: 'CrSuisse. Comm. Idx',
//     PESO: null,
//     CATEGORIA: 3,
//     SHARES: 197.45,
//     MONEDA: 'USD',
//   },
//   {
//     USR: '01',
//     FECHA: '2018-10-06',
//     IDFONDO: 'F0000020B2',
//     IDPROVFONDO: 1,
//     IDNOMBREFONDO: 'Pict. Short Term USD',
//     PESO: null,
//     CATEGORIA: 2,
//     SHARES: 83.07,
//     MONEDA: 'USD',
//   },
// ];

module.exports = class aux {
  /**
       * Crea array de arrays para insertar en tabla Prices
       * @param {Array} oRetSelect datos de fondos
       * @param {Array} oPrices Precios de fondos
       */
  static creaPrices(oRetSelect, oPrices) {
    const oTablaPrices = [];
    let oEntrada = [];
    for (let i = 0; i < oRetSelect.length; i += 1) {
      oEntrada.push(oRetSelect[i].USR);
      oEntrada.push(moment().format('YYYY-MM-DD'));
      oEntrada.push(oRetSelect[i].IDFONDO);
      oEntrada.push(oPrices[i]);

      oTablaPrices.push(oEntrada);
      //   oPrices = [];
      oEntrada = [];
    }
    return oTablaPrices;
  }
};


// var aa = aux.creaPrices(retselect, res);
// console.log('aaaa');
