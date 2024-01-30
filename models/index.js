import User from ('./User')
import Project from ('./Proejct')

User.hasMany(Project, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Project.belongsTo(User, {
    foreignKey: 'user_id',
})

module.exports = { User, Project }