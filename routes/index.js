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
	// get all vars from index.jade input fields and dropdowns
	var amountToConvert = req.query.convertAmount;
	var convertFrom = req.query.fromCurrency;
	var convertTo = req.query.toCurrency;
	var convertedVal;  // declare for access in all blocks below
	var errorString = '';  // declare and initialize as empty string, will only change if necessary

	//console.log("query was: convert " + dollars + " to " + convertTo);

	// used amounts from web
	var dollarConversions = {"Pounds": 0.7, "Euros": 0.9};
	var poundToEuro = 1.3;

	// response if convert from and to currencies are the same
	if (convertFrom === convertTo) {
		errorString = 'You must have different values for Convert From and Convert To. Please go back to the previous page and try again.'
		res.render('result', {
			errorMsg: errorString,
			amount: amountToConvert,
			frCurrency: convertFrom,
			destCurrency: convertTo,
			toConverted: amountToConvert
		});
	}
	else {
		if (convertFrom === 'Dollars') {
			// get the currency conversion rate from the dollar conversions list based on convertTo, which is Euros or Pounds
			var conversionRate = dollarConversions[convertTo];
			// multiply to get conversion value
			convertedVal = amountToConvert * conversionRate;
		}

		if (convertFrom === 'Euros') {
			if (convertTo === 'Dollars') {
				// get the currency rate from the dollar conversions list, based on convert from, which is Euros or Pounds
				conversionRate = dollarConversions[convertFrom];
				// divide to get the conversion value
				convertedVal = amountToConvert / conversionRate;
			}
			if (convertTo === 'Pounds') {
				// conversion if between Euros and Pounds
				conversionRate = poundToEuro;
				// divide to get the conversion value
				convertedVal = amountToConvert / conversionRate;
			}
		}

		if (convertFrom === 'Pounds') {
			if (convertTo === 'Dollars') {
				// get the currency rate from the dollar conversions list, based on convert from, which is Euros or Pounds
				conversionRate = dollarConversions[convertFrom];
				// divide to get the conversion value
				convertedVal = amountToConvert / conversionRate;
			}
			if (convertTo === 'Euros') {
				// conversion if between Euros and Pounds
				conversionRate = poundToEuro;
				// multiply to get conversion value
				convertedVal = amountToConvert * conversionRate;
			}
		}
		res.render('result', {
			errorMsg: errorString,
			amount: amountToConvert,
			frCurrency: convertFrom,
			destCurrency: convertTo,
			toConverted: convertedVal
		});
	}
}

module.exports = router;