/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-11-03
 */
var fs = require('fs');
var path = require('path');
var indexHtml = fs.readFileSync(path.resolve(__dirname, "./src/index.html"), "utf-8");
var assets = require('./build/assets.json');

indexHtml = indexHtml.replace(/<script.*>.*<\/script>/g, "");
indexHtml = indexHtml.replace(/<link.*>.*<\/link>/g, "");
indexHtml = indexHtml.replace(/<style.*>.*<\/style>/g, "");

var isInlineAssets = process.argv.some(function (argv) {
  return argv === '--inline-source';
});

if (isInlineAssets) {

  indexHtml = indexHtml.replace('<!-- build:css -->', '<style>' + fs.readFileSync(path.resolve(__dirname, '.' + assets.app.css), 'utf-8') + '</style>');
  indexHtml = indexHtml.replace('<!-- build:js -->', '<script>' + fs.readFileSync(path.resolve(__dirname, '.' + assets.app.js), 'utf-8') + '</script>');

} else {

  indexHtml = indexHtml.replace('<!-- build:css -->', '<link rel="stylesheet" href="' + assets.app.css + '">');
  indexHtml = indexHtml.replace('<!-- build:js -->', '<script src="' + assets.app.js + '"></script>');
}

fs.writeFile(path.resolve(__dirname, './index.html'), indexHtml, 'utf-8');
