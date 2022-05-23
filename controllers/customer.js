const products = require('../products');

const getAllCustomers = (req,res) =>{
    res.json(products);
}

const insert_user = (req, res) =>{
    console.log(req.body);
}

module.exports = {getAllCustomers}