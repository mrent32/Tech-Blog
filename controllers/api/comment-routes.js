import express from 'express'
import Comment from '../../models/Comment.js';
import withAuth from "../../utils/withAuth.js";
const router = express.Router();
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        res.status(200).json(newComment)
    } catch (err) {
        res.status(400).json(err)
    }
})

export default router;