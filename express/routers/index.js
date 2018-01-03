module.exports = (app) => {
  app.get('/', (req, res) => {
    res.redirect('/posts');
  });
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/posts', require('./posts'));
  app.use('/comments', require('./comments'));
  app.use((req, res) => {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
  app.use((err, req, res, next) => {
    console.error(err)
    req.flash('error', err.message)
    res.redirect('/posts')
  })
}

// one
// two
