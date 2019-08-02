import mongoose from 'mongoose'
import crypto from 'crypto'
const ShopSchema = new mongoose.Schema({
  productname: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  description: {
    type: String,
    trim: true,
    required: 'Email is required'
  },
  price: {
    type: Number,
    required: "Price is required"
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  image: {
    data: Buffer,
    contentType: String
  },

})

// UserSchema
//   .virtual('password')
//   .set(function(password) {
//     this._password = password
//     this.salt = this.makeSalt()
//     this.hashed_password = this.encryptPassword(password)
//   })
//   .get(function() {
//     return this._password
//   })

// UserSchema.path('hashed_password').validate(function(v) {
//   if (this._password && this._password.length < 6) {
//     this.invalidate('password', 'Password must be at least 6 characters.')
//   }
//   if (this.isNew && !this._password) {
//     this.invalidate('password', 'Password is required')
//   }
// }, null)

// UserSchema.methods = {
//   authenticate: function(plainText) {
//     return this.encryptPassword(plainText) === this.hashed_password
//   },
//   encryptPassword: function(password) {
//     if (!password) return ''
//     try {
//       return crypto
//         .createHmac('sha1', this.salt)
//         .update(password)
//         .digest('hex')
//     } catch (err) {
//       return ''
//     }
//   },
//   makeSalt: function() {
//     return Math.round((new Date().valueOf() * Math.random())) + ''
//   }
// }

export default mongoose.model('Shop', ShopSchema)
