import mongoose from 'mongoose'
import crypto from 'crypto'
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  verification:
  { 
    token : {type:String},
    status:{ type:Number, default:0}
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  hashed_password: {
    type: String,
    required: "Password is required"
  },
facebook: {type: String, ref: 'User'},
twitter: {type: String, ref: 'User'},
instagram: {type: String, ref: 'User'},
youtube: {type: String, ref: 'User'},
linkedlin: {type: String, ref: 'User'},
salt: String,
updated: Date,
created: {
type: Date,
default: Date.now
  },
  about: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  banner: {
    data: Buffer,
    contentType: String
  },
  usernotification:{
   snewstan : { type: Boolean, default:false },
   snewtips : { type: Boolean, default:false},
   sneworder : { type: Boolean, default:false},
   snewmessage : { type: Boolean, default:false},
   pmnewstan : { type: Boolean, default:false},
   pmnewtips : { type: Boolean, default:false},
   pmneworder : { type: Boolean, default:false},
   pmnewmessage : { type: Boolean, default:false},
   pmlikes : { type: Boolean, default:false},
   pmcommnents : { type: Boolean, default:false},
   pmreposts : { type: Boolean, default:false},
  },
  privacy:{
    nofstan : { type: Boolean, default:false},
    noffollowing : { type: Boolean, default:false},
    noffollowers : { type: Boolean , default:false},
    income : { type: Boolean, default:false },
    goal : { type: Boolean, default:false},
   },
   payment:{
    acc_holdername:{type:String, trim: true},
    bankname:{type:String, trim: true},
    accountnumber:{type:String, trim: true},
    subscriber:{type:String, trim: true},
    discount:{type:String, trim: true}
   },
  photo: {
    data: Buffer,
    contentType: String
  },
  following: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  followers: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
})

UserSchema
  .virtual('password')
  .set(function(password,oldpassword) {
    this._password = password
  //  this._oldpassword = oldpassword ,'oldpassword'
    this.salt = this.makeSalt()
   // this.hashed_password = this.encryptPassword(oldpassword)
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  })

UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
  //  if(this._oldpassword!==this._password)
  //  {
  //    console.log(this._oldpassword+'hased'+oldpassword)
  //    this.invalidate('oldpassword','Please enter Corect Password')
  //  }
}, null)

UserSchema.methods = {      
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}

export default mongoose.model('User', UserSchema)
