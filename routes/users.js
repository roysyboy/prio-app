var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
	// somethign
});

router.get('/cool', (req, res, next) => {
	res.render('users', { title: "You're cool" });
	// res.send(`You're So Cool!`);
});

module.exports = router;
