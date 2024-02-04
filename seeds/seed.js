import sequelize from '../config/connection.js'
import User from '../models/User.js';
import Post from '../models/Post.js'
import Comment from '../models/Comment.js';

import userData from './userData.js'
import postData from './postData.js'
import commentData from './commentData.js'

const seedDatabase = async () => {
    await sequelize.sync({ force: true })
    
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    })
    console.log(users)

    for (const post of postData) {
        console.log(post)
        await Post.create({
            ...post,
            userId: users[Math.floor(Math.random() * users.length)].id
        })
    }
    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            userId: users[Math.floor(Math.random() * users.length)].id
        })
    }
    process.exit(0)
}
seedDatabase()