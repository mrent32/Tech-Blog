import express from 'express';
import {Comment, User, Post}  from '../../models/index.js';
import withAuth from '../../utils/withAuth.js';
const router = express.Router();
// gets all the posts by one user withAuth
router.get('/',  async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include: [User, Comment ]
            // include: ({ model: User, attributes: ['name']}),
            
        })
        res.status(200).json(allPosts)
    } catch (err) {
        res.status(500).json(err)
    }
})
// gets one post by its id using a withAuth helper function to verify user authentication
router.get('/:id',  async (req, res) => {
    try {
        const onePost = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['name' ]},
                { model: Comment,
                    include: [{ model: User, attributes: ['name' ]}],
                },
            ],
        })
        if(!onePost) {
            res.status(404).json({ message: 'no post with that id'})
            return;
        }
        res.status(200).json(onePost)
    } catch (err) {
        res.status(500).json(err)
    }
})
//  creates a post, uses withAuth
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
           content: req.body.post_text, userId: req.session.userId,
           title: req.body.post_title
        })
        console.log(newPost)
        res.status(200).json(newPost)
    } catch (err) {
        res.status(400).json(err)
    }
})
// updates one post by one user using withAuth and the request id
router.put('/', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: { id: req.params.id},
        })
        if (!updatedPost) {
            res.status(404).json('no post with that id')
            return;
        }
        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(500).json(err)
    }
})
// deletes a single post by one user along with all its comments using withAuth and the post id
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: { id: req.params.id},
        })
        res.json(deletedPost)
    } catch(err) {
        res.status(500).json(err)
    }
})

export default router