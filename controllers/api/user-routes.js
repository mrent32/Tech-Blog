import express from 'express';
import User from '../../models/User.js';
import withAuth from '../../utils/withAuth.js';
const router = express.Router();
// route to get all users
router.get('/', async (req, res) => {
   try { const allUsers = await User.findAll({
        attributes: {exclude: ['password'] },
    })
    res.status(200).json(allUsers)
    res.render('homepage');
    } catch (err) {
        res.status(500).json(err)
    }
})
// allows a new user to signup to the page using the request body 
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            where: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            },
        })
        console.log('logging out', newUser)
        const userData = await newUser.save();
        req.session.save(() => {
            req.session.userId = userData.id
            req.session.logged_in = true
            res.status(200).json(userData)
        }).then(res.render('dashboard', userData ))
    } catch (err) {
        res.status(400).json(err)
        console.log(err)
    }
})
// route to login a user with the request body checking username and password
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
             where: { username: req.body.username } });

             if(!userData) {
                res.status(404).json('invalid credentials please try again')
                return;
             }
             const validPassword = userData.checkPassword(req.body.password)

             if(!validPassword) {
                res.status(400).json('invalid credentials please try again')
                return;
             }
             req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;
             })
             res.status(200).json({ user: userData, message: 'successfully logged in!'})
             res.render('login')
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