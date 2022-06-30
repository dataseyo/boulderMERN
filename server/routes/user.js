import express from 'express'

import { createUser, getUserList, login, logout} from '../controllers/userController.js'

var router = express.Router()

router.post('/signup', createUser)

router.get('/userlist', getUserList)

// router.get('/currentuser', getCurrentUser)

router.get('/login', login)

router.post('/logout', logout)

export default router