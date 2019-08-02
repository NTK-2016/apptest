import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

router.route('/api/users/photo/:userId')
  .get(userCtrl.photo, userCtrl.defaultPhoto)
router.route('/api/users/defaultphoto')
  .get(userCtrl.defaultPhoto)

router.route('/api/users/follow')
    .put(authCtrl.requireSignin, userCtrl.addFollowing, userCtrl.addFollower)
router.route('/api/users/unfollow')
    .put(authCtrl.requireSignin, userCtrl.removeFollowing, userCtrl.removeFollower)

router.route('/api/users/findpeople/:userId')
   .get(authCtrl.requireSignin, userCtrl.findPeople)


router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

  /** Route for banner image update */
router.route('/api/users/:userId')
.put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.bannerimg)

/** Route for  notification  */
router.route('/api/users/notification1/:userId')
.put(authCtrl.requireSignin,userCtrl.notification);
/** End here */

/** Route For Privacy */
router.route('/api/users/privacy/:userId')
.put(authCtrl.requireSignin,userCtrl.privacy);
/** End Here */

/** Route For Link Activation */
router.route('/api/users/activation/:token')
.put(userCtrl.linkactivation);
/** End Here */

/** Route For Payment */
router.route('/api/users/payment/:userId')
.put(authCtrl.requireSignin,userCtrl.payment);
/** End Here */

/** Count Following Followers */
router.route('/api/users/countfollowing/:userId')
   .get(authCtrl.requireSignin, userCtrl.countpeople)
   /** End here */
router.route('/api/users/banner/:userId')
  .get(userCtrl.banner, userCtrl.defaultbanner)
router.route('/api/users/defaultbanner')
  .get(userCtrl.defaultbanner)

router.param('userId', userCtrl.userByID)

export default router
