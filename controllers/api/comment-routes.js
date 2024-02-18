import express from 'express';
import {Comment} from '../../models/index.js';
import withAuth from "../../utils/withAuth.js";
const router = express.Router();
router.post('/', withAuth, async (req, res) => {
    console.log(req.body)
    try {
        const newComment = await Comment.create({
           comment_text: req.body.comment_text, postId: req.body.postId, userId: req.session.userId
        })
        console.log(newComment)
        res.status(200).json(newComment)
    } catch (err) {
        res.status(400).json(err)
    }
})

export default router;