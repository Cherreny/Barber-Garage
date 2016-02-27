module.exports = [
  {
    fileName: 'index.html',
    pageName: 'homepage.ejs',
    uri: '/',
    rootClass: 'homepage',
    containerClass: 'container'
  }, {
    fileName: 'barber.html',
    pageName: 'barber.ejs',
    uri: '/barber',
    containerClass: 'container-subpage',
    active: 'barber'
  }, {
    fileName: 'garage.html',
    pageName: 'garage.ejs',
    uri: '/garage',
    containerClass: 'container-subpage',
    active: 'garage'
  }
];
