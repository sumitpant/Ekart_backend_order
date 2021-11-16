const route = require('express').Router();
const { getOrders, addOrders } = require('../controllers/controller')

route.get('/orders', getOrders);
route.post('/add-orders', addOrders);


module.exports = route;