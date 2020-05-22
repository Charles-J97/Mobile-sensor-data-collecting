const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const UserModel = require('../models/User')
const keys = require('../tools/keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    UserModel.findById(jwtPayload.id)
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch(err => console.log(err))
  }))
}
