var q = require('q');
var unirest = require('unirest');

module.exports = {
	
	chargeCard: function(req) {

		var deferred = q.defer();
		var data = {
			"merchantid": "" + req.body.merchantid,
			"amount": "" + EncryptService.encrypt(sails.config.api_key, req.body.amount),
        	"authmodel": "" + EncryptService.encrypt(sails.config.api_key, req.body.authmodel),
        	"cardno": "" + EncryptService.encrypt(sails.config.api_key, req.body.cardno),
        	"currency": "" + EncryptService.encrypt(sails.config.api_key, req.body.currency),
            "custid": "" + EncryptService.encrypt(sails.config.api_key, req.body.custid),
        	"cvv": "" + EncryptService.encrypt(sails.config.api_key, req.body.cvv),
        	"expirymonth": "" + EncryptService.encrypt(sails.config.api_key, req.body.expirymonth),
        	"expiryyear": "" + EncryptService.encrypt(sails.config.api_key, req.body.expiryyear),
        	"narration": "" + EncryptService.encrypt(sails.config.api_key, req.body.narration),
        	"responseurl": "" + EncryptService.encrypt(sails.config.api_key, req.body.responseurl),
		}
		
		unirest.post(sails.config.base_url + 'card/mvva/pay/')
		  	.headers({
		    	'Content-Type': 'application/json',
		  	})
		  	.send(data)
		  	.end(function (res) {
			    if (res.body && res.body.status == 'success' && res.ok) {
			    	deferred.resolve(res.body);
			    } else {
			      	sails.log.warn('Failed initiating transaction: ', res.body);
			      	deferred.reject(res.body);
			    }
		  	});
		return deferred.promise;

	}

};