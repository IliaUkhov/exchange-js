const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require("fs");
const cron = require('node-cron');

const app = express();

app.use(bodyParser.json());

const routes = require("./routes");

global.exchangeAllowed = false;

fs.readFile("brokers.json", (err, data) => {
  if (err) throw err;
  global.brokers = JSON.parse(data);
});

fs.readFile("stocks.json", (err, data) => {
  if (err) throw err;
  global.stocks = JSON.parse(data);
});

fs.readFile("settings.json", (err, data) => {
  if (err) throw err;
  global.settings = JSON.parse(data);
  setupCronjobs();
});
 
function setupCronjobs() {
  cron.schedule(global.settings.exchangeStart, () => {
    exchangeAllowed = true;
  });
  
  cron.schedule(global.settings.exchangeEnd, () => {
    exchangeAllowed = false;
  });
  
  cron.schedule(global.settings.stockPriceUpdate, () => {
    for (i in stocks) {
      const changeLimit = stocks[i].initialPrice * stocks[i].maxChangePercentage / 100;
      const changeUpperLimit = stocks[i].initialPrice + changeLimit;
      const changeLowerLimit = stocks[i].initialPrice - changeLimit;
      switch (stocks[i].distribution) {
        case "uniform":
          stocks[i].currentPrice = Math.random() * (changeUpperLimit - changeLowerLimit) + changeLowerLimit;
          break;
        default:
          var r = 0.0;
          for (_ = 0; _ < 6; ++_) {
            r += Math.random() * (changeUpperLimit - changeLowerLimit) + changeLowerLimit;
          }
          r /= 6.0;
          stocks[i].currentPrice = r;
          break;
      }
      console.log(`${stocks[i].symbol} new price: ${stocks[i].currentPrice}`);
    }
  });
}

const corsOptions = {
  'origin': true,
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'allowedHeaders': 'Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept'
}
app.use(cors(corsOptions))    

app.use("/", routes);
app.listen(8000);
