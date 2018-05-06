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
			//whether the html should be inserted at the top of the document
			top: false,

			//tag to insert html into
			tag: "body",

			//html to be inserted, or an array of html strings
			html: ""
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

## Example with array
### webkit.config.js
```javascript
...
	plugins: [
		new HtmlWebpackPlugin(),
		new HtmlWebpackInsertPlugin({
			tag: "head",
			html: [
				"<meta name='description' content='Cheeky cheeky!'>",
				"<meta name='keywords' content='A,B,C'>",
				"<meta name='author' content='Morgan Barrett'>",
				"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
			]
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
		<meta name='description' content='Cheeky cheeky!'>
		<meta name='keywords' content='A,B,C'>
		<meta name='author' content='Morgan Barrett'>
		<meta name='viewport' content='width=device-width, initial-scale=1.0'>
	</head>
	<body>
		<script type="text/javascript" src="bundle.js"></script>
	</body>
</html>
```

## Example with top
### webkit.config.js
```javascript
...
	plugins: [
		new HtmlWebpackPlugin(
			filename: "cheekyServer.php",
		),
		new HtmlWebpackInsertPlugin({
			top: true,
			html: [
				"<?php",
					"if(rand(0, 5) == 2){",
						"echo '<h1>Random 404</h1>';",
						"exit;",
					"}",
				"?>"
			]
		})
	]
...
```
### cheekyServer.php
```php
<?php
	if(rand(0, 5) == 2){
		echo '<h1>Random 404</h1>';
		exit;
	}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
	</head>
	<body>
		<script type="text/javascript" src="bundle.js"></script>
	</body>
</html>
```