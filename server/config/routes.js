module.exports = function (app) {
  //angular partials setup
  app.get('/partials/*', function (req, res) {
    res.render('../../public/app/' + req.params[ 0 ]);
  });

  app.get('*', function (req, res) {
    console.log('render index');
    res.render('index');
  });
}
