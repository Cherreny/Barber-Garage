// server.js
// load the things we need
var express = require('express');
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');

var pages = require('./pages');
var locales = {
  pl: require('./locales/pl/locales'),
  en: require('./locales/en/locales')
};

var timestamp = new Date().getTime();

var app = express();

var distPath = 'dist';

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/', express.static('public'));

// loop for default uris
pages.forEach(page => {
  app.get(page.uri, (req, res) => {
    Object.assign(page, {
      language: 'pl',
      locales: locales.pl,
      urls: {
        homepage: '/',
        barber: '/barber',
        garage: '/garage',
        current: {
          pl: page.uri,
          en: '/en' + page.uri
        }
      }
    });

    res.render('layout', {
      content: getPageContent(path.join('pages', page.pageName), page),
      data: page
    });
  });

  app.get('/en' + page.uri, (req, res) => {
    Object.assign(page, {
      language: 'en',
      locales: locales.en,
      urls: {
        homepage: '/en',
        barber: '/en/barber',
        garage: '/en/garage',
        current: {
          pl: page.uri,
          en: '/en' + page.uri
        }
      }
    });

    res.render('layout', {
      content: getPageContent(path.join('pages', page.pageName), page),
      data: page
    });
  });
});

app.get('/build', (req, res) => {
  pages.forEach(page => {
    var fileName = path.join(distPath, page.fileName);
    var stream = fs.createWriteStream(fileName);

    stream.once('open', fd => {
      var html = buildHtml(page.pageName, page);
      stream.end(html);
    });
  });

  res.send('build succeeded');
});

app.listen(8080);
console.log('server is running on localhost:8080');

function getPageContent(fileName, data) {
  return ejs.render(fs.readFileSync(path.join('views', fileName), 'utf-8'), {
    data: data
  });
}

function buildHtml(pageName, data) {
  return getPageContent('partials/head.ejs', data) +
         getPageContent(path.join('pages', pageName), data) +
         getPageContent('partials/footer.ejs', data);
}
