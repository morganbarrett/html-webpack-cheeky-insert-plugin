const assert = require('assert');

class HtmlWebpackCheekyInsertPlugin {
	constructor(opt){
		this.top = !!opt.top;
		this.tag = opt.tag ? opt.tag : "body";
		this.html = opt.html ? opt.html : "";

		if(this.html instanceof Array){
			this.html = this.html.join("\n");
		}
	}

	apply(compiler){
		compiler.hooks.compilation.tap(this.constructor.name, compilation => {
	        let hook = compilation.hooks.htmlWebpackPluginAfterHtmlProcessing;
	        
	        if(!hook){
				const [HtmlWebpackPlugin] = compiler.options.plugins.filter(
					plugin => plugin.constructor.name === 'HtmlWebpackPlugin'
				);

				assert(HtmlWebpackPlugin, 'Unable to find HtmlWebpackPlugin.');
				
				hook = HtmlWebpackPlugin.constructor.getHooks(compilation).beforeEmit;
			}

			hook.tapAsync(this.constructor.name, (data, callback) => {
				var tag = "<" + this.tag + ">",
					s = data.html,
					i = s.indexOf(tag) + tag.length;

				if(this.top){
					i = 0;
				}

				data.html = s.substr(0, i) + this.html + s.substr(i);

				callback(null, data);
			});
		});
	}
}

module.exports = HtmlWebpackCheekyInsertPlugin;