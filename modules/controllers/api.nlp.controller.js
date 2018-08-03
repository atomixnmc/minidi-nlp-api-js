var path = require('path');
var vntkUtil = require(path.resolve('./modules/nlp/vntk'));

function tokenizeSentence(req, res){
	var sentence = req.query.sentence;
	
	var options = {
		lang: 'vi'
	};
	if (req.query.lang){
		options.lang = req.query.lang
	}

	vntkUtil.recognize(sentence, options)
	.then(data=>{
		console.log('done', data);
		res.json({
			status: "Success",
			message: "Success",
			result: {
				text: data.text,
				html: data.html
			}
		});
	})
	.catch(err=>{
		res.json({
			status: "Fail",
			message: err.message
		});
	});
}

module.exports.route = function(app){
	app.get("/api/lnp/tokenize/", tokenizeSentence);
}