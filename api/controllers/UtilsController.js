/**
 * UtilsController
 *
 * @description :: Server-side logic for managing vbvsecurecodes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	payment: function(req, res) {
		res.redirect(301, "https://flutterwave.herokuapp.com");
	},
	tripledes: function(req, res) {
		res.redirect(301, "https://tripledes.herokuapp.com");
	},
	payCard: function(req, res) {
		UtilsService.chargeCard(req)
		.then(function(response) {
			if (response.status == "success" && response.data.responsecode == "02") {
				res.redirect(301, response.data.authurl);
			}
		})
	},
	confirmPayment: function(req, res) {
		var response = req.query;
		responseArray = JSON.parse(response.resp);

		if (responseArray.responsecode == "0" || responseArray.responsecode == "00") {
			return res.view('static/success');
		} else {
			return res.view('static/failure');
		}
	}
};

