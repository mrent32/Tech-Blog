import express from 'express';
import {User, Post}  from '../../models/index.js';
import withAuth from '../../utils/withAuth.js';
const router = express.Router();
// route to get all users
router.get('/', async (req, res) => {
   try { const allUsers = await User.findAll({
        attributes: {exclude: ['password'] },
        include: [Post]
    })
    res.status(200).json(allUsers)
    } catch (err) {
        res.status(500).json(err)
    }
})
// allows a new user to signup to the page using the request body 
router.post('/signup', async (req, res) => {
    
    try {
        const newUser = await User.create({
           name: req.body.name,
           email: req.body.email,
           password: req.body.password
        })
        console.log('logging out', newUser)
        req.session.save(() => {
            req.session.userId = newUser.id
            req.session.logged_in = true
            res.status(200).json(newUser)
        })
    } catch (err) {
        res.status(400).json(err)
        console.log(err)
    }
})
// route to login a user with the request body checking username and password
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
             where: { email: req.body.email } });

             if(!userData) {
                res.status(404).json('invalid user credentials please try again')
                return;
             }
             const validPassword =  await userData.checkPassword(req.body.password)
        
             if(!validPassword) {
                res.status(400).json('invalid password credentials please try again')
                return;
             }
             req.session.save(() => {
                req.session.userId = userData.id;
                req.session.logged_in = true;
                res.status(200).json({ user: userData, message: 'successfully logged in!'})
             })
    }   catch (err) {
        res.status(400).json(err)
    }
})
// logs a user out of their active session
router.post('/logout', (req, res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

export default router