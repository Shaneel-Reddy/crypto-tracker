const express = require("express");
const cryptoRoute = require("./crypto.route");

const router = express.Router();

const routes = [
  {
    path: "/crypto",
    route: cryptoRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
