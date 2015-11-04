/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-11-03
 */
var fs = require('fs');
var path = require('path');
var indexHtml = fs.readFileSync(path.resolve(__dirname, "./src/index.html"), "utf-8");
var assets = require('./build/assets.json');

var interpolator = {

  js: {
    regex    : /<!--\s*build:js\s*-->/,
    inlineTag: 'script',
    outerTag : '<link rel="stylesheet" href="{{js}}">'
  },

  css: {
    regex    : /<!--\s*build:css\s*-->/,
    inlineTag: 'style',
    outerTag : '<script src="{{css}}"></script>'
  }

};

var isInlineAssets = process.argv.some(function (argv) {
  return argv === '--inline-source';
});

['script', 'link', 'style'].forEach(tag => {
  indexHtml = indexHtml.replace(new RegExp(`<${tag}.*>.*</${tag}>`, 'g'), '');
});

if (isInlineAssets) {

  Object.keys(interpolator).forEach(type => {
    var info = interpolator[type];
    indexHtml = indexHtml.replace(info.regex, `<${info.inlineTag}>` + fs.readFileSync(path.resolve(__dirname, `.${assets.app[type]}`), 'utf-8') + `</${info.inlineTag}>`);
  });

} else {

  Object.keys(interpolator).forEach(type => {
    var info = interpolator[type];
    indexHtml = indexHtml.replace(info.regex, info.outerTag.replace(`{{${type}}}`, assets.app[type]));
  });

}

fs.writeFile(path.resolve(__dirname, './index.html'), indexHtml, 'utf-8');
