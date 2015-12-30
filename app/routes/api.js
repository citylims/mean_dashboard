var express = require('express'),
    router = express.Router(),
    passport = require('passport');
    User = require('../models/user.js');
    mongoose = require('mongoose')


router.post('/register', function(req, res) {
  User.signup(new User({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({err: err})
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'})
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.status(401).json({err: info})
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'})
      }
      res.status(200).json({status: 'Login successful!'})
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'})
});

router.get('/change_password', function(req, res) {
  User.findByUsername("test@test.com").then(function(user) {
    if (user) {
      user.setPassword("password", function() {
        user.save();
        return res.status(200).json({msg: "password reset success"})
      });
    } else {
      res.status(200).json({status: 0, msg: "this user does not exist"})
    }
  })
})

//get list of users
router.get('/', function(req, res) {
  User.find({}).then(function(users) {
    res.json(users)
  })
})

// userModel.findByUsername(email).then(function(sanitizedUser){
//     if (sanitizedUser){
//         sanitizedUser.setPassword(newPasswordString, function(){
//             sanitizedUser.save();
//             return res.status(200).json({msg: 'password reset successful'});
//         });
//     } else {
//         res.status(200).json({status: 0, msg: 'This user does not exist'});
//     }
// },function(err){
//     console.log(err)
// })

module.exports = router;
