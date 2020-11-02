var express = require('express');
var router = express.Router();

//var userService =require('../schema/users/user.service');
const userService =require('../services/user.service');

/* GET users listing. */
router.get('/getUser', userService.retrieveToken, userService.verifyToken, function(req, res, next) {
    console.log(req.user);
    res.send({'account': req.user});

});

module.exports = router;
