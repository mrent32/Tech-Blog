import Post from './Post.js';
import User from './User.js';
import Comment from './Comment.js';




// User.hasMany(Post, {
//     foreignKey: 'userId',
//     onDelete: 'CASCADE'
// })

Post.belongsTo(User, {
    foreignKey: 'userId',
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
});


Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',  
});



export { User, Post, Comment }

