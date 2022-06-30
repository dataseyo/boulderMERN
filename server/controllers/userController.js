import session from 'express-session'
import async from 'async'

import User from '../models/userModel.js'
import Boulder from '../models/boulderModel.js'

// add new user on sign up
export const createUser = async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.send('successfully added user')
    } catch (err) {
        console.log(err)
    }
}

// login
export const login = (req, res) => {
    res.send(req.user)
    console.log('ehy')
}

// logout
export const logout = (req, res) => {
    req.session.destroy()
    console.log("logged out")
}

export const getUserDetails = (req, res, next) => {

}

// check if session exists; if so, retrieve user from session
// export const getCurrentUser = (req, res) => {
//     res.json({"session": req.session})
// }

// retrieve list of users from db
export const getUserList = (req, res, next) => {
    User.find().exec((err, list_users) => {
        if (err) { return next(err) }
        res.json(list_users)
    })
}

// add liked boulder to user's liked boulder array
export const likeBoulder = (req, res, next) => {
    async.parallel({
        user: (callback) => {
            User.findById(req.body.id, (user_edit) => {
                
            })
                .exec(callback)
        },

        boulder: (callback) => {
            Boulder.findById(req.params.id)
                .exec(callback)
        }
    }, (err, results) => {
        if (err) {
            return next(err)
        }

        // otherwise, add boulder to user's liked boulders
        // and add like to boulder array

    })
}

// remove liked boulder from user's liked boulder array
