# html-webpack-cheeky-insert-plugin
Adds ability to insert HTML into files generated with the HTML Webpack Plugin

## Install
```console
$ npm install --save-dev html-webpack-cheeky-insert-plugin
```
```console
$ yarn add --dev html-webpack-cheeky-insert-plugin
```

## Usage
### webkit.config.js
```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInsertPlugin = require("html-webpack-cheeky-insert-plugin");

module.exports = {
	entry: "index.js",
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js"
	},
	plugins: [
		new HtmlWebpackPlugin(),
		new HtmlWebpackInsertPlugin({
			tag: "body"	//default tag to insert html into
			html: "" 	//default html to be inserted
		})
	]
}

```

## Example
### webkit.config.js
```javascript
...
	plugins: [
		new HtmlWebpackPlugin({
			title: "Test"
		}),
		new HtmlWebpackInsertPlugin({
			html: "<p>Hello World</p>"
		})
	]
...
```
### index.html
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Test</title>
	</head>
	<body>
		<p>Hello World</p>
		<script type="text/javascript" src="bundle.js"></script>
	</body>
</html>
```