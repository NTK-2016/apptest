import User from '../models/user.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
import profileImage from './../../client/assets/images/profile-pic.png'
import bannerImage  from  './../../client/assets/images/user-banner.png'
import nodemailer from 'nodemailer'
const create = (req, res, next) => {
  let user = new User(req.body)
  const token =Math.floor(Math.random(100) * 1000000000)+new Date().getTime()
  user = _.extend(user, {verification:{token: token ,status:0}})
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service:'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'nikaengg@gmail.com', // generated gmail user
      pass: '$Nikaengg@1234#$!' // generated gmail password
    }
  });
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      transporter.sendMail({
         from: '"Activate Your Account " <nikaengg@gmail.com>', // sender address
         to: result.email, // list of receivers
         subject: "Account Activation", // Subject line
         text: "Activate the account", // plain text body
         html: "<h3>Welcome, STAN ME</h3><br/><br/><p>Please, activate your account by this link <a href='http://localhost:3000/activation/"+token+"'>http://localhost:3000/activation/"+token+"</a></p>"// html body
      })
      res.status(200).json({
        message: "Successfully signed up!"
      })
    })
}

/**
 * Load user and append to req.
 */
const userByID = (req, res, next, id) => {
  //console.log(id)
  User.findById(id)
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err, user) => {
    if (err || !user) return res.status('400').json({
      error: "User not found"
    })
    req.profile = user
    next()
  })
}

const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(users)
  }).select('name email updated created')
}

const update = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded"
      })
    }
    let user = req.profile
    user = _.extend(user, fields)
    user.updated = Date.now()
    const date = new Date();
    const time = date.getTime();
    if(files.photo){
      user.photo.data = fs.readFileSync(files.photo.path)
      const file_ext = files.photo.name.split('.').pop();
      user.photo.contentType = files.photo.type
      fs.rename(files.photo.path, 'dist/upload/'+time+"."+file_ext, function(err) {
      });
    }
    if(files.banner){
      user.banner.data = fs.readFileSync(files.banner.path)
      const file_ext = files.banner.name.split('.').pop();
      user.banner.contentType = files.banner.type
      user.banner.contentType = files.banner.type
      fs.rename(files.banner.path, 'dist/upload/'+time+"."+file_ext, function(err) {
      });
    }
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    })
  })
}

const remove = (req, res, next) => {
  let user = req.profile
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    res.json(deletedUser)
  })
}

const photo = (req, res, next) => {
  if(req.profile.photo.data){
    res.set("Content-Type", req.profile.photo.contentType)
    return res.send(req.profile.photo.data)
  }
  next()
}

const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd()+profileImage)
}

const addFollowing = (req, res, next) => {
  User.findByIdAndUpdate(req.body.userId, {$push: {following: req.body.followId}}, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    next()
  })
}

const addFollower = (req, res) => {
  User.findByIdAndUpdate(req.body.followId, {$push: {followers: req.body.userId}}, {new: true})
  .populate('following', '_id name')
  .populate('followers', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    result.hashed_password = undefined
    result.salt = undefined
    res.json(result)
  })
}

const removeFollowing = (req, res, next) => {
  User.findByIdAndUpdate(req.body.userId, {$pull: {following: req.body.unfollowId}}, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    next()
  })
}
const removeFollower = (req, res) => {
  User.findByIdAndUpdate(req.body.unfollowId, {$pull: {followers: req.body.userId}}, {new: true})
  .populate('following', '_id name')
  .populate('followers', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    result.hashed_password = undefined
    result.salt = undefined
    res.json(result)
  })
}

const findPeople = (req, res) => {
  let following = req.profile.following
  following.push(req.profile._id)
  User.find({ _id: { $nin : following } }, (err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(users)
  }).select('name').limit(3)
}
/** User Link Activation  */
const linkactivation = (req, res) => {
console.log("test"+req.body)

}
/** End Here*/
/**  User notification */

const notification = (req, res,next) => {
  let usrprivacy = req.body
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    
    if (err) {
      return res.status(400).json({
        error: "Notification is updated successfully."
      })
    }
    let user = req.profile
    fields = {usernotification:fields }
    user = _.extend(user, fields)
    user.updated = Date.now()
   
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    })
  })

}

/** End here */
/** privacy policy for user */
const privacy = (req, res,next) => {
  let usrprivacy = req.body
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    
    if (err) {
      return res.status(400).json({
        error: "Privacy Policy is updated."
      })
    }
    let user = req.profile
    fields = {privacy:fields }
    user = _.extend(user, fields)
    user.updated = Date.now()
   
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    })
  })

}
/** End here */
/**  Payment option    */
const payment = (req, res,next) => {
  let usrprivacy = req.body
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    
    if (err) {
      return res.status(400).json({
        error: "Notification is updated successfully."
      })
    }
    let user = req.profile
    fields = {payment:fields }
    user = _.extend(user, fields)
    user.updated = Date.now()
   
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    })
  })

}
/** end Here */
/** Count Following Followers */
const countpeople = (req, res) => {
  let following = req.profile.following
  following.push(req.profile._id)
  User.find({ _id: { $nin : following } }, (err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(users)
  }).count();
}
/**End Here */
/** Banner image upload */
const bannerimg = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Banner image could not be uploaded"
      })
    }
    let user = req.profile
    user = _.extend(user, fields)
    user.updated = Date.now()
    if(files.banner){
      user.banner.data = fs.readFileSync(files.banner.path)
      user.banner.contentType = files.banner.type
    }
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    })
  })
}

const banner = (req, res, next) => {
  if(req.profile.banner.data){
    res.set("Content-Type", req.profile.banner.contentType)
    return res.send(req.profile.banner.data)
  }
  next()
}

const defaultbanner = (req, res) => {
  return res.sendFile(process.cwd()+bannerImage)
}

/** End here bannner Image */
export default {
  create,
  userByID,
  read,
  list,
  remove,
  update,
  photo,
  defaultPhoto,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  findPeople,
  bannerimg,
  defaultbanner,
  banner,
  notification,
  privacy,
  payment,
  countpeople,
  linkactivation
}
