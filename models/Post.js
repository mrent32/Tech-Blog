import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/connection.js'

export default class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: "user",
        //         key: "id",
        //     },
        // },
    },
    {
    sequelize, 
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
    }
)

