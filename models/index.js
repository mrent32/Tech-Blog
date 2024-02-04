import User from './User.js'
import Post from './Post.js'
import Comment from './Comment.js'




User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

// Post.belongsTo(User, {
//     foreignKey: 'userId',
//     onDelete: 'CASCADE'

// })

Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

// Comment.belongsTo(Post, {
//     foreignKey: 'post_id',
//     onDelete: 'CASCADE'
// })


Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',  
})

// User.hasMany(Comment, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
// })

export default { Comment, User, Post }

