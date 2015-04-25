var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');
var Q = require('q');

// var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');
// var Users = require('../app/collections/users');
// var Links = require('../app/collections/links');

exports.renderIndex  = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res, next) {
  Link.find({}).exec(function(err, links) {
    res.send(200, links);
  });
  // var findAll = Q.nbind(Link.find, Link);

  // findAll({})
  //   .then(function (links) {
  //     res.json(links);
  //   })
  //   .fail(function (error) {
  //     next(error);
  //   });
};

exports.saveLink = function(req, res, next) {
  var uri = req.body.url;
  if (!util.isValidUrl(uri)) {
    res.send(404, "Not Found");
    return next(new Error('Not a valid url'));
  }

  Link.findOne({ url: uri }).exec(function(err, found) {
    if (err) {
      console.error(err);
    } else if (found) {
      res.send(200, found);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }

        var link = new Link({
          url: uri,
          title: title,
          base_url: req.headers.origin,
          visits: 0
        });

        link.save(function(err, newLink) {
          if (err) {
            res.send(500, err);
          } else {
            res.send(200, newLink);
          }
        });
      });
    }
  });

  // var createLink = Q.nbind(Link.create, Link);
  // var findLink = Q.nbind(Link.findOne, Link);

  // findLink({url: url})
  //   .then(function (match) {
  //     console.log('match', match);
  //     if (match) {
  //       res.send(match);
  //     } else {
  //       return util.getUrlTitle(url);
  //     }
  //   })
  //   .then(function (title) {
  //     console.log('title', title);
  //     if (title) {
  //       var newLink = {
  //         url: url,
  //         visits: 0,
  //         base_url: req.headers.origin,
  //         title: title
  //       };
  //       return createLink(newLink);
  //     }
  //   })
  //   .then(function (createdLink) {
  //     console.log('createdLink', createdLink);
  //     if (createdLink) {
  //       res.json(createdLink);
  //     }
  //   })
  //   .fail(function (error) {
  //     next(error);
  //   });

};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  // new User({ username: username })
  //   .fetch()
  //   .then(function(user) {
  //     if (!user) {
  //       res.redirect('/login');
  //     } else {
  //       user.comparePassword(password, function(match) {
  //         if (match) {
  //           util.createSession(req, res, user);
  //         } else {
  //           res.redirect('/login');
  //         }
  //       })
  //     }
  // });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  // new User({ username: username })
  //   .fetch()
  //   .then(function(user) {
  //     if (!user) {
  //       var newUser = new User({
  //         username: username,
  //         password: password
  //       });
  //       newUser.save()
  //         .then(function(newUser) {
  //           util.createSession(req, res, newUser);
  //           Users.add(newUser);
  //         });
  //     } else {
  //       console.log('Account already exists');
  //       res.redirect('/signup');
  //     }
  //   })
};

exports.navToLink = function(req, res, next) {
  // var link = req.params[0];
  // link.visits ++;

  // link.save(function (err, savedLink) {
  //   if (err) {
  //     next(err);
  //   } else {
  //     res.redirect(savedLink.url);
  //   }
  // });

  Link.findOne({ code: req.params[0] }).exec(function (err, link) {
    if (!link) {
      res.redirect('/');
    } else {
      link.visits++;

      link.save(function (err, link) {
        res.redirect(link.url);
        return;
      });
    }
  });
};
