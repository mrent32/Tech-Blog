import sequelize from ('../config/connection')
import { User, Project } from ('../models')

import userData from ('./userData.json')
import projectData from ('./projectData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true })
    
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    })

    for (const post of postData) {
        await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id
        })
    }
    process.exit(0)
}
seedDatabase()