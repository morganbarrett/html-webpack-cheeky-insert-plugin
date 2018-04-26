function HtmlWebpackInsertPlugin(opt){
	this.tag = opt.tag ? opt.tag : "body";
	this.html = opt.html ? opt.html : "";
}

HtmlWebpackInsertPlugin.prototype.apply = function(compiler){
	compiler.plugin("compilation", (compilation) => {
		console.log('The compiler is starting a new compilation...');

		compilation.plugin(
			"html-webpack-plugin-after-html-processing",
			(data) => {
				var tag = "<" + this.tag + ">",
					s = data.html,
					i = s.indexOf(tag) + tag.length;

				data.html = s.substr(0, i) + this.html + s.substr(i);
			}  
		);
	});
};

module.exports = HtmlWebpackInsertPlugin;