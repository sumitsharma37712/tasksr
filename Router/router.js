const express =require('express');
const {  authReg, authenticationLog, getUserData, getAuthData, UserCreatedeata, upUserData, delUserData, CountData } = require('../Controller/userContoller');
const verifyAuth = require('../utils/verify');
const router=new express.Router()



router.route ('/api/reg').post (authReg);
router.route('/api/authlog').post(authenticationLog,verifyAuth)
router.route('/api/getauth').get(verifyAuth,getAuthData)


// curd
router.route('/api/createdata').post(verifyAuth,UserCreatedeata)
router.route('/api/getdata').get(verifyAuth,getUserData)
router.route('/api/updatedata/:id').put(upUserData)
router.route('/api/deletedata/:id').delete(delUserData)

// count router

router.route('/api/count').get(verifyAuth,CountData)


module.exports=router