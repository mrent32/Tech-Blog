import express from 'express';
import { User, Post, Comment } from '../models/index.js';
import withAuth from "../utils/withAuth.js";
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll(
            { include: [ {model: User} ]}
        )
        // console.log(postData)
        const posts = postData.map((post) => post.get({ plain: true}));
        // const posts = []
        console.log(posts)
        res.render('homepage', {posts})
        
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ['username'] }],
                },
            ],
        })
        const post = postData.get({ plain: true })
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/dashboard',  async (req, res) => {
  try { 
     const postData = await Post.findAll({
        where: { user_id: req.session.user_id },
        include: [{ model: User, attributes: ['username'] }],
    });
    const posts = postData.map((post) => post.get({ plain: true }))

    res.render('dashboard', {
        posts, 
        logged_in: req.session.logged_in,
    })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('homepage')
        return;
    }
    res.render('login')
})

router.get('/signup', (req, res) =>{
    if(req.session.logged_in) {
        res.redirect('/dashboard')
        return;
    }
    res.render('signup')
})

router.get('/editpost/:id', async (req, res) => {
    try{
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User,
                    attributes: ['username'],
                },
                { model: Comment,
                include: [{ model: User, attributes: ['username']}]},
            ],
        })
        const post = postData.get({ plain: true})

        res.render('editpost', {
            ...post,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router;