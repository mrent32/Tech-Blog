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

    for (const project of projectData) {
        await Project.create({
            ...project,
            user_id: users[Math.floor(Math.random() * users.length)].id
        })
    }
    process.exit(0)
}
seedDatabase()