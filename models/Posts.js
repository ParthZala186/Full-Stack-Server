module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Posts.associate = (models) => {  //One Post has many comments so we put here
        Posts.hasMany(models.Comments, {
            onDelete: "cascade"
        })
        Posts.hasMany(models.Likes, {
            onDelete: "cascade"
        })
    }
    return Posts
}