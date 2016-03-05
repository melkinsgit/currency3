/* require express */
var express = require("express");
var router = express.Router();


/* GET the app's home page; router method */
router.get('/', homepage);

function homepage (req, res) {
	res.render("index");
}

router.get('/convert', convert);

function convert(req, res) {
	var amountToConvert = req.query.convertAmount;
	var convertFrom = req.query.fromCurrency;
	var convertTo = req.query.toCurrency;
	var convertedVal;

	//console.log("query was: convert " + dollars + " to " + convertTo);

	var dollarConversions = {"Pounds": 0.7, "Euros": 0.9};
	var poundToEuro = 1.3;

	// give user for dropdown choice that doesn't convert - the same currency in each
	if (convertFrom === convertTo) {
	}
	else {
		// get the currency conversion factor
		if (convertFrom === 'Dollars') {
			var conversionRate = dollarConversions[convertTo];
			convertedVal = amountToConvert * conversionRate;
		}

		if (convertFrom === 'Euros') {
			if (convertTo === 'Dollars') {
				conversionRate = dollarConversions[convertFrom];
				convertedVal = amountToConvert / conversionRate;
			}
			if (convertTo === 'Pounds') {
				conversionRate = poundToEuro;
				convertedVal = amountToConvert / conversionRate;
			}
		}

		if (convertFrom === 'Pounds') {
			if (convertTo === 'Dollars') {
				conversionRate = dollarConversions[convertFrom];
				convertedVal = amountToConvert / conversionRate;
			}
			if (convertTo === 'Euros') {
				conversionRate = poundToEuro;
				convertedVal = amountToConvert * conversionRate;
			}
		}
		res.render('result', {
			amount: amountToConvert,
			frCurrency: convertFrom,
			destCurrency: convertTo,
			toConverted: convertedVal
		});
	}
}

module.exports = router;