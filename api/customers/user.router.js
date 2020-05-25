const {createCustomer,getCustomers, getCustomerById, updateCustomer, deleteCustomer,login} = require('./user.controller');
const router = require('express').Router();
const {checkToken} = require("../../auth/token_validation");

router.post('/save', checkToken, createCustomer);
router.get('/', checkToken,getCustomers);
router.get('/:id', checkToken, getCustomerById);
router.patch('/update', checkToken, updateCustomer);
router.delete('/delete', checkToken, deleteCustomer);
router.post('/login',login)

module.exports = router;
