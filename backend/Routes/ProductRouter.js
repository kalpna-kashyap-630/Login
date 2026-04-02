
const router = require('express').Router();
const ensureAuthenticated = require('../Middlewares/Auth')


router.get('/', ensureAuthenticated, async(req, res) =>{
 try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }

});
 


module.exports = router;