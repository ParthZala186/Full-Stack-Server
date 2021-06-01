module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Users.associate = (models) => {   //One user have many posts so we set association here
        Users.hasMany(models.Likes, {
            onDelete: "cascade"
        });

        Users.hasMany(models.Posts, {
            onDelete: "cascade"
        });
    }
    return Users
}