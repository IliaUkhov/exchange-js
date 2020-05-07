const express = require("express");
const fs = require("fs");

const router = express.Router();

router.get("/api/settings", (req, res) => {
  console.log(`GET settings`);
  res.json(settings);
});

router.post("/api/settings", (req, res) => {
  console.log(`POST settings`);
  const i = req.params.num;
  settings = req.body;
  res.json({ "result": "UPDATED" });
});

router.get("/api/brokers", (req, res) => {
  console.log(`GET brokers`);
  res.json(brokers);
});

router.post("/api/brokers/:num", (req, res) => {
  console.log(`POST brokers`);
  const i = req.params.num;
  if (!exchangeAllowed
      && JSON.stringify(brokers[i].stocks) !== JSON.stringify(req.body.stocks)) {
    res.json({ "result": "EXCHANGE NOT ALLOWED NOW" });
  } else {
    brokers[i] = { ...brokers[i], ...req.body }
    res.json({ "result": "UPDATED" });
  }
});


router.get("/api/stocks", (req, res) => {
  console.log(`GET stocks`);
  res.json(stocks);
});

router.post("/api/stocks/:num", (req, res) => {
  console.log(`POST stocks`);
  const i = req.params.num;
  stocks[i] = { ...stocks[i], ...req.body }
  res.json({ "result": "UPDATED" });
});

router.delete("/api/stocks/:num", (req, res, next) => {
  console.log(`DELETE stocks`);
  const i = req.params.num;
  stocks.splice(i, 1);
  res.json({ "result": "DELETED" });
});

module.exports = router;
