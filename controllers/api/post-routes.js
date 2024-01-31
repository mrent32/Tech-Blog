import express from 'express';
import Comment from '../../models/Comment.js'
import User from '../../models/User.js'
import Post from '../../models/Post.js'
import withAuth from '../../utils/withAuth.js';
const router = express.Router();
// gets all the posts by one user withAuth
router.get('/', withAuth, async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include: ({ model: User, attributes: ['username']}),
        })
        res.status(200).json(allPosts)
    } catch (err) {
        res.status(500).json(err)
    }
})
// gets one post by its id using a withAuth helper function to verify user authentication
router.get('/:id', withAuth, async (req, res) => {
    try {
        const onePost = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username' ]},
                { model: Comment,
                    include: [{ model: User, attributes: ['username' ]}],
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
            ...req.body,
            user_id: req.session.user_id,
        })
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
router.delete('/', withAuth, async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: { id: req.params.id},
        })
        await Comment.destroy({
            where: { post_id: req.params.id},
        })
        if(!deletedPost) {
            res.status(404).json('no post with that id')
            return;
        }  res.status(200).json(deletedPost)
    } catch(err) {
        res.status(500).json(err)
    }
})

export default router