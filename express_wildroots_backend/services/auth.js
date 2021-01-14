const jwt = require('jsonwebtoken');
const models = require('../models/')


/*var authService = {
    signUser: function(user) {
      const token = jwt.sign(
        {
          Username: user.Username,
          UserId: user.UserId
        },
        'secretkey',
        {
          expiresIn: '1h'
        }
      );
      return token;
    }
  }*/