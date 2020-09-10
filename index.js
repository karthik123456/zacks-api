#!/usr/bin/env node

const h = require('./helpers');
const config = require('./config');

const format = symbol => data => {
  const tmp = data[symbol];
  
  const fs = require('fs');

  const response =  {"TSLA":{"source":{"sungard":{"pos_size":"891623","yrhigh":"502.49","dividend_freq":"","exchange":"NASDAQ","volatility":"1.15","bidasksize":"100x100","yrlow":"43.672","day_high":"369","day_low":"341.51","last_trade_datetime":"05/11/2020 16:00:00","bid":"366.03","ask":"366.98","earnings":"4.12","volume":"","type":"S","open":"356.6","dividend":"","prev_close_date":"09/09/2020 16:00:00","updated":"09/09/2020 16:00:00","yield":"0","close":"330.21","shares":"","pe_ratio":"176.8","market_cap":"150389723775","dividend_date":"","name":"Tesla, Inc."},"bats":{"updated":"09/09/2020 15:57:06","routed":"230805","net_change":"NULL","end_mkt_day_price":"NULL","bid_size":"1","bid_price":"367.76","pre_after_price":"374.6","last_trade_datetime":"09/09/2020 15:56:43","ask_size":"100","pre_after_updated":"09/09/2020 19:57:08","matched":"2546223","net_pct_change":"NULL","ask_price":"368.28"}},"dividend_yield":"0","pre_after_net_change":"8.32","ticker_market_status":"CLOSING PRICES","ap_short_name":"Tesla","market_time":"","name":"Tesla, Inc.","net_change":"36.07","ticker_type":"S","previous_close":"366.28","last":"366.28","zacks_rank":"3","zacks_rank_text":"Hold","volume":"77461345","pre_after_percent_net_change":"2.27","updated":"Sep 09, 2020 04:00 PM","market_status":"Full Trading Day (Market Closed)","ticker":"TSLA","exchange":"Delayed Data from NSDQ","percent_net_change":"10.9233518064262136216347173011114139487","previous_close_date":"09/09/2020"}}

  const jsonString = JSON.stringify(response)
  // write JSON string to a file
  fs.writeFile('./data/api-response.txt', jsonString, err =>  {
  if(err) {
    console.log(err);
      }
 
  })

  console.log(response)

  return {
    ticker: tmp.ticker,
    name: tmp.name,
    zacksRankText: tmp.zacks_rank_text,
    zacksRank: tmp.zacks_rank,
    updatedAt: new Date(tmp.updated).toISOString()
  };
};

const print = data => console.log(JSON.stringify(data, null, 2));

const handleError = e => {
  console.log(e);
};

/**
 * getZacksData
 * @param symbol
 * @returns {Promise}
 */
module.exports.getData = symbol => {
  const _symbol = symbol.toUpperCase();
  const query = config.zacks.baseUrl + `index?t=${_symbol}`;
  return h
    .fetch(query)
    .then(format(_symbol))
    .catch(handleError);
};

/**
 * Run as command line tool
 */
if (require.main === module) {
  const symbol = process.argv[2];

  if (!symbol) {
    console.info(
      '\nTicker symbol missing. Attach the ticker symbol at the end.\n\nExample: zacks-api TSLA\n'
    );
    return;
  }

  this.getData(symbol)
    .then(print)
    .catch(handleError);
}
